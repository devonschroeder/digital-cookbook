import './Home.css';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <head>
      <style>
@import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
</style>
      </head>
      <header className="Home-header"> Michael and Devon's Digital Cookbook
      </header>
      <Link to ='/addRecipe'>
      <button className="add-recipe-button">+</button>
      </Link>
       
    </div>
  );
}

export default Home;
