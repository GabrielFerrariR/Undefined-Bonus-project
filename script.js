const numOfCharacters = 826;
const numOfLocations = 126;
const numOfEpisodes = 51;
const questionElement = document.getElementById('question-text');
const charImgElement = document.querySelector('.img-container');
const ansContainer = document.querySelector('.answers-container')
let cont = 0;
let cont2 = 0;
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

const genArrayRandomNumbers3 = (max) => {
  const maxNum = 3;
  const arrayNumbers = [];
  let numEntries = 0;
  let numSorted = 0;
  while (numEntries < maxNum) {  
    numSorted = generateRandomNumber(max);
    if (!arrayNumbers.includes(numSorted)) {  
      arrayNumbers.push(numSorted);  
      numEntries++;  
    }  
  }
  return arrayNumbers;
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
  console.log(url);
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
//let numOfTries = 0;
ansContainer.addEventListener("click", function (event) {        
  //numOfTries++;
  if (event.target.classList.contains("correct")) {
      /* event.target.classList.remove("correct");
      document.getElementById("answer").innerText = "Acertou!";
      let placar = document.getElementById("score");
      let points = parseInt(placar.innerText);
      points +=3;
      placar.innerText = points; */
      event.target.classList.add('right_answer');
      alert('Acertou!');
      setTimeout(() => {
        clearQuestion();
        generateQuestion();
      }, 1500);
  }
  else {
      /* document.getElementById("answer").innerText = "Errou! Tente novamente!"; */
      event.target.classList.add('wrong_answer');
      alert('Errou!');
      setTimeout(() => {
        clearQuestion();
        generateQuestion();
      }, 1500);
  }     
});

//if (numOfTries === 2) console.log('acabou o jogo'); 

/* const startQuiz = () => {
  const numOfQuestions = 10;
  const numOfPoints = 0;
  for (i = 1; i <= numOfQuestions; i += 1) {
    generateQuestion();
  } 
} */

const clearQuestion = () => {
  questionElement.innerText = '';
  charImgElement.children[0].remove(); 
  ansContainer.innerHTML = '';
}

const limparFoto = () => { // funçao que retira a imagem do quiz
}
const limparQuestoes = () => { // funçao que retira as questoes do quiz
  ansContainer.children[0].remove();
  ansContainer.children[1].remove();
  ansContainer.children[0].remove();
  ansContainer.children[0].remove();
}
// função que verifica se a resposta está certa ou errada
const episodeVerify = (event) => {
  const targetEp = event.target.lastChild.innerText;
  console.log(targetEp);

  //amazena a resposta certa ou errada em uma variavel inteira, soma se acertou e diminui se errou
  if (targetEp === firstEp) {
    event.target.classList.add('right_answer');
    cont +=1;
    cont2+=1;
  }
  else {
    event.target.classList.add('wrong_answer');
    cont -= 1;
    cont2+=1;
  }
  //Cria botão com a opção de jogar novamente após finalização da partida
  const createBtn = () => {
    const btn = document.createElement('button');
    btn.innerText = 'Jogar novamente';
    btn.className = 'btn';
    ansContainer.appendChild(btn);
  };
  // enquanto nao foi as 10 questoes apos escolher uma alternativa limpa a foto e as questoes e chama uma nova foto e novas questoes
  if (cont2 < 10 ) {
  limparFoto();
  limparQuestoes();
  generateQuestion();
  }
  else{ // quando finalizar as 10 questoes aparece uma frase de acordo com a pontuaçao
    if (cont < 1) {
    questionElement.innerText = `Você foi muito mal, ta parecendo um Jerry`;
    limparFoto()
    limparQuestoes();
    const chulambes= document.createElement('img');
    chulambes.src = './img/r24.gif';
    chulambes.style.height = "500px";
    chulambes.style.width = "600px";
    charImgElement.appendChild(chulambes);
    createBtn();
  } else
    if (cont > 1 && cont < 6) {
      questionElement.innerText = `Você foi até razoavel, mas não sabe muito sobre Rick e Morty`;
      limparFoto()
      limparQuestoes();
      const chulambes= document.createElement('img');
      chulambes.src = './img/r25.gif';
      charImgElement.appendChild(chulambes);
      createBtn();
    } else
    if (cont > 6 && cont < 10) {
      questionElement.innerText = `Você até que manja de Rick e Morty, mas não é o cara mais inteligente do universo`;
      limparFoto()
      limparQuestoes();
      const chulambes= document.createElement('img');
      chulambes.src = './img/r28.gif';
      charImgElement.appendChild(chulambes);
      createBtn();
    }
    if (cont === 10) {
      questionElement.innerText = `Wubba Lubba Dub Dub, tu é praticamente um Rick;`
      limparFoto()
      limparQuestoes();
      const chulambes= document.createElement('img');
      chulambes.src = './img/r23.gif';
      charImgElement.appendChild(chulambes);
      createBtn();
    }
  }
 }

 /* const newGame = () => {
  charImgElement.children[0].remove();
  questionElement.children[0].remove();
 } */

window.onload = async () => {
  const teste = document.querySelector("#quiz");
  teste.addEventListener('click', generateQuestion); //  So aparece o quiz após clique duplo na opção quiz
  /* const btnNewGame = document.querySelector('.btn');
  btnNewGame.addEventListener('click', generateQuestion); */
  //fetchData('character',1).then((data) => console.log(data));
  //console.log('string/12/23/34'.split('/').at(-1));
  //console.log(takeIdOfString("https://rickandmortyapi.com/api/episode/12"));

  
  
  /* const div1 = createElement('div', 'a');
  const div2 = createElement('div', 'b');
  const div3 = createElement('div', 'c');
  const div4 = createElement('div', 'd');
  const arrayOfDivs = [div1, div2, div3, div4];
  shuffleArray(arrayOfDivs);
  console.log(arrayOfDivs); */
  //console.log(genArrayRandomNumbers(4, 51, 2));
  /* const array = [];
  for (i=1; i<=numOfLocations; i++) {
    fetchData('location', i).then((data) => array.push(data));   
  }
  console.log(array); */
}