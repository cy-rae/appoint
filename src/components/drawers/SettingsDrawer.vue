<template>
  <q-drawer
    v-model="drawer"
    :width="drawerWidth"
    class="bg-contrast-2"
  >
    <q-scroll-area class="fit">
      <q-list>
        <q-item class="row header-size bg-primary text-secondary text-cursive q-pa-none">
          <!-- CLOSE BUTTON -->
          <q-btn
            @click="drawer = !drawer"
            icon="close" color="primary" text-color="secondary" unelevated rounded
          />

          <!-- TITLE -->
          <q-item-section class="col xxl-font-size text-center q-pa-sm">
            {{ $t('settings.title') }}
          </q-item-section>
        </q-item>
        <q-separator/>

        <!-- START PAGE SETTINGS -->
        <start-page-expansion-item/>
        <q-separator/>

        <!-- LANGUAGE SETTINGS -->
        <language-expansion-item/>
        <q-separator/>

        <!-- DARK MODE SETTINGS -->
        <dark-mode-expansion-item/>

        <!-- SAVE BUTTON -->
        <div class="full-width text-center q-mt-md">
          <q-btn
            :label="$t('library.save')"
            :disable="!areThereChanges"
            @click="onSave"
            color="accent" text-color="contrast-1" class="lg-font-size" no-caps
          />
        </div>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
<script setup lang="ts">
import {computed, ref} from 'vue';
import DarkModeExpansionItem from 'components/expansion-items/DarkModeExpansionItem.vue';
import LanguageExpansionItem from 'components/expansion-items/LanguageExpansionItem.vue';
import StartPageExpansionItem from 'components/expansion-items/StartPageExpansionItem.vue';
import {useSettingsStore} from 'stores/SettingsStore';

// Initialize helpers.
const settingsStore = useSettingsStore();

// Initialize initial store data
const initialStartTab = ref(settingsStore.startTab);
const initialLocale = ref(settingsStore.locale);
const initialDarkMode = ref(settingsStore.darkMode);

// Initialize template variables.
const drawer = ref(false);
const drawerWidth = computed(() => document.body.offsetWidth * 0.8);
const areThereChanges = computed(() =>
  initialStartTab.value!= settingsStore.startTab
  || initialLocale.value !== settingsStore.locale
  || initialDarkMode.value !== settingsStore.darkMode
);

// region EVENTS
function onSave() {
  initialStartTab.value = settingsStore.startTab;
  initialLocale.value = settingsStore.locale;
  initialDarkMode.value = settingsStore.darkMode;
}

/**
 * If the drawer gets shown, the initial settings state will be saved.
 */
function show() {
  initialStartTab.value = settingsStore.startTab;
  initialLocale.value = settingsStore.locale;
  initialDarkMode.value = settingsStore.darkMode;
  drawer.value = true;
}
// endregion

/**
 * Define exposed methods.
 */
defineExpose({
  show
});
</script>
