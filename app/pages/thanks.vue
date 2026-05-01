<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-[960px] bg-white rounded-3xl p-6 lg:p-10 shadow-lg">
      <div class="flex items-center justify-center w-20 h-20 mx-auto mb-3 relative">
        <UIcon
          name="lucide:check-circle-2"
          class="text-6xl text-primary"
        />
        <span class="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
      </div>

      <h1 class="text-center text-2xl lg:text-4xl font-extrabold text-[#003262] mt-2 mb-2">
        Ma'lumotlar qabul qilindi!
      </h1>
      <p class="text-center text-sm lg:text-base text-gray-500 max-w-[56ch] mx-auto mb-6">
        Tez orada maslahatchilarimiz siz bilan bog'lanadi! Agar qo'shimcha savollaringiz bo'lsa,
        quyidagi kontaktlar orqali murojaat qiling.
      </p>

      <p
        v-if="countdown > 0"
        class="text-center text-base font-bold text-primary mb-4"
      >
        Telegram каналимизга ўтилмоқда... {{ countdown }}
      </p>

      <div class="flex flex-col lg:flex-row gap-3 justify-center mb-6">
        <UButton
          :href="contact.phoneHref"
          label="Қўнғироқ қилиш"
          size="xl"
          class="flex items-center justify-center gap-2 rounded-xl"
          color="primary"
          icon="lucide:phone-call"
        />
        <UButton
          :href="contact.telegramHref"
          target="_blank"
          size="xl"
          label="Телеграм орқали"
          class="flex items-center justify-center gap-2 rounded-xl"
          color="secondary"
          icon="lucide:send"
        />
      </div>

      <div class="flex flex-col gap-3">
        <div class="flex items-start gap-3 p-3 rounded-xl bg-[#F4F7FF] border border-dashed border-primary/25">
          <span class="w-7 h-7 min-w-7 rounded-full bg-primary text-white text-sm font-extrabold flex items-center justify-center">1</span>
          <div>
            <h3 class="text-base font-bold text-[#003262] m-0">
              Ariza yuborildi
            </h3>
            <p class="text-sm text-gray-500 m-0">
              Ma'lumotlaringiz muvaffaqiyatli qabul qilindi.
            </p>
          </div>
        </div>
        <div class="flex items-start gap-3 p-3 rounded-xl bg-primary/5 border border-solid border-primary/25">
          <span class="w-7 h-7 min-w-7 rounded-full bg-primary text-white text-sm font-extrabold flex items-center justify-center">2</span>
          <div>
            <h3 class="text-base font-bold text-[#003262] m-0">
              Maslahatchi bog'lanadi
            </h3>
            <p class="text-sm text-gray-500 m-0">
              Тетиклик ва хотиржамлик сари илк қадам!
            </p>
          </div>
        </div>
        <div class="flex items-start gap-3 p-3 rounded-xl bg-[#F4F7FF] border border-dashed border-primary/25">
          <span class="w-7 h-7 min-w-7 rounded-full bg-primary text-white text-sm font-extrabold flex items-center justify-center">3</span>
          <div>
            <h3 class="text-base font-bold text-[#003262] m-0">
              Yetkazib berish
            </h3>
            <p class="text-sm text-gray-500 m-0">
              Маъқуллангач, буюртмангиз етказиб берилади.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { contact } = useAppConfig()

const countdown = ref(5)

onMounted(() => {
  const interval = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(interval)
      window.open('https://t.me/nevroslim', '_blank')
    }
  }, 1000)
})
</script>
