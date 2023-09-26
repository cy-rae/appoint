<template>
  <q-select
    v-model="selectedStartPage"
    :options="startPageOptions"
    :label="$t('settings.start-page.title')"
    @update:model-value="onUpdateModelValue"
    behavior="menu" options-selected-class="text-accent" color="accent"  bg-color="contrast-3" filled
  >
    <!-- SELECTED TEMPLATE -->
    <template v-slot:selected>
      <div class="row full-width">
        <q-icon :name="selectedStartPage.iconName" size="sm"/>
        <div class="col q-pl-md q-my-auto md-font-size">
          {{ selectedStartPage.displayName() }}
        </div>
      </div>
    </template>

    <!-- OPTIONS TEMPLATE -->
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps" class="bg-contrast-3" clickable v-ripple>
        <q-item-section>
          <q-item-label class="row full-width">
            <q-icon :name="scope.opt.iconName" size="sm"/>
            <div class="col q-pl-md q-my-auto md-font-size">
              {{ scope.opt.displayName() }}
            </div>
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
const selectedStartPage = ref(settingsStore.selectedStartPage);
const startPageOptions = computed(() => settingsStore.startPages);

/**
 * If the user updates the model value, the store will be updated.
 */
function onUpdateModelValue() {
  settingsStore.startTab = selectedStartPage.value.tabName;
}
</script>
