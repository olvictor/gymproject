import { useState } from "react"

const calcTempo = (tempoInicio,tempoFinal) =>{
    const [dias,setDias] = useState()
    const [horas,setHoras] = useState()
    const [minutos,setMinutos] = useState()
    const [segundos,setSegundos] = useState(" ")
    let tempoRestanteEmMs

    const atualizarTempo = () => {
    
        const tempoInicioEmMs = tempoInicio.getTime()
        const tempoFinalEmMs = tempoFinal.getTime()
        tempoRestanteEmMs = tempoFinalEmMs - tempoInicioEmMs
       
        const segundos = 1000;
        const minutos = segundos * 60;
        const horas = minutos * 60;
        const dias = horas * 24;

        const quantidadeDeDiasRestantes = Math.floor(tempoRestanteEmMs / dias)
        const quantidadeDeHorasRestantes = Math.floor((tempoRestanteEmMs % dias) / horas)
        const quantidadeDeMinutosRestantes = Math.floor((tempoRestanteEmMs % horas) / minutos)
        const quantidadeDeSegundosRestantes = Math.floor((tempoRestanteEmMs % minutos) / segundos)

        setDias(quantidadeDeDiasRestantes)
        setHoras(quantidadeDeHorasRestantes)
        setMinutos(quantidadeDeMinutosRestantes)
        setSegundos(quantidadeDeSegundosRestantes)
    }

    setTimeout(atualizarTempo,1000)
    return  [
       dias,
       horas,
       minutos,
       segundos,
       tempoRestanteEmMs
    ]
}

export default calcTempo;
