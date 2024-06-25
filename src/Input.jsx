import { useContext } from "react"
import { NewRecipeContext } from "./App"

export function Input({ contentId, type }) {
    const [newRecipe, setNewRecipe] = useContext(NewRecipeContext)

    const getInputValue = () => {
        if(type == 'ingredient') {
            const ingredient = newRecipe.ingredients.find(({ id }) => id == contentId)
            console.log(ingredient.content)
            return ingredient.content
        }
        else {
            const step = newRecipe.steps.find(({ id }) => id == contentId)
            console.log(step)
            console.log(step.content)
            return step.content
        }
    }
    const handleChangeInInput = (newContent) => {
        if(type == 'ingredient') {
            const oldIngredients = [...newRecipe.ingredients].map(ingredient => {
                if(ingredient.id == contentId) ingredient.content = newContent
                return ingredient
            })
            setNewRecipe({ ...newRecipe, ingredients: [...oldIngredients] })
        } 
        else {
            const oldSteps = [...newRecipe.steps].map(step => {
                if(step.id == contentId) step.content = newContent
                return step
            })
            setNewRecipe({ ...newRecipe, steps: [...oldSteps] })
        }
    }

    return (
        <div className="field label border small" style={{ marginBlockEnd: ".5rem" }}>
            <input type="text" value={getInputValue()} onChange={e => handleChangeInInput(e.target.value)} />
            <label>{ type == 'ingredient' ? 'Ingrediente' : 'Paso' }</label>
        </div>
    )
}