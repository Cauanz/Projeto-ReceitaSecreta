

async function fetchIngredients(query) {
   const url = `https://api.spoonacular.com/food/ingredients/autocomplete?query=${query}&number=10&apiKey=459371bbb4e14c7e916851c51e8be668`;
   const options = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      }
   }

   try {
      const response = await fetch(url, options)
      const data = await response.json();
      return data;
   } catch (error) {
      console.error(`fetchIngredients function error ${error}`);
   }
}

async function preloadIngredients() {
   const ingredients = await fetchIngredients('');
   const ingredientChoices = ingredients.map(ingredient => ({
      value: ingredient.name,
      label: ingredient.name
   }));
   choices.setChoices(ingredientChoices, 'value', 'label', true);
}

// FLUXO: USER DIGITA ALGO
//CHAMADA PARA API DE INGREDIENTES É FEITA
//API RETORNA SUGETÕES/INGREDIENTES
//INGREDIENTES SÃO ADDICIONADOS A UMA ARRAY DE CHOICES
//NEW CHOICES USA ARRAY DE CHOICES EM CHOICES


   // CAMPO DE BUSCA/SELECT DE INGREDIENTES
   const element = document.querySelector('#search-ingredients');
   const choices = new Choices(element, {
      choices: [
         { value: 'milk', label: 'milk' },
         { value: 'orange', label: 'orange' },
         { value: 'banana', label: 'banana' },
         { value: 'eggs', label: 'eggs' },
      ],
      removeItems: true,
      removeItemButton: true,
      removeItemButtonAlignLeft: false,
   });

// ATUALIZA LISTA DE OPÇÕES DE INGREDIENTES
async function updateIngredientChoices(query) {
   const ingredients = await fetchIngredients(query);
   console.log(ingredients)
   const ingredientChoices = ingredients.map(ingredient => ({
      value: ingredient.name,
      label: ingredient.name
   }));
   choices.setChoices(ingredientChoices, 'value', 'label', true);
}


async function fetchRecipes(ingredients) {
   ingredients = ingredients.map((ingredient) => ingredient.value).join(',')
   console.log(ingredients)
   console.log("fetchRecipes", ingredients);
   // const url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=${ingredients}`;
   const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=459371bbb4e14c7e916851c51e8be668`;
   const options = {
      method: 'GET',
      // headers: {
         // 'x-rapidapi-key': '4956a899b0msh7810b3165871414p196a87jsn13188d543f5e',
         // 'x-rapidapi-host': 'tasty.p.rapidapi.com'
      // }
   };

   try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);


      if(!response.ok) {
         throw new Error("HTTP Error");
      }

      return data;
   } catch (error) {
      console.log(`fetchData function error ${error}`);
   }
}

async function searchRecipe(id) {
   window.location.href = `recipe-details.html?id=${id}`

   // const url = `https://tasty.p.rapidapi.com/recipes/get-more-info?id=${id}`;
   // const options = {
   //    method: 'GET',
   //    headers: {
   //       'x-rapidapi-key': '4956a899b0msh7810b3165871414p196a87jsn13188d543f5e',
   //       'x-rapidapi-host': 'tasty.p.rapidapi.com'
   //    }
   // };

   // try {
   //    const response = await fetch(url, options);
   //    const data = await response.json();
   //    if(!response.ok) {
   //       throw new Error("HTTP Error");
   //    }
   //    console.log(data);
      // const recipeContainer = document.querySelector('.recipe-container');
      // let element = document.createElement('div');
      // data.instructions.forEach((instruction) => {
      //    let p = document.createElement('p');
      //    p.textContent = instruction.display_text;
      //    element.append(p);
      // })
      // recipeContainer.append(element)
      //* Instruções de preparo data.instructions[0-99].display_text
      //* ingredientes e medidas data.sections[0].components[0-99].ingredient | data.sections[0].components[0-99].measurements
   // } catch (error) {
   //    console.log(`fetchData function error ${error}`);
   // }
}

async function showSuggestions(value){
   
   if(value === ''){
      return [];
   }

   const recipes = await fetchRecipes(value);
   // console.log(recipes);
   
   const list = document.querySelector("#selected");
   let limit = 0;
   list.innerHTML = '';
   
   recipes.map((recipe) => {

      if(limit < 10){
         let element = document.createElement('li');
         element.classList.add("suggestionItem");
         element.dataset.recipe_id = recipe.id

         let regex = new RegExp(`(${value})`, 'gi');
         let highlitedText = recipe.name.replace(regex, '<mark>$1</mark>')
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
         console.log(item)
         list.innerHTML = '';
         searchRecipe(item.dataset.recipe_id);
      })
   })
   console.log(items)

}

