import React, { useState, useEffect } from "react";
import './addRecipe.css'

function AddRecipe() {
    return (
      <div className="AddRecipe">
        <head>
      <style>
@import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
</style>
      </head>
        <header className="Add-Recipe-header"> Add New Recipe </header>
        <div>
          <input type="url" className="Add-Recipe-input" placeholder="Paste recipe link"></input>
        </div>
        <div>
        <button className="submit">Add To Cookbook</button>
        </div>
      </div>
    );
  }
  
  export default AddRecipe;
  