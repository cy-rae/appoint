import {defineStore} from 'pinia';
import {AppointmentModel} from 'src/models/AppointmentModel';
import {App, computed, ComputedRef, Ref, ref} from 'vue';
import {CalendarModel} from 'src/models/CalendarModel';

/**
 * This pinia store is responsible for storing all calendars and appointments during the usage of the Appoint app.
 */
export const useDataStore = defineStore('DataStore', () => {
  // region STATES
  const calendars: Ref<CalendarModel[]> = ref([]);
  // endregion

  // region GETTERS
  const appointments: ComputedRef<AppointmentModel[]> = computed(() => {
    const appointments: AppointmentModel[] = [];
    calendars.value.forEach((calendar: CalendarModel) => {
      appointments.push(...calendar.appointments);
    });

    return appointments;
  });

  const favoriteCalendars = computed(() => {
    return calendars.value.filter((calendar) => calendar.favorite);
  });
  // endregion

  // region ACTIONS
  function resetStore() {
    calendars.value = [];
  }
  // endregion

  return {
    // STATES
    calendars,

    // GETTERS
    appointments,
    favoriteCalendars,

    // ACTIONS
    resetStore
  }
});
