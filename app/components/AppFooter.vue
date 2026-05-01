<template>
  <footer class="py-10 lg:py-12 bg-white">
    <div class="container">
      <div class="flex items-center justify-center gap-6 lg:gap-10 flex-col lg:flex-row">
        <div class="flex flex-col items-center gap-2">
          <NuxtLink
            to="/"
            class="block w-[140px] lg:w-[200px]"
          >
            <img
              src="/logo.svg"
              alt="AL-HAYAT-MED"
              class="w-full h-full object-contain"
            >
          </NuxtLink>
          <span class="text-[#0000FF] font-bold text-sm lg:text-lg">AL-HAYAT-MED</span>
        </div>

        <div class="flex flex-col items-center text-center gap-3">
          <p class="text-[#333] text-sm lg:text-base leading-relaxed m-0">
            Саёхат кўчаси, 2-уй,<br>Тошкент шаҳри, Мирзо Улуғбек тумани
          </p>
          <a
            class="text-[#0000FF] font-bold text-2xl lg:text-[64px] no-underline hover:opacity-80 transition-opacity"
            href="tel:+998712021818"
          >
            +998 (71) 202-18-18
          </a>
        </div>

        <div class="flex items-center gap-3 lg:gap-6">
          <a
            href="https://www.youtube.com/@Nevroslim"
            target="_blank"
            class="w-10 h-10 lg:w-24 lg:h-24 hover:opacity-70 transition-opacity"
          >
            <img
              src="/svg/youtube.svg"
              alt="youtube"
              class="w-full h-full object-contain"
            >
          </a>
          <a
            href="https://t.me/NEVROSLIM"
            target="_blank"
            class="w-10 h-10 lg:w-24 lg:h-24 hover:opacity-70 transition-opacity"
          >
            <img
              src="/svg/telegram.svg"
              alt="telegram"
              class="w-full h-full object-contain"
            >
          </a>
          <a
            href="https://www.instagram.com/nevroslim.uz/"
            target="_blank"
            class="w-10 h-10 lg:w-24 lg:h-24 hover:opacity-70 transition-opacity"
          >
            <img
              src="/svg/instagram.svg"
              alt="instagram"
              class="w-full h-full object-contain"
            >
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
