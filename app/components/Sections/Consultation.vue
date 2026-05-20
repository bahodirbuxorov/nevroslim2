<template>
  <section
    id="consultation"
    class="py-10 lg:py-16 relative overflow-hidden"
  >
    <div
      class="absolute -z-1 inset-0 bg-[url('/svg/bg-1.svg')] bg-no-repeat bg-center bg-cover opacity-60"
    />
    <div class="container">
      <div class="max-w-[560px] mx-auto">
        <h1
          data-aos="fade-up"
          class="text-[#003262] shine-text font-medium text-[24px] lg:text-[32px] xl:text-[40px] text-center"
        >
          Маслаҳат олиш
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          class="text-[#01101E] text-base lg:text-lg text-center mt-3 lg:mt-4"
        >
          Маълумотларингизни қолдиринг — мутахассисимиз тез орада боғланади
        </p>

        <form
          data-aos="fade-up"
          data-aos-delay="200"
          class="consult-form mt-6 lg:mt-10"
          @submit.prevent="onSubmit"
        >
          <div class="consult-form__field">
            <label class="consult-form__label">Исмингиз</label>
            <input
              v-model="name"
              type="text"
              required
              autocomplete="off"
              class="consult-form__input"
              placeholder="Исмингизни киритинг"
            >
          </div>

          <div class="consult-form__field">
            <label class="consult-form__label">Телефон рақам</label>
            <input
              v-model="phone"
              v-maska
              type="tel"
              required
              autocomplete="off"
              class="consult-form__input"
              data-maska="+998(##) ### ## ##"
              placeholder="+998(__) ___ __ __"
              pattern="\+998\(\d{2}\)\s\d{3}\s\d{2}\s\d{2}"
            >
          </div>

          <div class="consult-form__field">
            <label class="consult-form__label">Вилоят</label>
            <div class="consult-form__select-wrapper">
              <select
                v-model="region"
                required
                class="consult-form__input consult-form__select"
                :class="{ 'consult-form__select--placeholder': !region }"
              >
                <option
                  value=""
                  disabled
                >
                  Вилоятингизни танланг
                </option>
                <option
                  v-for="r in regions"
                  :key="r"
                  :value="r"
                >
                  {{ r }}
                </option>
              </select>
              <UIcon
                name="lucide:chevron-down"
                class="consult-form__select-icon"
              />
            </div>
          </div>

          <button
            type="submit"
            class="consult-form__submit"
            :disabled="loading"
          >
            {{ loading ? 'ЮБОРИЛМОҚДА...' : 'ЮБОРИШ' }}
          </button>
        </form>
      </div>
    </div>

    <UModal
      v-model:open="duplicateOpen"
      title="Такрорий мурожаат"
    >
      <template #content>
        <UCard>
          <UIcon
            name="lucide:phone-call"
            class="text-5xl mx-auto block text-primary"
          />
          <p class="text-center text-[#01101E] mt-4 font-bold text-lg">
            Сиз олдин ҳам мурожаат қолдиргансиз!
          </p>
          <p class="text-center text-[#01101E] mt-2">
            Менежерларимиз тез орада сиз билан боғланади. Илтимос, кутиб туринг!
          </p>
          <div class="flex-col lg:flex-row gap-2 items-center">
            <UButton
              :href="contact.phoneHref"
              label="Қўнғироқ қилиш"
              size="xl"
              class="flex items-center justify-center gap-2 w-full rounded-xl mx-auto mt-4"
              color="primary"
              icon="lucide:phone-call"
            />
            <UButton
              :href="contact.telegramHref"
              target="_blank"
              size="xl"
              label="Телеграм орқали"
              class="flex items-center justify-center gap-2 w-full rounded-xl mx-auto mt-4"
              color="secondary"
              icon="lucide:send"
            />
          </div>
        </UCard>
      </template>
    </UModal>
  </section>
</template>

<script setup lang="ts">
const { contact } = useAppConfig()
const { capture: captureUtm, get: getUtm } = useUtmParams()
onMounted(() => captureUtm())

const regions = [
  'Тошкент шаҳри',
  'Тошкент вилояти',
  'Андижон',
  'Бухоро',
  'Фарғона',
  'Жиззах',
  'Хоразм',
  'Наманган',
  'Навоий',
  'Қашқадарё',
  'Қорақалпоғистон',
  'Самарқанд',
  'Сирдарё',
  'Сурхондарё'
]

const name = ref('')
const phone = ref('+998')
const region = ref('')
const loading = ref(false)
const duplicateOpen = ref(false)
const toast = useToast()

function rinseDigits(raw: string) {
  return raw.replace(/\D/g, '')
}

function isPhoneSubmitted(phoneNumber: string) {
  try {
    const phones = JSON.parse(localStorage.getItem('submitted_phones') || '[]')
    return phones.includes(phoneNumber)
  } catch {
    return false
  }
}

function savePhone(phoneNumber: string) {
  try {
    const phones = JSON.parse(localStorage.getItem('submitted_phones') || '[]')
    if (!phones.includes(phoneNumber)) {
      phones.push(phoneNumber)
      localStorage.setItem('submitted_phones', JSON.stringify(phones))
    }
  } catch {
    // ignore
  }
}

async function onSubmit() {
  if (loading.value) return

  const normalizedPhone = `+${rinseDigits(phone.value)}`

  if (isPhoneSubmitted(normalizedPhone)) {
    duplicateOpen.value = true
    return
  }

  loading.value = true

  try {
    await $fetch('/api/submit', {
      method: 'POST',
      body: {
        name: name.value,
        phone: normalizedPhone,
        region: region.value,
        ...getUtm()
      }
    })

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'Consultation Form'
      })
    }

    savePhone(normalizedPhone)
    name.value = ''
    phone.value = '+998'
    region.value = ''
    await nextTick()
    navigateTo('/thanks')
  } catch (error) {
    console.error('Xatolik:', error)
    toast.add({
      title: 'Xatolik',
      description: 'Tizimda xatolik yuz berdi!',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.consult-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: #fff;
  border-radius: 20px;
  padding: clamp(20px, 4vw, 36px);
  border: 1px solid #D1D7ED;
  box-shadow: 4px 5px 10.6px 0px #D1D7ED;
}

.consult-form__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.consult-form__label {
  font-size: 14px;
  font-weight: 600;
  color: #003262;
  letter-spacing: 0.3px;
}

.consult-form__input {
  width: 100%;
  padding: 14px 18px;
  border-radius: 12px;
  outline: none;
  border: 2px solid #D1D7ED;
  font-size: 16px;
  font-weight: 400;
  background: #F4F7FF;
  color: #003262;
  transition: all 0.2s;
}

.consult-form__input:focus {
  border-color: #0000FF;
  box-shadow: 0 0 0 3px rgba(0, 0, 255, 0.1);
}

.consult-form__select-wrapper {
  position: relative;
}

.consult-form__select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 44px;
  cursor: pointer;
}

.consult-form__select--placeholder {
  color: #8a93a8;
}

.consult-form__select-icon {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  pointer-events: none;
  color: #003262;
  font-size: 20px;
}

.consult-form__submit {
  width: 100%;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
  background: #0000FF;
  color: #fff;
  transition: all 0.2s;
  margin-top: 4px;
}

.consult-form__submit:hover:not(:disabled) {
  background: #0000CC;
}

.consult-form__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
