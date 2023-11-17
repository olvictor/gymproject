export const imc = (peso, altura) => {
  const calcIMC = peso / (altura * altura);

  const tabelaIMC = [
    {
      classificacao: "Muito abaixo do peso",
      imcMin: 0,
      imcMax: 16.9,
    },
    {
      classificacao: "Abaixo do peso",
      imcMin: 17,
      imcMax: 18.4,
    },
    {
      classificacao: "Peso normal",
      imcMin: 18.5,
      imcMax: 24.9,
    },
    {
      classificacao: "Acima do peso",
      imcMin: 25,
      imcMax: 29.9,
    },
    {
      classificacao: "Obesidade grau 1",
      imcMin: 30,
      imcMax: 34.9,
    },
    {
      classificacao: "Obesidade grau 2",
      imcMin: 35,
      imcMax: 40,
    },
    {
      classificacao: "Obesidade grau 3",
      imcMin: 40,
      imcMax: 999,
    },
  ];

  const resultadoIMC = tabelaIMC.filter((i) => {
    return calcIMC.toFixed(1) >= i.imcMin && calcIMC.toFixed(1) <= i.imcMax;
  });

  return {
    resultado: resultadoIMC,
    imc: calcIMC.toFixed(2),
  };
};
