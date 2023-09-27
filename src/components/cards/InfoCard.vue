<template>
  <q-card class="q-pa-sm">
    <!-- TITLE -->
    <q-card-section v-if="props.title" class="lg-font-size">
      {{props.title}}
    </q-card-section>
    <q-card-section v-if="!props.title && props.isError" class="lg-font-size">
      {{$t('error-message.title')}}
    </q-card-section>

    <!-- DESCRIPTION -->
    <q-card-section v-if="props.description">
      {{props.description}}
    </q-card-section>
    <q-card-section v-if="!props.description && props.isError">
      {{$t('error-message.default')}}
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
// Instantiate properties.
interface Props {
  title?: string
  description?: string
  isError?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isError: false
});
</script>
