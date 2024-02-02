import React from 'react'
import { Chart } from "react-google-charts";
import styles from './Grafico.module.css';
import { useQueryClient } from 'react-query';



const Grafico = () => {
  const data = [
    ["Task", "Hours per Day"]
  ];
  
 const options = {
    title: "Meus Treinos",
    backgroundColor: 'transparent',
  };


  const queryClient = useQueryClient()
  const queryKey =  'buscarTreinos2'

  const treinos = queryClient.getQueryData(queryKey);
  
  const musculosTreinados = new Map();

  let array = []
  const buscarMusculos = treinos && treinos.forEach((treino) => array.push(treino.musculos.toString()))
  array = array.toString(',')
  array = array.split(',')

  for(let i of array){
      if(!musculosTreinados.has(i)){
        musculosTreinados.set(i,1)
      }else{
        musculosTreinados.set(i,musculosTreinados.get(i)+ 1)
      }
  }
  
  for(let [key,value] of musculosTreinados){
    data.push([`${key}(${value})`,value])
  }

  return (
    <div className={styles.myChartContainer}>
         <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"1000px"}
          height={"500px"}
        />
    </div>
  )
}

export default Grafico