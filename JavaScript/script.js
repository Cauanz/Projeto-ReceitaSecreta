
// AUTOCOMPLETE / CAMPO DE BUSCA / TAGS
const API_KEY = '459371bbb4e14c7e916851c51e8be668';

async function fetchData(valueReq, APIKEY){
   try {
      const response = await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${valueReq}&apiKey=${APIKEY}`);
      const data = await response.json();
      // console.log(data.result);
      return data.results;
   } catch (error) {
      console.log(`fetchData function error ${error}`);
   }
}

async function fetchRecipes(value, APIKEY) {
   try {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${value}&apiKey=${APIKEY}`);
      const data = await response.json();
      // console.log(data.result);
      return data.results;
   } catch (error) {
      console.log(`fetchData function error ${error}`);
   }
}



async function showSuggestions(value){
   if(value === ''){
      return [];
   }

   const ingredients = await fetchData(value, API_KEY);
   console.log(ingredients);


   const list = document.querySelector("#selected-ingredients");
   let limit = 0;
   list.innerHTML = '';
   ingredients.map((ingredient) => {
      if(limit < 10){
         let element = document.createElement('li');
         element.classList.add("suggestionItem");
         element.textContent = ingredient.name;
         list.append(element);
         limit++
      }
   })

}

// TODO - REFINAR CÓDIGO DA FUNÇÃO ABAIXO QUE ATUALIZA INPUT COM SUGESTÃO CLICADA E ACIMA QUE CRIA SUGESTÕES (APRENDER A DESTACAR A SUGESTÃO CONFORME DIGITA)

function updateSearch(){
   const items = document.querySelectorAll('.suggestionItem');
   const input = document.querySelector('#ingredient-input');

   if(items.length === 0){
      return [];
   }

   items.forEach((item) => {
      item.addEventListener('click', () => {
         input.value = item.textContent;
         // console.log(item.value)
      })
   })
   console.log(items)
}

const input = document.querySelector('#ingredient-input');
input.addEventListener('keyup', (e) => {
   showSuggestions(e.target.value);
   // console.log(e.target.value);
   setTimeout(() => {
      updateSearch()
   }, 1000)
})
// AUTOCOMPLETE / CAMPO DE BUSCA / TAGS

























// Lógica para geração de cards para cada receita:
/*
   const recipeContainer = document.getElementById('recipe-container'); // Substitua 'recipe-container' pelo ID do contêiner onde deseja exibir os cards.

   recipes.forEach(recipe => {
   const recipeCard = document.createElement('div');
   recipeCard.classList.add('recipe-card');

   const recipeImage = document.createElement('img');
   recipeImage.src = recipe.imageUrl;
   recipeImage.alt = recipe.name;

   const recipeTitle = document.createElement('h3');
   recipeTitle.textContent = recipe.name;

   const recipeDescription = document.createElement('p');
   recipeDescription.textContent = recipe.description;

   const recipeLink = document.createElement('a');
   recipeLink.href = recipe.link;
   recipeLink.textContent = 'Ver Receita';

   recipeCard.appendChild(recipeImage);
   recipeCard.appendChild(recipeTitle);
   recipeCard.appendChild(recipeDescription);
   recipeCard.appendChild(recipeLink);

   recipeContainer.appendChild(recipeCard); // Adicione o card ao contêiner.
   });
*/



//TITULO ANIMADO

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let iterations = 0;
let interval;
let target = document.querySelector("h1");

setInterval(() => {
   clearInterval(interval);

   interval = setInterval(() => {
      target.innerText = target.innerText.split("")
      .map((letter, index) => {
         if(index < iterations){
            return target.dataset.value[index];
         }
         return letters[Math.floor(Math.random() * 26)]
      })
      .join("");

      if(iterations >= target.dataset.value.length){
         clearInterval(interval);
      }

      iterations += 1 / 3;
   }, 30)
}, 1000);