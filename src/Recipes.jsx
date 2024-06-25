import { useContext } from "react"
import { RecipesContext } from "./App"

export function Recipes() {
    const recipesData = useContext(RecipesContext)
    const recipes = []
    recipesData.forEach(recipe => {
        const ingredients = []
        recipe.ingredients.forEach(ingredient => {
            ingredients.push(<li key={ingredient.id}>{ingredient.content}</li>)
        })

        const steps = []
        recipe.steps.forEach(step => {
            steps.push(<li key={step.id}>{step.content}</li>)
        })

        recipes.push(
            <article className="fill" key={recipe.id}>
                <div className="padding">
                    <h5>{recipe.name}</h5>
                    <p className="bold">Ingredientes</p>
                    <ul>{ingredients}</ul>
                    <p className="bold">Pasos</p>
                    <ol>{steps}</ol>
                </div>
            </article>
        )
    })

    return (
        <>
            <div className="recipes">
                {recipes}
            </div>
        </>
    )
}