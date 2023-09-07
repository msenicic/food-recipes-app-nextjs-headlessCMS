export const fetchMenu = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/wp-json/wp/v2/menu`,
        { cache: 'no-cache' }
    );

    const menu = await res.json();
    return menu;
}