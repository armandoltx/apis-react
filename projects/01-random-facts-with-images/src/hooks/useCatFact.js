import { useState, useEffect } from "react"
import {getRandomFact} from "../services/facts"

export function useCatFact() {
  const [fact, setFact] = useState()

  const refreshFact = () => {
    getRandomFact().then(newFact => setFact(newFact)) // getRandomFact devueolve una promesa por eso el then. tb se puede hacer async await
  }

  useEffect(refreshFact, [])
  // useEffect(() => {refreshFact()}, []) --> es lo mismo

  return { fact, refreshFact }
}
