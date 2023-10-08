import {defineStore} from 'pinia';
import {AppointmentModel} from 'src/models/AppointmentModel';
import {computed, Ref, ref} from 'vue';
import {CalendarModel} from 'src/models/CalendarModel';

/**
 * This pinia store is responsible for storing calendar data.
 */
export const useCalendarStore = defineStore('CalendarStore', () => {
  // region STATES
  const id = ref(0);
  const name = ref('');
  const description = ref('');
  const category = ref('');
  const appointments: Ref<AppointmentModel[]> = ref([]);
  // endregion

  // region GETTERS
  const calendar = computed(() => {
    const cal = new CalendarModel();
    cal.id = id.value;
    cal.name = name.value;
    cal.description = description.value;
    cal.color = category.value;
    cal.appointments = appointments.value
    return cal;
  })
  // endregion

  // region ACTIONS
  function resetStore() {
    id.value = 0;
    name.value = '';
    description.value = '';
    category.value = '';
    appointments.value = [];
  }
  // endregion

  return {
    // STATES
    id,
    name,
    description,
    category,
    appointments,

    // GETTERS
    calendar,

    // ACTIONS
    resetStore
  }
});
