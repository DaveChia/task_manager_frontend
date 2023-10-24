<template>
  <Loading v-if="isLoading" />
  <div class="px-4 sm:px-6 lg:px-8" v-else>
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Tasks</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all tasks</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          @click="navigateToCreateForm"
          type="button"
          class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Task
        </button>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div
            class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-300">
              <div class="text-center p-4" v-if="tasks.length == 0">
                <p class="text-gray-600 text-lg">No records found</p>
              </div>
              <thead class="bg-gray-50" v-else>
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Completed
                  </th>
                  <th
                    scope="col"
                    class="relative py-3.5 pl-3 pr-4 sm:pr-6"
                  ></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="task in tasks" :key="task.id">
                  <td class="px-3 py-4 whitespace-nowrap truncate max-w-xs">
                    {{ task.name }}
                  </td>
                  <td class="px-3 py-4 whitespace-nowrap truncate max-w-xs">
                    {{ task.description == null ? "-" : task.description }}
                  </td>

                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <component
                      :is="CheckIcon"
                      class="h-6 w-6 shrink-0 text-green-600"
                      aria-hidden="true"
                      v-if="task.completed == true"
                    />
                    <component
                      :is="XMarkIcon"
                      class="h-6 w-6 shrink-0 text-red-600"
                      aria-hidden="true"
                      v-else
                    />
                  </td>
                  <td
                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <a
                      href="#"
                      @click="showDescription(task.description)"
                      class="text-indigo-600 hover:text-indigo-900 mr-2"
                      >Description</a
                    >
                    <a
                      href="#"
                      @click="showEditDialog(task)"
                      class="text-indigo-600 hover:text-indigo-900"
                      >Edit<span class="sr-only">, {{ task.name }}</span></a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Dialog v-show="isDialogOpen">
    <h2 class="mb-8 font-bold">Description</h2>
    <p class="mb-8">
      {{ dialogDescription == null ? "-" : dialogDescription }}
    </p>

    <a
      href="#"
      @click="closeDialog"
      class="text-indigo-600 hover:text-indigo-900"
      >Close</a
    >
  </Dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { fetchData } from "/utilities/httpUtils.js";
import Loading from "/src/components/Loading.vue";
import Dialog from "/src/components/Dialog.vue";
import { CheckIcon, XMarkIcon } from "@heroicons/vue/20/solid";

onMounted(async () => {
  getTasksData();
});

const getTasksData = async () => {
  const url = import.meta.env.VITE_API_URL + "/tasks";

  const result = await fetchData(url);

  if ("error" in result) {
    // Handle the error
    console.error("Error:", result.error);
  } else {
    // Set the data
    tasks.value = result.data;
    isLoading.value = false;
  }
};

const isLoading = ref(true);
const isEditDialogOpen = ref(false);
const isDialogOpen = ref(false);
const dialogDescription = ref(null);
const tasks = ref([]);

const router = useRouter();

const navigateToCreateForm = () => {
  router.push({ name: "task.create" });
};

const closeDialog = () => {
  isDialogOpen.value = false;
};

const showDescription = (description) => {
  dialogDescription.value = description;
  isDialogOpen.value = true;
};

const showEditDialog = (task) => {
  router.push({
    name: "task.edit",
    query: {
      id: task.id,
    },
  });
};
</script>
