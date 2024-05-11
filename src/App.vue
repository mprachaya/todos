<template>
  <header>
    <span><AliwangwangOutlined />todos</span>
    <div>
      <span>sDate</span>
      <a-date-picker v-model:value="sDate" size="small" />
      <span>eDate</span>
      <a-date-picker v-model:value="sDate" size="small" />
    </div>
  </header>
  <body>
    <router-view />
  </body>
</template>

<script setup>
import { AliwangwangOutlined } from "@ant-design/icons-vue";

// import { InsertRowAboveOutlined } from "@ant-design/icons-vue";
</script>

<style scoped>
header {
  /* top right bottom left */
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0rem 0rem 0rem;
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
header > span > span {
  font-size: 20px;
  margin-right: 0.25rem;
}
header > span {
  letter-spacing: 1px;
  font-weight: bold;
}

header > div:nth-child(1) {
  font-size: 14px;
  text-transform: none;
}

header > div:nth-child(2) {
  font-size: 14px;
  text-transform: none;
  margin-top: 0.5rem;
}
header > div > span {
  margin: 0 1rem 0 1rem;
}

.ant-picker {
  border-radius: 12px;
  /* background: var(--c-main); */
  border: none;
}
.ant-picker .ant-picker-input {
  cursor: pointer;
}
@media screen and (max-width: 600px) {
  header {
    display: flex;
  }
  header > div {
    max-width: 240px;
  }
  header > div > span {
    margin-top: 0.5rem;
  }
  header > div > div {
    margin-top: 0.5rem;
  }
}
</style>
