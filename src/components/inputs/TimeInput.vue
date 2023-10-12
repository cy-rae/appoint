<template>
  <q-input
    ref="inputTimeRef"
    v-model="inputTime"
    :label="label"
    :rules="props.rules"
    @update:model-value="onUpdateInputTime"
    mask="time" color="accent" filled
  >
    <template v-slot:append>
      <q-btn @click="showClock = true" icon="schedule" color="transparent" text-color="accent" dense round unelevated/>
        <q-dialog v-model="showClock">
          <q-time
            v-model="clockTime"
            :format24h="isFormat24h"
            @update:model-value="onUpdateClockTime"
            now-btn color="accent" text-color="contrast-1"
          />
        </q-dialog>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import {useI18n} from 'vue-i18n';
import {Locale} from 'src/enums/Locale';
import {ValidationUtils} from 'src/utils/ValidationUtils';
import {DateUtils} from 'src/utils/DateUtils';

// Initialize helpers
const i18n = useI18n({useScope: 'global'});
const dateUtils = new DateUtils();
const validationUtils = new ValidationUtils();

// Initialize properties
interface Props {
  time: string,
  label: string,
  rules: [() => string | true]
}
const props = defineProps<Props>();

// Initialize template variables
const inputTimeRef = ref();
const inputTime = ref(props.time);
const clockTime = ref(props.time);
const isFormat24h = computed(() => i18n.locale.value === Locale.DE);
const showClock = ref(false);

// region UPDATE METHODS
/**
 * If the input time gets updated, the clock time will be updated.
 */
function onUpdateInputTime() {
  // If the user did not enter a valid time, the clock time will be reset. Else, the clock time will be updated and
  // the new value will be emitted to the parent component.
  if (inputTime.value.length !== dateUtils.TIME_FORMAT.length || !validationUtils.isTimeStringValid(inputTime.value)
    || inputTime.value.includes('#')) {
    clockTime.value = ''
  } else {
    clockTime.value = inputTime.value;
    emit('update:time', inputTime.value);
  }
}

/**
 * If the clock time gets updated, the input time will be updated.
 */
function onUpdateClockTime() {
  // If the user did not enter a valid time, the clock time will be reset. Else, the clock time will be updated and
  // the new value will be emitted to the parent component.
  if (clockTime.value.length !== dateUtils.TIME_FORMAT.length || !validationUtils.isTimeStringValid(clockTime.value)
    || clockTime.value.includes('#')) {
    inputTime.value = ''
  } else {
    inputTime.value = clockTime.value;
    emit('update:time', clockTime.value);
  }
}

/**
 * If the time variable of the parent component changes, the local variable will be updated.
 */
watch(() => props.time, (newValue: string) => {
  // The time variable of the q-time component will be updated due to the watch method of the input time variable.
  inputTime.value = newValue;
});
// endregion

// region VALIDATION METHODS
/**
 * Check if date variables are valid.
 */
function isInputValid(): boolean {
  return !(!inputTime.value || !clockTime.value
    || inputTime.value !== clockTime.value
    || inputTime.value.length !== dateUtils.TIME_FORMAT.length
    || clockTime.value.length !== dateUtils.TIME_FORMAT.length);
}

/**
 * Validate the input field with the validation rules.
 */
function validate(): boolean {
  return inputTimeRef.value.validate();
}

// endregion

defineExpose({
  isInputValid, validate
});

const emit = defineEmits<{
  (e: 'update:time', time: string): void
}>();
</script>
