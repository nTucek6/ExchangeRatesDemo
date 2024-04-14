<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useApiStore } from '@/stores/api'
import { useDateFormatStore } from '@/stores/date-actions'
import { useCalculateStore } from '@/stores/calculate'
import type { Overview } from '@/interface/overview.model'
import { useChartStore } from '@/stores/chart'

const api = useApiStore()

const dateFormat = useDateFormatStore()

const calculateStore = useCalculateStore()

const chartStore = useChartStore()

const currencyOptions = computed(() => api.currency)

const data = computed(() => api.historyPeriod)

const chart = ref()

const selectedCurrency = ref<string[]>([])

const dateFrom = ref(dateFormat.getFiveDaysAgo())
const dateTo = ref(dateFormat.getToday())

const overview = ref<Overview[]>([])

onMounted(async () => {
  chartStore.chart = chart.value
  chartStore.InitChart()
  currencyOptions.value == undefined ? await api.getCurrency() : null

  if (currencyOptions.value != undefined) {
    selectedCurrency.value.push('EUR')
    handleSelectChange(selectedCurrency.value[0])
  }
})

async function getHistoryData(value: string) {
  await api.getHistoryPeriod(
    dateFormat.formatDate(dateFrom.value),
    dateFormat.formatDate(dateTo.value),
    value
  )
}

async function handleSelectChange(newValue: string) {
  await getHistoryData(newValue)
  newChartData(newValue)
}
async function handleDeselectChange(event: any) {
  chartStore.removeChartData(event)
  removeOverviewData(event)
}

function handleDateFrom() {
  chartStore.removeAllChartData()
  overview.value = []

  selectedCurrency.value.forEach(async (c) => {
    await getHistoryData(c)
    newChartData(c)
  })
}

function handleDateTo() {
  console.log(dateFrom.value)
  chartStore.removeAllChartData()
  overview.value = []

  selectedCurrency.value.forEach(async (c) => {
    await getHistoryData(c)
    newChartData(c)
  })
}

function addOverviewData(newData: any, isoCode: string) {
  const values = newData.map((x: { currencyValue: any }) => x.currencyValue)

  let currency: any = isoCode

  if (currencyOptions.value != undefined) {
    currency = currencyOptions.value.find((find) => find.value == isoCode)
  }

  const lowestValue: number = calculateStore.getLowestValue(values)

  const highestValue: number = calculateStore.getHighestValue(values)

  const averageValue: number = calculateStore.getAverageValue(values)

  overview.value.push({
    isoCode: isoCode,
    currency: currency.label,
    lowValue: lowestValue,
    highestValue: highestValue,
    averageValue: averageValue
  })
}

function removeOverviewData(removeData: string) {
  overview.value = overview.value.filter((dataset: Overview) => dataset.isoCode !== removeData)
}

function newChartData(newValue: string) {
  if (data.value != undefined) {
    const chart1 = data.value
      .filter((x) => {
        return x.isoCode == newValue
      })
      .map((x) => {
        return { date: x.date, currencyValue: x.currencyValue }
      })

    addOverviewData(chart1, newValue)
    chartStore.addChartData(chart1, selectedCurrency.value)
  }
}
</script>

<template>
  <main>
    <div id="info">
      <h3>Base currency: United States Dollar</h3>
    </div>

    <div id="form">
      <div class="date-input">
        <label>Date from:</label>
        <VueDatePicker
          v-model="dateFrom"
          :max-date="dateFormat.getYesterday()"
          :format="dateFormat.formatVueDate"
          @update:model-value="handleDateFrom"
        />
      </div>
      <div id="currency-select">
        <Multiselect
          v-model="selectedCurrency"
          :options="currencyOptions"
          mode="tags"
          placeholder="Select a currency"
          :searchable="true"
          @select="handleSelectChange"
          @deselect="handleDeselectChange"
        />
      </div>
      <div class="date-input">
        <label>Date to:</label>
        <VueDatePicker
          v-model="dateTo"
          :max-date="dateFormat.getToday()"
          :format="dateFormat.formatVueDate"
          @update:model-value="handleDateTo"
        />
      </div>
    </div>

    <div id="currency-chart">
      <div id="chart-container">
        <canvas ref="chart"></canvas>
      </div>

      <div id="currency-info">
        <div v-for="o in overview" :key="o.currency" class="info-item">
          <h4>{{ o.currency }} :</h4>
          <span>Lowest value: {{ o.lowValue }}</span>
          <span>Average value: {{ o.averageValue }}</span>
          <span>Highest value: {{ o.highestValue }}</span>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
#info h3 {
  text-align: center;
}

#form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  /*width: 80%; */
}

#currency-select {
  width: 30%;
  margin: 0 10px;
}

#currency-select .multiselect {
  margin: 0;
}

.date-input {
  width: 15%;
}

.date-input input {
  width: 100%;
}

#currency-chart {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

#chart-container {
  height: 500px;
}

#chart-container > canvas {
  height: 100%;
}

#currency-info {
  height: 500px;
  overflow: auto;
}

#currency-info .info-item {
  display: flex;
  flex-direction: column;
  padding: 0 25px;
}

#currency-info .info-item h4 {
  margin-bottom: 5px;
}
</style>
@/stores/date-actions
