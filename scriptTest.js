const { getCharacter } = require('rickmortyapi')


async function teste() {
  const rick = await getCharacter(1)
  console.log(rick)
}
teste()