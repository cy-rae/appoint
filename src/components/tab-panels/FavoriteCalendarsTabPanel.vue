<template>
  <q-card v-if="!favoriteCalendars || !favoriteCalendars.length" class="bg-secondary lg-font-size">
    <q-card-section>
      {{ $t('favorite-calendar.no-favorite-calendars') }}
    </q-card-section>
  </q-card>

  <div v-else>
    <!-- FAVORITE CALENDARS -->
    <q-tab-panels
      v-model="tab"
      animated class="bg-transparent full-height full-width" swipeable infinite vertical
    >
      <q-tab-panel
        v-for="(calendar, index) in favoriteCalendars"
        v-bind:key="index"
        :name="index"
        class="full-height q-pa-none"
      >
        <!-- CALENDAR TITLE -->
       <calendar-title-label :calendar="calendar"/>

        <!-- CALENDAR -->
        <q-date
          id="calendarId"
          v-model="selectedDate"
          :mask="dateMask"
          :events="getAllEventsOfCalendar(calendar)"
          :event-color="computeCalendarDayColor"
          minimal
          class="full-width"
          @navigation="onNavigationClick"
        />
      </q-tab-panel>
    </q-tab-panels>

    <!-- NEW APPOINTMENT BUTTON -->
    <div id="newBookingButtonDivId" class="q-py-sm" style="text-align: center">
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
  </div>
</template>

<script setup lang="ts">

import {computed, ComputedRef, onMounted, Ref, ref} from 'vue';
import {DateUtils} from 'src/utils/DateUtils';
import AppointmentsScrollArea from 'components/scroll-areas/AppointmentsScrollArea.vue';
import {AppointmentModel} from 'src/models/AppointmentModel';
import {CalendarModel} from 'src/models/CalendarModel';
import InfoDialog from 'components/dialogs/InfoDialog.vue';
import CalendarTitleLabel from 'components/labels/CalendarTitleLabel.vue';

// Instantiate helpers
const dateUtils = new DateUtils();

// Initialize template variables.
const tab = ref(0);
const favoriteCalendars: Ref<CalendarModel[]> = ref([]);
const onShowDescription = ref(false);
const selectedDate = ref('');
const dateMask = computed(() => dateUtils.DATE_FORMAT_SHORT());

// Initialize scroll area variables
const scrollAreaHeight = ref(document.body.offsetHeight * 0.35);
const appointmentList: ComputedRef<AppointmentModel[]> = computed(() => {
  // Get selected date as date object.
  const targetDate: Date = dateUtils.stringToDate(selectedDate.value);

  // Return all appointments of the current calendar that take place on the selected day.
  return favoriteCalendars.value[tab.value]?.appointments.filter((appointment) => {
    const start = dateUtils.getStartOfDay(appointment.startDate);
    const end = dateUtils.getEndOfDay(appointment.endDate);
    return start.getTime() <= targetDate.getTime() && end.getTime() >= targetDate.getTime();
  }) || [];
});

// region INITIALIZATION
/**
 * If the component gets mounted, the appointments of the current month will be loaded.
 */
onMounted(() => {
  // Initialize the selected date with today's date.
  selectedDate.value = dateUtils.adjustFormat(new Date()) || '';

  // Calculate the height of the scroll area and load all appointments that are taking place on the selected month.
  calculateScrollAreaHeight();

  // TODO: Load favorite calendars.
  favoriteCalendars.value.push(new CalendarModel());
  favoriteCalendars.value.push(new CalendarModel());
  favoriteCalendars.value.push(new CalendarModel());
  const appointment = new AppointmentModel();
  appointment.title = 'TEST TITLE';
  appointment.description = 'TEST DESCRIPTION';
  appointment.startDate = new Date();
  appointment.endDate = new Date();
  favoriteCalendars.value[1].appointments.push(appointment)
  favoriteCalendars.value[1].name = 'Test calendar name'
  favoriteCalendars.value[1].description = 'Test calendar description'
  favoriteCalendars.value[1].color = '#a233f5'
});

/**
 * Calculate the height of the scroll area.
 */
function calculateScrollAreaHeight() {
  // Get button that is over scroll area.
  const mainCalendarElement = document.getElementById('mainCalendarId');
  const newAppointmentDivElement = document.getElementById('newAppointmentDivId');
  if (mainCalendarElement && newAppointmentDivElement) {
    // Height = body height - footer height - header height - calendar height - button div height - tab panel padding
    scrollAreaHeight.value = document.body.offsetHeight * 0.83 - mainCalendarElement.offsetHeight
      - newAppointmentDivElement.offsetHeight - 32;
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
 * If the user clicks on the new appointment button, the user will be redirected to a page to add an appointment to the
 * currently shown calendar.
 */
function onNewAppointmentClick() {
  console.log('onNewAppointmentClick')
}

// endregion

// region TEMPLATE METHODS
/**
 * Get all events of the passed calendar.
 */
function getAllEventsOfCalendar(calendar: CalendarModel) {
  const calendarEvents: string[] = [];
  calendar.appointments.forEach((appointment: AppointmentModel) => {
    const appointmentEvents = dateUtils.getEventsOfTimeSpan(appointment.startDate, appointment.endDate);
    calendarEvents.push(...appointmentEvents);
  });
  return calendarEvents;
}

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
