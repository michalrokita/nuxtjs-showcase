<script setup lang="ts">
  const { $client, $router } = useNuxtApp()
  const isLoading = ref<boolean>(false)
  const errors = ref<{
    firstName?: string
    lastName?: string
    phoneNumber?: string
  }>()

  const handleSubmit = async (event: Event) => {
    errors.value = {}
    isLoading.value = true

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)

    try {
      await $client.createContact.mutate({
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        phoneNumber: formData.get('phoneNumber') as string,
      })

      $router.push('/')
    } catch (ex: any) {
      const zodErrors = JSON.parse(ex?.shape?.message || '[]')
      
      zodErrors.forEach((error: { path: string; message: string }) => {
        errors.value = {
          ...errors.value,
          [error.path]: error.message,
        }
      })
      isLoading.value = false
    }
  }
</script>

<template>
  <div>
    <page-title class="mb-4">
      Add contact
    </page-title>
    <form
      class="flex flex-col"
      @submit.prevent="handleSubmit"
    >
      <base-input
        placeholder="First name"
        name="firstName"
        required
        :readonly="isLoading"
      />
      <span class="text-xs text-red-400 mt-1 mb-4">{{ errors?.firstName }}</span>
      
      <base-input
        placeholder="Last name"
        name="lastName"
        required
        :readonly="isLoading"
      />
      <span class="text-xs text-red-400 mt-1 mb-4">{{ errors?.lastName }}</span>

      <base-input
        placeholder="Phone number"
        type="tel"
        name="phoneNumber"
        required
        :readonly="isLoading"
      />
      <span class="text-xs text-red-400 mt-1 mb-4">{{ errors?.phoneNumber }}</span>

      <div class="flex justify-end gap-2">
        <nuxt-link to="/">
          <base-button
            variant="danger"
            type="button"
            :disabled="isLoading"
          >
            Cancel
          </base-button>
        </nuxt-link>
        <base-button
          variant="primary"
          type="submit"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Processing...' : 'Add' }}
        </base-button>
      </div>
    </form>
  </div>
</template>