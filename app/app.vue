<script setup>
function scrollToConsultForm() {
  if (typeof document === 'undefined') return
  const el = document.getElementById('consultation')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

provide('scrollToConsultForm', scrollToConsultForm)
</script>

<template>
  <UApp>
    <div class="pb-[72px] lg:pb-[110px]">
      <AppNavbar />
    </div>
    <NuxtPage />
    <AppFooter />
    <UiCall />
  </UApp>
</template>
