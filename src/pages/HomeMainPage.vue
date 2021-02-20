<template>
  <div class="home container mx-auto bg-green-500">
    Home Main Page
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeMainPage'

})
</script>

<style scoped>
  .home{
    height: 300px;
    text-align: center;
    color: white;
    font-size: 3rem;
    font-weight: bold;
  }
</style>