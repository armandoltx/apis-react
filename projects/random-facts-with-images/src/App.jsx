import './App.css'
import {useEffect, useState} from "react"

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact"
const CAT_PREFIX_IMAGE_URL = "https://cataas.com/cat/"

function App() {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    const getRandomFact = async () => {
      try {
        const response = await fetch(CAT_ENDPOINT_RANDOM_FACT)
        if(!response.ok) throw new Error('Hubo un error...')
        const data = await response.json()
        const { fact } = data
        setFact(fact)





      } catch (error) {
        console.log(error)
      }
    }

    getRandomFact()
  }, [])

  useEffect(() => {
    if(!fact) return

    const threeFirstWord = fact.split(' ', 3).join (' ')
    console.log(threeFirstWord)

     fetch(`${CAT_PREFIX_IMAGE_URL}/says/${threeFirstWord}?json=true`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const { _id } = data
        const url = `${CAT_PREFIX_IMAGE_URL}${_id}/says/${threeFirstWord}?fontSize=50&fontColor=white`
        setImageUrl(url)
      })
  }, [fact])




  return (
    <>
      <main>
        <h1>Random Hechos</h1>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={imageUrl} alt={`Image extracted using the first three words for {fact}`} />}
      </main>
    </>
  )
}

export default App
