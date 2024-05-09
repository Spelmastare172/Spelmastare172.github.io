// script.js
const addRecipeButton = document.getElementById('addRecipe');
const modal = document.getElementById('add-recipe-modal');
const closeButton = modal.querySelector('.close');
const recipeForm = document.getElementById('recipe-form');
const instructionsSection = document.getElementById('cooking-instructions');

// Retrieve recipes from local storage if available, otherwise initialize as empty array
let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

// Function to save recipes to local storage
const saveRecipesToLocalStorage = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
};

// Function to render recipe cards with edit and remove buttons
const renderRecipes = () => {
    document.querySelector('main').innerHTML = ''; // Clear existing recipe cards
    recipes.forEach((recipe, index) => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <h2>${recipe.title}</h2>
            <p>Ingredients: ${recipe.ingredients}</p>
            <button class="view-details">View Details</button>
            <button class="edit-recipe">Edit</button>
            <button class="remove-recipe" data-index="${index}">Remove</button>
        `;
        recipeCard.querySelector('.view-details').addEventListener('click', () => {
            instructionsSection.querySelector('#selected-recipe-instructions').textContent = recipe.instructions;
        });
        recipeCard.querySelector('.edit-recipe').addEventListener('click', () => {
            editRecipe(index);
        });
        recipeCard.querySelector('.remove-recipe').addEventListener('click', (e) => {
            removeRecipe(e.target.dataset.index);
        });
        document.querySelector('main').appendChild(recipeCard);
    });
};

// Function to edit a recipe
const editRecipe = (index) => {
    const recipeToEdit = recipes[index];
    document.getElementById('recipe-title').value = recipeToEdit.title;
    document.getElementById('recipe-ingredients').value = recipeToEdit.ingredients;
    document.getElementById('recipe-instructions').value = recipeToEdit.instructions;
    // Show modal
    modal.style.display = 'block';

    // Remove the original recipe
    recipes.splice(index, 1);

    // Save recipes to local storage
    saveRecipesToLocalStorage();

    // Re-render recipe cards
    renderRecipes();
};

// Function to remove a recipe
const removeRecipe = (index) => {
    // Remove the recipe at the specified index
    recipes.splice(index, 1);

    // Save recipes to local storage
    saveRecipesToLocalStorage();

    // Re-render recipe cards
    renderRecipes();
};

// Add event listeners
addRecipeButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
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

    // Save recipes to local storage
    saveRecipesToLocalStorage();

    // Render recipe cards
    renderRecipes();

    // Close the modal
    modal.style.display = 'none';

    // Clear the form fields
    document.getElementById('recipe-title').value = '';
    document.getElementById('recipe-ingredients').value = '';
    document.getElementById('recipe-instructions').value = '';
});

// Initial rendering of recipe cards
renderRecipes();
