<template>
  <Loading v-if="isLoading" />
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
                  v-model="taskName"
                  type="text"
                  name="name"
                  id="name"
                  autocomplete="name"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Resolve payment issues"
                />
              </div>
            </div>
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
                v-model="taskDescription"
                rows="3"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button
        @click="navigateToIndexPage"
        type="button"
        class="text-sm font-semibold leading-6 text-gray-900"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Save
      </button>
    </div>
  </form>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { fetchData } from "/utilities/httpUtils.js";
import Loading from "/src/components/Loading.vue";

const router = useRouter();

const taskId = router.currentRoute.value.query.id;
const taskName = ref(null);
const taskDescription = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  getTaskData();
});

const getTaskData = async () => {
  const url = "http://127.0.0.1:8000/api/tasks/" + taskId;

  const result = await fetchData(url);

  if ("error" in result) {
    // Handle the error
    console.error("Error:", result.error);
  } else {
    // Set the data
    console.log(result);

    taskName.value = result.data.name;
    taskDescription.value = result.data.description;
    isLoading.value = false;
  }
};

const navigateToIndexPage = () => {
  router.push({ name: "task.index" });
};
</script>
