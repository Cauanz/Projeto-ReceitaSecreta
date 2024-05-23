
// AUTOCOMPLETE / CAMPO DE BUSCA / TAGS



function autocompleteMatch(input) {
   if(input === ''){
      return [];
   }

   let regex = new RegExp(input)
   return searchTerms.filter((term) => {
      if(term.match(reg)){
         return term;
      }
   })
}

function showResults(val) {
   res = document.querySelector('#selected-ingredients');

   if (val == '') {
      return;
   }
   
   fetch(`https://api.spoonacular.com/food/products/search?query=${val}&apiKey=${API_KEY}&number=20`)
      .then(
         function (response) {
            return response.json();
         }).then((data) => {
            console.log(data)
         }).catch((err) => {
            console.warn('Something went wrong.', err);
            return false;
         });
}


const input = document.querySelector('#ingredient-input');
input.addEventListener('change', (e) => showResults(e.target.value))
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