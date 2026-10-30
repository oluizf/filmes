import { useState } from 'react'
import useFilmes from './hooks/useFilmes.js'
import useNotas from './hooks/useNotas.js'
import usePesquisa from './hooks/usePesquisa.js'
import Cabecalho from './components/Cabecalho'
import Filme from './components/Filme'
import Busca from './components/Busca'

const titulos = [
  'Interstellar',
  'The Godfather',
  'Fight Club',
]

export default function App() {
  const [textoBusca, setTextoBusca] = useState('')
  const { filmes, erro, carregando } = useFilmes(titulos)
  const { resultados, pesquisando, erroBusca, pesquisar } = usePesquisa()

   const lista = resultados ?? filmes
  const { notas, avaliar, avaliados, media } = useNotas(lista)

  function lidarComBusca() {
    pesquisar(textoBusca)
  }

  function limpar() {
    setTextoBusca('')
    pesquisar('') 
  }

  return (
    <>
      <Cabecalho avaliados={avaliados} total={lista.length} media={media} />

      <Busca
        valor={textoBusca}
        onMudar={setTextoBusca}
        onBuscar={lidarComBusca}
        onLimpar={limpar}
        buscando={pesquisando}
      />

      {erro && <p className="erro">{erro}</p>}
      {erroBusca && <p className="erro">{erroBusca}</p>}
      {carregando && <p className="carregando">Carregando filmes iniciais...</p>}
      {pesquisando && <p className="carregando">Buscando filmes...</p>}

      <main className="lista">
        {lista.map((filme) => (
          <Filme
            key={filme.id}
            titulo={filme.titulo}
            ano={filme.ano}
            imagem={filme.imagem}
            nota={notas[filme.id]}
            onAvaliar={(nota) => avaliar(filme.id, nota)}
          />
        ))}

        {resultados && resultados.length === 0 && !pesquisando && (
          <p>Nenhum filme encontrado para essa busca.</p>
        )}
      </main>
    </>
  )
}