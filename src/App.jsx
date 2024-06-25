import { createContext, useState } from "react"
import { Recipes } from "./Recipes"
import { AddRecipeForm } from "./Dialog"

const recipes = [
  {
    id: 1,
    name: "Panqueques",
    ingredients: [{ id: '1i', content: "Una taza de harina" },
      { id: '2i', content: "Una taza de leche" },
      { id: '3i', content: "Un pocillo de aceite" },
      { id: '4i', content: "Dos huevos" },
      { id: '5i', content: "Una taza de azúcar" }],
    steps: [
      { id: 's1', content: "Mezclar todo"}
    ]
  }
]

const blankRecipe = Object.freeze({
  name: "",
  ingredients: [{id: '1i', content: "cafe"}],
  steps: [{ id: '1s', content: "awa" }]
})

export const RecipesContext = createContext(recipes)
export const NewRecipeContext = createContext()

function App() {
  const [toggleDialog, setToggleDialog] = useState(false)
  const dialogClassName = `right ${toggleDialog && "active"}`
  const [newRecipe, setNewRecipe] = useState({ ...blankRecipe })

  /** Crear una receta */
  const handleClick = () => {
    const newRecipeWithId = { ...newRecipe }
    newRecipeWithId.id = crypto.randomUUID()
    console.log("new ", newRecipeWithId)
    recipes.push(newRecipeWithId)
    setNewRecipe({ ...blankRecipe })
    setToggleDialog(false)
  }

  return (
    <>
      <div className="responsive">
        <header>
          <nav>
            <h5 className="max center-align">Recetario</h5>
            <button onClick={() => setToggleDialog(!toggleDialog)}>Crear</button>
          </nav>
        </header>

        <main>
          <RecipesContext.Provider value={recipes}>
            <Recipes />
          </RecipesContext.Provider>
        </main>

        <dialog className={dialogClassName} >
          <NewRecipeContext.Provider value={[newRecipe, setNewRecipe]}>
            <AddRecipeForm />
          </NewRecipeContext.Provider>
          <nav className="right-align">
            <button onClick={handleClick}>Crear</button>
          </nav>
        </dialog>
      </div>
    </>
  )
}

export default App
