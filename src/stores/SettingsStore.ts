import {defineStore} from 'pinia';
import {TabName} from 'src/enums/TabName';
import {computed, ComputedRef, ref} from 'vue';
import {Locale} from 'src/enums/Locale';
import {StartPageModel} from 'src/models/settings/StartPageModel';
import {useI18n} from 'vue-i18n';
import {LanguageModel} from 'src/models/settings/LanguageModel';

/**
 * This pinia store is responsible for storing the app's settings.
 */
export const useSettingsStore = defineStore('SettingsStore', () => {
  // Instantiate helpers.
  const i18n = useI18n();

  // region STATES
  const startTab = ref(TabName.FAVORITE_CALENDARS);
  const locale = ref(Locale.DE);
  const darkMode = ref(false);
  // endregion

  // region GETTERS
  // Computed array with all available start page.
  const startPages = computed(() => [
    new StartPageModel('calendar_month', TabName.MAIN_CALENDAR, () => i18n.t('main-calendar.title')),
    new StartPageModel('favorite_border', TabName.FAVORITE_CALENDARS, () => i18n.t('favorite-calendar.title')),
    new StartPageModel('checklist', TabName.APPOINTMENT_OVERVIEW, () => i18n.t('appointment-overview.title')),
    new StartPageModel('reorder', TabName.CALENDAR_OVERVIEW, () => i18n.t('calendar-overview.title')),
  ]);
  // Computed start page that depends on the current start tab state.
  const selectedStartPage = computed(() =>
    startPages.value.find((e: StartPageModel) => e.tabName === startTab.value) || startPages.value[1]
  );

  // Computed array with all available language.
  const languages: ComputedRef<LanguageModel[]> = computed(() => [
    new LanguageModel(Locale.DE, () => i18n.t('settings.language.de')),
    new LanguageModel(Locale.EN, () => i18n.t('settings.language.en'))
  ]);

  // Computed language that depends on current locale state.
  const selectedLocale: ComputedRef<LanguageModel> = computed(() =>
    languages.value.find((e: LanguageModel) => e.locale === locale.value) || languages.value[0]
  );
  // endregion

  return {
    // STATES
    startTab,
    locale,
    darkMode,

    // GETTERS
    startPages,
    selectedStartPage,
    languages,
    selectedLocale
  }
});
