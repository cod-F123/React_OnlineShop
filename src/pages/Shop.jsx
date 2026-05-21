import { useState, useEffect } from "react";
import api from "../service/api";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import SpecialProducts from "../components/SpecialProducts";

function Shop(){

    const [products,  setProducts] = useState([]);
    const [specialSuggestionProducts, setSpecialSuggestionProducts] = useState({});
    
    const [searchQuery, setSearchQuery] = useState({search:"", tag:"", category:"", ordering:""});

    const [isLoading, setIsLoading] = useState(true);
    const [sspisLoading, setSspIsLoading] = useState(true);


    useEffect(()=>{
        setIsLoading(true)
        api.get(`/shop/api/v1/product/?search=${searchQuery.search}&tag=${searchQuery.tag}&category=${searchQuery.category}&ordering=${searchQuery.ordering}`).then((res)=>{
            setProducts(res.data.result);
            setIsLoading(false);
        }).catch((error)=>{
            console.log(error);
        });

        setSspIsLoading(true);
        api.get("/shop/api/v1/special-suggestion/").then((response)=>{
            setSpecialSuggestionProducts(response.data);

            console.log(response.data)

        }).catch((error)=>{
            console.log(error);

        }).finally(()=>{
            setSspIsLoading(false);
        });

    }, [searchQuery,])


    return <>
    {specialSuggestionProducts.is_active & specialSuggestionProducts.remaining_sconds > 0 ? <>
        <SpecialProducts specialSuggestion={specialSuggestionProducts} isLoading={sspisLoading} />
    </> : <>
    </>}
    
    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    <ProductList products={products} isLoading={isLoading}  label="همه محصولات"/>
    </>
}

export default Shop;