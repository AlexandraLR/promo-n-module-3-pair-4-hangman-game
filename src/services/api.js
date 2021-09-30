// Fichero src/services/api.js

const callToApi = () => {
  // Llamamos al API
  return fetch('http://palabras-aleatorias-public-api.herokuapp.com/random')
    .then((response) => response.json())
    .then((word) => { return word.body.Word });

};

export default callToApi;
