import {useEffect, useState} from "react"
import './App.css'
import { getRandomFact } from "./services/facts"
import { getRandomImage } from "./services/images"


function App() {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    getRandomFact().then(newFact => setFact(newFact)) // getRandomFact devueolve una promesa por eso el then. tb se puede hacer async await
    }, [])

  useEffect(() => {
    if(!fact) return

    const threeFirstWord = fact.split(' ', 3).join (' ')
    // console.log(threeFirstWord)
    getRandomImage(threeFirstWord).then(newImageUrl => setImageUrl(newImageUrl))
  }, [fact])

  const handleClick = async () => {
    const newFact = await getRandomFact()
    setFact(newFact)
  }



  return (
    <>
      <main>
        <h1>Random Hechos</h1>
        <button onClick={handleClick}>Create New Fact</button>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={imageUrl} alt={`Image extracted using the first three words for {fact}`} />}
      </main>
    </>
  )
}

export default App
