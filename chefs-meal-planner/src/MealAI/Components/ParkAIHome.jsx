import React, { useState } from 'react';
import '../../Style/parkAI.css';
import { fetchChatGPTResponse } from '../Functionality/FetchChatGPT';
import defaultImage from '../Assets/default_img.jpg';
/**
 * Component for welcoming and explaining the park search
 * functionality to a user.
 * 
 * @component
 * @module ParkAIHome
 * @memberof MealAI
 * @returns {JSX.Element} Park search welcome header
 */
const ParkAIHome = () => {
    const [recipeName, setRecipeName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [recipeImage, setRecipeImage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [protein, setProtein] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [otherOptions, setOtherOptions] = useState('');

    //useEffect(() => {
    //    fetchRecipe();
    //}, []);

    const fetchRecipe = async () => {
        setIsLoading(true);
        try {
            const response = await fetchChatGPTResponse(protein, otherOptions, cuisine);
            setRecipeName(response.name);
            setDescription(response.description);
            setIngredients(response.ingredients);
            setRecipeImage(response.image);
        } catch (error) {
            console.error('Error fetching recipe:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            // Check if the image URL ends with .jpg; if not, use a default image
            const imageUrl = recipeImage.endsWith('.jpg') ? recipeImage : defaultImage;
            console.log("Image URL: ", imageUrl)
    
            const response = await fetch('http://localhost:5000/addRecipe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: recipeName,
                    description,
                    ingredients,
                    image: imageUrl,
                }),
            });
    
            const data = await response.json();
            if (response.ok) {
                alert("Recipe saved successfully!");
            } else {
                throw new Error(data.error || 'Failed to save recipe.');
            }
        } catch (error) {
            console.error('Error saving recipe:', error);
            alert("Failed to save recipe.");
        }
    };
    

    return (
        <div className='meal-ai'>
            <center>
                <h1 id="ai-title">Recipe Recommendation</h1>
                <button onClick={fetchRecipe} className="save-button">Fetch New Recipes</button> <br></br>
                {/* Drop-down menus */}
                <div className="filters">
                    <div>
                        <label htmlFor="protein">Select Protein:</label>
                        <select 
                            id="protein" 
                            value={protein} 
                            onChange={(e) => setProtein(e.target.value)}
                        >
                            <option value="Anything">--Select Protein--</option>
                            {["Chicken", "Fish", "Beef"]
                                .sort()
                                .map(cuisineOption => <option key={cuisineOption} value={cuisineOption}>{cuisineOption}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="cuisine">Select Cuisine:</label>
                        <select 
                            id="cuisine" 
                            value={cuisine} 
                            onChange={(e) => setCuisine(e.target.value)}
                        >
                            <option value="Any">--Select Cuisine--</option>
                            {["Chinese", "Indian", "Italian", "Mexican", "Japanese", "Greek"]
                                .sort()
                                .map(cuisineOption => <option key={cuisineOption} value={cuisineOption}>{cuisineOption}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="otherOptions">Select Other Options:</label>
                        <select 
                            id="otherOptions" 
                            value={otherOptions} 
                            onChange={(e) => setOtherOptions(e.target.value)}
                        >
                            <option value="Any">--Select Options--</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Gluten-Free">Gluten-Free</option>
                            <option value="Healthy">Healthy</option>
                            <option value="Very Little Cost">Cheap</option>
                        </select>
                    </div>
                </div>
                {isLoading ? (
                    <p>Loading recipe...</p>
                ) : (
                    <div className="recipe-container">
                        {recipeImage && <img src={recipeImage} alt={recipeName} className="recipe-image" />}
                        {recipeName && <h2>{recipeName}</h2>}
                        {description && <p>{description}</p>}
                        {ingredients && (
                            <div>
                                <h3>Ingredients:</h3>
                                <p>{ingredients}</p>
                            </div>
                        )}
                        <button onClick={handleSave} className="save-button">Save</button>
                    </div>
                )}
            </center>
        </div>
    );
};

export default ParkAIHome;