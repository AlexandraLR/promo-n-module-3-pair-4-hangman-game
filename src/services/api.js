// Fichero src/services/api.js
const callToApi = () => {
  // Llamamos al API
  return fetch('https://palabras-aleatorias-public-api.herokuapp.com/random')
    .then((response) => response.json())
   
};

export default callToApi;
