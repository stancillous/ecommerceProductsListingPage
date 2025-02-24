<template>
    <div v-if="loading" class="loading-overlay">
          <div class="spinner-border " role="status" style="color:#732357">
              <span class="sr-only"></span>
          </div>
      </div>
</template>
<script setup>
import { defineProps } from 'vue';

// Defining the props that the component accepts
const props = defineProps({
  loading: {
      type: Boolean,
      default: false,
  },
});
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>