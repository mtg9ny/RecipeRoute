"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [recipe, setRecipe] = useState(null);

  async function getRandomRecipe() {
    try {
      const apiKey = "6a16595f4c9a49c9aea37e1a0e93945c";

      let resp = await axios.get(
        `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1`
      );
      console.log(21, resp.data.recipes[0]);
      setRecipe(resp.data.recipes[0]);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getRandomRecipe();
  }, []);

  return (
    <div className="row">
      <button onClick={getRandomRecipe}>Generate Random Recipe</button>

      {recipe && (
        <>
          <div>
            Name:
            <a target="_blank" href={recipe.sourceUrl}>
              {recipe.title}
            </a>
          </div>
          <img src={recipe.image} alt={recipe.title} />

          <div className="ingredients">
            <div>Ingredients needed:</div>
            {recipe.extendedIngredients.map((ingredient, index) => (
              <span key={index}>
                {ingredient.name}
                {index !== recipe.extendedIngredients.length - 1 && ", "}
              </span>
            ))}
          </div>

          <div className="instructions">
            {recipe.analyzedInstructions.map((instruction, i) => (
              <ol key={i}>
                {instruction.steps.map((step, j) => (
                  <li key={j}>{step.step}</li>
                ))}
              </ol>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
