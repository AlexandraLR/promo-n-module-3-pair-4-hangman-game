// Fichero src/services/api.js

const callToApi = () => {
  // Llamamos al API
  return fetch('palabras-aleatorias-public-api.herokuapp.com/random')
    .then((response) => response.json())
    .then((response) => { return response.body.Word });
};

export default callToApi;
