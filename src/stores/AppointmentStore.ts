import {defineStore} from 'pinia';
import {AppointmentModel} from 'src/models/AppointmentModel';
import {computed, ref} from 'vue';
import {Priority} from 'src/enums/Priority';
import {DateUtils} from 'src/utils/DateUtils';

/**
 * This pinia store is responsible for storing calendar data.
 */
export const useAppointmentStore = defineStore('AppointmentStore', () => {
  // Initialize helpers.
  const dateUtils = new DateUtils();

  // region STATES
  const title = ref('');
  const notes = ref('');
  const priority = ref(Priority.NO_PRIORITY);
  const startDate = ref('');
  const endDate = ref('');
  // endregion

  // region GETTERS
  /**
   * Get an instance of the appointment with the state variables as properties.
   */
  const appointment = computed(() => {
    const cal = new AppointmentModel();
    cal.title = title.value;
    cal.notes = notes.value;
    cal.priority = priority.value;
    cal.startDate = dateUtils.stringToDate(startDate.value);
    cal.endDate = dateUtils.stringToDate(endDate.value);
    return cal;
  })
  // endregion

  // region ACTIONS
  /**
   * Reset all state variables.
   */
  function resetStore() {
    title.value = '';
    notes.value = '';
    priority.value = Priority.NO_PRIORITY;
    startDate.value = '';
    endDate.value = '';
  }
  // endregion

  return {
    // STATES
    title,
    notes,
    priority,
    startDate,
    endDate,

    // GETTERS
    appointment,

    // ACTIONS
    resetStore
  }
});
