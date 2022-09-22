<template>
    <div class="w-100 d-flex jusitfy-content-center bg-light align-items-center" id="loader-main">
        <span class="loader"></span>
    </div>
</template>

<script>
    export default {
        name: 'Loader',
        mounted(){
            this.adjustSize();
        },
        methods:{
            adjustSize(){
                var app_h = $("#app").outerHeight();
                var nav_h = $('#doc-nav').outerHeight();
                $('#doc-list').css("height", (app_h - nav_h)+"px");
                $('#loader-main').css("height", (app_h - nav_h)+"px");
            },
        }
    }
</script>

<style scoped>
.loader {
  width: 48px;
  height: 48px;
  display: block;
  margin:15px auto;
  position: relative;
  color: #FFF;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loader::after,
.loader::before {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  width: 24px;
  height: 24px;
  top: 50%;
  left: 50%;
  transform: scale(0.5) translate(0, 0);
  background-color: #FFF;
  border-radius: 50%;
  animation: animloader 1s infinite ease-in-out;
}
.loader::before {
  background-color: #FF3D00;
  transform: scale(0.5) translate(-48px, -48px);
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
@keyframes animloader {
    50% {
      transform: scale(1) translate(-50%, -50%);
}
}
    
</style>