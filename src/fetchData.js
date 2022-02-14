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
if (typeof module !== 'undefined') {
  module.exports = {
    fetchData,
  };
}
