const numOfCharacters = 826;
const numOfLocations = 126;
const numOfEpisodes = 51;
const questionElement = document.getElementById('question-text');
const charImgElement = document.querySelector('.img-container');
const ansContainer = document.querySelector('.answers-container');
const questionContainerElement = document.querySelector('.question-container');
const numOfQuestions = 10;
let numOfTries = 0;
let numOfQuestionsRight = 0;

// Gera a imagem do personagem
const generateImg = (tag, url) => {
  const element = document.createElement(tag);
  element.src = url
  return element
}
// const generateQuestionImg = () => {
//   const img = generateImg('img', '../img/r7.png' );
//   img.id = "portal-gun";
//   questionContainerElement.prepend(img);
// }
// cria elementos variados a partir dos parametros dados
const createElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
// Gera um número aleatório que será usado para chamar a API
const generateRandomNumber = (maxNum) => {
  const min = 1;
  const max = maxNum;
  const numSorted = Math.floor(Math.random() * (max - min + 1)) + min;
  return numSorted;
}

const genArrayRandomNumbers = (sizeOfArray, maxValue, numMustBe) => {
  const maxNum = sizeOfArray;
  const arrayNumbers = [];
  arrayNumbers.push(numMustBe);
  let numEntries = 0;
  let numSorted = 0;
  while (numEntries < maxNum -1) {  
    numSorted = generateRandomNumber(maxValue);
    if (!arrayNumbers.includes(numSorted)) {  
      arrayNumbers.push(numSorted);  
      numEntries++;  
    }  
  }
  return arrayNumbers;
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

const takeIdOfString = (string) => {
  return string.split('/').at(-1);
}

const generateQuestion = async () => {
  charImgElement.innerHTML = '';
  ansContainer.innerHTML = '';
  // doing fetch of a random character
  const data = await fetchData('character', generateRandomNumber(numOfCharacters));
  const { name, origin, location, image, episode } = data;
  // set image of character
  const img = generateImg('img', image);
  charImgElement.appendChild(img);
  // the type of question will be setted randomically
  const typeOfQuestion = generateRandomNumber(3);
  switch (typeOfQuestion) {
    case 1:
      askFirstEpisode(name, episode);      
      break;
    case 2:
      askOrigin(name, origin.url);      
      break;
    case 3:
      askLocation(name, location.url);      
      break;    
  }
}

ansContainer.addEventListener("click", function (event) {        
  numOfTries++;
  console.log('numOfTries', numOfTries);
  console.log('numOfQuestionsRight', numOfQuestionsRight);
  if (event.target.classList.contains("correct")) {
      event.target.classList.add('right_answer');
      numOfQuestionsRight++;
      if (numOfTries !== numOfQuestions) {
        setTimeout(() => {
          clearQuestion();
          generateQuestion();
        }, 1500);
      }
  }
  else if (event.target.classList.contains("wrong")) {
      event.target.classList.add('wrong_answer');
      if (numOfTries !== numOfQuestions) {
        setTimeout(() => {
          clearQuestion();
          generateQuestion();
        }, 1500);
      }
  }
  if (numOfTries === numOfQuestions) showEndOfQuiz(numOfQuestionsRight);      
});

const clearQuestion = () => {
  questionElement.innerText = '';
  charImgElement.children[0].remove(); 
  ansContainer.innerHTML = '';
}

//Cria botão com a opção de jogar novamente após finalização da partida
const createBtn = () => {
  const div = document.getElementById('btn');
  const btn = document.createElement('button');
  btn.innerText = 'Jogar novamente';
  btn.className = 'btn bn632-hover bn23';
  div.appendChild(btn);
}

const div = document.getElementById('btn');
div.addEventListener('click', () => {
  clearQuestion();
  generateQuestion();
  document.querySelector('.btn').remove();
});

// quando finalizar as 10 questoes aparece uma frase de acordo com a pontuaçao
const showEndOfQuiz = (cont) => {
  console.log('entrei no end of quiz');
  console.log('cont', cont);
  numOfTries = 0;
  numOfQuestionsRight = 0;
  clearQuestion();  
  const chulambes= document.createElement('img');
  chulambes.style.height = "500px";
  chulambes.style.width = "600px";
  if (cont <= 2) {
    questionElement.innerText = `Você foi muito mal, acertou apenas ${cont} de 10 perguntas, tá parecendo um Jerry!!!`;
    chulambes.src = './img/r24.gif';
  } else if (cont > 4 && cont <= 6) {
      questionElement.innerText = `Você foi até que razoável, acertou ${cont} de 10 perguntas, mas não sabe muito sobre Rick e Morty!`;
      chulambes.src = './img/r25.gif';
  } else if (cont > 6 && cont <= 8) {
      questionElement.innerText = `Você até que manja de Rick e Morty, acertou ${cont} de 10 perguntas, mas não é o cara mais inteligente do universo!`;
      chulambes.src = './img/r28.gif';      
  }
  else {
    questionElement.innerText = `Wubba Lubba Dub Dub, tu é praticamente um Rick!!! Acertou ${cont} perguntas!`
    chulambes.src = './img/r23.gif';
  }
  charImgElement.appendChild(chulambes);
  createBtn();
}

const createLoading = () => {
  const conatinerLoading = document.querySelector('.img-container');
  const conatinerBtnLoad = document.querySelector('.answers-container');
  const imgLoading = document.createElement('img');
  const btnLoading = document.createElement('button');
  imgLoading.className = 'imagem-loading';
  imgLoading.src = './img/r29.png';
  conatinerLoading.appendChild(imgLoading);
  btnLoading.className = 'btn bn23 bn632-hover';
  btnLoading.innerText = 'Iniciar quiz'
  conatinerBtnLoad.appendChild(btnLoading);
}
createLoading();

window.onload = () => {
  const teste = document.querySelector(".btn");
  teste.addEventListener('click', generateQuestion); //  So aparece o quiz após clique duplo na opção quiz
}
if (typeof module !== 'undefined') {
  module.exports = {
    numOfLocations,
    questionElement,
    ansContainer,
    takeIdOfString
  };
}
