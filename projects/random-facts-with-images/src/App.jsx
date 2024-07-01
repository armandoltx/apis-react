import {useEffect, useState} from "react"

const URL = "https://catfact.ninja/fact"

function App() {
  const [fact, setFact] = useState()

  useEffect(() => {
    const getRandomFact = async () => {
      const response = await fetch(URL)
      const data = await response.json()
      const { fact } = data
      setFact(fact)
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
