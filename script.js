
const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const nameHeading = document.querySelector('.name-heading');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// fetching the recipe
const fetchRecipe = async (query) => {
    
    nameHeading.innerHTML = "<h2>Fetching Recipes...</h2>";

    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
console.log(response);
    nameHeading.innerHTML = "";

    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span> ${meal.strArea}</span>Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `
        const button = document.createElement('button');
        button.innerHTML = "View Recipe";
        recipeDiv.appendChild(button);

        //Adding EventListener to view recipe button
        button.addEventListener("click", () => {
            openRecipePopup(meal);
        });
        recipeContainer.appendChild(recipeDiv);
    });

}
//function to fetch ingredients and Measurements

const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`;

        } else {
            break;
        }
    }
    return ingredientsList;
};

// open Popup box

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingrediants :</h3>
    <ul class="recipeIngredient">${fetchIngredients(meal)}</ul>
    <div>
    <h3 class="recipeInstructions">Instructions :</h3>
    <p>${meal.strInstructions}</p>
    </div>
    `

    recipeDetailsContent.parentElement.style.display = "block";
};

// Adding EventListener to close popup box 

recipeCloseBtn.addEventListener("click",()=>{
recipeDetailsContent.parentElement.style.display="none";

});


searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        nameHeading.innerHTML =`<h2>Please enter a recipe name...</h2>`
    return;
};
    fetchRecipe(searchInput);
});