import { useState, useEffect } from "react";
import searchImage from "../assets/images/search.png"

function SearchBar({setSearchQuery, searchQuery}){
    const [search, setSearch]= useState("");
    const [tag, setTag] = useState("");

    useEffect(()=>{
        setSearchQuery(prev=>({...prev,search : search,tag:tag}))
    }, [tag, search])

    return <>
    <section dir="rtl" aria-label="سرچ و فیلتر" className="mt-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-gradient-to-r from-fuchsia-500 to-indigo-600 p-8 text-white shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-right">
                  <h3 className="text-2xl font-extrabold">همین حالا جست و جوش کن</h3>
                  <div className="mt-2 flex-wrap inline-flex gap-3 text-indigo-100/90">
                    <div className="inline-flex flex-row-reverse gap-2">
                        <input type="checkbox" onChange={(e)=>{tag == "Best-Seller" ? setTag("") : setTag("Best-Seller")}} className="w-4 cursor-pointer rounded-2xl" name="" id="" /> <label className="" htmlFor="">پرفروش ترین</label>
                    </div>
                    <div className="inline-flex flex-row-reverse gap-2">
                        <input type="checkbox" className="w-4 cursor-pointer rounded-2xl" name="" id="" /> <label className="" htmlFor="">پایین ترین قیمت</label>
                    </div>
                    <div className="inline-flex flex-row-reverse gap-2">
                        <input type="checkbox" className="w-4 cursor-pointer rounded-2xl" name="" id="" /> <label className="" htmlFor="">بیشترین تخفیف</label>
                    </div>
                    </div>
                </div>

                <div className="flex flex-row-reverse gap-3">
                  <input type="text" name="search" onChange={(e)=>{setSearch(e.target.value)}} value={search} placeholder="کیف ..." className="inline-flex rounded-lg md:min-w-96 h-10 bg-fuchsia-600 focus:border-0 focus:outline-2 focus:outline-fuchsia-400 px-2 text-white" />
                  {/* <button onClick={(e)=>{}} className="inline-flex items-center justify-center rounded-md bg-white cursor-pointer text-fuchsia-900 duration-100 hover:outline-2 outline-fuchsia-800  px-3 py-2 text-sm font-semibold"><img className="w-6 object-center object-fill" src={searchImage} alt="img-search" /></button> */}
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
}

export default SearchBar;