<template>
  <q-scroll-area :style="scrollAreaStyle" class="full-width">
    <!-- CREATE SLIDE ITEM FOR EACH CALENDAR IN LOCAL CALENDAR LIST -->
    <q-slide-item
      v-for="calendar in calendarList"
      v-bind:key="calendar"
      :right-color="slideItemBgColor"
      @right="onSlideItem"
      class="q-mb-md" style="border-radius: 12px;"
    >
      <!-- CALENDAR CARD -->
      <q-item class="q-pa-none">
        <q-card class="q-pa-sm bg-secondary text-primary" style="width: 100%">
          <q-card-section>
            <div class="row lg-font-size text-bold q-pb-md">
              <!-- CALENDAR TITLE -->
              <div class="col q-my-auto">
                {{calendar.name}}

                <!-- FAVORITE ICON -->
                <q-icon
                  v-if='calendar.favorite'
                  name="star" size="sm" class="q-mb-sm"
                />
              </div>

              <!-- BOOKMARK ICON -->
              <q-icon
                v-if='calendar.color'
                :style="!!calendar.color ? {color: calendar.color} : {}"
                name="bookmark" style="margin-top: -30px" size="lg"
              />
            </div>

            {{ calendar.description }}
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
            @click="onCancelBooking(calendar)"
            icon="cancel" stack no-caps class="bg-negative xs-font-size"
          />
        </div>
      </template>
    </q-slide-item>

    <!-- ERROR CARD -->
    <info-card
      v-if="showErrorCard"
      :message="$t('error-message.cannot-load-calendars')"
      class="bg-negative" style="border-radius: 12px;"
    />

    <!-- NO CALENDARS FOUND CARD -->
    <info-card
      v-if="calendarList.length <= 0 && !showErrorCard"
      :title="$t('calendar-overview.no-calendars-found.title')"
      :message="$t('calendar-overview.no-calendars-found.description')"
      class="bg-warning" style="border-radius: 12px;"
    />
  </q-scroll-area>
</template>

<script setup lang="ts">
import {computed, onMounted, Ref, ref, watch} from 'vue';
import {useI18n} from 'vue-i18n';
import {useQuasar} from 'quasar';
import InfoCard from 'components/cards/InfoCard.vue';
import {CalendarModel} from 'src/models/CalendarModel';
import {useDataStore} from 'stores/DataStore';

// Instantiate helpers and stores
const q = useQuasar();
const i18n = useI18n({useScope: 'global'});
const dataStore = useDataStore();

// Instantiate template variables
const calendarList: Ref<CalendarModel[]> = ref([]);
const scrollAreaStyle = ref({
  height: window.innerHeight * 0.7 + 'px',
  overscroll: 'auto',
  touchAction: 'auto',
});
const detailsOfCurrentSlideItem: Ref<{ reset: () => void } | null> = ref(null);
const showErrorCard = ref(false);
const slideItemBgColor = computed(() => q.dark.isActive ? 'grey-8' : 'grey-3');
const slideItemBtnColor = computed(() => q.dark.isActive ? 'grey-9' : 'grey-6');

// region INITIALIZATION
/**
 * When the component gets mounted, the height of the scroll area will be calculated and the calendars will be loaded.
 */
onMounted(async () => {
  // Calculate the height of the scroll area.
  calculateScrollAreaHeight();

  // Get all calendars
  calendarList.value = dataStore.calendars;
});

/**
 * Calculate the height of the scroll area.
 */
function calculateScrollAreaHeight() {
  // Get button that is over scroll area.
  const newCalendarDivElement = document.getElementById('newCalendarDivId');
  if(newCalendarDivElement) {
    // Height = body height - footer height - header height - button div height - tab panel padding
    scrollAreaStyle.value.height = document.body.offsetHeight * 0.83 - newCalendarDivElement.offsetHeight - 32 + 'px';
  }
}

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
async function onCancelBooking(calendar: CalendarModel) {
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
</script>
