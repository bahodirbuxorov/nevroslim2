<template>
  <section
    id="useful"
    class="py-10 lg:py-16"
  >
    <div class="container">
      <h1
        data-aos="fade-up"
        class="text-[24px] shine-text lg:text-[32px]  xl:text-[40px] text-[#003262] font-medium text-center max-w-[932px] mx-auto"
      >
        Неврослим таркибидаги "Гиёҳ" лар нималарга фойда беради?
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mt-6 lg:mt-10">
        <div
          v-for="(product, index) in products"
          :key="index"
          data-aos="fade-up"
          data-aos-delay="index * 100"
          class="flex items-center gap-4 p-2 bg-[#FDFEFF] rounded-lg"
        >
          <div class="w-[30%] min-w-[30%] h-32 bg-[#E8EFFF] rounded-lg">
            <img
              :src="product.image"
              alt="Product"
              class="w-full h-full object-contain translate"
            >
          </div>
          <div>
            <h1 class="text-base md:text-xl lg:text-2xl font-medium text-[#003262]">
              {{ product.title }}
            </h1>
            <p class="text-[#01101E] text-xs md:text-base lg:text-lg mt-1 md:mt-3">
              {{ product.description }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-8">
        <UButton
          id="composition-consult-btn"
          size="xl"
          class="rounded-full px-8 text-lg font-bold"
          color="primary"
          @click="handleConsultClick"
        >
          Маслаҳат олиш
        </UButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const scrollToConsultForm = inject<() => void>('scrollToConsultForm')

function handleConsultClick() {
  if (scrollToConsultForm) {
    scrollToConsultForm()
  }
}
const products = [
  {
    title: 'Гинкго билоба',
    description: 'Қон айланишини яхшилайди ва қон томирларда тўқилмаларни очиб беради.',
    image: '/webp/1.webp'
  },
  {
    title: 'Кора андиз',
    description: 'Қонни суюлтирувчи, мияда қон айланишини яхшилаб беради ва шу сабабли мияга кислород тўлиқ етиб боради.',
    image: '/webp/2.png'
  },
  {
    title: 'Мумиё',
    description: 'Суякларни мустаҳкамлаб беради, ерта қаришни олдини олади ва терини ёшартиради.',
    image: '/webp/3.png'
  },
  {
    title: 'Валериана',
    description: 'Стресс ва ташвишларни энгиллаштирадиган табиий восита сифатида қабул қилинади, дам олишга ёрдам беради ва уйқу сифатини яхшилайди.',
    image: '/webp/4.png'
  },
  {
    title: 'Занжабил',
    description: 'Занжабил таркибидаги моддалар иммунитет тизимини мустаҳкамлашга ёрдам бериб, бу касалликнинг олдини олиш учун муҳимдир.',
    image: '/webp/5.png'
  },
  {
    title: 'Долчин',
    description: 'Суякларнинг соғлиғини яхшилайди. Қон босимини пасайтиради. Томоқ, ошқозон инфекцияларини даъволашда ёрдам беради.',
    image: '/webp/6.png'
  }
]
</script>
