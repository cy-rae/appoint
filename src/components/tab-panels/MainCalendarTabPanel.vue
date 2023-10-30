<template>
  <!-- CALENDAR NAME -->
  <div id="mainCalendarTitleId" class="text-cursive text-bold text-primary xl-font-size bg-secondary q-mb-sm q-pl-sm" style="border-radius: 6px;">
    {{$t('main-calendar.title')}}
  </div>

  <!-- CALENDAR -->
  <q-date
    id="mainCalendarId"
    v-model="selectedDate"
    :mask="dateMask"
    :events="events"
    :event-color="computeCalendarDayColor"
    minimal
    class="full-width"
    @navigation="onNavigationClick"
  />

  <!-- NEW APPOINTMENT BUTTON -->
  <div id="newAppointmentDivId" class="q-py-sm" style="text-align: center">
    <q-btn
      :label="$t('library.new-appointment')"
      @click="onNewAppointmentClick"
      color="accent" text-color="contrast-1" no-caps
    />
  </div>

  <!-- APPOINTMENT SCROLL AREA -->
  <appointments-scroll-area
    :appointments="appointmentList"
    :height="scrollAreaHeight"
    :no-appointment-text="$t('appointment-scroll-area.no-appointments-scheduled-for-selected-date')"
  />
</template>

<script setup lang='ts'>
import {computed, onMounted, Ref, ref} from 'vue';
import {DateUtils} from 'src/utils/DateUtils';
import AppointmentsScrollArea from 'components/scroll-areas/AppointmentsScrollArea.vue';
import {useDataStore} from 'stores/DataStore';
import {ComputedRef} from 'vue/dist/vue';
import {AppointmentModel} from 'src/models/AppointmentModel';

// Instantiate helpers
const dateUtils = new DateUtils();
const dataStore = useDataStore();

// Initialize template variables.
const selectedDate = ref('');
const dateMask = computed(() => dateUtils.DATE_FORMAT_SHORT());
const events: Ref<string[]> = computed(() => dateUtils.computeEvents(dataStore.appointments));
const appointmentList: ComputedRef<AppointmentModel[]> = computed(() => {
  // Get selected date as date object.
  const targetDate: Date = dateUtils.stringToDate(selectedDate.value, dateUtils.DATE_FORMAT_SHORT());

  // Return all appointments of the current calendar that take place on the selected day.
  return dataStore.appointments.filter((appointment) => {
    const start = dateUtils.getStartOfDay(appointment.startDate);
    const end = dateUtils.getEndOfDay(appointment.endDate);
    return start.getTime() <= targetDate.getTime() && end.getTime() >= targetDate.getTime();
  }) || [];
});

// Initialize scroll area variables
const scrollAreaHeight = ref(document.body.offsetHeight * 0.35);

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
  const mainCalendarTitleElement = document.getElementById('mainCalendarTitleId');
  const mainCalendarElement = document.getElementById('mainCalendarId');
  const newAppointmentDivElement = document.getElementById('newAppointmentDivId');

  if(mainCalendarTitleElement && mainCalendarElement && newAppointmentDivElement) {
    // Height = body height - footer height - header height - calendar height - button div height - tab panel padding
    scrollAreaHeight.value = document.body.offsetHeight * 0.83 - mainCalendarTitleElement.offsetHeight
      - mainCalendarElement.offsetHeight - newAppointmentDivElement.offsetHeight - 32;
    console.log(mainCalendarElement.offsetHeight + newAppointmentDivElement.offsetHeight + 32)
  }
}
// endregion

// region EVENTS
/**
 * If the user selects a specific month or year on the navigation view,
 * the current date and the calendar events will be updated.
 * @param view This parameter contains the selected month and year.
 */
function onNavigationClick(view: { year: number, month: number }) {
  // Parse current date string into a date.
  let newDate: Date | null = dateUtils.stringToDate(selectedDate.value, dateUtils.DATE_FORMAT_SHORT());

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

function onNewAppointmentClick(){
  console.log('onNewAppointmentClick')
}
// endregion

// region TEMPLATE METHODS
/**
 * Compute the color of a calendar day depending on an event.
 * @param eventDate
 */
function computeCalendarDayColor(eventDate: string) {
  const dateVal = dateUtils.stringToDate(selectedDate.value, dateUtils.DATE_FORMAT_SHORT());
  const s = dateUtils.adjustFormat(dateVal, dateUtils.DATE_FORMAT_EVENT)
  if (eventDate === s) {
    return 'warning';
  } else {
    return 'positive'
  }
}
// endregion
</script>
