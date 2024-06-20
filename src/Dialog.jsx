import { useContext } from "react"
import { NewRecipeContext } from "./App"

export function AddRecipeForm() {
    const [newRecipe, setNewRecipe] = useContext(NewRecipeContext)

    const handleChangeInIngredient = (ingredient, index) => {
        const oldIngredients = [...newRecipe.ingredients]
        oldIngredients[index] = ingredient
        setNewRecipe({ ...newRecipe, ingredients: [...oldIngredients] })
    }

    const getIngredientValue = (index) => newRecipe.ingredients[index]

    const handleChangeInStep = (step, index) => {
        const oldSteps = [...newRecipe.steps]
        oldSteps[index] = step
        setNewRecipe({ ...newRecipe, steps: [...oldSteps] })
    }

    const getStepValue = (index) => newRecipe.steps[index]

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
                <div className="field label border small" style={{ marginBlockEnd: ".5rem" }}>
                    <input type="text" value={getIngredientValue(0)} onChange={e => handleChangeInIngredient(e.target.value, 0)} />
                    <label>Ingrediente</label>
                </div>
                <button className="circle small" onClick={() => { }}>
                    <i>add</i>
                </button>

                <div className="space"></div>

                <p className="bold">Pasos:</p>
                <div className="field label border small" style={{ marginBlockEnd: ".5rem" }}>
                    <input type="text" value={getStepValue(0)} onChange={e => handleChangeInStep(e.target.value, 0)} />
                    <label>Paso</label>
                </div>
                <button className="circle small">
                    <i>add</i>
                </button>
            </div>
        </>
    )
}