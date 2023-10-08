<template>
  <q-dialog v-model="dialog" persistent>
    <q-card class="full-width bg-contrast-2">
      <!-- TITLE -->
      <q-toolbar class="bg-primary text-secondary">
        <q-toolbar-title>
          {{$t('appointment-edit.new-appointment')}}
        </q-toolbar-title>
      </q-toolbar>

      <!-- PROPERTIES -->
      <q-card-section>
        <!-- TITLE -->
        <q-input
          v-model="appointment.title"
          :label="$t('appointment-edit.title')"
          :rules="[() => !!appointment.title]"
          filled dense bg-color="contrast-3" label-color="accent" input-class="text-accent text-bold"
        >
          <template v-slot:append>
            <!-- CLEAR BUTTON-->
            <q-btn
              v-if="appointment.title"
              @click="appointment.title = ''"
              icon="close" unelevated dense round color="primary" text-color="secondary" size="xs"
            />

            <!-- REQUIRED MARK -->
            <div class="text-accent text-bold">*</div>
          </template>
        </q-input>

        <!-- START DATE AND TIME -->

        <!-- END DATE AND TIME -->

        <!-- APPOINTMENT TYPE -->

        <!-- PRIORITY -->
        <q-select
          v-model="appointment.priority"
          :label="$t('appointment-edit.priority')"
          :options="[Priority.NO_PRIORITY, Priority.VERY_LOW, Priority.LOW, Priority.MIDDLE, Priority.HIGH, Priority.VERY_HIGH]"
          :option-label="getPriorityStr"
          filled options-selected-class="accent" input-class="accent"
        />

        <q-separator/>

        <!-- NOTES -->
        <q-input
          v-model="appointment.notes"
          :label="$t('appointment-edit.notes')"
          type="textarea" filled bg-color="contrast-3" label-color="accent" input-class="text-accent"
        />
      </q-card-section>

      <!-- CANCEL & SAVE BUTTONS -->
      <q-card-actions align="around">
        <q-btn
          :label="$t('library.cancel')"
          @click="hideDialog"
          no-caps unelevated color="contrast-2" text-color="accent"
        />
        <q-btn
          :label="$t('library.save')"
          @click="onSave"
          no-caps unelevated color="accent" text-color="contrast-1"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import {CalendarModel} from 'src/models/CalendarModel';
import {ref} from 'vue';
import {AppointmentModel} from 'src/models/AppointmentModel';
import {Priority} from 'src/enums/Priority';
import {useI18n} from 'vue-i18n';

// Initialize helpers
const i18n = useI18n();

// Initialize local variables
const dialog = ref(false);
const appointment = ref(new AppointmentModel());
let calendar = new CalendarModel();

// region EVENTS
/**
 * Show this dialog and update the local variables with the passed parameters.
 * @param cal This parameter specifies a calendar. The new appointment will be stored in this calendar.
 * @param start This parameter specifies a start date.
 */
function showDialog(cal: CalendarModel, start: Date) {
  calendar = cal;
  appointment.value.startDate = start;
  dialog.value = true;
}

/**
 * Hide this dialog.
 */
function hideDialog() {
  dialog.value = false;
}

/**
 * If the user clicks on the apply button, the new appointment will be emitted to the parent component to save it in the
 * calendar.
 */
function onSave() {
  emit('add-appointment', <AppointmentModel> appointment.value)
  dialog.value = false;
}
// endregion

// region TEMPLATE METHODS
function getPriorityStr(prio: Priority) {
  switch(prio) {
    case Priority.NO_PRIORITY:
      return i18n.t('priority.no-priority');
    case Priority.VERY_LOW:
      return i18n.t('priority.very-low');
    case Priority.LOW:
      return i18n.t('priority.low');
    case Priority.MIDDLE:
      return i18n.t('priority.middle');
    case Priority.HIGH:
      return i18n.t('priority.high');
    case Priority.VERY_HIGH:
      return i18n.t('priority.very-high');
  }
}
// endregion

const emit = defineEmits<{
  (e: 'add-appointment', appointment: AppointmentModel): void;
}>();

/**
 * Define exposed methods.
 */
defineExpose({
  showDialog
});
</script>
