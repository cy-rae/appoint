<template>
  <q-page class="row items-center justify-evenly q-pa-md">
    <q-tab-panels v-model="tab" animated class="bg-transparent full-height full-width">
      <q-tab-panel :name="TabNames.MAIN_CALENDAR" class="full-height q-pa-none">
        <main-calendar-tab-panel/>
      </q-tab-panel>

      <q-tab-panel :name="TabNames.FAVORITE_CALENDARS" class="full-height q-pa-none">
        <favorite-calendars-tab-panel/>
      </q-tab-panel>

      <q-tab-panel :name="TabNames.APPOINTMENT_OVERVIEW" class="full-height q-pa-none">
        <appointment-overview-tab-panel/>
      </q-tab-panel>

      <q-tab-panel :name="TabNames.CALENDAR_OVERVIEW" class="full-height q-pa-none">
        <calendar-overview-tab-panel/>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>

  <!-- FOOTER WITH TABS -->
  <q-footer elevated class="bg-primary text-secondary footer-size">
    <q-tabs v-model="tab" align="justify" class="full-height" dense switch-indicator>
      <q-tab
        :name="TabNames.MAIN_CALENDAR"
        :label="$t('main-calendar.title')"
        icon="calendar_month" no-caps
      />
      <q-tab
        :name="TabNames.FAVORITE_CALENDARS"
        :label="$t('favorite-calendar.title')"
        icon="favorite_border" no-caps
      />
      <q-tab
        :name="TabNames.APPOINTMENT_OVERVIEW"
        :label="$t('appointment-overview.title')"
        icon="checklist" no-caps
      />
      <q-tab
        :name="TabNames.CALENDAR_OVERVIEW"
        :label="$t('calendar-overview.title')"
        icon="reorder" no-caps
      />
    </q-tabs>
  </q-footer>
</template>

<script setup lang="ts">
import {Ref, ref} from 'vue';
import MainCalendarTabPanel from 'components/tab-panels/MainCalendarTabPanel.vue';
import FavoriteCalendarsTabPanel from 'components/tab-panels/FavoriteCalendarsTabPanel.vue';
import AppointmentOverviewTabPanel from 'components/tab-panels/AppointmentOverviewTabPanel.vue';
import CalendarOverviewTabPanel from 'components/tab-panels/CalendarOverviewTabPanel.vue';
import {TabNames} from 'src/enums/TabNames';

// Initialize tab variables.
const tab: Ref<TabNames> = ref(TabNames.FAVORITE_CALENDARS);
</script>
