<template>
  <header>
    todos application <span><InsertRowAboveOutlined /></span>
  </header>
  <body>
    <router-view />
  </body>
</template>

<script setup>
import { InsertRowAboveOutlined } from "@ant-design/icons-vue";
</script>

<style scoped>
header {
  /* top right bottom left */
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0rem 0.5rem 0rem;
  padding: 1.75rem;
  background-color: rgba(155, 155, 155, 0.1);
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.05),
    rgba(0, 0, 0, 0.01)
  );
  border: 1rem 1rem 1rem 1rem;
  border-color: white;
  border-radius: 25px;
  text-transform: uppercase;
  font-weight: bold;
}
header > span {
  padding: 0.75rem 1.125rem 0.75rem 1.125rem;
  border: solid 1px rgba(125, 125, 125, 0.4);
  border-radius: 2rem;
  background-color: rgba(0, 0, 0, 0.75);
  color: var(--c-highlight);
}
</style>
