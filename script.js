const urlBase = "https://rickandmortyapi.com/api";
const numOfCharacters = 826;
const numOfLocations = 126;
const numOfEpisodes = 51;
const questionElement = document.getElementById('question-text');
const answerElement = document.getElementsByClassName('answer');
const charImgElement = document.querySelector('.img-container');

const generateImg = (tag, url) => {
  const element = document.createElement(tag);
  element.src = url
  return element
}

const generateRandomNumber = (maxNum) => {
  const min = 1;
  const max = maxNum;
  const numSorted = Math.floor(Math.random() * (max - min + 1)) + min;
  return numSorted;
}

const genArrayRandomNumbers3 = (max) => {
  const maxNum = 3;
  let arrayNumbers = [];
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
const arrayShufle = () => {
  const array = [0,1,2,3]
  function shuffleArray(array) {
  for (let index = array.length - 1; index > 0; index--) {
      let j = Math.floor(Math.random() * (index + 1));
      let temp = array[index];
      array[index] = array[j];
      array[j] = temp;
    }
  }
  return array;
}

const fetchData3Param = async (data, id, id2, id3, id4) => {
  const url = `${urlBase}${data}/${id},${id2},${id3},${id4}`;
  console.log(url);
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch(error) {
    return `Algo deu errado :( \n${error}`;
  }
}

const generateQuestion = async () => {
  const data = await fetchData('character', generateRandomNumber(826));
  const {name, image, episode} = data;
  const firstEp = episode[0].match(/episode\/(.*)/)[1];
  console.log(data,'outro console', name, image, firstEp);
  questionElement.innerText = `O personagem ${name} apareceu em qual episódio:`;
  const img = generateImg('img', image);
  charImgElement.appendChild(img);
  await generateAnswers(firstEp)
}

const generateAnswers = async (rightAnswer) => {
  const data = await fetchData3Param('episode', generateRandomNumber(numOfEpisodes), generateRandomNumber(numOfEpisodes), generateRandomNumber(numOfEpisodes), rightAnswer);
  const array = arrayShufle();
  data.forEach((ep, index) => {
    const {name, episode} = ep
    answerElement[array[index]].innerText = `${name} - ${episode}`;
  })
}
 
window.onload = async () => {
  fetchData('character', 1).then((data) => console.log(data));
  await generateQuestion();
}