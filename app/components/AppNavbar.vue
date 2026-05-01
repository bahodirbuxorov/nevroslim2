<template>
  <header
    class="py-4 header"
    :class="{ 'hide-header': isHidden }"
  >
    <nav class="container flex justify-center items-center">
      <NuxtLink
        to="/"
        class="max-w-[130px] lg:max-w-[164px] xl:max-w-[204px]"
      >
        <img
          src="/logo.svg"
          alt="Nevroslim"
          class="w-full h-full object-cover"
        >
      </NuxtLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
const isHidden = ref(false)
let lastScrollTop = 0

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  if (scrollTop > lastScrollTop) {
    isHidden.value = true
  } else {
    isHidden.value = false
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  transition: top 0.3s ease-in-out;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  background-color: #F4F7FF;
}

.hide-header {
  top: -110px;
}
</style>
