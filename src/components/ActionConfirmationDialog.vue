<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-md z-50">
      <div class="fixed inset-0 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <p class="text-lg">Are you sure you want to confirm this action?</p>
          <div class="mt-4 flex justify-end">
            <button
              @click="confirm"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
            >
              Confirm
            </button>
            <button
              @click="cancel"
              class="px-4 py-2 bg-gray-400 text-gray-800 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed inset-0 bg-black opacity-50"></div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";

const emits = defineEmits();

const confirm = () => {
  emits("confirm-action");
};
const cancel = () => {
  emits("cancel-action");
};
</script>
