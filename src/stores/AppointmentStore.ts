import {defineStore} from 'pinia';
import {AppointmentModel} from 'src/models/AppointmentModel';
import {computed, ref} from 'vue';
import {Priority} from 'src/enums/Priority';

/**
 * This pinia store is responsible for storing calendar data.
 */
export const useAppointmentStore = defineStore('AppointmentStore', () => {
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
    const a = new AppointmentModel();
    a.title = title.value;
    a.notes = notes.value;
    a.priority = priority.value;
    a.startDate = startDate.value;
    a.endDate = endDate.value;
    return a;
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
