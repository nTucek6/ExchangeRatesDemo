import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { LatestDTO } from '@/interface/latest.model'
import type { CurrencyDTO } from '@/interface/currency.model'
import type { HistoryPeriodDTO } from '@/interface/history.model'

export const useApiStore = defineStore('api', () => {
  const url = 'http://localhost:8080/'

  const latest = ref<LatestDTO[]>()
  const currency = ref<CurrencyDTO[]>()

  const history = ref<LatestDTO[]>()

  const historyPeriod = ref<HistoryPeriodDTO[]>()

  const convertValue = ref<number>(0)

  async function getLatestData() {
    const response = await fetch(url + 'getLatest')
    latest.value = await response.json()
  }

  async function getCurrency() {
    try {
      const response = await fetch(url + 'getCurrency')
      currency.value = await response.json()
    } catch (error: any) {
      console.log(error)
    }
  }

  async function convertCurrency(value: number, from: string, to: string) {
    if (value != 0) {
      const params = new URLSearchParams()
      params.append('value', String(value))
      params.append('from', from)
      params.append('to', to)
      const response = await fetch(url + 'convertCurrency?' + params.toString())
      convertValue.value = await response.json()
    } else {
      convertValue.value = 0
    }
  }

  async function getCurrencyHistory(date: string, currency: string) {
    const params = new URLSearchParams()
    params.append('date', date)
    currency != '' ? params.append('currency', currency) : null
    const response = await fetch(url + 'getCurrencyHistory?' + params.toString())
    history.value = await response.json()
  }

  async function getHistoryPeriod(dateFrom: string, dateTo: string, currency: string) {
    const params = new URLSearchParams()
    params.append('dateFrom', dateFrom)
    params.append('dateTo', dateTo)
    params.append('currency', currency)
    try {
      const response = await fetch(url + 'getTimeSeries?' + params.toString())
      historyPeriod.value = await response.json()
    } catch (error: any) {
      console.log(error)
    }
  }

  function resetConverValue() {
    convertValue.value = 0
  }

  return {
    latest,
    currency,
    history,
    historyPeriod,
    getLatestData,
    convertValue,
    convertCurrency,
    getCurrency,
    getCurrencyHistory,
    getHistoryPeriod,
    resetConverValue
  }
})
