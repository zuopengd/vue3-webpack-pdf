# vue3-webpack-pdf
基于Vue3 + webpack + PDF.js版的PDF预览插件

## 安装
```bash
npm install --save vue3-webpack-pdf
```

## 全局引入
```js
import pdf from 'vue3-webpack-pdf';

Vue.use(pdf);
```
```base
<template>
  <div id="app">
    <pdf-preview :url="url" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const url = ref("https://zuopengd.github.io/vue-pdf3/dist/欢迎使用WPS Office for Mac同步文件夹.pdf");
</script>
```

## 演示

[vue3-webpack-pdf 演示链接](https://zuopengd.github.io/vue2-pdf/dist/index.html)

## 浏览器支持
与 [Vue.js 3](https://github.com/vuejs/core/blob/main/README.md) 相同
