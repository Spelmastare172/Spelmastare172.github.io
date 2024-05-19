// script.js
const addRecipeButton = document.getElementById('addRecipe');
const modal = document.getElementById('add-recipe-modal');
const closeButton = modal.querySelector('.close');
const recipeForm = document.getElementById('recipe-form');
const instructionsSection = document.getElementById('cooking-instructions');
const mainContent = document.querySelector('main');

// Retrieve recipes from local storage or initialize an empty array
const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

// Function to save recipes to local storage
function saveRecipes() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Function to render recipes
function renderRecipes() {
    mainContent.innerHTML = ''; // Clear the main content

    recipes.forEach((recipe, index) => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <h2>${recipe.title}</h2>
            <p>Ingredients: ${recipe.ingredients}</p>
            <button class="view-details">View Details</button>
            <button class="edit-recipe">Edit</button>
            <button class="delete-recipe">Delete</button>
        `;

        recipeCard.querySelector('.view-details').addEventListener('click', () => {
            instructionsSection.querySelector('#selected-recipe-instructions').textContent = recipe.instructions;
        });

        recipeCard.querySelector('.edit-recipe').addEventListener('click', () => {
            document.getElementById('recipe-title').value = recipe.title;
            document.getElementById('recipe-ingredients').value = recipe.ingredients;
            document.getElementById('recipe-instructions').value = recipe.instructions;
            modal.style.display = 'flex';

            recipes.splice(index, 1); // Remove the old recipe
            saveRecipes(); // Save the updated recipes
        });

        recipeCard.querySelector('.delete-recipe').addEventListener('click', () => {
            recipes.splice(index, 1); // Remove the recipe from the array
            saveRecipes(); // Save the updated recipes
            renderRecipes(); // Re-render the recipes
        });

        mainContent.appendChild(recipeCard);
    });
}

addRecipeButton.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

recipeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Get form data (recipe title, ingredients, instructions)
    const title = document.getElementById('recipe-title').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const instructions = document.getElementById('recipe-instructions').value;

    // Create a new recipe object
    const newRecipe = {
        title,
        ingredients,
        instructions,
    };

    // Add the new recipe to the array
    recipes.push(newRecipe);

    // Save the recipes to local storage
    saveRecipes();

    // Re-render the recipes
    renderRecipes();

    // Close the modal
    modal.style.display = 'none';

    // Clear the form fields
    document.getElementById('recipe-title').value = '';
    document.getElementById('recipe-ingredients').value = '';
    document.getElementById('recipe-instructions').value = '';
});

// Initial rendering of recipes (if any)
renderRecipes();
