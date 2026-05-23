import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import api from "../service/api";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import SpecialProducts from "../components/SpecialProducts";

function Shop(){

    const [products,  setProducts] = useState([]);
    const [specialSuggestionProducts, setSpecialSuggestionProducts] = useState({});
    
    const [searchQuery, setSearchQuery] = useState({search:"", tag:"", category:"", ordering:""});

    // pagination state compatible with API response {count, next, previous, results}
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [count, setCount] = useState(0);

    const [isLoading, setIsLoading] = useState(true);
    const [sspisLoading, setSspIsLoading] = useState(true);


    useEffect(()=>{
        setIsLoading(true)
        // include page param for paginated API
        const url = `/shop/api/v1/product/?search=${encodeURIComponent(searchQuery.search)}&tag=${encodeURIComponent(searchQuery.tag)}&category=${encodeURIComponent(searchQuery.category)}&ordering=${encodeURIComponent(searchQuery.ordering)}&page=${page}`;
        api.get(url).then((res)=>{
            // support both old { result: [] } and new paginated { count, next, previous, results }
            const data = res.data || {};
            const results = data.results ?? data.result ?? data;
            setProducts(results || []);

            if (typeof data.count === 'number'){
                const pageSize = (results && results.length) || 1;
                // const pages = Math.max(1, Math.ceil(data.count / pageSize));
                setTotalPages(data.total_pages);
                setCount(data.count);
            } else {
                // fallback: compute totalPages from results length only
                setTotalPages(1);
                setCount((results && results.length) || 0);
            }

            setIsLoading(false);
        }).catch((error)=>{
            console.log(error);
        });

        setSspIsLoading(true);
        api.get("/shop/api/v1/special-suggestion/").then((response)=>{
            setSpecialSuggestionProducts(response.data);

        }).catch((error)=>{
            console.log(error);

        }).finally(()=>{
            setSspIsLoading(false);
        });

    }, [searchQuery,page])

    // reset page to 1 when search or filters change
    useEffect(()=>{
        setPage(1);
    }, [searchQuery.search, searchQuery.tag, searchQuery.category, searchQuery.ordering]);

    const gotoPage = (p) => {
        if (p < 1 || p > totalPages) return;
        setPage(p);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return <>
    <Helmet>
        <title>فروشگاه برتر | Prime Shop</title>
        <meta name="description" content="فروشگاه محصولات متنوع با بهترین قیمت‌ها و تخفیف‌های ویژه. جستجو و فیلتر محصولات." />
        <meta property="og:title" content="فروشگاه برتر | Prime Shop" />
        <meta property="og:description" content="فروشگاه محصولات متنوع با بهترین قیمت‌ها و تخفیف‌های ویژه." />
        <link rel="canonical" href="/shop" />
    </Helmet>

    <div className="min-h-[90vh]">
    {specialSuggestionProducts.is_active & specialSuggestionProducts.remaining_sconds > 0 ? <>
        <SpecialProducts specialSuggestion={specialSuggestionProducts} isLoading={sspisLoading} />
    </> : <>
    </>}
    
    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    <ProductList products={products} isLoading={isLoading}  label="همه محصولات"/>
    { totalPages > 1 ? (
        <div className="mt-6 flex items-center justify-center gap-2" aria-label="pagination">
            <button onClick={()=>gotoPage(page-1)} disabled={page<=1} className={`px-3 py-1 cursor-pointer rounded ${page<=1? 'bg-gray-100 text-gray-400' : 'bg-white border'}`}>&laquo; قبلی</button>
            {/* simple windowed page list */}
            {(() => {
                const start = Math.max(1, page-2);
                const end = Math.min(totalPages, page+2);
                const pages = [];
                for (let p = start; p <= end; p++) pages.push(p);
                return pages.map(p => (
                    <button key={p} onClick={()=>gotoPage(p)} className={`px-3 py-1 cursor-pointer rounded ${p===page ? 'bg-indigo-600 text-white' : 'bg-white border'}`}>{p}</button>
                ))
            })()}
            <button onClick={()=>gotoPage(page+1)} disabled={page>=totalPages} className={`px-3 py-1 cursor-pointer rounded ${page>=totalPages? 'bg-gray-100 text-gray-400' : 'bg-white border'}`}>بعدی &raquo;</button>
        </div>
    ) : null }
    </div>
    </>
}

export default Shop;