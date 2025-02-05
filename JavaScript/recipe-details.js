document.querySelector('#home-link').addEventListener('click', () => window.location.href="index.html")


document.addEventListener('DOMContentLoaded', () => {
   const urlParams = new URLSearchParams(window.location.search);
   const id = urlParams.get('id');
   console.log(urlParams)

   if (id) {
      fetch(`https://tasty.p.rapidapi.com/recipes/get-more-info?id=${id}`, {
         method: 'GET',
         headers: {
            'x-rapidapi-key': '4956a899b0msh7810b3165871414p196a87jsn13188d543f5e',
            'x-rapidapi-host': 'tasty.p.rapidapi.com'
         }
      })
   .then(response => response.json())
   .then(data => {
         const instructions = [];
         for (let i = 0; i < data.instructions.length; i++) {
            instructions.push(data.instructions[i].display_text);
         }
         document.getElementById('recipe-name').textContent = data.name;
         document.getElementById('recipe-image').src = data.thumbnail_url;
         document.getElementsByClassName('description-text')[0].textContent = data.description;
         
         instructions.forEach((instruction) => {
            const element = document.createElement('li');
            element.innerText = instruction;
            document.getElementsByClassName('instructions-text')[0].appendChild(element);
         })
         console.log(data)

         const ingredients = [];
         for (let i = 0; i < data.sections[0].components.length; i++) {
            ingredients.push(data.sections[0].components[i]);            
         }

         ingredients.forEach((ingredient) => {
            const element = document.createElement('li');
            const Iname = document.createElement('span');
            const obs = document.createElement('p');
            obs.className = "obs";
            const Imeasure = document.createElement('span');
            Iname.innerText = ingredient.ingredient.name + " ";
            Imeasure.innerText = ingredient.measurements[0].quantity + ingredient.measurements[0].unit.name;
            obs.innerText = ingredient.extra_comment;
            element.appendChild(Iname);
            element.appendChild(Imeasure);
            if(ingredient.extra_comment) {
               element.appendChild(obs);
            } else {
               obs.style.display = "none";
            }
            document.getElementsByClassName('ingredients-text')[0].append(element);
         })
      })
   .catch(error => console.error('Error:', error));
}
})

// TODO - NÃO FUNCIONANDO, ENTENDER SOBRE PÁGINAS EM REDIRECIONAMENTO E PEGAR PARAMETROS



function showContent(data) {
   console.log(data)
   document.querySelectorAll(".content").forEach((element) => {
      element.style.display = "none";
      element.classList.remove("active");
   })

   document.querySelectorAll('.tab').forEach((element) => {
      element.classList.remove("active");
   })

   document.getElementById(data).classList.add("active");
   document.getElementById(data).style.display = "block";
}