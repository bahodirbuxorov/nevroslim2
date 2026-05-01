<template>
  <section
    id="about"
    class="py-10 lg:py-16 overflow-hidden"
  >
    <div class="container flex flex-col lg:flex-row gap-12 items-center justify-between">
      <div>
        <h1
          data-aos="fade-left"
          class="text-[#003262] shine-text font-medium text-[24px] lg:text-[32px]  xl:text-[40px]"
        >
          Биз ҳақимизда қисқача:
        </h1>
        <div class="border-dashed border-l-2 border-l-[#5D8AA8] mt-10 flex flex-col gap-8 lg:gap-10 xl:gap-12">
          <div
            v-for="(feature, index) in features"
            :key="feature"
            class="flex items-center"
            data-aos="fade-right"
            :data-aos-delay="index * 100"
          >
            <div class="flex items-center">
              <div class="border border-[#5D8AA8] w-6 lg:w-8 xl:w-12" />
              <span class="w-2 h-2 rounded-full bg-[#5D8AA8]" />
            </div>
            <div class="ml-6">
              <h2 class="text-[#003262] font-medium text-lg lg:text-[24px] xl:text-[32px]">
                {{ feature.title }}
              </h2>
              <p class="text-[#003262] text-base lg:text-lg">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex justify-center items-center flex-col"
        data-aos="fade-up"
      >
        <div
          class="relative flex items-center lg:pr-[8%] xl:pr-[5%]"
        >
          <button
            class="swiper-button-prev-custom z-10 w-7 h-7 min-w-7 rounded-full border-2 border-primary flex items-center justify-center shadow-md"
          >
            <UIcon
              name="material-symbols:chevron-left-rounded"
              class="text-xl lg:text-2xl text-primary"
            />
          </button>

          <div>
            <Swiper
              class="max-w-[calc(100vw-8rem)] lg:max-w-[600px]"
              :modules="modules"
              :effect="'cards'"
              :rotate="200"
              :slides-per-view="1.2"
              :centered-slides="true"
              :cards-effect="{
                slideShadows: false,
                rotate: true,
                perSlideRotate: 10,
                perSlideOffset: 10,
                shadowOffset: 10,
                shadowScale: 0.9
              }"
              :grab-cursor="true"
              :pagination="{
                clickable: true,
                type: 'bullets'
              }"
              :navigation="{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom'
              }"
            >
              <SwiperSlide
                v-for="certificate in certificates"
                :key="certificate.image"
              >
                <a
                  :href="certificate.image"
                  data-fancybox
                >
                  <img
                    :src="certificate.image"
                    alt="Certificate"
                    class="w-full h-full object-cover"
                  >
                </a>
              </SwiperSlide>
            </Swiper>
          </div>

          <button
            class="swiper-button-next-custom z-10 w-7 h-7 min-w-7 rounded-full border-2 border-primary flex items-center justify-center shadow-md"
          >
            <UIcon
              name="material-symbols:chevron-right-rounded"
              class="text-xl lg:text-2xl text-primary"
            />
          </button>
        </div>
        <div class="swiper-pagination" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-cards'
import 'swiper/css/pagination'
import { Pagination, Autoplay, Navigation, EffectCards } from 'swiper/modules'

const modules = [Pagination, Autoplay, Navigation, EffectCards]

const certificates = [
  {
    image: '/webp/sertificate.webp'
  },
  {
    image: '/webp/sertificate_2.webp'
  }
]

const features = [
  {
    title: '2021 йилдан бери',
    description: 'Халқимиз томонидан севиб истеъмол қилинади.'
  },
  {
    title: '1000+',
    description: 'Натижа кўрган беморларимиз'
  },
  {
    title: 'Органик',
    description: 'ГМО қўшимчалари ва бўёқлар қўшилмаган'
  }
]
</script>
