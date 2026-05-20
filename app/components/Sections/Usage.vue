<template>
  <section class="py-10 lg:py-16 relative">
    <div
      class="absolute -z-1 inset-0 bg-[url('/svg/bg-2.svg')] bg-no-repeat bg-center bg-cover opacity-60"
    />
    <div class="container">
      <h1
        data-aos="fade-up"
        class="text-[#003262] shine-text font-medium text-[24px] lg:text-[32px] xl:text-[40px] max-w-[760px] mx-auto text-center"
      >
        "<span class="text-primary">Неврослим</span>" ни неча ёшдан истемол қилса бўлади?
      </h1>
      <div class="mt-6 lg:mt-10 max-w-[560px] lg:max-w-full mx-auto grid lg:grid-cols-3 gap-4 lg:gap-6">
        <div
          v-for="(usage, index) in usages"
          :key="usage.id"
          class="card rounded-[20px]"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="p-4 lg:p-6 flex items-center gap-2">
            <span class="w-12 h-12 min-w-12 lg:w-15 lg:h-15 lg:min-w-15 rounded-full bg-gray-200 overflow-hidden">
              <img
                :src="usage.avatar"
                alt="Us"
                class="w-full h-full object-cover"
              >
            </span>
            <div>
              <h1 class="text-black font-medium text-lg lg:text-xl">
                {{ usage.title }}
              </h1>
            </div>
          </div>

          <div class="h-[130px]">
            <img
              :src="usage.image"
              alt="Usage Image"
              class="w-full h-full object-cover"
            >
          </div>
          <ul class="py-4 px-8 lg:py-6 lg:px-10">
            <li
              v-for="item in usage.items"
              :key="item"
              class="list-disc text-sm lg:text-base"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <div class="flex justify-center mt-8">
        <UButton
          id="usage-consult-btn"
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
const usages = [
  {
    title: '3 ёшдан 12 ёшгача',
    description: 'Nevroslim',
    image: '/png/usage1.png',
    avatar: '/png/usage-avatar.png',
    items: [
      'Болаларда зехн ва хотирани кучайтиради',
      'Бўшашиш ва йиғлоқилик',
      'Суякларини мустахкамлайди'
    ]
  },
  {
    title: '12 ёшдан 30 ёшгача',
    description: 'Nevroslim',
    image: '/png/usage2.png',
    avatar: '/png/usage-avatar.png',
    items: [
      'Асабларини тинчлантириб беради',
      'Сўз ёдлаш қобилияти',
      'Кайфиятни кўтариб уйқуни яхшилайди'
    ]
  },
  {
    title: '30 ёшдан 65 ёшгача',
    description: 'Nevroslim ',
    avatar: '/png/usage-avatar.png',
    image: '/png/usage3.png',
    items: [
      'Мияда қон айланишни яхшилайди',
      'Юрак оғриғи ва юрак ўйнашида фойдали',
      'Қон босимиортиши ва қабзиятда самарали'
    ]
  }

]
</script>

<style scoped>
.card{
    box-shadow: 4px 5px 10.6px 0px #D1D7ED;
    background-color: white;
}
</style>
