<template>
    <div style="top:0px; z-index:3">
        <div class="head">
            <div class="lg">
              <router-link to="/"><img src="https://img.vinua.cn/images/HYIk.png" style="width:100px"></router-link>
            </div>
            <div class="draw">
              <el-link icon="Pear" style="font-size:25px" :underline="false" href="#/draw">自定抽签</el-link>
            </div>
            <!-- <div class="btn"> 
              <el-link icon="Setting" style="font-size:25px" :underline="false" href="#/about"></el-link>
            </div> -->
            
        </div>
    </div>
</template>

<script>
export default {
  name: 'head',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.head {
  height: 50px;
  position: relative;
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
  box-shadow: 0 0 10px #909090;
}
.btn {
  position: absolute;
  right: 10px;
  top: 25%;
}
.draw {
  position: absolute;
  right: 1%;
  top: 25%;
}
.lg {
  position: absolute;
  left: 10px;
  top: -50%;
}
</style>