import {useEffect, useState} from "react"

const URL = "https://catfact.ninja/fact"

function App() {
  const [fact, setFact] = useState()

  useEffect(() => {
    fetch(URL)
    .then(response => {
      if(!response.ok) throw Error("Ha habido un error...")
      console.log(response.json)
      return response.json()
    })
    .then(data => {
      console.log(data)
      setFact(data.fact)
    })
    .catch(error => console.log(error.message))

  }, [])




  return (
    <>
      <h1>Random Hechos</h1>
      <p>{fact}</p>
    </>
  )
}

export default App
