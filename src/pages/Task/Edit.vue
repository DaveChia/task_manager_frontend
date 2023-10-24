<template>
  <Loading @submit.prevent="submitForm" v-if="isLoading" />
  <form v-else>
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          Edit Task
        </h2>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <label
              for="name"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Name</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  v-model="form.name"
                  type="text"
                  name="name"
                  id="name"
                  autocomplete="name"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Resolve payment issues"
                />
              </div>
            </div>
            <ValidationErrors
              :validationErrors="taskNameValidationErrors"
            ></ValidationErrors>
          </div>

          <div class="col-span-full">
            <label
              for="description"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Description</label
            >
            <div class="mt-2">
              <textarea
                id="description"
                name="description"
                v-model="form.description"
                rows="3"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <ValidationErrors
              :validationErrors="taskDescriptionValidationErrors"
            ></ValidationErrors>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10 space-y-10">
      <fieldset>
        <legend class="text-sm font-semibold leading-6 text-gray-900">
          Details
        </legend>
        <div class="mt-6 space-y-6">
          <div class="relative flex gap-x-3">
            <div class="flex h-6 items-center">
              <input
                id="comments"
                name="comments"
                v-model="form.completed"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div class="text-sm leading-6">
              <label for="comments" class="font-medium text-gray-900"
                >Completed</label
              >
              <p class="text-gray-500">
                Mark whether a task has been completed.
              </p>
            </div>
          </div>
        </div>
      </fieldset>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button
        @click.prevent="navigateToIndexPage"
        type="button"
        class="text-sm font-semibold leading-6 text-gray-900"
      >
        Cancel
      </button>
      <button
        @click.prevent="toggleConfirmationDialog"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Save
      </button>
    </div>
  </form>

  <ActionConfirmationDialog
    v-if="isConfirmationDialogOpen"
    @confirm-action="submitForm"
    @cancel-action="toggleConfirmationDialog"
  >
  </ActionConfirmationDialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { fetchData } from "/utilities/httpUtils.js";
import Loading from "/src/components/Loading.vue";
import ValidationErrors from "/src/components/ValidationErrors.vue";
import ActionConfirmationDialog from "/src/components/ActionConfirmationDialog.vue";

const router = useRouter();
const taskId = router.currentRoute.value.query.id;
const isLoading = ref(true);
const taskNameValidationErrors = ref([]);
const taskDescriptionValidationErrors = ref([]);
const isConfirmationDialogOpen = ref(false);
const form = ref({
  name: null,
  description: null,
  completed: null,
});

onMounted(async () => {
  getTaskData();
});

const getTaskData = async () => {
  const url = import.meta.env.VITE_API_URL + "/tasks/" + taskId;

  const result = await fetchData(url, true);

  if ("error" in result) {
    // Handle the error
  } else {
    // Set the data
    form.value.name = result.data.name;
    form.value.description = result.data.description;
    form.value.completed = result.data.completed == 1 ? true : false;
    isLoading.value = false;
  }
};

const navigateToIndexPage = () => {
  router.push({ name: "task.index" });
};

const toggleConfirmationDialog = () => {
  isConfirmationDialogOpen.value = !isConfirmationDialogOpen.value;
};

const submitForm = async () => {
  toggleConfirmationDialog();

  //  Reset the validation errors if there are any
  taskNameValidationErrors.value = [];
  taskDescriptionValidationErrors.value = [];

  const url = import.meta.env.VITE_API_URL + "/tasks/" + taskId;

  const result = await fetchData(url, true, "PUT", form.value);

  if ("error" in result) {
    // Handle the error
  } else if ("errors" in result) {
    handleValidationErrors(result.errors);
  } else {
    navigateToIndexPage();
  }
};

const handleValidationErrors = (errors) => {
  for (const [key, value] of Object.entries(errors)) {
    switch (key) {
      case "name":
        taskNameValidationErrors.value = value;
        break;
      case "description":
        taskDescriptionValidationErrors.value = value;
        break;
    }
  }
};
</script>