async function createCards(value){

   const recipes = await fetchRecipes(value)
   console.log(recipes);

   let container = document.querySelector('.recipe-content');
   container.innerHTML = '';


   //*PARA SPOONACULAR API
   recipes.forEach((recipe) => {

      const recipeCard = document.createElement('a');
      recipeCard.href = `recipe-details.html?id=${recipe.id}`;
      recipeCard.classList.add('recipe-card');

      const recipeImage = document.createElement('img');
      recipeImage.classList.add('recipe-image');
      recipeImage.src = recipe.image;
      recipeImage.alt = recipe.title;

      const recipeTitle = document.createElement('h3');
      recipeTitle.classList.add('recipe-title');
      recipeTitle.textContent = recipe.title;

      // const recipeDescription = document.createElement('p');
      // recipeDescription.classList.add('recipe-description');
      // recipeDescription.textContent = recipe.description;

      const recipeStats = document.createElement('div');
      recipeStats.classList.add('recipe-stats');

      const recipeLikes = document.createElement('p');
      recipeLikes.classList.add('likes');
      recipeLikes.textContent = `Likes👍: ${recipe.likes}`;

      recipeStats.appendChild(recipeLikes);

      recipeCard.appendChild(recipeImage);
      recipeCard.appendChild(recipeTitle);
      recipeCard.appendChild(recipeStats);

      container.append(recipeCard);
   })

   //*PARA TASTY API
   // recipes.forEach((recipe) => {

   //    const recipeCard = document.createElement('a');
   //    recipeCard.href = `recipe-details.html?id=${recipe.id}`;
   //    recipeCard.classList.add('recipe-card');

   //    const recipeImage = document.createElement('img');
   //    recipeImage.classList.add('recipe-image');
   //    recipeImage.src = recipe.thumbnail_url;
   //    recipeImage.alt = recipe.name;

   //    const recipeTitle = document.createElement('h3');
   //    recipeTitle.classList.add('recipe-title');
   //    recipeTitle.textContent = recipe.name;

   //    const recipeDescription = document.createElement('p');
   //    recipeDescription.classList.add('recipe-description');
   //    recipeDescription.textContent = recipe.description;

   //    const recipeStats = document.createElement('div');
   //    recipeStats.classList.add('recipe-stats');

   //    const recipeLikes = document.createElement('p');
   //    recipeLikes.classList.add('likes');
   //    recipeLikes.textContent = `Likes👍: ${recipe.user_ratings.count_positive}`;

   //    const recipeDislikes = document.createElement('p');
   //    recipeDislikes.classList.add('dislikes');
   //    recipeDislikes.textContent = `Dislikes👎: ${recipe.user_ratings.count_negative}`;

   //    recipeStats.appendChild(recipeLikes);
   //    recipeStats.appendChild(recipeDislikes);

   //    // const recipeLink = document.createElement('a');
   //    // recipeLink.href = recipe.link;
   //    // recipeLink.textContent = 'Ver Receita';

   //    recipeCard.appendChild(recipeImage);
   //    recipeCard.appendChild(recipeTitle);
   //    recipeCard.appendChild(recipeDescription);
   //    recipeCard.appendChild(recipeStats);
   //    // recipeCard.appendChild(recipeLink);

   //    container.append(recipeCard);
   // })
}


let selected = '';
const input = document.querySelector('#search-ingredients');
input.addEventListener("change", (e) => {
   selected = choices.getValue();
})

//PEGAMOS O INPUT DO CAMPO DE TEXTO
input.closest(".choices").querySelector("input").addEventListener('input', (e) => {
   console.log(e.target.value);
   updateIngredientChoices(e.target.value);
})


//BUSCAR QUANDO NADA É DIGITADO
let timeout = null;
if(input.value !== ""){
   input.addEventListener('keyup', (e) => {
      clearTimeout(timeout);
      setTimeout(() => {
         showSuggestions(e.target.value);
      }, 500)
   })
}

//BUSCAR QUANDO ALGO É DIGITADO
const submitBnt = document.querySelector('#submit-button');
submitBnt.addEventListener('click', () => {
   createCards(selected);
});
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
function AnimatedTitle(){
   const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

   let iterations = 0;
   let interval;
   let target = document.querySelector("h1");

   if(target){
      
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
   }
}
document.addEventListener('DOMContentLoaded', AnimatedTitle);