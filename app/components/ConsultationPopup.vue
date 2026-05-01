<template>
  <div
    v-if="isOpen"
    class="consult-overlay"
  >
    <div class="consult-popup">
      <button
        class="consult-popup__close"
        @click="close"
      >
        <UIcon
          name="lucide:x"
          class="text-xl"
        />
      </button>

      <!-- Step indicators -->
      <div class="consult-popup__progress">
        <div
          class="consult-popup__progress-dot"
          :class="{ 'consult-popup__progress-dot--active': step >= 1, 'consult-popup__progress-dot--current': step === 1 }"
        />
        <div
          class="consult-popup__progress-line"
          :class="{ 'consult-popup__progress-line--active': step >= 2 }"
        />
        <div
          class="consult-popup__progress-dot"
          :class="{ 'consult-popup__progress-dot--active': step >= 2, 'consult-popup__progress-dot--current': step === 2 }"
        />
        <div
          class="consult-popup__progress-line"
          :class="{ 'consult-popup__progress-line--active': step >= 3 }"
        />
        <div
          class="consult-popup__progress-dot"
          :class="{ 'consult-popup__progress-dot--active': step >= 3, 'consult-popup__progress-dot--current': step === 3 }"
        />
      </div>

      <!-- Step 1: Purpose -->
      <div
        v-if="step === 1"
        class="consult-popup__step"
      >
        <h2 class="consult-popup__title">
          Бизга мурожаат қилишингиздан мақсадингиз нима?
        </h2>
        <div class="consult-popup__options">
          <button
            class="consult-popup__option"
            :class="{ 'consult-popup__option--selected': selectedPurpose === 'treatment' }"
            @click="selectPurpose('treatment')"
          >
            <span class="consult-popup__check">
              <UIcon
                v-if="selectedPurpose === 'treatment'"
                name="lucide:check"
                class="text-sm"
              />
            </span>
            Даъволаниб шифо топишим керак
          </button>
          <button
            class="consult-popup__option"
            :class="{ 'consult-popup__option--selected': selectedPurpose === 'price' }"
            @click="selectPurpose('price')"
          >
            <span class="consult-popup__check">
              <UIcon
                v-if="selectedPurpose === 'price'"
                name="lucide:check"
                class="text-sm"
              />
            </span>
            Буюртма бермокчиман
          </button>
        </div>
        <button
          class="consult-popup__next"
          :disabled="!selectedPurpose"
          @click="step = 2"
        >
          ДАВОМ ЭТИШ
        </button>
      </div>

      <!-- Step 2: Problems (multiple) -->
      <div
        v-if="step === 2"
        class="consult-popup__step"
      >
        <h2 class="consult-popup__title">
          Сизни нима муаммо безовта қилади?
        </h2>
        <p class="consult-popup__subtitle">
          Бир нечта вариантни танлашингиз мумкин
        </p>
        <div class="consult-popup__options">
          <button
            v-for="problem in problemOptions"
            :key="problem.key"
            class="consult-popup__option"
            :class="{ 'consult-popup__option--selected': selectedProblems.includes(problem.key) }"
            @click="toggleProblem(problem.key)"
          >
            <span class="consult-popup__check">
              <UIcon
                v-if="selectedProblems.includes(problem.key)"
                name="lucide:check"
                class="text-sm"
              />
            </span>
            {{ problem.label }}
          </button>
        </div>
        <div class="consult-popup__nav">
          <button
            class="consult-popup__back"
            @click="step = 1"
          >
            Орқага
          </button>
          <button
            class="consult-popup__next"
            :disabled="selectedProblems.length === 0"
            @click="step = 3"
          >
            ДАВОМ ЭТИШ
          </button>
        </div>
      </div>

      <!-- Step 3: Contact form -->
      <div
        v-if="step === 3"
        class="consult-popup__step"
      >
        <h2 class="consult-popup__title">
          Ариза қолдиринг ва соғлиқ сари қадам ташланг
        </h2>
        <form
          class="consult-popup__form"
          @submit.prevent="submitForm"
        >
          <div class="consult-popup__field">
            <label class="consult-popup__field-label">Исмингиз</label>
            <input
              v-model="name"
              required
              type="text"
              class="consult-popup__input"
              placeholder="Исмингизни киритинг"
            >
          </div>
          <div class="consult-popup__field">
            <label class="consult-popup__field-label">Телефон рақам</label>
            <input
              v-model="phone"
              v-maska
              required
              autocomplete="off"
              type="text"
              class="consult-popup__input"
              data-maska="+998(##) ### ## ##"
              placeholder="+998(__) ___ __ __"
              pattern="\+998\(\d{2}\)\s\d{3}\s\d{2}\s\d{2}"
            >
          </div>
          <button
            type="submit"
            class="consult-popup__submit"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'ЮБОРИЛМОҚДА...' : 'ЮБОРИШ' }}
          </button>
        </form>
        <button
          class="consult-popup__back"
          @click="step = 2"
        >
          Орқага
        </button>
      </div>
    </div>

    <!-- Duplicate modal -->
    <UModal
      v-model:open="isDuplicateModal"
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
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submitted'): void
}>()

