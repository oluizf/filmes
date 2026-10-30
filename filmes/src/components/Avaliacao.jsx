export default function Avaliacao({ nota, onAvaliar }) {
    return (
        <>
            <input
                type="range"
                min="1"
                max="5"
                value={nota || 3}
                onChange={(e) => onAvaliar(Number(e.target.value))}
            />
            <p className="nota">
                {nota ? `Sua nota: ${nota} de 5` : 'Sem nota'}
            </p>
        </>
    )
}