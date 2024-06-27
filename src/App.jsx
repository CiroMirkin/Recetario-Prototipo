import { createContext, useState } from "react"
import { Recipes } from "./Recipes"
import { AddRecipeForm } from "./AddRecipeForm"

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
      { id: 's1', content: "Mezclar todo" }
    ]
  }
]

const blankRecipe = Object.freeze({
  name: "",
  ingredients: [{ id: '1i', content: "" }],
  steps: [{ id: '1s', content: "" }]
})

export const RecipesContext = createContext(recipes)
export const NewRecipeContext = createContext()

function App() {
  /** Permite saber el estado del cuadro de dialogo donde se crear las nuevas recetas. */
  const [toggleDialog, setToggleDialog] = useState(false)
  /** 
   * Permite saber si se creo una nueva receta. 
   * True significa que se creo una nueva receta la cual se mostrara junto con el resto de recetas creadas.
   * False significa que se esta creando una nueva receta o que el cuadro de dialogo para crear recetas esta cerrado.
  */
  const [ addNewRecipe, setAddNewRecipe ] = useState(false)
  const dialogClassName = `right ${toggleDialog && "active"}`
  const [newRecipe, setNewRecipe] = useState({ ...blankRecipe })

  /** Crear una receta. */
  const handleClick = () => {
    const newRecipeWithId = { ...newRecipe }
    newRecipeWithId.id = crypto.randomUUID()
    recipes.push(newRecipeWithId)
    setNewRecipe({ ...blankRecipe })

    setToggleDialog(false)
    setAddNewRecipe(true)
  }

  return (
    <>
      <div className="responsive">
        <header>
          <nav>
            <h5 className="max center-align">Recetario</h5>
            <button onClick={() => {
              setToggleDialog(!toggleDialog)
              setAddNewRecipe(false)
            }}>Nueva receta</button>
          </nav>
        </header>

        <main>
          <RecipesContext.Provider value={recipes}>
            <Recipes />
          </RecipesContext.Provider>
        </main>

        <dialog className={dialogClassName} >
          <NewRecipeContext.Provider value={[newRecipe, setNewRecipe]}>
            <AddRecipeForm state={addNewRecipe} />
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