const { contact } = useAppConfig()
const { capture: captureUtm, get: getUtm } = useUtmParams()
onMounted(() => captureUtm())

const problemOptions = [
  { key: 'headache', label: 'Бош оғриғи, Мигрень' },
  { key: 'depression', label: 'Депрессия' },
  { key: 'memory', label: 'Зеҳн ва Хотиранинг пастлиги' },
  { key: 'fatigue', label: 'Асаб толиқиши' },
  { key: 'insomnia', label: 'Уйқусизлик, ваҳима' },
  { key: 'apathy', label: 'Тушкун ҳолатда юриш' },
  { key: 'heart', label: 'Юрак соҳасида оғриқ ва юрак ўйнаши' },
  { key: 'fear', label: 'Қўрқув' },
  { key: 'stress', label: 'Стресс - ички сиқилишлар' },
  { key: 'neurosis', label: 'Невроз' }
]

const step = ref(1)
const selectedPurpose = ref<string | null>(null)
const selectedProblems = ref<string[]>([])
const name = ref('')
const phone = ref('+998')
const isSubmitting = ref(false)
const isDuplicateModal = ref(false)
const toast = useToast()

function close() {
  step.value = 1
  selectedPurpose.value = null
  selectedProblems.value = []
  name.value = ''
  phone.value = '+998'
  isDuplicateModal.value = false
  emit('close')
}

function selectPurpose(purpose: string) {
  selectedPurpose.value = purpose
}

function toggleProblem(key: string) {
  const idx = selectedProblems.value.indexOf(key)
  if (idx === -1) {
    selectedProblems.value.push(key)
  }
  else {
    selectedProblems.value.splice(idx, 1)
  }
}

function rinseDigits(raw: string) {
  return raw.replace(/\D/g, '')
}

function isPhoneSubmitted(phoneNumber: string) {
  try {
    const phones = JSON.parse(localStorage.getItem('submitted_phones') || '[]')
    return phones.includes(phoneNumber)
  }
  catch {}
  return false
}

function savePhone(phoneNumber: string) {
  try {
    const phones = JSON.parse(localStorage.getItem('submitted_phones') || '[]')
    if (!phones.includes(phoneNumber)) {
      phones.push(phoneNumber)
      localStorage.setItem('submitted_phones', JSON.stringify(phones))
    }
  }
  catch {}
}

async function submitForm() {
  if (isSubmitting.value || !selectedPurpose.value) return

  const normalizedPhone = `+${rinseDigits(phone.value)}`

  if (isPhoneSubmitted(normalizedPhone)) {
    isDuplicateModal.value = true
    return
  }

  isSubmitting.value = true

  try {
    const purposeLabels: Record<string, string> = {
      treatment: 'Даъволаниб шифо топишим керак',
      price: 'Буюртма бермокчиман'
    }

    const problemLabels = problemOptions
      .filter(p => selectedProblems.value.includes(p.key))
      .map(p => p.label)

    await $fetch('/api/submit', {
      method: 'POST',
      body: {
        name: name.value,
        phone: normalizedPhone,
        purpose: selectedPurpose.value,
        purpose_label: purposeLabels[selectedPurpose.value!] || '',
        problems: problemLabels,
        ...getUtm()
      }
    })

    savePhone(normalizedPhone)
    name.value = ''
    phone.value = '+998'
    emit('submitted')
    emit('close')
    await nextTick()
    navigateTo('/thanks')
  }
  catch (error) {
    console.error('Xatolik:', error)
    toast.add({
      title: 'Xatolik',
      description: 'Tizimda xatolik yuz berdi!',
      color: 'error'
    })
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.consult-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
}

.consult-popup {
  position: relative;
  width: 100%;
  height: 100%;
  background: #F4F7FF;
  overflow-y: auto;
  animation: popupIn 0.3s ease;
}

.consult-popup__close {
  position: fixed;
  top: 16px;
  right: 20px;
  background: rgba(0, 50, 98, 0.08);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 24px;
  color: #003262;
  cursor: pointer;
  line-height: 1;
  transition: all 0.2s;
  z-index: 1002;
  display: flex;
  align-items: center;
  justify-content: center;
}

.consult-popup__close:hover {
  background: rgba(0, 50, 98, 0.15);
}

.consult-popup__progress {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0;
  z-index: 1002;
}

.consult-popup__progress-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #d0d5dd;
  transition: all 0.3s;
}

