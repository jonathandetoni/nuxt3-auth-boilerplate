<template>
  <div>Home Page - Dash</div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard',
});
</script>
