import '../styles/App.scss';
import ahorcado from '../images/favicon-ahorcado.jpg';
import { useEffect, useState } from 'react';
import callToApi from '../services/api';

function App() {
  //estados
  let [numberOfErrors, setNumberOfErrors] = useState(0);
  const [introducedLetter, setintroducedLetter] = useState('');
  const [word, setWord] = useState('Katakroker');
  const [feedback, setFeedback] = useState('');
  const [userLetters, setUserLetters] = useState([]);

  //hace que la petición se ejecute solo una vez al cargar la página
  useEffect(() => {
    callToApi()
      .then((response) => {
        console.log(response);
        setWord(response);
      });
  }, [])


  const handleErrors = (ev) => {
    numberOfErrors++;
    setNumberOfErrors(numberOfErrors);
  };

  const handleIntroducedLetter = (ev) => {
    const letter = ev.currentTarget.value;
    const patt = /^[a-zA-Záéíóúñü]{1}$/;
    if (patt.test(letter)) {
      setintroducedLetter(letter);
      setFeedback('');
      if (letter !== '' && letter !== ' ') {
        if (!userLetters.includes(letter)) {
          userLetters.push(letter);
          setUserLetters(userLetters);
        }
      }
    } else {
      setFeedback('ERROR: debes escribir una letra del abecedario castellano');
      setintroducedLetter(letter);
    }
    console.log(letter);
  };



  // const getSolution = () => {
  //   if word.includes
  // };

  const renderSolutionLetters = () => {
    // getSolution();
    const wordLetters = word.split('');
    return wordLetters.map((x) => <li class="letter">{ }</li>); //pendiente añadir letra
    console.log(wordLetters);
  };

  const renderErrorLetters = () => {
    const found = userLetters.filter((l) => !word.includes(l));
    console.log(found);
    return found.map((l) => <li className="letter">{l}</li>);
  };

  //return
  return (
    <div className="page">
      <header>
        <h1 className="header__title">Juego del ahorcado</h1>
      </header>
      <main className="main">
        <section>
          <div className="solution">
            <h2 className="title">Solución:</h2>
            <ul className="letters">
              {renderSolutionLetters()} {/* //pendiente--------------- */}
            </ul>
          </div>
          <div className="feedback">
            <h2 className="title">Letras falladas:</h2>
            <ul className="letters">{renderErrorLetters()}</ul>
          </div>
          <form className="form">
            <label className="title" htmlFor="last-letter">
              Escribe una letra:
            </label>
            <input
              onChange={handleIntroducedLetter}
              autoComplete="off"
              className="form__input"
              maxLength="1"
              type="text"
              name="last-letter"
              id="last-letter"
              value={introducedLetter}
            />
            <br />
            <p>{feedback}</p>
            <button
              className="button_increment"
              type="button"
              onClick={handleErrors}
            >
              Incrementar
            </button>
          </form>
        </section>
        <section className={`dummy error-${numberOfErrors}`}>
          <span className="error-13 eye"></span>
          <span className="error-12 eye"></span>
          <span className="error-11 line"></span>
          <span className="error-10 line"></span>
          <span className="error-9 line"></span>
          <span className="error-8 line"></span>
          <span className="error-7 line"></span>
          <span className="error-6 head"></span>
          <span className="error-5 line"></span>
          <span className="error-4 line"></span>
          <span className="error-3 line"></span>
          <span className="error-2 line"></span>
          <span className="error-1 line"></span>
          <span className="error-0 line"></span>
        </section>
      </main>
    </div>
  );
}

export default App;

//PENDIENTE---------------------
//escuchar: solución, letra introducida por usuaria-OK

//useState: array( letras correctas de la solución), array (letras falladas = introducida - correctas), array (letra introducida),array (número de errores)

//Acción tras solución correcta
