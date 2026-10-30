import { useState } from 'react'

export default function useNotas(filmes = []) {
  const [notas, setNotas] = useState({})

  function avaliar(id, nota) {
    setNotas((prevNotas) => ({ ...prevNotas, [id]: nota }))
  }

  const lista = filmes
    .filter((filme) => notas[filme.id] !== undefined)
    .map((filme) => notas[filme.id])

  const avaliados = lista.length
  const soma = lista.reduce((total, nota) => total + nota, 0)
  const media = avaliados > 0 ? soma / avaliados : 0

  return { notas, avaliar, avaliados, media }
}