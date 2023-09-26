<template>
  <q-expansion-item
    :label="$t('settings.language.title')"
    icon="translate" expand-separator class="lg-font-size"
  >
    <!-- DESCRIPTION -->
    <q-card class="md-font-size bg-contrast-2">
      <q-card-section>
        {{$t('settings.language.description')}}
        <language-select/>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup lang="ts">

import LanguageSelect from 'components/selects/LanguageSelect.vue';
</script>
