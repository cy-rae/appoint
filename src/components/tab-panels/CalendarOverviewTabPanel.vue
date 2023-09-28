<template>
  <div class="row full-width q-pb-sm">
    <div id="newCalendarDivId" class="col text-right">
      <q-btn
        @click="onNewCalendarClick"
        icon="add" color="accent" text-color="secondary" no-caps round
      />
    </div>
  </div>

  <!-- SCROLL AREA WITH ALL CALENDARS -->
  <calendars-scroll-area/>
</template>
<script setup lang="ts">
import CalendarsScrollArea from 'components/scroll-areas/CalendarScrollArea.vue';
import {useRouter} from 'vue-router';
import {PagePaths} from 'src/enums/PagePaths';

// Initialize helpers
const router = useRouter();

/**
 * If the user clicks on the new calendar button, the user will be redirected to a page to create a new calendar.
 */
function onNewCalendarClick() {
  router.push(PagePaths.NEW_CALENDAR);
}
</script>
