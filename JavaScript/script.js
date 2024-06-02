
// AUTOCOMPLETE / CAMPO DE BUSCA / TAGS
// const API_KEY = 'a8eb865b1f7749d5aebede3b123f5bff';
// const CLIENT_SECRET = 'b8046489166b4b979bd0e584b8ca4de8';

// async function fetchData(valueReq){
//    const url = `https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=${valueReq}`;
//    const options = {
//       method: 'GET',
//       headers: {
//          'x-rapidapi-key': '4956a899b0msh7810b3165871414p196a87jsn13188d543f5e',
//          'x-rapidapi-host': 'tasty.p.rapidapi.com'
//       }
//    };
//    try {
//       const response = await fetch(url, options);
//       const data = await response.json();
//       // console.log(data.result);
//       return data.results;
//    } catch (error) {
//       console.log(`fetchData function error ${error}`);
//    }
// }

async function fetchRecipes(value) {
   const url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=${value}`;
   const options = {
      method: 'GET',
      headers: {
         'x-rapidapi-key': '4956a899b0msh7810b3165871414p196a87jsn13188d543f5e',
         'x-rapidapi-host': 'tasty.p.rapidapi.com'
      }
   };

   try {
      const response = await fetch(url, options);
      const data = await response.json();
      // console.log(data);
      if(!response.ok) {
         throw new Error("HTTP Error");
      }
      return data.results;
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

//TODO- adicionar botão de pesquisa, e mudar para se selecionar uma sugestão ir para página da receita selecionada, senão se pesquisar mostrar cards com receitas que contenham palavra-chave digitada

//todo - Ideia para próxima página para exibir receita, passar os parametros para ele pegar a receita lá, e os parametros de instrucoes/porcoes também lá, talvez passar o id da receita somente

async function showSuggestions(value){
   
   if(value === ''){
      return [];
   }

   const recipes = await fetchRecipes(value);
   console.log(recipes);
   
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





let timeout = null;
const input = document.querySelector('#ingredient-input');
if(input) {
   input.addEventListener('keyup', (e) => {
      clearTimeout(timeout);
      setTimeout(() => {
         showSuggestions(e.target.value);
      }, 500)
      // console.log(e.target.value);
   })
}
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
AnimatedTitle();