import '../styles/App.scss';
import { useEffect, useState } from 'react';
import callToApi from '../services/api';
//import ahorcado from '../images/favicon-ahorcado.jpg';


function App() {
  //VARIABLES ESTADO
  let [numberOfErrors, setNumberOfErrors] = useState(0);
  const [introducedLetter, setintroducedLetter] = useState('');
  const [word, setWord] = useState(' ');
  const [feedback, setFeedback] = useState('');
  const [userLetters, setUserLetters] = useState([]);

  //HACE QUE LA PETICIÓN SE EJECUTE SOLO 1 VEZ AL CARGAR LA PÁGINA
  useEffect(() => {
    callToApi()
      .then((word) => {
        console.log(word);
        setWord(word);
      });
  }, [])

  //EVENTO AL HACER CLICK EN EL BOTON
  const handleErrors = (ev) => {
    numberOfErrors++;
    setNumberOfErrors(numberOfErrors);
  };

  //EVENTO AL ESCRIBIR UNA LETRA
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
    //console.log(letter);
  };

  //FUNCIÓN QUE COMVIERTE ARROW CON LAS LETRAS FALLADAS 
  const renderErrorLetters = () => {
    const found = userLetters.filter((l) => !word.includes(l));
    //console.log(found);
    return found.map((l, i) => <li className="letter" key={i}>{l}</li>);
  };


  const renderCorrectLetters = () => {
    //CONVIERTO UNA PALABRA EN UN ARRAY
    const wordLetters = word.split('');
    //RECORRE EL ARRAY  DE LA PALABRA ESCRITA POR USUARIO DENTRO DEL ARRAY DE PALABRA
    const correctLetter = wordLetters.map((letter, i) => {
      const index = userLetters.indexOf(letter);
      //SI NO LO ENCUENTRA DEVUELVE -1
      if (index === -1) {
        return <li className="letter" key={i}> </li>;
      } else {
        return <li className="letter" key={i}>{letter} </li>;
      }
    })

    return correctLetter;
  }


  //RETURN
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
              {renderCorrectLetters()} { }
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
