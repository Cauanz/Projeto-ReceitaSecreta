
// AUTOCOMPLETE / CAMPO DE BUSCA / TAGS
// const API_KEY = 'a8eb865b1f7749d5aebede3b123f5bff';
// const CLIENT_SECRET = 'b8046489166b4b979bd0e584b8ca4de8';

async function fetchData(valueReq){
   const url = `https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=${valueReq}`;
   const options = {
      method: 'GET',
      headers: {
         'x-rapidapi-key': '4956a899b0msh7810b3165871414p196a87jsn13188d543f5e',
         'x-rapidapi-host': 'tasty.p.rapidapi.com'
      }
   };
   try {
      const response = await fetch(url, options); //* antiga API
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

   const ingredients = await fetchData(value);
   console.log(ingredients);
   
   const list = document.querySelector("#selected-ingredients");
   let limit = 0;
   list.innerHTML = '';
   
   ingredients.map((ingredient) => {

      if(limit < 10 && ingredient.type === 'ingredient'){
         let element = document.createElement('li');
         element.classList.add("suggestionItem");

         let regex = new RegExp(`(${value})`, 'gi');
         let highlitedText = ingredient.display.replace(regex, '<mark>$1</mark>')
         element.innerHTML = highlitedText;
         list.append(element);
         limit++
      }

   })

   const items = document.querySelectorAll('.suggestionItem');
   const input = document.querySelector('#ingredient-input');

   items.forEach((item) => {
      item.addEventListener('click', () => {
         input.value = item.textContent;
         list.innerHTML = '';
         // console.log(item.value)
      })
   })
   console.log(items)

}


let timeout = 0
const input = document.querySelector('#ingredient-input');
input.addEventListener('keyup', (e) => {
   clearTimeout(timeout);
   setTimeout(() => {
      showSuggestions(e.target.value);
   }, 300)
   // console.log(e.target.value);
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