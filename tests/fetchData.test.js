const { fetchData } = require("../src/fetchData")

describe('teste',() => {
  it('Teste', () => {
    const call = fetchData()
    expect(typeof fetchData).toBe('number')
  })
})