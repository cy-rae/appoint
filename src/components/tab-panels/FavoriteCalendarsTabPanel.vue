<template>

  <!-- CALENDAR -->
  <q-date
    id="calendarId"
    v-model="selectedDate"
    :mask="dateMask"
    :events="events"
    :event-color="computeCalendarDayColor"
    minimal
    class="full-width"
    @navigation="onNavigationClick"
  />

  <!-- NEW APPOINTMENT BUTTON -->
  <div id="newBookingButtonDivId" class="q-py-sm" style="text-align: center">
    <q-btn
      :label="$t('library.new-appointment')"
      @click="onNewAppointmentClick"
      color="accent" text-color="contrast-1" no-caps
    />
  </div>

  <!-- APPOINTMENT SCROLL AREA -->

</template>
