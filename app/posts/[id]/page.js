import Image from "next/image";

const fetchPost = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/wp-json/wp/v2/posts/${id}?acf_format=standard`,
      { cache: "no-cache" }
    );
    const post = await res.json();
    return post;
}

export async function generateMetadata({params:{id}}) {
  const post = await fetchPost(id);
  return {title: post.title.rendered}
}

export default async function Post({params:{id}}) {
    const {acf, author_name} = await fetchPost(id);

    return (
      <section className="recipe">
        <div className="container">
          <div className="title">
            <p>Author: <span>{author_name}</span></p>
            <h1>{acf.title}</h1>
            <div className="category">
              <span>{acf.meal_category}</span>
              <span>{acf.meal_area}</span>
            </div>
          </div>
          <div className="image-ingredients">
            <div className="image">
              {acf.meal_image ? 
                (<Image
                src={acf.meal_image.url}
                alt={acf.meal_image.alt}
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
            <div className="instructions">
              <div className="ingredients">
                <div className="title">
                  <p>Ingredients:</p>
                </div>
                {acf.ingredients.map((item, id) => (
                  <div className="ingredient" key={id}>
                    <p>{item.ingredient} - {item.ingredient_value}</p>
                  </div>
                ))}
              </div>
              <div className="instruction">
                <div className="title">
                    <p>Instructions:</p>
                </div>
                <div dangerouslySetInnerHTML={ {__html: acf.instructions} }/>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }