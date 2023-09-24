<template>
  <q-card class="q-pa-sm">
    <!-- TITLE -->
    <q-card-section v-if="props.title">
      {{props.title}}
    </q-card-section>
    <q-card-section v-else>
      {{$t('error-message.title')}}
    </q-card-section>

    <!-- DESCRIPTION -->
    <q-card-section v-if="props.description">
      {{props.description}}
    </q-card-section>
    <q-card-section v-else>
      {{$t('error-message.default')}}
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
// Instantiate properties.
interface Props {
  title?: string
  description?: string
}
const props = defineProps<Props>();
</script>
