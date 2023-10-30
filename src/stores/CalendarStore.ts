import {defineStore} from 'pinia';
import {AppointmentModel} from 'src/models/AppointmentModel';
import {computed, Ref, ref} from 'vue';
import {CalendarModel} from 'src/models/CalendarModel';

/**
 * This pinia store is responsible for storing calendar data.
 */
export const useCalendarStore = defineStore('CalendarStore', () => {
  // region STATES
  const name = ref('');
  const description = ref('');
  const color = ref('');
  const appointments: Ref<AppointmentModel[]> = ref([]);
  // endregion

  // region GETTERS
  const calendar = computed(() => {
    const cal = new CalendarModel();
    cal.name = name.value;
    cal.description = description.value;
    cal.color = color.value;
    cal.appointments = appointments.value
    return cal;
  })
  // endregion

  // region ACTIONS
  function resetStore() {
    name.value = '';
    description.value = '';
    color.value = '';
    appointments.value = [];
  }
  // endregion

  return {
    // STATES
    name,
    description,
    color,
    appointments,

    // GETTERS
    calendar,

    // ACTIONS
    resetStore
  }
});
