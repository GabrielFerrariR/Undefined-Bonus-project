const urlBase = "https://rickandmortyapi.com/api/";
const numOfCharacters = 826;
const numOfLocations = 126;
const numOfEpisodes = 51;

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
  const url = `${urlBase}${data}/${param}`;
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
  console.log(url);
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch(error) {
    return `Algo deu errado :( \n${error}`;
  }
}

window.onload = () => {
  fetchData('episode', 1).then((data) => console.log(data));
  fetchDataQuotes().then((data) => console.log(data));
  console.log(genArrayRandomNumbers3(numOfCharacters));
}