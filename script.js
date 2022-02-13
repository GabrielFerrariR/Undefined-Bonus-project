const urlBase = "https://rickandmortyapi.com/api/";
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

const fetchData = async (data, id) => {
  const url = `${urlBase}${data}/${id}`;
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
  const {name, image} = data;
  console.log(data,'outro console', name, image);
  questionElement.innerText = `O personagem ${name} apareceu pela primeira vez no episódio:`;
  const img = generateImg('img', image);
  charImgElement.appendChild(img);
}
  
window.onload = async () => {
  fetchData('character', 1).then((data) => console.log(data));
  await generateQuestion();
}