<template>
  <div class="relative">
    <div
      class="absolute -z-1 inset-0 bg-[url('/svg/bg-1.svg')] bg-no-repeat bg-center bg-cover opacity-60"
    />
    <div class="container">
      <h1
        data-aos="fade-left"
        class="text-center  text-[#003262] font-semibold text-[24px] px-4 sm:text-[32px] pt-6 lg:pt-10 lg:text-[42px] xl:text-[54px] leading-[1.4] max-w-[804px] mx-auto"
      >
        🌿 <span class="shine-text">Ҳеч қандай кимёвий дориларсиз табиий гиёҳлар билан даъволанишни хохлайсизми ?</span>
      </h1>
      <div class="max-w-[604px] mt-6 mx-auto flex flex-col items-center">
        <img
          src="/png/hero-img.png"
          alt="hero-img"
          class="w-full h-full translate object-cover"
        >
        <UButton
          size="xl"
          class="rounded-full px-12 text-xl font-bold mt-8 shadow-lg hover:scale-105 transition-transform"
          color="primary"
          @click="handleConsultClick"
        >
          Маслаҳат олиш
        </UButton>
      </div>

      <div>
        <div class="grid grid-cols-[3fr_1fr] mt-16 lg:mt-4 lg:grid-cols-3 items-center">
          <div class="inline-flex gap-5 flex-col">
            <div
              class="card"
              data-aos="fade-left"
            >
              Асабингизни тинчлантиради
              <span class="absolute top-0 right-0 w-2 h-2 lg:w-4 lg:h-4 bg-[#0000FF99] rounded-full" />
            </div>
            <div
              class="card flex gap-2 items-center"
              data-aos="fade-left"
            >
              Уйқуни яхшилаб кайфиятингизни кўтаради
              <div class="bg-[#CCD7F7] w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 rounded-full" />
            </div>
          </div>
          <div class="relative flex items-center justify-end w-full">
            <img
              src="/svg/hero-card1.svg"
              data-aos="fade-right"
              alt="card1"
              class="absolute w-[120px] md:w-[150px] z-1 -translate-x-[70%]"
            >
            <img
              src="/svg/hero-card2.svg"
              data-aos="fade-right"
              alt="card2"
              class="absolute w-[120px] md:w-[150px] z-2 -translate-y-[40%]"
            >
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

const openConsultPopup = inject<() => void>('openConsultPopup')

function handleConsultClick() {
  if (openConsultPopup) {
    openConsultPopup()
  }
}

Fancybox.bind('[data-fancybox]', {
})
</script>

<style scoped>
.card {
    background: #fff;
    padding: 12px 20px;
    border-radius: 30px;
    box-shadow: 4px 4px 13.5px 0px #D1D7EDCC;
    color: #003262;
    font-size: 14px;
    width: fit-content;
    position: relative;
}

@media (max-width: 1024px) {
    .card {
        padding: 8px 16px;
    }
}

@media (max-width: 768px) {
    .card {
        padding: 6px 12px;
    }
}
</style>
