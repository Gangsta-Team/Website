<template>
    <div class="grid">
        <slot></slot>
    </div>
</template>
  
  <script>
    export default {
        name: 'Grid',
    }
  </script>
  
  <style scoped>
    .grid {
        justify-content: space-between;
        display: grid;
        grid-template-columns: repeat(auto-fit, 200px);
        margin: 0 1rem;
    }
  </style>
  