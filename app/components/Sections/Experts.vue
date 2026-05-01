<template>
  <section
    id="experts"
    class="py-10 lg:py-16 overflow-hidden relative"
  >
    <div
      class="absolute -z-1 left-0"
    >
      <img
        src="/svg/puls.svg"
        alt="s"
      >
    </div>
    <div
      class="absolute -z-1 right-0 bottom-0"
    >
      <img
        src="/svg/dna.svg"
        alt="s"
      >
    </div>
    <div class="container ">
      <h1
        data-aos="fade-up"
        class="text-[#003262] shine-text text-center font-medium text-[24px] lg:text-[32px]  xl:text-[40px] max-w-[732px] mx-auto"
      >
        Нега "Шифокорлар" Неврослимни тавсия қиладилар?
      </h1>

      <div
        class="mt-10"
        data-aos="fade-up"
      >
        <Swiper
          :loop="true"
          :thumbs="{ swiper: thumbsSwiper }"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }"
          :modules="modules"
          :breakpoints="{
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 20
            }
          }"
        >
          <SwiperSlide
            v-for="(item, index) in experts"
            :key="index"
          >
            <div class="bg-gray-200 rounded-[5px] h-[446px] relative">
              <a
                data-fancybox
                :href="item.url"
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              >
                <IconsPlayBtn />
              </a>
              <img
                :src="thumbnail(item.url)"
                alt="Img"
                class="w-full h-full object-cover"
              >
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div class="flex items-center gap-2 lg:gap-4 justify-center mt-4 lg:mt-7">
        <Swiper
          :loop="true"
          :free-mode="true"
          :watch-slides-progress="true"
          :modules="modules"
          :navigation="{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom'
          }"
          :breakpoints="{
            320: {
              slidesPerView: 5,
              spaceBetween: 8
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 12
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 12
            },
            1280: {
              slidesPerView: 8,
              spaceBetween: 12
            }
          }"
          class="max-w-[600px]"
          @swiper="setThumbsSwiper"
        >
          <SwiperSlide
            v-for="(item, index) in experts"
            :key="index"
          >
            <div class="bg-gray-200 rounded-[5px] overflow-hidden h-20 lg:h-24 cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
              <img
                :src="thumbnail(item.url)"
                alt="Thumbnail"
                class="w-full h-full object-cover"
              >
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import { Autoplay, Navigation, FreeMode, Thumbs } from 'swiper/modules'
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

const modules = [Autoplay, Navigation, FreeMode, Thumbs]

const thumbsSwiper = ref(null)

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}

const { getThumbnail } = useYoutubeThumbnail()

const thumbnail = computed(() => {
  return (link) => {
    return getThumbnail(link)
  }
})

Fancybox.bind('[data-fancybox]', {
})

const experts = [
  {
    url: 'https://www.youtube.com/embed/PCltK1XzrBk'
  },
  {
    url: 'https://www.youtube.com/embed/RHIIYA8P1DI'
  },
  {
    url: 'https://youtube.com/shorts/-irnXTr4-OU?feature=share'
  },
  {
    url: 'https://www.youtube.com/embed/ZbSPn_FnPyI'
  },
  {
    url: 'https://www.youtube.com/embed/PCltK1XzrBk'
  }
]
</script>

<style scoped>
.swiper-slide-thumb-active .bg-gray-200 {
  opacity: 1;
  border: 2px solid #5D8AA8;
}
</style>
