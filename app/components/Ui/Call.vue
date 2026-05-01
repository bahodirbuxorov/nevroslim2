<template>
  <a
    :href="contact.phoneHref"
    class="fixed w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center bottom-5 right-5 z-50 p-2 lg:p-3 rounded-full bg-primary hover:bg-primary/80 shadow-lg shadow-primary/30"
  >
    <UIcon
      name="line-md:phone-call-twotone-loop"
      class="text-3xl lg:text-5xl text-white"
    />
  </a>
</template>

<script setup>
const { contact } = useAppConfig()
</script>
