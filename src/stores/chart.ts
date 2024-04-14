import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Chart } from 'chart.js/auto'

export const useChartStore = defineStore('chart', () => {
  const chart = ref()

  function InitChart() {
    const chartInstance = new Chart(chart.value, {
      type: 'line',
      data: {
        datasets: [],
        labels: undefined
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    })
    chart.value.chart = chartInstance
  }

  function addChartData(newData: any, selectedCurrency: string[]) {
    const newDataset = {
      label: selectedCurrency[selectedCurrency.length - 1],
      data: newData.map((x: { currencyValue: any }) => x.currencyValue),
      borderColor: getRandomColor()
    }
    chart.value.chart.data.datasets.push(newDataset)

    chart.value.chart.data.labels = newData.map((x: { date: any }) => x.date)

    chart.value.chart.update()
  }

  function removeChartData(removeData: string) {
    chart.value.chart.data.datasets = chart.value.chart.data.datasets.filter(
      (dataset: any) => dataset.label !== removeData
    )

    chart.value.chart.update()
  }

  function removeAllChartData() {
    chart.value.chart.data.datasets = []
    chart.value.chart.data.labels = undefined

    chart.value.chart.update()
  }

  function getRandomColor() {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)

    return (
      '#' +
      r.toString(16).padStart(2, '0') +
      g.toString(16).padStart(2, '0') +
      b.toString(16).padStart(2, '0')
    )
  }

  return { chart, InitChart, addChartData, removeChartData, removeAllChartData }
})
