import { useContext, useEffect, useMemo, useState } from "react"
import { NewRecipeContext } from "./App"
import { Input } from "./Input"

/**
 * @param {boolean} state Permite saber el estado del cuadro de dialogo y que es lo que esta haciendo el usuario.
    - True significa que se termino de crear una nueva receta.
    - False significa que se esta creando una nueva receta o que el cuadro de dialogo para crear recetas esta cerrado.
 */
export function AddRecipeForm({ state }) {
    const [newRecipe, setNewRecipe] = useContext(NewRecipeContext)
    const [ingredientsInputs, setIngredientsInputs] = useState([])
    const [stepInputs, setStepsInputs] = useState([])

    /** Genera una lista con inputs para los ingredientes dentro del arreglo en newRecipe.ingredients */
    const renderIngredientInputs = () => {
        const newIngredientsInputs = []
        newRecipe.ingredients.forEach((ingredient) => {
            newIngredientsInputs.push(
                <div key={ingredient.id}>
                    <Input contentId={ingredient.id} type={'ingredient'} />
                </div>
            )
        })
        setIngredientsInputs(newIngredientsInputs)
    }

    // Se ejecuta cuando se crea una nueva receta, el componente Dialog se cierra y newRecipe se vacía
    useMemo(() => state && renderIngredientInputs(), [state])

    // Se ejecuta cada vez que se agregar un nuevo ingrediente a la receta
    useEffect(renderIngredientInputs, [newRecipe.ingredients.length])

    const renderStepInputs = () => {
        const newStepsInputs = []

        newRecipe.steps.forEach((step) => {
            newStepsInputs.push(
                <div key={step.id}>
                    <Input contentId={step.id} type={'step'} />
                </div>
            )
        })
        setStepsInputs(newStepsInputs)
    }

    // Se ejecuta cuando se crea una nueva receta, el componente Dialog se cierra y newRecipe se vacía
    useMemo(() => state && renderStepInputs(), [state])

    // Se ejecuta cada vez que se agregar un nuevo paso a la receta
    useEffect(renderStepInputs, [newRecipe.steps.length, state])

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
                {ingredientsInputs}
                <button className="circle small" onClick={() => {
                    const newIngredients = [...newRecipe.ingredients, { id: crypto.randomUUID(), content: "" }]
                    setNewRecipe({ ...newRecipe, ingredients: [...newIngredients] })
                }}>
                    <i>add</i>
                </button>

                <div className="space"></div>

                <p className="bold">Pasos:</p>
                {stepInputs}
                <button className="circle small" onClick={() => {
                    const newSteps = [...newRecipe.steps, { id: crypto.randomUUID(), content: "" }]
                    setNewRecipe({ ...newRecipe, steps: [...newSteps] })
                }}>
                    <i>add</i>
                </button>
            </div>
        </>
    )
}