<template>
  <q-expansion-item
    :label="$t('settings.start-page.title')"
    icon="home" expand-separator class="lg-font-size"
  >
    <q-card class="md-font-size bg-contrast-2">
      <q-card-section>
        {{ $t('settings.start-page.description') }}
        <start-page-select/>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup lang="ts">
import StartPageSelect from 'components/selects/StartPageSelect.vue';
</script>
