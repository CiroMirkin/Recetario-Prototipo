import { useContext, useEffect, useState } from "react"
import { NewRecipeContext } from "./App"
import { Input } from "./Input"

export function AddRecipeForm() {
    const [newRecipe, setNewRecipe] = useContext(NewRecipeContext)

    const [ingredientsInputs, setIngredientsInputs] = useState([])
    const [stepInputs, setStepsInputs] = useState([])
    
    useEffect(() => {
        console.log('render ingredient inputs')
        const newIngredientsInputs = []
        
        newRecipe.ingredients.forEach((ingredient) => {
            newIngredientsInputs.push(
                <div key={ingredient.id}>
                    <Input contentId={ingredient.id} type={'ingredient'} />
                </div>
            )
        })
        setIngredientsInputs(newIngredientsInputs)
    }, [newRecipe.ingredients.length])
    
    useEffect(() => {
        console.log('render steps inputs')
        const newStepsInputs = []

        newRecipe.steps.forEach((step) => {
            newStepsInputs.push(
                <div key={step.id}>
                    <Input contentId={step.id} type={'step'} />
                </div>
            )
        })
        setStepsInputs(newStepsInputs)
    }, [newRecipe.steps.length])

    return (
        <>
            <h5>Nueva receta</h5>
            <div className="space"></div>
            <div>
                <div className="field label border">
                    <input type="text" value={newRecipe.name} onChange={e => setNewRecipe({ ...newRecipe, name: e.target.value })} />
                    <label>Nombre</label>
                </div>

                <p className="bold">Ingredientes:</p>
                { ingredientsInputs }
                <button className="circle small" onClick={() => { 
                    const newIngredients = [...newRecipe.ingredients, {id: crypto.randomUUID(), content: ""}]
                    setNewRecipe({ ...newRecipe, ingredients: [...newIngredients]})
                }}>
                    <i>add</i>
                </button>

                <div className="space"></div>

                <p className="bold">Pasos:</p>
                { stepInputs }
                <button className="circle small" onClick={() => { 
                    const newSteps = [...newRecipe.steps, {id: crypto.randomUUID(), content: ""}]
                    setNewRecipe({ ...newRecipe, steps: [...newSteps]})
                }}>
                    <i>add</i>
                </button>
            </div>
        </>
    )
}