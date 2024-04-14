import { defineStore } from 'pinia'

export const useDateFormatStore = defineStore('dateFormat', () => {
  function formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  function getToday(): Date {
    return new Date()
  }

  function getPreviousMonth(): Date {
    const monthBefore = new Date()
    monthBefore.setMonth(monthBefore.getMonth() - 1)
    return monthBefore
  }

  function getFiveDaysAgo(): Date {
    const fiveDaysAgo = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
    return fiveDaysAgo
  }

  function getYesterday(): Date {
    const oneDayAgo = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    return oneDayAgo
  }

  function formatVueDate(date: Date) {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return `${day}.${month}.${year}.`
  }

  return { formatDate, getToday, getPreviousMonth, getFiveDaysAgo, getYesterday, formatVueDate }
})
