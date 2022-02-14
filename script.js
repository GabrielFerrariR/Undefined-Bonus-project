const numOfCharacters = 826;
const numOfLocations = 126;
const numOfEpisodes = 51;
const questionElement = document.getElementById('question-text');
const charImgElement = document.querySelector('.img-container');
const ansContainer = document.querySelector('.answers-container');
const numOfQuestions = 2;
let numOfTries = 0;
let numOfQuestionsRight = 0;

// Gera a imagem do personagem
const generateImg = (tag, url) => {
  const element = document.createElement(tag);
  element.src = url
  return element
}
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

const fetchData = async (data, param) => {
  const url = `https://rickandmortyapi.com/api/${data}/${param}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch(error) {
    return `Algo deu errado :( \n${error}`;
  }
}

const fetchDataQuotes = async () => {
  const url = `https://rick-and-morty-api-phrases.herokuapp.com/phrases/pt_br`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch(error) {
    return `Algo deu errado :( \n${error}`;
  }
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

const askFirstEpisode = async (character, episode) => {
  const arrayOfDivs = [];
  const idFirstEpisode = takeIdOfString(episode[0]);
  const arrayOfIdEpisodes = genArrayRandomNumbers(4, numOfEpisodes, idFirstEpisode);
  const question = `O personagem ${character} apareceu pela primeira vez em qual episódio?`;
  const arrayOfEpisodes = await fetchData('episode', arrayOfIdEpisodes);
  arrayOfEpisodes.forEach((episode, index) => {
    if (index === 0) {
      const div = createElement('div', 'answer correct', `${episode.name} ${episode.episode}`);
      arrayOfDivs.push(div);
    } else {
      const div = createElement('div', 'answer', `${episode.name} ${episode.episode}`);
      arrayOfDivs.push(div);
    }
  });
  questionElement.innerText = question;
  shuffleArray(arrayOfDivs);
  arrayOfDivs.forEach((div) => ansContainer.appendChild(div));
}

const askOrigin = async (character, location) => {
  const arrayOfDivs = [];
  const idLocation = takeIdOfString(location);
  const arrayOfIdLocations = genArrayRandomNumbers(4, numOfLocations, idLocation);
  const question = `Qual a origem do personagem ${character}?`;
  const arrayOfLocations = await fetchData('location', arrayOfIdLocations);
  arrayOfLocations.forEach((location, index) => {
    if (index === 0) {
      const div = createElement('div', 'answer correct', `${location.name}`);
      arrayOfDivs.push(div);
    } else {
      const div = createElement('div', 'answer', `${location.name}`);
      arrayOfDivs.push(div);
    }
  });
  questionElement.innerText = question;
  shuffleArray(arrayOfDivs);
  arrayOfDivs.forEach((div) => ansContainer.appendChild(div));
}

const askLocation = async (character, location) => {  
  const arrayOfDivs = [];
  const idLocation = takeIdOfString(location);
  const arrayOfIdLocations = genArrayRandomNumbers(4, numOfLocations, idLocation);
  const question = `O personagem ${character} habita em qual localidade?`;
  const arrayOfLocations = await fetchData('location', arrayOfIdLocations);
  arrayOfLocations.forEach((location, index) => {
    if (index === 0) {
      const div = createElement('div', 'answer correct', `${location.name}`);
      arrayOfDivs.push(div);
    } else {
      const div = createElement('div', 'answer', `${location.name}`);
      arrayOfDivs.push(div);
    }
  });
  questionElement.innerText = question;
  shuffleArray(arrayOfDivs);
  arrayOfDivs.forEach((div) => ansContainer.appendChild(div));
}

const generateQuestion = async () => {
  // doing fetch of a random character
  const data = await fetchData('character', generateRandomNumber(numOfCharacters));
  const {id, name, origin, location, image, episode} = data;
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
  console.log(numOfTries);
  console.log(numOfQuestionsRight);
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
  else {
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
  const btn = document.createElement('button');
  btn.innerText = 'Jogar novamente';
  btn.className = 'btn';
  ansContainer.appendChild(btn);
}
  
// quando finalizar as 10 questoes aparece uma frase de acordo com a pontuaçao
const showEndOfQuiz = (cont) => {
  console.log('entrei no end of quiz');
  console.log(cont);
  numOfTries = 0;
  numOfQuestionsRight = 0;
  clearQuestion();  
  const chulambes= document.createElement('img');
  chulambes.style.height = "500px";
  chulambes.style.width = "600px";
  if (cont <= 2) {
    questionElement.innerText = 'Você foi muito mal, tá parecendo um Jerry!!!';
    chulambes.src = './img/r24.gif';
  } else if (cont > 2 && cont <= 5) {
      questionElement.innerText = 'Você foi até que razoável, mas não sabe muito sobre Rick e Morty!';
      chulambes.src = './img/r25.gif';
  } else if (cont > 5 && cont <= 8) {
      questionElement.innerText = 'Você até que manja de Rick e Morty, mas não é o cara mais inteligente do universo!';
      chulambes.src = './img/r28.gif';      
  }
  else {
    questionElement.innerText = 'Wubba Lubba Dub Dub, tu é praticamente um Rick!!!'
    chulambes.src = './img/r23.gif';
  }
  charImgElement.appendChild(chulambes);
  createBtn();
}

window.onload = () => {
  const teste = document.querySelector("#quiz");
  teste.addEventListener('click', generateQuestion); //  So aparece o quiz após clique duplo na opção quiz
}