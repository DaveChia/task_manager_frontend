<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-md z-50 w-9/12">
      <slot></slot>
    </div>

    <div class="fixed inset-0 bg-black opacity-50"></div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
};
</script>
