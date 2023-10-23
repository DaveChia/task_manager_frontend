import { createRouter, createWebHistory } from "vue-router";

import TaskIndex from "/src/pages/Task/Index.vue";
import TaskCreate from "/src/pages/Task/Create.vue";

const routes = [
  {
    path: "/",
    component: TaskIndex,
    name: "task.index",
  },
  {
    path: "/create",
    component: TaskCreate,
    name: "task.create",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
