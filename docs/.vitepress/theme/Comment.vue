<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://utteranc.es/client.js';
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.setAttribute('repo', 'johanazhu/fe');
  script.setAttribute('issue-term', 'pathname');
  script.setAttribute('label', 'Comment');
  script.setAttribute('theme', 'github-dark');
  document.querySelector('#comment').appendChild(script);

})
</script>
<template>
  <div id="comment"></div>
</template>
