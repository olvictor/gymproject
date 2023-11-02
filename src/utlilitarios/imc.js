
export const imc = (peso,altura) => {

    const calcIMC = peso/(altura * altura)


    const tabelaIMC = [
        {
            classificacao: 'Muito abaixo do peso',
            pesoMin: 0 ,
            pesoMax: 16.9
        },
        {
            classificacao: 'Abaixo do peso',
            pesoMin: 17 ,
            pesoMax: 18.4
        },
        {
            classificacao: 'Peso normal',
            pesoMin: 18.5,
            pesoMax: 24.9
        },
        {
            classificacao: 'Acima do peso',
            pesoMin: 25 ,
            pesoMax: 29.9
        },
        {
            classificacao: 'Obesidade grau 1',
            pesoMin: 30,
            pesoMax: 34.9
        },
        {
            classificacao: 'Obesidade grau 2',
            pesoMin: 35,
            pesoMax: 40
        },
        {
            classificacao: 'Obesidade grau 3',
            pesoMin: 40,
            pesoMax: 999
        }
    ]

   const resultadoIMC =  tabelaIMC.filter((i) =>{
        return calcIMC >= i.pesoMin && calcIMC <= i.pesoMax
   })



   return {
   ...resultadoIMC[0],
   imc: calcIMC.toFixed(1)
   }
}
