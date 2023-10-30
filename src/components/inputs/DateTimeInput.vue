<template>
  <div class="row full-width">
    <!-- DATE INPUT -->
    <div class="col-8 q-pr-xs">
      <date-input
        :date="dateStr"
        :label="props.dateLabel"
        :rules="dateRules"
        @update:date="onUpdateDate"
      />
    </div>

    <!-- TIME INPUT -->
    <div class="col-4">
    <time-input
      :time="timeStr"
      :label="props.timeLabel"
      :rules="timeRules"
      @update:time="onUpdateTime"
    />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import {DateUtils} from 'src/utils/DateUtils';
import DateInput from 'components/inputs/DateInput.vue';
import TimeInput from 'components/inputs/TimeInput.vue';

// Initialize helpers.
const dateUtils = new DateUtils();

// Instantiate properties
interface Props {
  date: string,
  dateLabel: string,
  timeLabel: string,
  dateRules: (() => string | true)[],
  timeRules: (() => string | true)[]
}
const props = defineProps<Props>();

// Instantiate local variables
const dateTime = ref(props.date);
const dateStr = computed(() => dateUtils.adjustFormat(dateTime.value));
const timeStr = computed(() => dateUtils.adjustFormat(dateTime.value, dateUtils.TIME_FORMAT));

// region UPDATE METHODS
/**
 * If the date gets updated, the local variable will be updated and the new value will be emitted to the parent
 * component.
 * @param newDateStr This parameter represents the new date value.
 */
function onUpdateDate(newDateStr: string) {
  // Get new and old date values as strings.
  let newDate = dateUtils.stringToDate(newDateStr, dateUtils.DATE_FORMAT_SHORT());
  const oldDate = dateUtils.stringToDate(dateTime.value, dateUtils.DATE_FORMAT_LONG());

  // Set the time of the old date on the new date.
  newDate = dateUtils.adjustTime(newDate, oldDate);

  // Get new date as string and emit it to parent component.
  dateTime.value = dateUtils.adjustFormat(newDate, dateUtils.DATE_FORMAT_LONG()) || '';
  emit('update:date', dateTime.value);
}

/**
 * If the time gets updated, the local variable will be updated and the new value will be emitted to the parent
 * component.
 * @param newTimeStr This parameter represents the new time value.
 */
function onUpdateTime(newTimeStr: string) {
  // Get new and old date values as strings.
  let newTime = dateUtils.stringToDate(newTimeStr, dateUtils.TIME_FORMAT);
  const oldTime = dateUtils.stringToDate(dateTime.value, dateUtils.DATE_FORMAT_LONG());

  // Set the time of the old date on the new date.
  newTime = dateUtils.adjustTime(oldTime, newTime);

  // Get new date as string and emit it to parent component.
  dateTime.value = dateUtils.adjustFormat(newTime, dateUtils.DATE_FORMAT_LONG()) || '';
  emit('update:date', dateTime.value);
}

/**
 * If the property date value gets mounted in the parent component, the local variable will be updated.
 */
watch(() => props.date, (newValue: string) => dateTime.value = newValue);
// endregion

const emit = defineEmits<{
  (e: 'update:date', dateTime: string): void
}>()
</script>
