const character = require('./character');
const episode = require('./episode');
const location =  require('./location')
const ENDPOINTS = {
  CHARACTER: `https://rickandmortyapi.com/api/character/1`,
  EPISODE: "https://rickandmortyapi.com/api/episode/1",
  LOCATION: "https://rickandmortyapi.com/api/location/3",
};

const TIME_IN_MILLISECONDS = 200;

const fetchSimulator = (url) => {
  if (typeof url === undefined || url.endsWith('undefined')) {
    return Promise.reject(new Error('You must provide an url'));
  }
  const validUrl = Object.values(ENDPOINTS).includes(url);
  return Promise.resolve({
    status: validUrl ? 200 : 404,
    ok: validUrl,
    json: () => new Promise((resolve) => {
      setTimeout(() => {
        if (url === ENDPOINTS.CHARACTER) {
          return resolve(character);
        }

        if (url === ENDPOINTS.EPISODE) {
          return resolve(episode);
        }
        if (url === ENDPOINTS.LOCATION) {
          return resolve(location);
        }
        return resolve({ results: [] });
      }, TIME_IN_MILLISECONDS);
    }),
  });
};

window.fetch = jest.fn(fetchSimulator);
afterEach(jest.clearAllMocks);

module.exports = fetchSimulator;