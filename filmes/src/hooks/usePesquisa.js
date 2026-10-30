import { useState } from 'react'
import { pesquisarFilmes } from '../services/omdb.js'

export default function usePesquisa() {
  const [resultados, setResultados] = useState(null)
  const [pesquisando, setPesquisando] = useState(false)
  const [erroBusca, setErroBusca] = useState('')

  function pesquisar(texto) {
    const termo = texto.trim()
    setErroBusca('')

    if (termo === '') {
      setResultados(null)
      return
    }

    setPesquisando(true)
    pesquisarFilmes(termo)
      .then(setResultados)
      .catch((erro) => {
        setResultados(null)
        setErroBusca(`Não foi possível pesquisar (${erro.message})`)
      })
      .finally(() => setPesquisando(false))
  }

  return { resultados, pesquisando, erroBusca, pesquisar }
} 
