<script setup>
const props = defineProps({
    to: String,
    id: String,
    default: null,
})

const scrollToQuestions = () => {
    const el = document.getElementById('questions');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}
</script>

<template>
    <NuxtLink v-if="to" :to="to" :id="id"
        class="flex items-center gap-1 h-[40px] lg:h-[64px] px-4 lg:px-6 lg:gap-2 bg-[#30CFAF] text-white font-semibold text-sm lg:text-base rounded-[37px] hover:bg-[#25B7A4] active:scale-95 transition-all duration-200"
        aria-label="Button">
        <slot></slot>
    </NuxtLink>
    <button v-else type="button" :id="id || 'action-btn'" @click="scrollToQuestions"
        class="flex items-center gap-1 h-[40px] lg:h-[64px] px-4 lg:px-6 lg:gap-2 bg-[#30CFAF] text-white font-semibold text-sm lg:text-base rounded-[37px] hover:bg-[#25B7A4] active:scale-95 transition-all duration-200"
        aria-label="Button">
        <slot></slot>
    </button>
</template>