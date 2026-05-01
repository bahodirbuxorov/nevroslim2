<script setup lang="ts">
import moment from 'moment'

interface TimeLeft {
  days: string
  hours: string
  minutes: string
  seconds: string
}

const timeLeft = ref<TimeLeft>({
  days: '00',
  hours: '12',
  minutes: '25',
  seconds: '45'
})

const targetDate = ref(moment().add(12, 'hours').add(25, 'minutes').add(45, 'seconds'))

let intervalId: number | null = null

const countdown = () => {
  const now = moment()
  const diff = moment.duration(targetDate.value.diff(now))

  if (diff.asSeconds() <= 0) {
    timeLeft.value = {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00'
    }
    if (intervalId) {
      clearInterval(intervalId)
    }
    return
  }

  timeLeft.value = {
    days: Math.floor(diff.asDays()).toString().padStart(2, '0'),
    hours: diff.hours().toString().padStart(2, '0'),
    minutes: diff.minutes().toString().padStart(2, '0'),
    seconds: diff.seconds().toString().padStart(2, '0')
  }
}

onMounted(() => {
  countdown()
  intervalId = setInterval(countdown, 1000) as unknown as number
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div
    class="flex justify-center items-center gap-4 md:gap-8 border bg-white w-fit mx-auto px-8 py-4 rounded-xl shadow-md shadow-primary"
    data-aos="fade-up"
    data-aos-delay="200"
  >
    <div class="flex flex-col items-center">
      <div class="relative">
        <div class="text-5xl md:text-[108px] font-medium text-[#131313] mb-2">
          {{ timeLeft.days }}
        </div>
      </div>
      <div class="text-sm md:text-base uppercase tracking-wider text-[#131313] font-medium">
        КУН
      </div>
    </div>

    <div class="flex flex-col items-center">
      <div class="text-5xl md:text-[108px] font-medium text-[#131313] mb-2">
        {{ timeLeft.hours }}
      </div>
      <div class="text-sm md:text-base uppercase tracking-wider text-[#131313] font-medium">
        СОАТ
      </div>
    </div>

    <div class="flex flex-col items-center">
      <div class="text-5xl md:text-[108px] font-medium text-[#131313] mb-2">
        {{ timeLeft.minutes }}
      </div>
      <div class="text-sm md:text-base uppercase tracking-wider text-[#131313] font-medium">
        ДАҚИҚА
      </div>
    </div>

    <div class="flex flex-col items-center">
      <div class="relative">
        <div class="text-5xl md:text-[108px] font-medium text-[#131313] mb-2">
          {{ timeLeft.seconds }}
        </div>
      </div>
      <div class="text-sm md:text-base uppercase tracking-wider text-[#131313] font-medium">
        СОНИЯ
      </div>
    </div>
  </div>
</template>
