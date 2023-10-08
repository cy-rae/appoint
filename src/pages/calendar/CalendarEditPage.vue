<template>
  <q-page class="q-pa-md">
    <!-- EDIT SETTINGS BUTTON -->
    <div id="buttonsDivId" class="row full-width justify-end q-mb-sm q-gutter-sm">
      <q-btn @click="onEdit" icon="edit" color="primary" text-color="secondary" round/>
      <q-btn @click="onDone" icon="done" color="primary" text-color="secondary" round/>
    </div>

    <!-- EDIT DIALOG -->
    <calendar-properties-dialog ref="calendarEditRef" @set-calendar-properties="onSetCalendarProperties"/>

    <!-- CALENDAR NAME -->
    <q-input
      ref="calendarNameInputRef"
      v-model="calendar.name"
      :label="$t('new-calendar-page.calendar-name')"
      @update:model-value="onUpdateCalendarName"
      :rules="[() => !!calendar.name]"
      filled dense bg-color="secondary" label-color="primary"
      input-class="text-primary text-bold text-cursive xl-font-size"
    >
      <template v-slot:append>
        <!-- CLEAR BUTTON-->
        <q-btn
          v-if="calendar.name"
          @click="calendar.name=''"
          icon="close" unelevated dense round color="primary" text-color="secondary" size="xs"
        />

        <!-- DESCRIPTION BUTTON -->
        <q-btn
          v-if='calendar.description'
          @click="onShowDescription = !onShowDescription"
          icon="info" unelevated dense round color="transparent" text-color="primary"
        />
        <info-dialog
          v-model="onShowDescription"
          @close="onShowDescription = !onShowDescription"
          :title="$t('calendar-edit.calendar-description')"
          :description="calendar.description"
        />

        <!-- BOOKMARK ICON -->
        <q-icon v-if='calendar.color' name="bookmark" class="q-mb-md" :style="bookMarkStyle" size="lg"/>

        <!-- REQUIRED MARK -->
        <div class="text-accent text-bold">*</div>
      </template>
    </q-input>

    <!-- CALENDAR -->
    <q-date
      id="calendarId"
      v-model="selectedDate"
      :mask="dateMask"
      :events="events"
      :event-color="computeCalendarDayColor"
      @navigation="onNavigationClick"
      minimal class="full-width"
    />

    <!-- NEW APPOINTMENT BUTTON -->
    <div id="newAppointmentDivId" class="q-py-sm" style="text-align: center">
      <q-btn
        :label="$t('library.new-appointment')"
        @click="onNewAppointmentClick"
        color="accent" text-color="contrast-1" no-caps
      />

      <new-appointment-dialog ref="newAppointmentDialogRef"/>
    </div>

    <!-- APPOINTMENT SCROLL AREA -->
    <appointments-scroll-area
      :appointments="appointmentList"
      :height="scrollAreaHeight"
      :no-appointment-text="$t('appointment-scroll-area.no-appointments-added-for-selected-date')"
    />
  </q-page>
</template>

<script setup lang="ts">
import {computed, onMounted, Ref, ref} from 'vue';
import {DateUtils} from 'src/utils/DateUtils';
import AppointmentsScrollArea from 'components/scroll-areas/AppointmentsScrollArea.vue';
import {AppointmentModel} from 'src/models/AppointmentModel';
import {CalendarModel} from 'src/models/CalendarModel';
import {useCalendarStore} from 'stores/CalendarStore';
import {QInput} from 'quasar';
import CalendarEditDialog from 'components/dialogs/CalendarPropertiesDialog.vue';
import InfoDialog from 'components/dialogs/InfoDialog.vue';
import NewAppointmentDialog from 'components/dialogs/NewAppointmentDialog.vue';
import CalendarPropertiesDialog from 'components/dialogs/CalendarPropertiesDialog.vue';

interface Props {
  pCalendar?: CalendarModel
}

const props = defineProps<Props>();

// Instantiate helpers
const calendarStore = useCalendarStore();
const dateUtils = new DateUtils();

// Initialize template variables.
const calendarEditRef = ref<InstanceType<typeof CalendarEditDialog> | null>(null);
const calendar = ref(props.pCalendar || calendarStore.calendar);
const bookMarkStyle = computed(() =>
  !!calendar.value.color ? {color: calendar.value.color} : {}
);
const onShowDescription = ref(false);
const selectedDate = ref('');
const dateMask = computed(() => dateUtils.DATE_FORMAT_SHORT());
const events: Ref<string[]> = ref([]);
const calendarNameInputRef = ref<InstanceType<typeof QInput> | null>(null);
const newAppointmentDialogRef = ref<InstanceType<typeof NewAppointmentDialog> | null>(null);

