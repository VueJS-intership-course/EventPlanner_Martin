<template>
  <div>
    <select title="dropdown" v-model=selectedValue>
      <option v-for="zone in zones" :key="zone" value="zone">{{ zone }}</option>
    </select>
  </div>
</template>

<script setup>
import moment from "moment-timezone";

const zones = moment.tz.names();

const selectedValue = '';
</script>