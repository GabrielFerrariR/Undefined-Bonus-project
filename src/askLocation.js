// const { numOfLocations, questionElement, ansContainer } = require('./script.js');

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
      const div = createElement('div', 'answer wrong', `${location.name}`);
      arrayOfDivs.push(div);
    }
  });
  questionElement.innerText = question;
  shuffleArray(arrayOfDivs);
  arrayOfDivs.forEach((div) => ansContainer.appendChild(div));
}

if (typeof module !== 'undefined') {
  module.exports = { askLocation };
}
