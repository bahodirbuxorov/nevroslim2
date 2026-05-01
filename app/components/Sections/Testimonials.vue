<template>
  <section
    id="testimonials"
    class="py-10 lg:py-16 overflow-hidden"
  >
    <div class="container ">
      <h1
        data-aos="fade-up"
        class="text-[#003262] shine-text text-center font-medium text-[24px] lg:text-[32px]  xl:text-[40px] max-w-[732px] mx-auto"
      >
        Марҳамат натижаларга ўзингиз гувоҳ бўлинг:
      </h1>

      <div
        class="mt-6 lg:mt-10"
        data-aos="fade-up"
        data-aos-delay="200"
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
            v-for="(item, index) in clients"
            :key="index"
          >
            <div class="bg-gray-200 rounded-[5px] overflow-hidden h-[446px] relative">
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

      <div
        class="mt-4 flex items-center gap-2"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <Swiper
          :loop="true"
          :free-mode="true"
          :watch-slides-progress="true"
          :modules="modules"
          :navigation="{
            nextEl: '.swiper-button-next-custom1',
            prevEl: '.swiper-button-prev-custom1'
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
          @swiper="setThumbsSwiper"
        >
          <SwiperSlide
            v-for="(item, index) in clients"
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

const clients = [
  { url: 'https://youtube.com/shorts/gWgsIkBhJfo?feature=share' },
  { url: 'https://youtube.com/shorts/oTCpi0GzWWE?feature=share' },
  { url: 'https://youtube.com/shorts/_XRIeLWejJU' },
  { url: 'https://youtube.com/shorts/VGarj-9-blY' },
  { url: 'https://youtube.com/shorts/1lmIMLciYZo' },
  { url: 'https://youtube.com/shorts/6YJXqjVC6Zg' }
  // {
  //   url: 'https://youtube.com/shorts/tmZ-BWFRfcQ'
  // },
  // {
  //   url: 'https://youtube.com/shorts/TQJh4FQC-nA'
  // },
  // {
  //   url: 'https://youtube.com/shorts/ynND1R6gnvY'
  // },
  // {
  //   url: 'https://youtube.com/shorts/bfK64NZYuEk'
  // },
  // {
  //   url: 'https://youtube.com/shorts/9Y6bjmTgwmw'
  // },
  // {
  //   url: 'https://youtube.com/shorts/vji9E06dHPg'
  // },
  // {
  //   url: 'https://youtube.com/shorts/MoF-rWkpZv0'
  // },
  // {
  //   url: 'https://youtube.com/shorts/g5otcUJdi9g'
  // },
  // {
  //   url: 'https://youtube.com/shorts/KdH8rOOlcsw'
  // },
  // {
  //   url: 'https://youtube.com/shorts/qxLp85Zk8dg'
  // },
  // {
  //   url: 'https://youtube.com/shorts/p5UayRys8Oo'
  // },
  // {
  //   url: 'https://youtube.com/shorts/lPxsyxK3Fns?feature=share'
  // }
]
</script>

<style scoped>
.swiper-slide-thumb-active .bg-gray-200 {
  opacity: 1;
  border: 2px solid var(--primary-color, #0066cc);
}
</style>
