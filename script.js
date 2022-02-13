const urlBase = "https://rickandmortyapi.com/api";
const numOfCharacters = 826;
const numOfLocations = 126;
const numOfEpisodes = 51;
const questionElement = document.getElementById('question-text');
const charImgElement = document.querySelector('.img-container');
const ansContainer = document.querySelector('.answers-container')
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

const fetchData = async (data, param) => {
  const url = `${urlBase}/${data}/${param}`;
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

/* Randomize array in-place using Durstenfeld shuffle algorithm */
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// Embaralha um array que será usado para adicionar as respostas em ordem aleatória
const arrayShufle = () => {
  const array = [0,1,2,3]
  for (let index = array.length - 1; index > 0; index--) {
      let j = Math.floor(Math.random() * (index + 1));
      let temp = array[index];
      array[index] = array[j];
      array[j] = temp;
    }
  return array;
}
// }
// Gera a pergunta com base em um personagem aleatório
let firstEp;
const generateQuestion = async () => {
  const data = await fetchData('character', generateRandomNumber(826));
  const {name, image, episode} = data;
  firstEp = episode[0].match(/episode\/(.*)/)[1];
  questionElement.innerText = `O personagem ${name} apareceu pela primeira vez no episódio:`;
  const img = generateImg('img', image);
  charImgElement.appendChild(img);
  await generateAnswers(firstEp)
}
// Gera a span com as respostas 
const generateSpan = async (array, index, id, name, episode) => {
  const answerElement = document.querySelectorAll('.answer');
  answerElement[array[index]].innerText = `${name} - ${episode}`
  const span = createElement('span', 'ep_number', id);
  answerElement[array[index]].appendChild(span);
  answerElement.forEach((element) => {
    element.addEventListener('click', episodeVerify)
  })
}
// Gera as divs do answer-container dinamicamente
const generateDivs = () => {
  for (let index = 0; index < 4; index +=1) {
    const div = createElement('div', 'answer');
    ansContainer.appendChild(div);
  }
}
// Função responsavel por chamar as respostas
const generateAnswers = async (rightAnswer) => {
  const epArrays = genArrayRandomNumbers3(numOfEpisodes);
  epArrays.push(rightAnswer)
  console.log(epArrays)
  const data = await fetchData('episode', epArrays);
  const array = arrayShufle();
  generateDivs()
  const answerElement = document.querySelectorAll('.answer');
  data.forEach((ep, index) => {
    const {name, episode, id} = ep
    generateSpan(array, index, id, name, episode);
  })
}
// função que verifica se a resposta está certa ou errada
const episodeVerify = (event) => {
  const targetEp = event.target.lastChild.innerText;
  console.log(targetEp);
  (targetEp === firstEp)? event.target.classList.add('right_answer')
  :event.target.classList.add('wrong_answer')
}

window.onload = async () => {
  // fetchData('character', 1).then((data) => console.log(data));
  await generateQuestion();
}