<template>
  <q-dialog v-model="dialog" persistent>
    <q-card class="full-width bg-contrast-2">
      <q-toolbar class="bg-primary text-secondary">
        <q-toolbar-title>
          {{ $t('calendar-edit.calendar-properties') }}
        </q-toolbar-title>
      </q-toolbar>

      <q-card-section>
        <div class="row full-width q-pb-sm">
          <div class="col lg-font-size q-my-auto">
            <q-icon :name="!!color ? 'bookmark' : 'turned_in_not'" :style="bookMarkStyle" size="md"/>
            {{ $t('calendar-edit.select-color') }}
          </div>
          <q-btn
            @click="color = ''"
            icon="restart_alt" round color="transparent" text-color="accent" unelevated dense
          />
        </div>
        <q-color
          v-model="color"
          no-header no-footer default-view="palette" style="max-width: 100%"
        />
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="description"
          :label="$t('calendar-edit.calendar-description')"
          type="textarea" outlined filled bg-color="contrast-2" clearable style="border-radius: 6px"
        />
      </q-card-section>

      <!-- APPLY & CANCEL BUTTON -->
      <q-card-actions align="around">
        <q-btn
          :label="$t('library.close')"
          @click="hideDialog"
          no-caps unelevated color="contrast-2" text-color="accent"
        />
        <q-btn
          :label="$t('library.apply')"
          @click="onApply"
          no-caps unelevated color="accent" text-color="contrast-1"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';

// Instantiate local variables.
const dialog = ref(false);
const color = ref('');
const bookMarkStyle = computed(() =>
  !!color.value ? {color: color.value} : {}
);
const description = ref('');

// region EVENTS
/**
 * Show dialog and set the local variables with the passed values.
 */
function showDialog(initColor: string, initDescription: string) {
  color.value = initColor;
  description.value = initDescription;
  dialog.value = true;
}

/**
 * Hide this dialog.
 */
function hideDialog() {
  dialog.value = false;
}

/**
 * If the user clicks on the apply button, the selected color and the description will be emitted to the parent
 * component.
 */
function onApply() {
  emit('set-calendar-properties', color.value, description.value)
  dialog.value = false;
}

// endregion

/**
 * Define emit methods.
 */
const emit = defineEmits<{
  (e: 'set-calendar-properties', color: string, description: string): void;
}>()

/**
 * Define exposed methods.
 */
defineExpose({
  showDialog
});
</script>
