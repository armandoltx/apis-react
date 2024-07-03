import { useState, useEffect } from "react"
import {getRandomImage} from "../services/images"

export function useCatImage({ fact }) {
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    if(!fact) return
    const threeFirstWord = fact.split(' ', 3).join (' ')
    // console.log(threeFirstWord)
    getRandomImage(threeFirstWord).then(newImageUrl => setImageUrl(newImageUrl))
  }, [fact])

  return { imageUrl }
}