<template>
  <router-view/>
</template>

<script setup lang="ts">
import {computed, onMounted, watch} from 'vue';
import {LanguageUtils} from 'src/utils/LanguageUtils';
import {useSettingsStore} from 'stores/SettingsStore';
import {useQuasar} from 'quasar';
import {useI18n} from 'vue-i18n';
import {ThemeUtils} from 'src/utils/ThemeUtils';
import {TestDataUtils} from 'src/utils/TestDataUtils';

// Initialize helpers
const q = useQuasar();
const i18n = useI18n();
const settingsStore = useSettingsStore();
const testDataUtils = new TestDataUtils();
const languageUtils = new LanguageUtils();
const themeUtils = new ThemeUtils();

// Initialize variable that computes if i18n locale and settings locale are different or note.
const isI18nInconsistent = computed(() =>
  settingsStore.locale !== i18n.locale.value
);

// Initialize variable that computes if quasar lang and settings locale are different or note.
const isQuasarLangInconsistent = computed(() =>
  settingsStore.locale !== q.lang.isoName
);

// Initialize variable that computes if the theme is inconsistent or not.
const isThemeInconsistent = computed(() =>
  (settingsStore.darkMode && !q.dark.isActive) || (!settingsStore.darkMode && q.dark.isActive)
);

// region INITIALIZATION
/**
 * If the app gets mounted, the language of the app will be initialized with user's settings.
 */
onMounted(async () => {
  // TODO: Load app settings.

  if (isI18nInconsistent.value)
    i18n.locale.value = settingsStore.locale;
  if (isQuasarLangInconsistent.value)
    await languageUtils.loadQuasarLanguagePack(settingsStore.locale);
  if(isThemeInconsistent.value)
    themeUtils.changeTheme();

  // Load test data
  testDataUtils.initializeStoreWithTestData();
});
// endregion

// region INCONSISTENCY HANDLING
/**
 * If the app's theme is inconsistent, the theme will be updated.
 */
watch(isI18nInconsistent, (newValue: boolean) => {
  if (newValue)
    i18n.locale.value = settingsStore.locale;
});

/**
 * If the app's theme is inconsistent, the theme will be updated.
 */
watch(isQuasarLangInconsistent, async (newValue: boolean) => {
  if (newValue)
    await languageUtils.loadQuasarLanguagePack(settingsStore.locale);
});

/**
 * If the app's theme is inconsistent, the theme will be updated.
 */
watch(isThemeInconsistent, (newValue: boolean) => {
  if (newValue)
    themeUtils.changeTheme();
});
// endregion
</script>