// Initialize scroll area variables
const scrollAreaHeight = ref(document.body.offsetHeight * 0.35);
const appointmentList: Ref<AppointmentModel[]> = ref([]);

// region INITIALIZATION
/**
 * If the component gets mounted, the appointments of the current month will be loaded.
 */
onMounted(() => {
  // Initialize the selected date with today's date.
  selectedDate.value = dateUtils.adjustFormat(new Date()) || '';

  // Calculate the height of the scroll area and load all appointments that are taking place on the selected month.
  calculateScrollAreaHeight();
});

/**
 * Calculate the height of the scroll area.
 */
function calculateScrollAreaHeight() {
  // Get button that is over scroll area.
  const buttonsDivElement = document.getElementById('buttonsDivId');
  const calendarElement = document.getElementById('calendarId');
  const newAppointmentDivElement = document.getElementById('newAppointmentDivId');
  if (buttonsDivElement && calendarElement && newAppointmentDivElement) {
    // Height = body height - footer height - header height - calendar height - button div height - tab panel padding
    scrollAreaHeight.value = document.body.offsetHeight * 0.91 - buttonsDivElement.offsetHeight
      - calendarElement.offsetHeight - newAppointmentDivElement.offsetHeight - 32;
  }
}

/**
 * TODO: Load all appointments that are taking place in the selected month.
 */
function loadAppointmentsOfSelectedMonth() {
  const tmpList: AppointmentModel[] = [];
  for (let i = 0; i < 15; i++) {
    const appointment = new AppointmentModel();
    appointment.id = i;
    appointment.title = 'APPOINTMENT ' + i.toString();
    tmpList.push(appointment);
  }
  appointmentList.value = tmpList;
}

// endregion

// region EVENTS
/**
 * If the user edits the name of the calendar, the store data will be updated.
 */
function onUpdateCalendarName(newVal: string) {
  calendarStore.name = newVal;
}

// region CALENDAR EDIT EVENTS
/**
 * If the user clicks on the edit button, a dialog will be shown to edit the calendar data.
 */
function onEdit() {
  calendarEditRef.value.showDialog(calendar.value.color, calendar.value.description);
}

/**
 * If the user applies new calendar properties, the properties of the local calendar variable will be updated.
 * @param color This parameter will replace the color property of the local calendar variable.
 * @param description This parameter will replace the description property of the local calendar variable.
 */
function onSetCalendarProperties(color: string, description: string) {
  calendar.value.color = color;
  calendar.value.description = description;
}

// endregion

/**TODO
 * If the user clicks on the done button, the calendar will be validated. If the validation is successful, the calendar
 * will be stored.
 */
async function onDone() {
  console.log('onDone')
  if (await calendarNameInputRef.value?.validate()) {
    console.log('valid')
  }
}

/**
 * If the user selects a specific month or year on the navigation view,
 * the current date and the calendar events will be updated.
 * @param view This parameter contains the selected month and year.
 */
function onNavigationClick(view: { year: number, month: number }) {
  // Parse current date string into a date.
  let newDate: Date | null = dateUtils.stringToDate(selectedDate.value);

  // If parsing is not successful, the method will return. Thus, the current selected date will not change.
  if (!newDate) {
    return;
  }

  // If parsing is successful, month and year of the selected date will be replaced with the passed values.
  newDate.setMonth(view.month - 1);
  newDate.setFullYear(view.year);

  // TODO: Load appointments of selected month.

  // Recalculate scroll area height. It is possible that the calendar got bigger or smaller.
  calculateScrollAreaHeight();
}

/**
 * If the user clicks on the new appointment button, a dialog will be shown to create a new appointment for this
 * calendar on the selected date.
 */
function onNewAppointmentClick() {
  const startDate: Date = dateUtils.stringToDate(selectedDate.value);
  newAppointmentDialogRef.value?.showDialog(calendar.value, startDate);
}
// endregion

// region TEMPLATE METHODS
/**
 * Compute the color of a calendar day depending on an event.
 * @param eventDate
 */
function computeCalendarDayColor(eventDate: string) {
  const dateVal = dateUtils.stringToDate(selectedDate.value);
  const s = dateUtils.adjustFormat(dateVal, dateUtils.DATE_FORMAT_EVENT)
  if (eventDate === s) {
    return 'warning';
  } else {
    return 'positive'
  }
}

// endregion
</script>
