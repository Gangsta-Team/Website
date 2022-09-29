<template>
    <li class="item">
        <slot :item="item"></slot>
        <!--slot
            :item="item"
        /-->
    </li>
</template>
  
  <script>
    export default {
        name: 'GridItem',
        props: {
            item_key: {
                type: String,
                required: false,
                default: '' 
            },
            item: {
                type: Object,
                required: false,
                default: {}
            }
        },
    }
  </script>
  
  <style scoped>

    .item {
        /*margin: 1rem 0;
        width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 14px;*/

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 5rem 1rem;
        text-align: center;
        font-size: 1rem;
    }
  </style>
  