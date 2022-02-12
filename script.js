const urlBase = "https://rickandmortyapi.com/api/";
const numOfCharacters = 826;
const numOfLocations = 126;
const numOfEpisodes = 51;

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

window.onload = () => {
  fetchData('character', 1).then((data) => console.log(data));
}