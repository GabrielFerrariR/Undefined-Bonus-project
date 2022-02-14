/**
 * @jest-environment jsdom
 */
const { askFirstEpisode } = require('../src/askFirstEpisode');
require('../mocks/fetchSimulator');
const character = require('../mocks/character.js');
const episode = character.episode[0];


describe('Testes da função askFirstEpisodes', () => {
  it('Testa se askFirstEpisode', async () => {
      expect(typeof askFirstEpisode).toBe('function')
  })
  it('Testa se o método forEach é chamado se askFirstEpisodes é chamada com os argumentos Rick Sanchez e a lista de episódios do personagem ', async () => {
    const teste = askFirstEpisode( 'Rick Sanchez', episode);
    await teste;
    expect(forEach).toBeCalled()
  })
})
