<template>
  <q-scroll-area :style="scrollAreaStyle" class="full-width">
    <!-- CREATE SLIDE ITEM FOR EACH CALENDAR IN LOCAL CALENDAR LIST -->
    <q-slide-item
      v-for="appointment in appointmentList"
      v-bind:key="appointment"
      :right-color="slideItemBgColor"
      @right="onSlideItem"
      class="q-mb-md" style="border-radius: 12px;"
    >
      <!-- APPOINTMENT CARD -->
      <q-item class="q-pa-none">
        <q-card class="q-pa-sm bg-secondary text-primary" style="width: 100%">
          <q-card-section>
            {{appointment.title}}
          </q-card-section>
          <q-card-section>
            {{appointment.description}}
          </q-card-section>
        </q-card>
      </q-item>

      <!-- DELETE AND RESET BUTTON -->
      <template v-slot:right>
        <div class="q-gutter-sm">
          <q-btn
            :label="$t('library.cancel')"
            @click="onCancelSlide()"
            :color="slideItemBtnColor"
            icon="east" stack no-caps class="xs-font-size"
          />
          <q-btn
            :label="$t('library.delete')"
            @click="onDeleteAppointment(appointment)"
            icon="cancel" stack no-caps class="bg-negative xs-font-size"
          />
        </div>
      </template>
    </q-slide-item>

    <!-- ERROR CARD -->
    <info-card
      v-if="showErrorCard"
      :message="$t('error-message.cannot-load-calendars')"
      :is-error="true"
      class="bg-negative" style="border-radius: 12px;"
    />

    <!-- NO APPOINTMENTS FOUND CARD -->
    <info-card
      v-if="appointmentList.length <= 0 && !showErrorCard"
      :title="$t('appointment-scroll-area.no-appointments')"
      :description="props.noAppointmentText || $t('appointment-scroll-area.no-appointments-scheduled')"
      class="bg-secondary text-primary" style="border-radius: 12px;"
    />
  </q-scroll-area>
</template>

<script setup lang="ts">
import {computed, Ref, ref, watch} from 'vue';
import {useI18n} from 'vue-i18n';
import {useQuasar} from 'quasar';
import InfoCard from 'components/cards/InfoCard.vue';
import {CalendarModel} from 'src/models/CalendarModel';
import {AppointmentModel} from 'src/models/AppointmentModel';

// Instantiate helpers and stores
const q = useQuasar();
const i18n = useI18n({useScope: 'global'});

// Instantiate properties
interface Props {
  height: number,
  appointments: AppointmentModel[],
  noAppointmentText?: string
}
const props = defineProps<Props>();

// Instantiate template variables
const appointmentList: Ref<AppointmentModel[]> = ref([]);
const scrollAreaStyle = ref({
  height: props.height + 'px',
  overscroll: 'auto',
  touchAction: 'auto',
});
const detailsOfCurrentSlideItem: Ref<{ reset: () => void } | null> = ref(null);
const showErrorCard = ref(false);
const slideItemBgColor = computed(() => q.dark.isActive ? 'grey-8' : 'grey-3');
const slideItemBtnColor = computed(() => q.dark.isActive ? 'grey-9' : 'grey-6');

/**
 * Get all shared desk bookings with the properties filter via api call.
 * The bookings will be stored in the allocation map to represent the data on the overview.
 */
async function getAllCalendars() {
  q.loading.show({
    message: i18n.t('progress-message.load-calendars')
  });

  // TODO

  q.loading.hide();
}

// endregion

// region EVENTS
/**
 * If user clicks on the delete calendar button, the corresponding calendar will be deleted.
 * @param calendar This calendar will be deleted.
 */
async function onDeleteAppointment(calendar: CalendarModel) {
  if (detailsOfCurrentSlideItem.value) {
    // Reset details of current slide item.
    onCancelSlide();

    // If there is no id, return.
    // if (calendar.id)
    // TODO: Delete calendar.
  }
}

/**
 * If the user cancels the slide item, the slide item will be reset.
 */
function onCancelSlide() {
  if (detailsOfCurrentSlideItem.value) {
    detailsOfCurrentSlideItem.value.reset();
    detailsOfCurrentSlideItem.value = null;
  }
}

/**
 * If user clicks on a calendar, the user will be redirected to the calendar page.
 * @param calendar This parameter specifies the selected calendar.
 */
async function onCalendarClick(calendar: CalendarModel) {
  // TODO
  console.log('onCalendarClick');
}

// endregion

// region TEMPLATE FUNCTIONALITIES
function onSlideItem(details: { reset: () => void }) {
  detailsOfCurrentSlideItem.value = details
}

/**
 * If the user slides an item, the previous item (if it exists) will be reset.
 */
watch(detailsOfCurrentSlideItem, (newValue, oldValue) => {
  if (!newValue || !oldValue || newValue === oldValue) {
    return;
  }

  oldValue.reset();
  oldValue = null;
});
// endregion

/**
 * Watch the height property. If it changes, the height of the scroll area will be updated.
 */
watch(() => props.height, (newValue: number) => {
  scrollAreaStyle.value.height = newValue + 'px';
});

/**
 * Watch the appointment list property. If it changes, the local variable will be updated.
 */
watch(() => props.appointments, (newValue: AppointmentModel[]) => {
  appointmentList.value = newValue;
});
</script>
