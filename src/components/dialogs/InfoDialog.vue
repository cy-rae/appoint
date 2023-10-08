<template>
  <q-dialog>
    <q-card class="full-width bg-contrast-2">
      <!-- TITLE -->
      <q-toolbar class="bg-primary text-secondary">
        <q-toolbar-title>
          {{ props.title }}
        </q-toolbar-title>
        <q-btn
          @click="emit('close')"
          icon="close" dense color="transparent" text-color="secondary" unelevated
        />
      </q-toolbar>

      <!-- DESCRIPTION -->
      <q-card-section>
        {{ props.description }}
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
// Instantiate properties
interface Props {
  title: string,
  description: string
}
const props = defineProps<Props>();

// Initialize emit methods.
const emit = defineEmits<{
  (e: 'close'): void;
}>();
</script>
