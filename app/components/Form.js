"use client";

import Context from "@/app/components/auth/Context";
import { useContext, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function Form({addRecipe}) {
    const {postDetails, setPostDetails, loginDetails} = useContext(Context)
    const [isPending, startTransition] = useTransition();
    const router = useRouter()

    const handleChange = (e) => {
        const { name, value } = e.target
        setPostDetails(prev => {
            return (
                { ...prev, [name]: value }
            )
        })
    }

    const handleIngredientChange = (e, index) => {
        const { name, value } = e.target
        const newIngredients = [...postDetails.ingredients];
        newIngredients[index][name] = value;
        setPostDetails(prev => ({ ...prev, ingredients: newIngredients }));
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validImageTypes = ['image/jpeg', 'image/png'];
            if (!validImageTypes.includes(file.type)) {
                alert('Invalid file type. Please upload an image.');
                event.target.value = '';
                return;
            }
            const formData = new FormData();
            formData.append(`file`, file);
            setPostDetails(prev => ({...prev, meal_image: formData}))
        }
    };

    const addInputPair = () => {
        setPostDetails(prev => {
            return (
                { ...prev, ingredients: [...prev.ingredients, {ingredient:'',ingredient_value:''}] }
            )
        })
    };

    const removeInputPair = (index) => {
        const newIngredients = [...postDetails.ingredients];
        newIngredients.splice(index,1);
        setPostDetails(prev => {
            return (
                { ...prev, ingredients: newIngredients }
            )
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        startTransition(()=>addRecipe(postDetails, loginDetails))
        router.push('/')
    };

    return (
        <section className='auth'>
            <div className="container">
                <div className="form">
                    <div className='title'>
                        <h1>Create Recipe</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input required type="text" placeholder="Title" name="title" value={postDetails.title} onChange={handleChange}/>
                        <input required type="text" placeholder="Meal Category" name="meal_category" value={postDetails.meal_category} onChange={handleChange}/>
                        <input required type="text" placeholder="Meal Area" name="meal_area" value={postDetails.meal_area} onChange={handleChange}/>
                        <input type="file" accept="image/*" placeholder="Meal Image" name="meal_image" onChange={handleImageChange}/>
                        <div className="inputs">
                            {postDetails.ingredients.map((ingredient, index) => (
                                <div className="input-pair" key={index}>
                                    <input required type="text" placeholder={`Ingredient ${index + 1}`} name="ingredient" value={ingredient.ingredient} onChange={(e) => handleIngredientChange(e, index)}/>
                                    <input required type="text" placeholder={`Ingredient Value ${index + 1}`} name="ingredient_value" value={ingredient.ingredient_value} onChange={(e) => handleIngredientChange(e, index)}/>
                                    <button type="button" onClick={() => removeInputPair(index)}>-</button>
                                </div>
                            ))}
                            <button className="add" type="button" onClick={addInputPair}>+</button>
                        </div>
                        <textarea rows={4} required placeholder="Instructions" name="instructions" value={postDetails.instructions} onChange={handleChange}/>
                        <button disabled={isPending ? true : false} type="submit">{isPending ? "Adding..." : "Create Recipe"}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}