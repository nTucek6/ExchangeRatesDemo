import { defineStore } from 'pinia'

export const useCalculateStore = defineStore('calculate', () => {
  function getLowestValue(values: number[]): number {
    let lowValue: number = values[0]

    values.forEach((number) => {
      if (number < lowValue) {
        lowValue = number
      }
    })
    return Number(lowValue.toFixed(3))
  }

  function getHighestValue(values: number[]): number {
    let highValue: number = values[0]

    values.forEach((number) => {
      if (number > highValue) {
        highValue = number
      }
    })
    return Number(highValue.toFixed(3))
  }

  function getAverageValue(values: number[]): number {
    const valueSum = values.reduce((acc, curr) => acc + curr, 0)
    const averageValue = valueSum / values.length
    return Number(averageValue.toFixed(3))
  }

  return { getLowestValue, getHighestValue, getAverageValue }
})
