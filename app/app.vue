<script setup>
const isPopupOpen = ref(false)

function openConsultPopup() {
  isPopupOpen.value = true
}

function closeConsultPopup() {
  isPopupOpen.value = false
}

provide('openConsultPopup', openConsultPopup)
</script>

<template>
  <UApp>
    <div class="pb-[72px] lg:pb-[110px]">
      <AppNavbar />
    </div>
    <NuxtPage />
    <AppFooter />
    <UiCall />
    <ConsultationPopup
      :is-open="isPopupOpen"
      @close="closeConsultPopup"
    />
  </UApp>
</template>
