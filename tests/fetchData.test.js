const { fetchData } = require("../src/fetchData")

describe('Testa se fetchData é uma função',() => {
  it('Teste', () => {
    expect(typeof fetchData).toBe('function')
  })
})