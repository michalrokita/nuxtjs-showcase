<script setup lang="ts">
  import debounce from 'lodash.debounce'

  const { $client } = useNuxtApp()
  const lastName = ref<string>('')
  const input = ref<Parameters<typeof $client.getContacts.useQuery>[0]>(null)

  const { data: contacts, pending, error, refresh } = await $client.getContacts.useQuery(input)

  watch(lastName, debounce(() => {
    input.value = lastName ? { lastName: lastName.value } : null
    refresh()
  }, 500))

  const removeContact = async (id: number) => {
    const shouldRemove = confirm('Are you sure you want to delete this contact?')

    if (!shouldRemove) {
      return
    }

    await $client.removeContact.mutate(id)
    refresh()
  }
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-6">
      <div class="flex justify-between items-center">
        <page-title>
          Contacts
        </page-title>
        <nuxt-link to="/add">
          <base-button variant="primary">
            <nuxt-icon
              name="plus"
              class="mr-2 inline-flex items-center justify-center"
            />
            <span>Add Contact</span>
          </base-button>
        </nuxt-link>
      </div>
      <base-input
        v-model="lastName"
        type="search"
        placeholder="Search for contact by last name..."
      />
    </div>
    <div
      v-if="!contacts?.length"
      class="text-center text-gray-400"
    >
      No contacts found.
    </div>
    <div
      v-else-if="pending"
      class="text-center text-gray-400"
    >
      Loading...
    </div>
    <div
      v-else-if="error"
      class="text-center text-red-400"
    >
      Error occured while loading contacts.
    </div>
    <div v-else>
      <div
        v-for="contact in contacts"
        :key="contact.id"
        class="flex justify-between items-center border border-gray-200 py-6 px-4 bg-white rounded-md mb-2"
      >
        <div class="flex flex-col gap-2">
          <span class="text-lg font-semibold">{{ contact.firstName }} {{ contact.lastName }}</span>
          <div class="inline-flex gap-1 leading-4 text-gray-400 text-sm">
            <nuxt-icon name="phone" /> 
            <span>{{ contact.phoneNumber }}</span>
          </div>
        </div>
        <div class="flex gap-2">
          <nuxt-link :to="`/edit/${contact.id}`">
            <base-button>
              <nuxt-icon name="edit" />
            </base-button>
          </nuxt-link>
          <base-button
            variant="danger"
            @click="removeContact(contact.id)"
          >
            <nuxt-icon name="trash" />
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>