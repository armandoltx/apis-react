const CAT_PREFIX_IMAGE_URL = "https://cataas.com/cat/"

export const getRandomImage = async (threeFirstWord) => {
  try {
    const response = await fetch(`${CAT_PREFIX_IMAGE_URL}/says/${threeFirstWord}?json=true`)
    if(!response.ok) throw new Error('Hubo un error')
    const data = await response.json()
    const { _id } = data
    const url = `${CAT_PREFIX_IMAGE_URL}${_id}/says/${threeFirstWord}?fontSize=50&fontColor=white`
    return url
  } catch (error) {
    console.log(error)
  }
}