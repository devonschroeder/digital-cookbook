import React, { useState, useEffect } from "react";
import axios from 'axios';

import './addRecipe.css'



function AddRecipe() {
  const [recipeURL, setRecipeURL] = useState('');
  const [name, setName] = useState('');
  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [notes, setNotes]  = useState('');


  const getInfo = () => {
    const getName = async() => {
      axios.post("http://localhost:8000/name", {url: recipeURL})
      .then(res => setName(res.data))
      .catch((err) => console.log(err));
  }
  getName();

  const ingredientList = async() => {
    axios.post("http://localhost:8000/ingredients", {url: recipeURL})
    .then(res => setIngredients(res.data))
    .catch((err) => console.log(err));
}
ingredientList();

const stepsList = async() => {
  axios.post("http://localhost:8000/directions", {url:recipeURL})
  .then(res => setSteps(res.data))
  .catch((err) => console.log(err));
}
stepsList();

  console.log(name);
  console.log(steps);
  console.log(ingredients);

  }

  function updateIngredients(newIngredient, index) {
    const nextIngredients = ingredients.map((ingredient, i) => {
      if (i === index) {
        return newIngredient;
      } else {
        // The rest haven't changed
        return ingredient;
      }
    });
    setIngredients(nextIngredients);
  }
  function updateSteps(newStep, index) {
    const nextSteps = steps.map((step, i) => {
      if (i === index) {
        return newStep;
      } else {
        // The rest haven't changed
        return step;
      }
    });
    setSteps(nextSteps);
  }

  function deleteIngredient(index) {
      setIngredients(oldValues => {
        return oldValues.filter((_, i) => i !== index)
      })
  }

  function deleteStep(index) {
    console.log(index);
    setSteps(oldValues => {
      return oldValues.filter((_, i) => i !== index)
    })
}

    return (
      <div className="AddRecipe">
        <header className="Add-Recipe-header"> Add New Recipe </header>
        <div>
          <input type="url" className="Add-Recipe-input" placeholder="Paste recipe link" onChange={e=>setRecipeURL(e.target.value)}></input>
        </div>
        <div>
        <button className="submit" onClick={getInfo}>Get Recipe Info</button>
        </div>
        <div className="EditRecipe">
          {(name.length>0 || steps.length>0 || ingredients.length>0) &&
            <>
          <h2 className="header2">Recipe Name</h2>
          <input type="text" className="editName" value={name} onChange={e => setName(e.target.value)}></input>
          <h2 className="header2">Ingredients</h2>
          <ul className="editIngredientsList">{ingredients.map((ingredient, i) => <li key={i}><input type="text" className="editableIngredient" value={ingredient} onChange={e=>{updateIngredients(e.target.value, i)}}></input><button className="deleteIngredient" onClick={()=> {deleteIngredient(i)}} >X</button></li>)}</ul>
          <h2 className="header2">Directions</h2>
          <ul className="editStepsList">{steps.map((step, i)=> <li key={i}><input type="text" className="editableStep" value={step} onChange={e=>{updateSteps(e.target.value)}}></input><button className="deleteIngredient" onClick={()=> {deleteStep(i)}}>X</button></li>)}</ul>
          </>
          }
        </div>
      </div>
     
    );
  }
  
  export default AddRecipe;
  