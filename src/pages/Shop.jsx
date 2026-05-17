import { useState, useEffect } from "react";
import api from "../service/api";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import SpecialProducts from "../components/SpecialProducts";

function Shop(){

    const [products,  setProducts] = useState([]);
    
    const [searchQuery, setSearchQuery] = useState({search:"", tag:"", category:"", ordering:""});

    const [isLoading, setIsLoading] = useState(true);


    useEffect(()=>{
        setIsLoading(true)
        api.get(`/shop/api/v1/product/?search=${searchQuery.search}&tag=${searchQuery.tag}&category=${searchQuery.category}&ordering=${searchQuery.ordering}`).then((res)=>{
            setProducts(res.data.result);
            setIsLoading(false);
        }).catch((error)=>{
            console.log(error);
        })
    }, [searchQuery,])

    const demoProducts = [
        { id: 1, title: 'هدفون بی‌سیم شیک', price: '۱,۴۹۰,۰۰۰ تومان', badge: 'پرفروش', discount: 20, image: 'https://via.placeholder.com/320x320?text=هدفون' },
        { id: 2, title: 'ساعت هوشمند مینیمال', price: '۲,۱۹۰,۰۰۰ تومان', badge: '', discount: 10, image: 'https://via.placeholder.com/320x320?text=ساعت' },
        { id: 3, title: 'کیف دستی چرمی', price: '۹۸۰,۰۰۰ تومان', badge: 'جدید', discount:0, image: 'https://via.placeholder.com/320x320?text=کیف' },
        { id: 4, title: 'عینک آفتابی مدرن', price: '۴۲۰,۰۰۰ تومان', badge: '', image: 'https://via.placeholder.com/320x320?text=عینک' },
        { id: 5, title: 'کفش روزمره', price: '۱,۰۹۰,۰۰۰ تومان', badge: '', image: 'https://via.placeholder.com/320x320?text=کفش' },
        { id: 6, title: 'کاپشن زمستانی', price: '۲,۵۰۰,۰۰۰ تومان', badge: 'فروش ویژه', image: 'https://via.placeholder.com/320x320?text=کاپشن' },
    ];
    return <>
    <SpecialProducts products={demoProducts} />
    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    <ProductList products={products} isLoading={isLoading}  label="همه محصولات"/>
    </>
}

export default Shop;