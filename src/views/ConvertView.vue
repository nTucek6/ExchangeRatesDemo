<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useApiStore } from '@/stores/api'
import ExchangeIcon from '@/assets/icons/exchange.png'

const api = useApiStore()

const result = computed(() => api.convertValue)

const currency = computed(() => api.currency)

const from = ref()
const to = ref()

const value = ref()

const disableInput = ref<boolean>(true)

onMounted(async () => {
  currency.value == undefined ? await api.getCurrency() : null
})

watch(value, () => {
  convert()
})

function convert() {
  if (from.value != null && to.value != null) {
    api.convertCurrency(value.value, from.value, to.value)
  }
}

watch([from, to], () => {
  handleSelectChange()
})

function handleSelectChange() {
  if (from.value != null && to.value != null) {
    disableInput.value = false
  } else {
    disableInput.value = true
    value.value = null
  }

  api.resetConverValue()
  if (value.value != undefined && value.value != 0) convert()
}

//@select="handleSelectChange"
</script>

<template>
  <div id="input-form">
    <div class="i-item">
      <input type="number" v-model="value" :disabled="disableInput" placeholder="0" />
      <Multiselect
        v-model="from"
        :options="currency"
        mode="single"
        :searchable="true"
        class="currency-select"
        placeholder="Select currency:"
      />
    </div>

    <div id="icon" class="i-item">
      <img :src="ExchangeIcon" />
    </div>

    <div class="i-item">
      <input type="text" v-model="result" disabled />
      <Multiselect
        v-model="to"
        :options="currency"
        mode="single"
        :searchable="true"
        class="currency-select"
        placeholder="Select currency:"
      />
    </div>
  </div>
</template>

<style scoped>
#input-form {
  padding: 25px 0;
}

#input-form > * {
  display: flex;
  justify-content: center;
}

.currency-select {
  width: 20%;
  margin: 0 10px;
}

#icon {
  width: 100%;
  margin: 5px 0;
}

#icon img {
  width: 25px;
}
</style>
