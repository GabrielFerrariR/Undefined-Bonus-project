/**
 * @jest-environment jsdom
 */
const { askFirstEpisode } = require('../src/askFirstEpisode')

describe('Testes da função askFirstEpisodes', () => {
  it('Testa se askFirstEpisode', async () => {
      expect(typeof askFirstEpisode).toBe('function')
  })
})
