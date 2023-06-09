//variables

const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID ='d67a14d9';
const APP_KEY ='dafe0155307ee6cb2c84c213d0f9c789';


searchForm.addEventListener('submit', (e) => {
    //Prevents default behavior
    e.preventDefault();
    //searches for the query value that is stored there
    searchQuery =e.target.querySelector('input').value;
    fetchAPI();
    
})

async function fetchAPI (){
    const baseURL =`https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    const response = await fetch(baseURL);
    const data = await response.json();
    //fetching the hits only
    generateHTML(data.hits)
    console.log(data);
}

function generateHTML(results){
    //Remove initial class when loading
    container.classList.remove('initial');
    let generatedHTML = '';
    results.map(result => {
        generatedHTML += 
        `
        <div class="item">
            <img src="${result.recipe.image}" alt="">
                <div class="flex-container">
                <h1 class="${result.recipe.label}">This is a recipe</h1>
                <a class="view-button" href="${result.recipe.url}" target="">View Recipe</a>
                </div>
            <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
            <p class="item-data">Diet Label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels.length : 'No Data Found' }</p>
            <p class="item-data">Health Label: ${result.recipe.healthLabels}</p>
        </div>
        `
    })
    searchResultDiv.innerHTML = generatedHTML;
}