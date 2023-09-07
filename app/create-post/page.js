import Form from "../components/Form";
import { addRecipe } from "@/app/actions/serverActions";

export default async function CreatePost() { 

    return (
        <Form addRecipe={addRecipe}/>
    )
}