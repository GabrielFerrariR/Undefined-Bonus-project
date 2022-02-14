/**
 * @jest-environment jsdom
 */
 const { askOrigin} = require('../src/askOrigin.js')

 describe('Testes da função askOrigin', () => {
   it('Testa se askOrigin é uma função', async () => {
     expect(typeof askOrigin).toBe('function')
   })
 })