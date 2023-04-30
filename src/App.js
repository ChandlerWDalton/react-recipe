import { useState } from 'react';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [],
    steps: [],
    index: null
  })
  const [openRecipeEditor, setOpenRecipeEditor] = useState(false);

  function newRecipe(){
    setOpenRecipeEditor(true);
    setRecipe({...recipe, index: recipes.length});
  }

  function saveRecipe(){
    const tempRecipes = [...recipes];
    tempRecipes[recipe.index] = recipe;
    setRecipes(tempRecipes);
    setOpenRecipeEditor(false);
    setRecipe({
      name: '',
      ingredients: [],
      steps: [],
      index: null
    })
  }

  const editRecipe = (index) => () =>{
      setRecipe(recipes[index]);
      setOpenRecipeEditor(true);
  }

  const deleteRecipe = (index) => () => {
    const tempRecipes = [...recipes];
    tempRecipes.splice(index, 1);
    setRecipes(tempRecipes);
  }

  const favoriteRecipe = (index) => () => {
    const tempFavorites = [...favorites];
    tempFavorites.push(recipes[index]);
    setFavorites(tempFavorites);
  }

  return (
    <div className="App">
      <div className='section'>          
        <h2>Recipe Editor</h2>
        {openRecipeEditor && <div>

          <h3>Name</h3>
          <input type="text" value={recipe.name} onChange={e => setRecipe({...recipe, name: e.target.value})} />
          <h3>Ingredients</h3>
          
          <ul>
            {recipe.ingredients.map((ingredient, index) => 
              <li>
                <input type="text" value={ingredient} onChange={e => setRecipe({...recipe, ingredients: recipe.ingredients.map((ingredient, i) => i === index ? e.target.value : ingredient)})} />
                <button onClick={() => setRecipe({...recipe, ingredients: recipe.ingredients.filter((ingredient, i) => i !== index)})}>Delete</button>
              </li>
            )}
          </ul>
          <button onClick={() => setRecipe({...recipe, ingredients: [...recipe.ingredients, '']})}>+ Ingredient</button>
          <h3>Steps</h3>
          <ol>
            {recipe.steps.map((step, index) => 
              <li>
                <input type="text" value={step} onChange={e => setRecipe({...recipe, steps: recipe.steps.map((step, i) => i === index ? e.target.value : step)})} />
                <button onClick={() => setRecipe({...recipe, steps: recipe.steps.filter((step, i) => i !== index)})}>Delete</button>
              </li>
            )}
          </ol>
          <button onClick={() => setRecipe({...recipe, steps: [...recipe.steps, '']})}>+ Step</button>
          <div>
            <button onClick={() => setOpenRecipeEditor(false)}>Cancel</button>
            <button disabled={!recipe.name || recipe.ingredients.length < 1 || recipe.steps.length < 1} onClick={saveRecipe}>Save</button>
          </div>
                 
        
        </div>}
      </div>
      <div className='section'>
        <h2>All Recipes</h2>
        {recipes.map((item, index) => 
        <div>
        
          <h2>{item.name}</h2>
          <button onClick={editRecipe(index)} >Edit</button>
          <button onClick={deleteRecipe(index)}>Delete</button>
          <button onClick={favoriteRecipe(index)}>Favorite</button>
          </div>
        )}
        <button onClick={newRecipe}>+ Recipe</button>
      </div>
      <div className='section'>
        <h2>Favorite Recipes</h2>
        {favorites.map((item, index) =>
          <div>
            <h2>{item.name}</h2>
            <button onClick={editRecipe(index)} >Edit</button>
            <button onClick={deleteRecipe(index)}>Delete</button>
          </div>
        )}
        </div>
    </div>
  );
}

export default App;
