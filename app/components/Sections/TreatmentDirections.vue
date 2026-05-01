<template>
  <section
    id="treatment"
    class="py-10 lg:py-16 overflow-hidden"
  >
    <div class="container ">
      <h1
        data-aos="fade-up"
        class="text-[#003262] shine-text text-center font-medium text-[24px] lg:text-[32px]  xl:text-[40px] max-w-[732px] mx-auto"
      >
        "Неврослим" қандай ҳолатларда ёрдам беради?
      </h1>
      <div class="mt-6 lg:mt-10 flex items-center flex-wrap justify-center gap-2">
        <div
          v-for="(item, index) in leftItems"
          :key="index"
          class="bubble"
          data-aos="flip-left"
          :data-aos-delay="index * 100"
        >
          {{ item.title }}
          <span class="w-8 h-8 min-w-8 lg:w-10 lg:h-10 lg:min-w-10 xl:w-15 xl:h-15 xl:min-w-15 rounded-full bg-gray-200 overflow-hidden">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-contain"
            >
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const leftItems = [
  {
    title: 'Бирор иш қилиш ёқмаслиги',
    image: '/png/treatment1.png'
  },
  {
    title: 'Уйқусизлик, ваҳима',
    image: '/png/treatment2.png'
  },
  {
    title: 'Депрессия',
    image: '/png/treatment3.png'
  },
  {
    title: 'Тушкун ҳолатда юриш',
    image: '/png/treatment4.png'
  },
  {
    title: 'Сабабсиз бетоқатлик',
    image: '/png/treatment5.png'
  },
  {
    title: 'Зеҳн ва хотиранинг пастлиги',
    image: '/png/treatment7.png'
  },
  {
    title: 'Асаб толиқиши',
    image: '/png/treatment6.png'
  },
  {
    title: 'Юрак соҳасида оғриқ ва юрак ўйнаши',
    image: '/png/treatment9.png'
  },
  {
    title: 'Қўрқув',
    image: '/png/treatment10.png'
  },
  {
    title: 'Бош оғриғи, мигрень',
    image: '/png/treatment8.png'
  }
]
</script>

<style scoped>
.bubble {
    background: #FFFFFF;
    box-shadow: 4px 5px 10.6px 0px #D1D7ED;
    padding: 5px 24px;
    display: inline-flex;
    width: fit-content;
    justify-content: space-between;
    align-items: center;
    gap: 11px;
    font-size: 20px;
    font-weight: 500;
    border-radius: 30px 30px 0px 30px;

}

@media screen and (max-width: 1024px) {
.bubble{
    padding: 5px 16px;
    font-size: 18px;
    gap: 6px;
}
}

@media screen and (max-width: 768px) {
    .bubble{
        padding: 4px 12px;
        font-size: 16px;
    }
}
</style>
