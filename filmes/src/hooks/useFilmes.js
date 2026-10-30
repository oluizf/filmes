import { useState, useEffect } from 'react'
import { buscarFilme } from '../services/omdb.js'

export default function useFilmes(titulos) {
    const [filmes, setFilmes] = useState([])
    const [erro, setErro] = useState('')
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        Promise.all(titulos.map((titulo) => buscarFilme(titulo)))
            .then(setFilmes)
            .catch(() => setErro('Não foi possível carregar os filmes. Confira a chave no arquivo .env'))
            .finally(() => setCarregando(false))
    }, [titulos])

    return { filmes, erro, carregando }
}