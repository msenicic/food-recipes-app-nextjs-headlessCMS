import Products from "@/app/components/Products";

const fetchPosts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/wp-json/wp/v2/posts/`, { 
        cache: 'no-cache',
        next: {
            tags: ['posts']
        }
    });
    const posts = await res.json();
    return posts;
}

export default async function Home() {
    const postsData = await fetchPosts()

    return (
        <Products posts={postsData}/>      
    )
}
