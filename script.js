const urlBase = "https://rickandmortyapi.com/api";
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

const limparFoto = () => { // funçao que retira a imagem do quiz
  charImgElement.children[0].remove(); 
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
  
    } else
    if (cont > 1 && cont < 6) {
      questionElement.innerText = `Você foi até razoavel, mas não sabe muito sobre Rick e Morty`;
      limparFoto()
      limparQuestoes();
      const chulambes= document.createElement('img');
      chulambes.src = './img/r25.gif';
      charImgElement.appendChild(chulambes);
    } else
    if (cont > 6 && cont < 10) {
      questionElement.innerText = `Você até que manja de Rick e Morty, mas não é o cara mais inteligente do universo`;
      limparFoto()
      limparQuestoes();
      const chulambes= document.createElement('img');
      chulambes.src = './img/r28.gif';
      charImgElement.appendChild(chulambes);
    }
    if (cont === 10) {
      questionElement.innerText = `Wubba Lubba Dub Dub, tu é praticamente um Rick;`
      limparFoto()
      limparQuestoes();
      const chulambes= document.createElement('img');
      chulambes.src = './img/r23.gif';
      charImgElement.appendChild(chulambes);
    }

  }
 }
  const Urlcharacters = "https://rickandmortyapi.com/api/character";
  const Urllocations = "https://rickandmortyapi.com/api/location";
window.onload = async () => {
  const quiz = document.querySelector("#quiz");
  const dimensoes = document.querySelector("#dimensoes");
  const personagens = document.querySelector("#personagens");
  quiz.addEventListener('dblclick', generateQuestion); // so aparece o quiz após clique duplo na opçao quiz
  // dimensoes.addEventListener('dblclick')
  personagens.addEventListener('dblclick', async () => {
    try {
      const response = await fetch(Urlcharacters);
      const data = await response.json();
      console.log(data.results[0])
      // for (let cont = 0; cont < 5; cont+=1) {
      //  const image = document.createElement('img');
      //  image.innerText = `${data[cont].results.name}`;
      //  image.src = data[cont].origin.url
      // personagens.appendChild(img);
      // }
    } catch(error) {
      return `Algo deu errado :( \n${error}`;
    }
});

}