.consult-popup__progress-dot--active {
  background: #0000FF;
}

.consult-popup__progress-dot--current {
  box-shadow: 0 0 0 4px rgba(0, 0, 255, 0.2);
}

.consult-popup__progress-line {
  width: 48px;
  height: 3px;
  background: #d0d5dd;
  transition: background 0.3s;
}

.consult-popup__progress-line--active {
  background: #0000FF;
}

.consult-popup__step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  max-width: 640px;
  margin: 0 auto;
  padding: clamp(60px, 8vh, 100px) clamp(20px, 4vw, 48px) clamp(32px, 6vh, 80px);
  min-height: 100vh;
  min-height: 100dvh;
  justify-content: center;
}

.consult-popup__title {
  text-align: center;
  font-size: clamp(26px, 3.2vw, 30px);
  font-weight: 800;
  color: #003262;
  margin: 0;
  line-height: 1.3;
}

.consult-popup__subtitle {
  margin: -12px 0 0;
  font-size: 15px;
  color: #888;
  font-weight: 500;
}

.consult-popup__options {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  max-width: 480px;
}

.consult-popup__option {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 24px;
  border: 2px solid #D1D7ED;
  border-radius: 14px;
  background: #fff;
  font-size: 17px;
  font-weight: 600;
  color: #003262;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.consult-popup__option:hover {
  border-color: #0000FF;
  background: #F4F7FF;
}

.consult-popup__option--selected {
  border-color: #0000FF;
  background: linear-gradient(135deg, #F4F7FF, #e8efff);
  color: #0000FF;
  box-shadow: 0 2px 12px rgba(0, 0, 255, 0.15);
}

.consult-popup__check {
  width: 26px;
  height: 26px;
  min-width: 26px;
  border: 2px solid #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  color: #fff;
}

.consult-popup__option--selected .consult-popup__check {
  border-color: #0000FF;
  background: #0000FF;
  color: #fff;
}

.consult-popup__next {
  width: 100%;
  max-width: 480px;
  border: none;
  border-radius: 12px;
  padding: 18px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  background: #0000FF;
  color: #fff;
  transition: all 0.2s;
}

.consult-popup__next:hover:not(:disabled) {
  background: #0000CC;
}

.consult-popup__next:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.consult-popup__nav {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 480px;
}

.consult-popup__nav .consult-popup__next {
  flex: 1;
}

.consult-popup__back {
  background: none;
  border: 2px solid #D1D7ED;
  border-radius: 12px;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 600;
  color: #003262;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.consult-popup__back:hover {
  border-color: #0000FF;
  color: #0000FF;
}

.consult-popup__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 440px;
  background: #fff;
  border-radius: 20px;
  padding: clamp(24px, 4vw, 40px);
  border: 1px solid #D1D7ED;
  box-shadow: 4px 5px 10.6px 0px #D1D7ED;
}

.consult-popup__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.consult-popup__field-label {
  font-size: 14px;
  font-weight: 600;
  color: #003262;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.consult-popup__input {
  width: 100%;
  padding: 16px 20px;
  border-radius: 12px;
  outline: none;
  border: 2px solid #D1D7ED;
  font-size: 16px;
  font-weight: 400;
  background: #F4F7FF;
  transition: all 0.2s;
}

.consult-popup__input:focus {
  border-color: #0000FF;
  box-shadow: 0 0 0 3px rgba(0, 0, 255, 0.1);
}

.consult-popup__submit {
  width: 100%;
  border: none;
  border-radius: 12px;
  padding: 18px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  background: #0000FF;
  color: #fff;
  transition: all 0.2s;
}

.consult-popup__submit:hover:not(:disabled) {
  background: #0000CC;
}

.consult-popup__submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@keyframes popupIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 480px) {
  .consult-popup__step {
    justify-content: flex-start;
    padding-top: clamp(56px, 10vh, 100px);
  }

  .consult-popup__nav {
    flex-direction: column-reverse;
  }

  .consult-popup__nav .consult-popup__next {
    width: 100%;
  }

  .consult-popup__back {
    width: 100%;
    text-align: center;
  }
}
</style>
