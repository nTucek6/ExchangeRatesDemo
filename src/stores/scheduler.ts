import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSchedulerStore = defineStore('scheduler', () => {
  const timeoutId = ref()
  const intervalId = ref()

  const runAtMidnightCalled = ref();

  function scheduleMidnightTask() {
    const now = new Date()
    const midnight = new Date(now)
    midnight.setHours(24, 0, 0, 0)

    const timeUntilMidnight: number = midnight.getTime() - now.getTime()

    timeoutId.value = setTimeout(() => {
      runMidnightTask()
      scheduleDailyTask()
    }, timeUntilMidnight)
  }

  function scheduleDailyTask() {
    intervalId.value = setInterval(
      () => {
        runMidnightTask()
      },
      24 * 60 * 60 * 1000
    )
  }

  function runMidnightTask() {
    console.log('Task running at midnight')
    // Add your custom code here
    runAtMidnightCalled.value = new Date().getTime()
  }

  function clearScheduledTask() {
    if (timeoutId.value) {
      console.log('Called t')
      clearTimeout(timeoutId.value)
      timeoutId.value = null
    }
    if (intervalId.value) {
      console.log('Called i')
      clearTimeout(intervalId.value)
      intervalId.value = null
    }
  }

  return { runAtMidnightCalled ,scheduleMidnightTask, clearScheduledTask }
})
