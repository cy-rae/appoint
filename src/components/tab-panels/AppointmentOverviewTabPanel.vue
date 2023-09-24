<template>
  <div class="row full-width q-pb-sm">
    <div id="newAppointmentDivId" class="col text-right">
      <q-btn
        @click="onNewAppointmentClick"
        icon="add" color="accent" text-color="secondary" no-caps round
      />
    </div>
  </div>

  <!-- SCROLL AREA WITH ALL CALENDARS -->
  <appointments-scroll-area
    :height="scrollAreaHeight"
    :appointments="appointmentList"
  />
</template>
<script setup lang="ts">
import AppointmentsScrollArea from 'components/scroll-areas/AppointmentsScrollArea.vue';
import {onMounted, Ref, ref} from 'vue';
import {AppointmentModel} from 'src/models/AppointmentModel';

const scrollAreaHeight = ref(document.body.offsetHeight * 0.7);
const appointmentList: Ref<AppointmentModel[]> = ref([]);

/**
 * If the component gets mounted, the scroll area height will be calcualted and the appointments will be loaded.
 */
onMounted(() => {
  calculateScrollAreaHeight();
  loadAppointments();
});

/**
 * Calculate the height of the scroll area.
 */
function calculateScrollAreaHeight() {
  // Get button that is over scroll area.
  const newCalendarDivElement = document.getElementById('newAppointmentDivId');
  if(newCalendarDivElement) {
    // Height = body height - footer height - header height - button div height - tab panel padding
    scrollAreaHeight.value = document.body.offsetHeight * 0.83 - newCalendarDivElement.offsetHeight - 32;
  }
}

function loadAppointments() {
  const tmpList: AppointmentModel[] = [];
  // TODO: Load the next 25 appointments.
  for(let i = 0; i < 15; i++) {
    const appointment = new AppointmentModel();
    appointment.id = i;
    appointment.title = 'APPOINTMENT ' + i.toString();
    tmpList.push(appointment);
  }
  appointmentList.value = tmpList;
}

/**
 * If the user clicks on the new calendar button, the user will be redirected to a page to create a new calendar.
 */
function onNewAppointmentClick() {
// TODO
  console.log('onNewAppointmentClick')
}
</script>
