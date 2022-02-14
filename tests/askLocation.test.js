/**
 * @jest-environment jsdom
 */
const { askLocation } = require('../src/askLocation.js')

describe('Testes da função askLocation', () => {
  it('Testa se askLocation é uma função', async () => {
      expect(typeof askLocation).toBe('function')
  })
})