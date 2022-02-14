// if (typeof require !== 'undefined') {
//   const { takeIdOfString } = require('./script')
// }

const askFirstEpisode = async (character, episode) => {
  const arrayOfDivs = [];
  const idFirstEpisode = takeIdOfString(episode[0]);
  const arrayOfIdEpisodes = genArrayRandomNumbers(4, numOfEpisodes, idFirstEpisode);
  const question = `O personagem ${character} apareceu pela primeira vez em qual episódio?`;
  const arrayOfEpisodes = await fetchData('episode', arrayOfIdEpisodes);
  // generateQuestionImg();
  arrayOfEpisodes.forEach((episode, index) => {
    if (index === 0) {
      const div = createElement('div', 'answer correct', `${episode.name} - ${episode.episode}`);
      arrayOfDivs.push(div);
    } else {
      const div = createElement('div', 'answer wrong', `${episode.name} - ${episode.episode}`);
      arrayOfDivs.push(div);
    }
  });
  questionElement.innerText = question;
  shuffleArray(arrayOfDivs);
  arrayOfDivs.forEach((div) => ansContainer.appendChild(div));
}
if (typeof module !== 'undefined') {
  module.exports = { askFirstEpisode };
}
