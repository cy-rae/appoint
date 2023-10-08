<template>
  <q-layout view="hHh LpR lFr">
    <div id="background">
      <div id="blur">
        <div id="darken">

          <!-- HEADER -->
          <q-header elevated class="bg-primary text-secondary header-size">
            <q-toolbar class="header-size full-width text-center">
              <!-- CLOSE BUTTON -->
              <q-btn icon="close" color="primary" text-color="secondary" dense round unelevated/>

              <!-- TITLE -->
              <q-toolbar-title class="text-left q-mt-auto q-mb-auto q-pl-xl text-cursive xxl-font-size">
                {{ title }}
              </q-toolbar-title>
            </q-toolbar>
          </q-header>

          <!-- PAGE CONTAINER -->
          <q-page-container>
            <calendar-edit-page/>
          </q-page-container>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import {useI18n} from 'vue-i18n';
import {useCalendarStore} from 'stores/CalendarStore';
import CalendarEditPage from 'pages/calendar/CalendarEditPage.vue';

// Initialize helpers.
const i18n = useI18n();
const calendarStore = useCalendarStore();

// Initialize template variables.
const title = ref(i18n.t('new-calendar-page.title'));

/**
 * If the component gets mounted, make sure that the store is reset.
 */
onMounted(() => {
  calendarStore.resetStore();
});

/**
 * If the name of the new calendar changes in the store, the title will be updated.
 */
watch(() => calendarStore.name, (newVal: string) => {
  title.value = newVal || i18n.t('new-calendar-page.title')
})
</script>
