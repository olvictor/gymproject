export const calcularTMB = (peso,sexo,nivelDeAtividade) =>{
    let TMB = ''
    
    if(sexo === 'masculino' && nivelDeAtividade === 'leve'){
        TMB = (((0.063 * peso + 2.896) * 239) + 400).toFixed(2)
    }
    if(sexo === 'masculino' && nivelDeAtividade === 'moderado'){
        TMB = (((0.063 * peso + 2.896) * 239) + 550).toFixed(2)

    }
    if(sexo === 'masculino' && nivelDeAtividade === 'pesado'){
        TMB = (((0.063 * peso + 2.896) * 239) + 700).toFixed(2)
    }

    if(sexo === 'feminino' && nivelDeAtividade === 'leve'){
        TMB = (((0.062 * peso + 2.036) * 239) + 400).toFixed(2)
    }
    if(sexo === 'feminino' && nivelDeAtividade === 'moderado'){
        TMB = (((0.062 * peso + 2.036) * 239) + 500).toFixed(2)
    }
    if(sexo === 'feminino' && nivelDeAtividade === 'pesado'){
        TMB = (((0.062 * peso + 2.036) * 239) + 600).toFixed(2)
    }

    return TMB
}