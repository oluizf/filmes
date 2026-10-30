export default function Cabecalho({ avaliados, total, media }) {

    return (
        <>
            <h1>Avaliador de Filmes</h1>
            <p id="resumo">

                {avaliados} de {total} avaliados
                {avaliados > 0 && ` - média ${media.toFixed(1)}`}
            </p>
        </>
    )
}