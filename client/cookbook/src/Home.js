import './Home.css';
import { Link } from "react-router-dom";

function Home() {
  return (
    
    <div className="Home">
      <header className="Home-header"> Michael and Devon's Digital Cookbook
      </header>
      <Link to ='/addRecipe'>
      <button className="add-recipe-button">+</button>
      </Link>
       
    </div>
  );
}

export default Home;
