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
         document.getElementById('recipe-name').textContent = data.name;
         document.getElementById('recipe-image').src = data.image.url;
         document.getElementById('recipe-description').textContent = data.summary;
         document.getElementById('recipe-instructions').innerHTML = data.instructions.join('<br>');
      })
   .catch(error => console.error('Error:', error));
}
})

// TODO - NÃO FUNCIONANDO, ENTENDER SOBRE PÁGINAS EM REDIRECIONAMENTO E PEGAR PARAMETROS