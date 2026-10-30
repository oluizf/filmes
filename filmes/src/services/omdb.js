const chave = import.meta.env.VITE_OMDB_KEY

export function buscarFilme(titulo) {
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(titulo)}&type=movie&apikey=${chave}`

  return fetch(url)
    .then((resposta) => resposta.json())
    .then((dados) => {
      if (dados.Response === 'False') {
        throw new Error(dados.Error)
      }

      return {
        id: dados.imdbID,
        titulo: dados.Title,
        ano: dados.Year,
        imagem: dados.Poster !== 'N/A' 
          ? dados.Poster 
          : 'https://via.placeholder.com/300x450?text=Sem+Poster',
      }
    })
}

export function pesquisarFilmes(texto) {
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(texto)}&type=movie&apikey=${chave}`

  return fetch(url)
    .then((resposta) => resposta.json())
    .then((dados) => {
      if (dados.Response === 'False') {
        if (dados.Error === 'Movie not found!' || dados.Error === 'Movie not found') {
          return []
        }
        throw new Error(dados.Error)
      }

      return (dados.Search || []).map((filme) => ({
        id: filme.imdbID,
        titulo: filme.Title,
        ano: filme.Year,
        imagem: filme.Poster !== 'N/A' 
          ? filme.Poster 
          : 'https://via.placeholder.com/300x450?text=Sem+Poster',
      }))
    })
}