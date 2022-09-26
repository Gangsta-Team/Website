<template>
    <ul class="list">
        <template v-for="item in items" :v-bind:key="item[keyprop]">
            <GridItem
                :item_key="item[keyprop]"
                :item="item"
                v-slot="item"
                :class="class"
                @click="item.click(item)"
            >
                <slot :item="item"></slot>
            </GridItem>
        </template>
    </ul>
</template>
  
  <script>
    import GridItem from './GridItem.vue'
    export default {
        name: 'Grid',
        props: {
            items: {
                type: Array,
                default: [],
                required: true 
            },
            class: {
                type: String,
                default: "",
                required: true 
            },
            keyprop: {
                type: String,
                required: false,
                default: 'id'
            }
        },
        updated(){
            this.$emit("on_loaded");
        },
        components: {
            GridItem
        }
    }
  </script>
  
  <style scoped>
    .list {
        justify-content: space-between;
        display: grid;
        grid-template-columns: repeat(auto-fit, 200px);
        margin: 0 1rem;
        padding-left: 0px;
    }
  </style>
  