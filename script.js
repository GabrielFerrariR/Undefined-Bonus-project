const urlBase = "https://rickandmortyapi.com/api/";
const numOfCharacters = 826;
const numOfLocations = 126;
const numOfEpisodes = 51;

const characters = [];
const locations = [];
const episodes = [];


/* const fetchData = async (option) => {
  const url = `${urlBase}${option}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch(error) {
    return `Algo deu errado :( \n${error}`;
  }
}

fetchData('character').then((data) => {
  characters = data;
  console.log(characters);
}); */

const getData = (data, total, callback) => {
  const url = `${urlBase}${data}`;
  console.log(url);
  for (let index = 1; index <= total; index += 1) {
    const xhttp = new XMLHttpRequest();
    let urlToSearch = `${url}/${index}`;
    console.log(urlToSearch);
    xhttp.open("GET", urlToSearch, false);
    xhttp.onreadystatechange = function(){//Função a ser chamada quando a requisição retornar do servidor
      if ( xhttp.readyState == 4 && xhttp.status == 200 ) {//Verifica se o retorno do servidor deu certo
        callback(xhttp.responseText);
      }
    }
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
  } 
}

const getCharacters = (data) => characters.push(JSON.parse(data));
const getLocations = (data) => locations.push(JSON.parse(data));
const getEpisodes = (data) => episodes.push(JSON.parse(data));

const getAllData = () => {
  const startTime = Date.now();
  
  const body = document.querySelector('body');
  console.log(body);
  const p = document.createElement('p');
  p.id = 'loading-data';  
  p.innerText = 'Carregando dados...';
  console.log(p);
  body.appendChild(p);
  
  setTimeout(() => {
    getData('character', numOfCharacters, getCharacters);
    getData('location', numOfLocations, getLocations);
    getData('episode', numOfEpisodes, getEpisodes);
    const timeLoading = Math.round((Date.now() - startTime)/1000);
    console.log(`Levou ${timeLoading} segundo para caregar a API`);
    
    //retirar mensagem de loading data
    body.removeChild(p);
    
    //mostrar arrays
    console.log(characters);
    console.log(locations);
    console.log(episodes);
  }, 100);

}

window.onload = () => {
 getAllData();
}  
  

/* const getAllData = () => {
  // colocar mensagem de loading data
  const body = document.getElementsByTagName('body')[0];
  const p = document.createElement('p');
  p.id = 'loading-data';  
  p.innerText = 'Carregando dados...'
  body.appendChild(p);
  
  // recebendo todos os dados
  getData('character', characters);
  getData('location', locations);
  getData('episode', episodes); 
 
  // retirar mensagem de loading data
  //console.log(body.firstElementChild);
  //console.log(body.firstElement);
  //body.removeChild(p);
}

getAllData();
console.log(characters);
console.log(locations);
console.log(episodes); */