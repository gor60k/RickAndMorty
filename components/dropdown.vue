<template>
    <div class="dropdown-list">
        <button class="dropdown-list-button" @click="isOpen = !isOpen" :class="{ open: isOpen }">
            {{ selectedOption.label }}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path d="M6.98438 10.4844H17.0156L12 15.5L6.98438 10.4844Z" fill="black" fill-opacity="0.54" />
            </svg>
        </button>
        <ul class="dropdown-list-options" v-if="isOpen">
            <li v-for="option in options" :key="option.value" @click="selectOption(option)">
                {{ option.label }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
    options: Array<{ value: string, label: string }>;
    modelValue: string;
}>();

const emit = defineEmits(['update:modelValue', 'change']);

const isOpen = ref(false);
const selectedOption = ref(props.options.find((option) => option.value === props.modelValue));

watch(props.modelValue, (newValue) => {
    selectedOption.value = props.options.find((option) => option.value === newValue);
});

const selectOption = (option: { value: string, label: string }) => {
    isOpen.value = false;
    selectedOption.value = option;
    emit('update:modelValue', option.value);
    emit('change', option.value);
};
</script>