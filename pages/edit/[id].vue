<script setup lang="ts">
  const { $client, $router } = useNuxtApp()
  const $route = useRoute()
  const isLoading = ref<boolean>(false)
  const isTouched = ref<boolean>(false)
  const errors = ref<{
    firstName?: string
    lastName?: string
    phoneNumber?: string
  }>()

  const contactId = Number($route.params.id)
  const { data: contact } = await $client.getContact.useQuery(contactId)

  if (contact.value === null) {
    $router.push('/')
  }

  const formState = reactive({
    firstName: contact.value?.firstName || '',
    lastName: contact.value?.lastName || '',
    phoneNumber: contact.value?.phoneNumber || '',
  })

  watch(formState, () => {
    isTouched.value = true
  })

  const handleSubmit = async () => {
    errors.value = {}
    isLoading.value = true

    try {
      await $client.updateContact.mutate({
        id: contactId,
        firstName: formState.firstName,
        lastName: formState.lastName,
        phoneNumber: formState.phoneNumber,
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
      Edit contact
    </page-title>
    <form
      class="flex flex-col"
      @submit.prevent="handleSubmit"
    >
      <base-input
        v-model="formState.firstName"
        placeholder="First name"
        name="firstName"
        required
        :readonly="isLoading"
      />
      <span class="text-xs text-red-400 mt-1 mb-4">{{ errors?.firstName }}</span>
      
      <base-input
        v-model="formState.lastName"
        placeholder="Last name"
        name="lastName"
        required
        :readonly="isLoading"
      />
      <span class="text-xs text-red-400 mt-1 mb-4">{{ errors?.lastName }}</span>

      <base-input
        v-model="formState.phoneNumber"
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
          :disabled="isLoading || !isTouched"
        >
          {{ isLoading ? 'Processing...' : 'Save changes' }}
        </base-button>
      </div>
    </form>
  </div>
</template>