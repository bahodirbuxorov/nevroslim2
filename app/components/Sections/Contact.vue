<template>
  <div id="contact">
    <UiMarquee />
    <div class="container">
      <div class="py-6 lg:py-16 my-8 lg:my-20">
        <UiCounter />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10 max-w-[900px] mx-auto">
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            class="text-[#01101E] text-base lg:text-lg"
          >
            Унутманг! Ҳар қандай касалликни албатта даъвоси бор. Муҳими ишонч ва ихлос. Ҳозироқ рўйҳатдан ўтинг!
          </p>
          <UForm
            data-aos="fade-up"
            data-aos-delay="300"
            :schema="schema"
            :state="state"
            class="space-y-4 flex flex-col"
            @submit="onSubmit"
          >
            <UFormField
              name="name"
            >
              <UInput
                v-model="state.name"
                size="xl"
                class="w-full"
                placeholder="Исмингиз"
              />
            </UFormField>
            <UFormField name="phone">
              <UInput
                v-model="state.phone"
                v-maska
                type="tel"
                size="xl"
                class="w-full"
                placeholder="+998"
                pattern="\+998\(\d{2}\)\s\d{3}\s\d{2}\s\d{2}"
                required
                autocomplete="off"
                data-maska="+998(##) ### ## ##"
              />
            </UFormField>

            <UButton
              size="xl"
              type="submit"
              :loading="loading"
              class="flex items-center justify-center gap-2 rounded-xl"
              color="primary"
              icon="line-md:phone-call-twotone-loop"
            >
              Биз билан боғланиш
            </UButton>
          </UForm>
        </div>
      </div>
    </div>
    <UModal
      v-model:open="open"
      title="Биз билан боғланиш"
      description="desc"
    >
      <template #content>
        <UCard>
          <UIcon
            name="line-md:close"
            class="absolute top-2 right-2 text-xl cursor-pointer"
            @click="closeModal"
          />
          <UIcon
            name="line-md:check-all"
            class="text-6xl mx-auto block text-green-500"
          />
          <p class="text-center text-[#01101E] mt-4">
            Тез орада мутаҳассис сиз билан боғланади! Агар қўшимча саволларингиз бўлса,
            қуйидаги контактлар орқали мурожаат қилинг.
          </p>

          <div class="flex-col lg:flex-row gap-2 items-center">
            <UButton
              :href="contact.phoneHref"
              label="Қўнғироқ қилиш"
              size="xl"
              type="submit"
              class="flex items-center justify-center gap-2 w-full rounded-xl mx-auto mt-4"
              color="primary"
              icon="line-md:phone-call-twotone-loop"
            />
            <UButton
              :href="contact.telegramHref"
              target="_blank"
              size="xl"
              label="Телеграм орқали"
              type="submit"
              class="flex items-center justify-center gap-2 w-full rounded-xl mx-auto mt-4"
              color="secondary"
              icon="line-md:telegram"
            />
          </div>
        </UCard>
      </template>
    </UModal>
    <UModal
      v-model:open="duplicateOpen"
      title="Takroriy murojaat"
      description="duplicate"
    >
      <template #content>
        <UCard>
          <UIcon
            name="line-md:close"
            class="absolute top-2 right-2 text-xl cursor-pointer"
            @click="duplicateOpen = false"
          />
          <UIcon
            name="line-md:phone-call-twotone-loop"
            class="text-6xl mx-auto block text-yellow-500"
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
              icon="line-md:phone-call-twotone-loop"
            />
            <UButton
              :href="contact.telegramHref"
              target="_blank"
              size="xl"
              label="Телеграм орқали"
              class="flex items-center justify-center gap-2 w-full rounded-xl mx-auto mt-4"
              color="secondary"
              icon="line-md:telegram"
            />
          </div>
        </UCard>
      </template>
    </UModal>
  </div>
</template>

<script setup>
import Joi from 'joi'

const { contact } = useAppConfig()
const { capture: captureUtm, get: getUtm } = useUtmParams()
onMounted(() => captureUtm())
const open = ref(false)
const schema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': '\u0418\u0441\u043c\u0438\u043d\u0433\u0438\u0437\u043d\u0438 \u043a\u0438\u0440\u0438\u0442\u0438\u043d\u0433',
    'string.empty': '\u0418\u0441\u043c\u0438\u043d\u0433\u0438\u0437\u043d\u0438 \u043a\u0438\u0440\u0438\u0442\u0438\u043d\u0433'
  }),
  phone: Joi.string().required().messages({
    'any.required': '\u0422\u0435\u043b\u0435\u0444\u043e\u043d \u0440\u0430\u049b\u0430\u043c\u0438\u043d\u0433\u0438\u0437\u043d\u0438 \u043a\u0438\u0440\u0438\u0442\u0438\u043d\u0433',
    'string.empty': '\u0422\u0435\u043b\u0435\u0444\u043e\u043d \u0440\u0430\u049b\u0430\u043c\u0438\u043d\u0433\u0438\u0437\u043d\u0438 \u043a\u0438\u0440\u0438\u0442\u0438\u043d\u0433'
  })
})
const state = reactive({
  name: undefined,
  phone: '+998'
})
const toast = useToast()

const loading = ref(false)
const duplicateOpen = ref(false)

function isPhoneSubmitted(phone) {
  try {
    const phones = JSON.parse(localStorage.getItem('submitted_phones') || '[]')
    return phones.includes(phone)
  } catch {}
  return false
}

function savePhone(phone) {
  try {
    const phones = JSON.parse(localStorage.getItem('submitted_phones') || '[]')
    if (!phones.includes(phone)) {
      phones.push(phone)
      localStorage.setItem('submitted_phones', JSON.stringify(phones))
    }
  } catch {}
}

async function onSubmit(event) {
  try {
    if (!event?.data?.name || !event?.data?.phone) {
      toast.add({
        title: 'Xatolik',
        description: 'Malumotlarni toliq kiriting',
        color: 'error'
      })
      return
    }

    const phone = event.data.phone.replace(/\D/g, '')
    const normalizedPhone = `+${phone}`

    if (isPhoneSubmitted(normalizedPhone)) {
      duplicateOpen.value = true
      return
    }

    loading.value = true
    await $fetch('/api/submit', {
      method: 'POST',
      body: { name: event.data.name, phone: event.data.phone, ...getUtm() }
    })

    savePhone(normalizedPhone)
    state.name = undefined
    state.phone = '+998'
    open.value = true
  } catch {
    toast.add({
      title: 'Xatolik',
      description: 'Tizimda xatolik yuz berdi!',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}

function closeModal() {
  open.value = false
  state.name = undefined
  state.phone = '+998'
}
</script>
