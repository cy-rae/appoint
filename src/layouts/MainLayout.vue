<template>
  <q-layout view="hHh LpR lFr">
    <div id="background">
      <div id="blur">
        <div id="darken">

          <!-- HEADER -->
          <q-header elevated class="bg-primary text-secondary header-size">
            <q-toolbar class="header-size full-width text-center">
              <!-- TITLE -->
              <q-toolbar-title class="q-mt-auto q-mb-auto q-pl-xl text-cursive xxl-font-size">
                {{ $t('library.product-name') }}
              </q-toolbar-title>

              <!-- SETTINGS DRAWER BUTTON -->
              <q-btn
                @click="settingsDrawerRef?.show()"
                flat round icon="settings"
              />
            </q-toolbar>
          </q-header>

          <!-- SETTINGS DRAWER -->
          <settings-drawer
            ref="settingsDrawerRef"
            side="right"
          />

          <!-- PAGE CONTAINER -->
          <q-page-container>
            <router-view/>
          </q-page-container>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import SettingsDrawer from 'components/drawers/SettingsDrawer.vue';

const settingsDrawerRef = ref<InstanceType<typeof SettingsDrawer> | null>(null);
</script>
