<script setup lang="ts">
  const props = defineProps<{
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary' | 'danger'
    disabled?: boolean
    onClick?: (event: MouseEvent) => void
  }>()
  

  const variantClasses= computed(() => {
    switch (props.variant) {
      case 'primary':
        return 'bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-500'
      case 'secondary':
        return 'bg-gray-600 hover:bg-gray-700 focus-visible:ring-gray-500'
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500'
      default:
        return 'bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-500'
    }
  })

  const classNames = computed(() => [
    `
      inline-flex items-center px-2 py-2 border border-transparent 
      rounded-md shadow-sm text-sm font-medium text-white focus:outline-none 
      focus-visible:ring-2 focus-visible:ring-offset-2
    `,
    variantClasses.value,
    props.disabled ? 'opacity-50 cursor-not-allowed' : '',
  ])

</script>

<template>
  <button
    :class="classNames"
    :type="type"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </button>
</template>