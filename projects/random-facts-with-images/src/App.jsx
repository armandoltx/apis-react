import {useEffect, useState} from "react"

const URL = "https://catfact.ninja/fact"

function App() {
  const [fact, setFact] = useState()

  useEffect(() => {
    const getRandomFact = async () => {
      try {
        const response = await fetch(URL)
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




  return (
    <>
      <h1>Random Hechos</h1>
      <p>{fact}</p>
    </>
  )
}

export default App
