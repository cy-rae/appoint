<template>
  <q-page class="row items-center justify-evenly q-pa-md">
    <q-tab-panels v-model="tab" animated class="bg-transparent full-height full-width">
      <q-tab-panel :name="TabName.MAIN_CALENDAR" class="full-height q-pa-none">
        <main-calendar-tab-panel/>
      </q-tab-panel>

      <q-tab-panel :name="TabName.FAVORITE_CALENDARS" class="full-height q-pa-none">
        <favorite-calendars-tab-panel/>
      </q-tab-panel>

      <q-tab-panel :name="TabName.APPOINTMENT_OVERVIEW" class="full-height q-pa-none">
        <appointment-overview-tab-panel/>
      </q-tab-panel>

      <q-tab-panel :name="TabName.CALENDAR_OVERVIEW" class="full-height q-pa-none">
        <calendar-overview-tab-panel/>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>

  <!-- FOOTER WITH TABS -->
  <q-footer elevated class="bg-primary text-secondary footer-size">
    <q-tabs
      v-model="tab"
      align="justify" class="full-height" dense switch-indicator>
      <q-tab
        v-for="(startPage, index) in settingsStore.startPages"
        v-bind:key="index"
        :name="startPage.tabName"
        :label="startPage.displayName()"
        :icon="startPage.iconName" no-caps
      />
    </q-tabs>
  </q-footer>
</template>

<script setup lang="ts">
import { Ref, ref} from 'vue';
import MainCalendarTabPanel from 'components/tab-panels/MainCalendarTabPanel.vue';
import FavoriteCalendarsTabPanel from 'components/tab-panels/FavoriteCalendarsTabPanel.vue';
import AppointmentOverviewTabPanel from 'components/tab-panels/AppointmentOverviewTabPanel.vue';
import CalendarOverviewTabPanel from 'components/tab-panels/CalendarOverviewTabPanel.vue';
import {TabName} from 'src/enums/TabName';
import {useSettingsStore} from 'stores/SettingsStore';

// Instantiate helpers.
const settingsStore = useSettingsStore();

// Initialize tab variables.
const tab: Ref<TabName> = ref(settingsStore.startTab);
</script>
