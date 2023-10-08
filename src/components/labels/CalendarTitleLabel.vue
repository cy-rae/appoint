<template>
  <!-- CALENDAR TITLE -->
  <div class="row full-width bg-secondary q-mb-sm q-py-xs" style="border-radius: 6px;">
    <!-- NAME -->
    <div class="col text-cursive full-width text-bold text-primary xl-font-size q-pl-sm q-my-auto">
      {{ props.calendar.name }}
    </div>

    <!-- DESCRIPTION BUTTON -->
    <q-btn
      v-if='props.calendar.description'
      @click="onShowDescription = !onShowDescription"
      icon="info" unelevated dense round color="transparent" text-color="primary"
    />
    <info-dialog
      v-model="onShowDescription"
      @close="onShowDescription = !onShowDescription"
      :title="$t('calendar-edit.calendar-description')"
      :description="props.calendar.description"
    />

    <!-- BOOKMARK ICON -->
    <q-icon
      v-if='props.calendar.color'
      :style="!!props.calendar.color ? {color: props.calendar.color} : {}"
      name="bookmark" style="margin-top: -10px" size="lg"
    />
  </div>
</template>

<script setup lang="ts">
import {CalendarModel} from 'src/models/CalendarModel';
import {ref} from 'vue';
import InfoDialog from 'components/dialogs/InfoDialog.vue';

// Instantiate properties
interface Props {
  calendar: CalendarModel
}
const props = defineProps<Props>();

// Initialize template variables.
const onShowDescription = ref(false);
</script>
