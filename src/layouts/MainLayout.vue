<template>
  <q-layout view="hHh LpR lFr">
    <div id="background">
      <div id="blur">
        <div id="darken">

          <!-- HEADER -->
          <q-header elevated class="bg-primary text-secondary header-size">
            <q-toolbar class="header-size">
              <!-- LEFT DRAWER BUTTON -->
              <q-btn dense flat round icon="menu" @click="toggleLeftDrawer"/>

              <!-- TITLE -->
              <q-toolbar-title class="q-mt-auto q-mb-auto q-pl-xl text-cursive text-h4">
                {{ $t('library.product-name') }}
              </q-toolbar-title>

              <!-- RIGHT DRAWER BUTTON -->
              <q-btn dense flat round icon="menu" @click="toggleRightDrawer"/>
            </q-toolbar>
          </q-header>

          <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
            <!-- drawer content -->
          </q-drawer>

          <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
            <!-- drawer content -->
          </q-drawer>

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

const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
</script>
