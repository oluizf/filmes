export default function Busca({ valor, onMudar, onBuscar, onLimpar, buscando }) {
  function enviar(e) {
    e.preventDefault()
    onBuscar()
  }

  return (
    <form className="busca" onSubmit={enviar}>
      <input
        type="text"
        placeholder="Buscar filme (em inglês)..."
        aria-label="Buscar filme pelo título em inglês"
        value={valor}
        onChange={(e) => onMudar(e.target.value)}
      />

      <button type="submit" disabled={buscando}>
        {buscando ? 'Buscando...' : 'Buscar'}
      </button>

      {valor && (
        <button type="button" onClick={onLimpar} disabled={buscando}>
          Limpar
        </button>
      )}
    </form>
  )
}