<template>
    <div class="item">
        <slot></slot>
    </div>
</template>
  
  <script>
    export default {
        name: 'GridItem',
    }
  </script>
  
  <style scoped>

    .item {
        background-color: rgb(212, 212, 212);
        margin: 1rem 0;
        width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
  </style>
  