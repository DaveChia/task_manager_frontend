<template>
  <div class="flex flex-col">
    <small v-for="error in validationErrors" class="text-red-600 mt-2"
      ><span class="mr-2">&bull;</span>{{ error }}</small
    >
  </div>
</template>

<script setup>
const props = defineProps({
  validationErrors: {
    type: Array,
    required: true,
  },
});
</script>
