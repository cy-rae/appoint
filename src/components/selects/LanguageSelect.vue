<template>
  <q-select
    v-model="selectedLanguage"
    :options="languageOptions"
    :option-label="(e) => e.displayName()"
    :label="$t('settings.language.title')"
    @update:model-value="onUpdateModelValue"
    behavior="menu" options-selected-class="text-accent" color="accent" bg-color="contrast-3" filled class="md-font-size"
  >
    <!-- OPTIONS TEMPLATE -->
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps" class="bg-contrast-3" clickable v-ripple>
        <q-item-section>
          <q-item-label>
              {{ scope.opt.displayName() }}
            </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator color="contrast-4"/>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import {useSettingsStore} from 'stores/SettingsStore';
import {computed, ref} from 'vue';

// Instantiate helpers.
const settingsStore = useSettingsStore();

// Initialize template variables.
const selectedLanguage = ref(settingsStore.selectedLocale);
const languageOptions = computed(() => settingsStore.languages);

/**
 * If the user updates the model value, the store will be updated.
 */
function onUpdateModelValue() {
  settingsStore.locale = selectedLanguage.value.locale;
}
</script>
