<template>
  <section
    id="audio-results"
    class="py-10 lg:py-16 overflow-hidden relative"
  >
    <div class="container">
      <h1
        data-aos="fade-up"
        class="text-[#003262] shine-text text-center font-medium text-[24px] lg:text-[32px] xl:text-[40px] max-w-[732px] mx-auto mb-10"
      >
        Бизнинг <span class="text-primary">мижозларимиздан</span> овозли натижалар
      </h1>

      <div
        class="mt-6 lg:mt-10"
        data-aos="fade-up"
      >
        <Swiper
          :loop="true"
          :thumbs="{ swiper: thumbsSwiper }"
          :autoplay="false"
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
          @slide-change="onSlideChange"
        >
          <SwiperSlide
            v-for="(track, index) in tracks"
            :key="index"
          >
            <div class="audio-card rounded-[5px] h-[346px] relative overflow-hidden">
              <div class="absolute inset-0 audio-gradient" />
              <div class="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
                <button
                  class="w-20 h-20 rounded-full bg-white hover:bg-white/90 flex items-center justify-center transition-all mb-6 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105"
                  @click="togglePlay(index)"
                >
                  <svg
                    v-if="currentTrack !== index || !isPlaying"
                    class="w-10 h-10 text-primary ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <svg
                    v-else
                    class="w-10 h-10 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                </button>

                <div class="w-full text-center text-white">
                  <h3 class="text-xl font-bold mb-2 drop-shadow-lg">
                    {{ track.title }}
                  </h3>
                  <p class="text-sm opacity-90 mb-6 drop-shadow">
                    {{ track.artist }}
                  </p>

                  <div
                    v-if="currentTrack === index"
                    class="w-full bg-white/20 rounded-full h-2 mb-3 backdrop-blur-sm"
                  >
                    <div
                      class="bg-white h-2 rounded-full transition-all shadow-sm"
                      :style="{ width: progress + '%' }"
                    />
                  </div>

                  <div
                    v-if="currentTrack === index"
                    class="text-sm font-medium drop-shadow"
                  >
                    {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
                  </div>
                </div>

                <div class="absolute top-4 right-4 opacity-20">
                  <svg
                    class="w-12 h-12 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>
                <div class="absolute bottom-4 left-4 opacity-10">
                  <svg
                    class="w-16 h-16 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>
              </div>
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
            v-for="(track, index) in tracks"
            :key="index"
          >
            <div
              class="audio-thumb rounded-[5px] overflow-hidden h-16 lg:h-20 cursor-pointer opacity-60 hover:opacity-100 transition-all relative"
              @click="goToSlide(index)"
            >
              <div class="absolute inset-0 audio-gradient-thumb" />
              <div
                v-if="currentTrack === index && isPlaying"
                class="absolute inset-0 flex items-center justify-center z-10"
              >
                <div class="flex gap-1">
                  <div class="w-1 h-4 bg-white rounded-full animate-pulse" />
                  <div
                    class="w-1 h-4 bg-white rounded-full animate-pulse"
                    style="animation-delay: 0.2s"
                  />
                  <div
                    class="w-1 h-4 bg-white rounded-full animate-pulse"
                    style="animation-delay: 0.4s"
                  />
                </div>
              </div>
              <div class="absolute inset-0 flex items-center justify-center opacity-40">
                <svg
                  class="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>

    <audio
      ref="audioPlayer"
      @timeupdate="updateProgress"
      @loadedmetadata="setDuration"
      @ended="onTrackEnd"
    />
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import { Navigation, FreeMode, Thumbs } from 'swiper/modules'

const modules = [Navigation, FreeMode, Thumbs]

const thumbsSwiper = ref(null)
const audioPlayer = ref(null)
const currentTrack = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const progress = ref(0)
const swiperInstance = ref(null)

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}

const onSlideChange = (swiper) => {
  swiperInstance.value = swiper
}

const goToSlide = (index) => {
  if (swiperInstance.value) {
    swiperInstance.value.slideToLoop(index)
  }
}

const tracks = ref([
  { title: 'Ovozli Natijalar 1', artist: 'Nevroslim', audio: '/audio/1.mp3' },
  { title: 'Ovozli Natijalar 2', artist: 'Nevroslim', audio: '/audio/2.mp3' },
  { title: 'Ovozli Natijalar 3', artist: 'Nevroslim', audio: '/audio/3.mp3' },
  { title: 'Ovozli Natijalar 4', artist: 'Nevroslim', audio: '/audio/4.mp3' },
  { title: 'Ovozli Natijalar 5', artist: 'Nevroslim', audio: '/audio/5.mp3' },
  { title: 'Ovozli Natijalar 6', artist: 'Nevroslim', audio: '/audio/6.mp3' }
])

const togglePlay = (index) => {
  if (currentTrack.value === index && isPlaying.value) {
    audioPlayer.value.pause()
    isPlaying.value = false
  } else {
    if (currentTrack.value !== index) {
      currentTrack.value = index
      audioPlayer.value.src = tracks.value[index].audio
    }
    audioPlayer.value.play()
    isPlaying.value = true
  }
}

const updateProgress = () => {
  currentTime.value = audioPlayer.value.currentTime
  progress.value = (currentTime.value / duration.value) * 100
}

const setDuration = () => {
  duration.value = audioPlayer.value.duration
}

const onTrackEnd = () => {
  isPlaying.value = false
  currentTime.value = 0
  progress.value = 0
}

const formatTime = (seconds) => {
  if (isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

onBeforeUnmount(() => {
  if (audioPlayer.value) {
    audioPlayer.value.pause()
  }
})
</script>

<style scoped>
.audio-gradient {
  background: linear-gradient(135deg, #0000FF 0%, #003262 50%, #0000FF 100%);
  animation: gradientShift 8s ease infinite;
  background-size: 200% 200%;
}

.audio-gradient-thumb {
  background: linear-gradient(135deg, #0000FF 0%, #003262 100%);
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.audio-card {
  box-shadow: 0 10px 30px rgba(0, 0, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.audio-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 255, 0.3);
}

.swiper-slide-thumb-active .audio-thumb {
  opacity: 1;
  border: 3px solid #0000FF;
  box-shadow: 0 0 20px rgba(0, 0, 255, 0.5);
}

@keyframes pulse {
  0%, 100% {
    height: 1rem;
  }
  50% {
    height: 1.5rem;
  }
}

.animate-pulse {
  animation: pulse 1s ease-in-out infinite;
}
</style>
