<template>
  <div>
    <div class="bg">
      <css-doodle id="dd">
                :doodle {
                    @grid: 14 / 100%;
                    grid-gap: 5px;
                    background: #f9d654;
                    overflow: hidden;
                }
                transition: @r(1s) ease;
                transform: scale(@rand(.1, 1)) rotate(@rand(0, 360)deg);
                :after {
                    content: \@hex(@rand(0x1F600, 0x1F635));  /*将十六进制转换成unicode编码*/
                    opacity: @r(.1,1);
                    font-size: 3vmax;
                }
      </css-doodle>
    </div>
    <div class="login">
      <div class="fm">
      <el-form :model="loginForm"  label-width="150px">
        <el-form-item label="管理账号">
          <el-input v-model="loginForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Query</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
    <div>
      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import topHead from '@/components/head.vue'

export default {
  name: 'AboutView',
  components: {
    topHead
  },

  data() {
    return {
      loginForm:[]
    }
  },

  watch:{
    isVisible(){
      
    }
  },
  mounted: function(){
    setInterval(this.refresh,5000)
  },
  methods:{
    refresh(){
      const doodle = document.getElementById('dd');
      
    }  
  }
}
</script>

<style>
body {
  margin: 0px;
}
.bg {
  margin-top: -0.5%;
}
.login {
  position: absolute;
  width: 40%;
  height: 50%;
  background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  top: 25%;
  left: 30%;
  opacity: 90%;
}
.fm {
  position: absolute;
  top: 20%;
}
</style>
