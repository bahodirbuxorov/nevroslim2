<script setup>
const show = ref(false)
onMounted(() => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      show.value = true
    } else {
      show.value = false
    }
  })
})
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <Transition name="slide-fade">
    <button
      v-if="show"
      class="fixed w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center  bottom-5 right-5 z-50 p-1 lg:p-2 rounded-full bg-primary hover:bg-primary/80"
      @click="scrollToTop"
    >
      <UIcon
        name="material-symbols:arrow-upward"
        class="text-2xl lg:text-4xl text-white"
      />
    </button>
  </Transition>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>
