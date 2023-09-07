'use client';

import Link from "next/link";
import Search from "./Search";
import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import Image from "next/image";

export default function Products({posts}) {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    return (
        <section className="recipes">
            <div className="container">
                <div className="title">
                    <h1>Recipes</h1>
                </div>
                <Search search={search} setSearch={setSearch}/>
                <div className="products">
                    {posts.filter((post)=>{
                        if(debouncedSearch == '') return post;

                        const inIngredients = post.acf.ingredients.some(ingredient =>
                            ingredient.ingredient.toLowerCase().includes(debouncedSearch.toLowerCase())    
                        )
                        const inCategory = post.acf.meal_category.toLowerCase().includes(debouncedSearch.toLowerCase());
                        const inArea = post.acf.meal_area.toLowerCase().includes(debouncedSearch.toLowerCase());

                        return inIngredients || inCategory || inArea;
                    }).map((post) => (
                        <div className="product" key={post.id}>
                            <div className="inner">
                                <div className="image">
                                    {post.fimg_url ? 
                                        (<Image
                                        src={post.fimg_url}
                                        alt="Feature Image"
                                        fill
                                        sizes="100vw"
                                        style={{
                                            objectFit: "cover"
                                        }} />) : 
                                        (<Image
                                        src="/placeholder.png"
                                        alt="Placeholder"
                                        fill
                                        sizes="100vw"
                                        style={{
                                            objectFit: "cover"
                                        }} />)
                                    }
                                </div>
                                <div className="product-details">
                                    <div className="name">
                                        <p>{post.title.rendered}</p>
                                    </div>
                                    <Link href={`/posts/${post.id}`} className="product-button">Get Recipe</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}