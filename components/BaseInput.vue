<script setup lang="ts">
  defineProps<{
    type?: 'text' | 'password' | 'search' | 'tel'
    readonly?: boolean
    onInput?: (event: Event) => void
    onBlur?: (event: FocusEvent) => void
    onFocus?: (event: FocusEvent) => void
    placeholder?: string
    modelValue?: string
  }>()
  defineEmits(['update:modelValue'])
</script>
<template>
  <input
    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    :type="type || 'text'"
    :readonly="readonly"
    :value="modelValue"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    @blur="onBlur"
    @focus="onFocus"
  >
</template>