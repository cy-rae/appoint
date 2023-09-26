<template>
  <q-expansion-item
    :label="$t('settings.dark-mode.title')"
    icon="dark_mode" expand-separator class="lg-font-size"
  >
    <!-- DESCRIPTION -->
    <q-card class="md-font-size bg-contrast-2">
      <q-card-section>
        {{ $t('settings.dark-mode.description') }}
        <br/>
        <q-toggle
          v-model="darkMode"
          @update:model-value="settingsStore.darkMode = darkMode"
          :label="$t('settings.dark-mode.title')"
          color="positive"
        />
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>
<script setup lang="ts">
import {ref, watch} from 'vue';
import {useQuasar} from 'quasar';
import {useSettingsStore} from 'stores/SettingsStore';

// Initialize helpers.
const q = useQuasar();
const settingsStore = useSettingsStore();

// Initialize template variables.
const darkMode = ref(settingsStore.darkMode);



/**
 * If the dark mode gets changed outside this component, the template variable will be updated.
 */
watch(() => settingsStore.darkMode, (newValue: boolean) =>
  darkMode.value = newValue
);
</script>
