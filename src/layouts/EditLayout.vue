<template>
  <q-layout view="hHh LpR lFr">
    <div id="background">
      <div id="blur">
        <div id="darken">

          <!-- HEADER -->
          <q-header elevated class="bg-primary text-secondary header-size">
            <q-toolbar class="header-size full-width text-center">
              <!-- TITLE -->
              <q-toolbar-title class="q-mt-auto q-mb-auto q-pl-xl text-cursive xxl-font-size">
                {{ title }}
              </q-toolbar-title>

              <!-- CLOSE BUTTON -->
              <q-btn @click="onCancel" icon="close" color="primary" text-color="secondary" dense round unelevated/>
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
import {useRouter} from 'vue-router';
import {PagePaths} from 'src/enums/PagePaths';

// Initialize helpers.
const router = useRouter();
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

function onCancel() {
 router.push(PagePaths.MAIN)
}

/**
 * If the name of the new calendar changes in the store, the title will be updated.
 */
watch(() => calendarStore.name, (newVal: string) => {
  title.value = newVal || i18n.t('new-calendar-page.title')
})
</script>
