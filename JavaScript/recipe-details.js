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
         document.getElementById('recipe-description').textContent = data.description;
         
         instructions.forEach((instruction) => {
            const element = document.createElement('li');
            element.innerText = instruction;
            document.getElementById('recipe-instructions').append(element);
         })
         console.log(data)
      })
   .catch(error => console.error('Error:', error));
}
})

// TODO - NÃO FUNCIONANDO, ENTENDER SOBRE PÁGINAS EM REDIRECIONAMENTO E PEGAR PARAMETROS