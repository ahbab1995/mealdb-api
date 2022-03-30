document.getElementById('error-message').style.display = 'none'
const searchFoodBtn = () =>{
    const searchInput =  document.getElementById('search-input');
    const searchText = searchInput.value;
    searchInput.value = "";
    
    if (isNaN(searchText) == ' ') {
        const errorMsg = document.getElementById('error-message')
        errorMsg.style.display = 'block'
        return
    }
    else {const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.meals))
}
    
}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = ' '
   
    meals.forEach(meal => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div onclick="loadeMealDetail(${meal.idMeal})" class="card h-100">
                    <img  src="${meal.strMealThumb}" class="card-img-top " alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
                    </div>
            </div>
            `;
        searchResult.appendChild(div);
    });

};

function loadeMealDetail(mealId) {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = meal =>{
    const mealDetail = document.getElementById('meal-detail')
    
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
        <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
        <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
    `
    mealDetail.appendChild(div)
}