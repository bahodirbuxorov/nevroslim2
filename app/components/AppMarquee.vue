<template>
  <NuxtMarquee
    :auto-fill="true"
    :pause-on-hover="true"
    direction="left"
    :speed="100"
    class="bg-[#30CFAF] py-3 lg:py-4 xl:py-5 relative z-50"
  >
    <div
      class="flex items-center justify-center gap-4 sm:gap-6 md:gap-7 lg:gap-8 xl:gap-9 2xl:gap-10 mx-3 lg:mx-4 xl:mx-5 text-white font-semibold text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl"
    >
      <h1>Lorem, ipsum dolor.</h1>
      <span>*</span>
    </div>
  </NuxtMarquee>
</template>
