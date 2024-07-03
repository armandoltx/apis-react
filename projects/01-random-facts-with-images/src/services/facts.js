const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact"

export const getRandomFact = async () => {
  try {
    const response = await fetch(CAT_ENDPOINT_RANDOM_FACT)
    if(!response.ok) throw new Error('Hubo un error...')
    const data = await response.json()
    const { fact } = data
    return fact
  } catch (error) {
    console.log(error)
  }
}
