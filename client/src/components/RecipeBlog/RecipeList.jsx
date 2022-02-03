import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteButton from '../Buttons/DeleteButton';
import { Button } from '@mui/material';

const RecipeList = ({ user }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/recipe')
      .then(res => setRecipes(res.data));
  }, []);

  const removeFromDom = recipeId => {
    setRecipes(recipes.filter(recipe => recipe._id !== recipeId))
  };

  const onFavoriteHandler = (recipeId) => {
    let favorites = [...user.favoriteRecipe, recipeId]
    axios.put(`http://localhost:8000/api/user/update/${user._id}`, {
      favoriteRecipe: favorites
    })
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      });
  };
  console.log(user);

  return (
    <div>
      {recipes.map((recipe, index) => {
        return (
          <p key={index}>
            <img src={recipe.image}></img>
            {recipe.name}
            |
            <Link to={'/recipe/' + recipe._id}>
              Recipe Details
            </Link>
            |
            <Link to={'/recipe/edit/' + recipe._id}>
              Edit Recipe
            </Link>
            |
            <DeleteButton
              recipeId={recipe._id}
              successCallback={() => removeFromDom(recipe._id)}
            />
            <Button
              onClick={(e) => onFavoriteHandler(recipe._id)}
            >
              Favorite
            </Button>
          </p>
        )
      })}
    </div >
  )
}

export default RecipeList;