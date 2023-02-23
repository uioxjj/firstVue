+<template>
    <div>
        <div class="bg">
			<css-doodle>
              @grid: 13 / 100% 100%;
              @size: 50px;
			  background-color: hsla( calc(3.5 * @i() + 180), 80%, 70%, @r(.8) );
			  animation: float 15s infinite linear alternate-reverse;
			  @even {
			    @shape: circle;
			  }
			  @odd {
			    @shape: diamond;
			  }
			  @keyframes float {
			    0% { transform: scale(@rand(0.15, 0.4))  rotate(@rand(0deg, 100deg)) translate3d(
			      @rand(-500%, 500%), @rand(-1000%, 500%), 1px) }
			    100% { transform: scale(@rand(0.2, 0.4))  rotate(@rand(0deg, 180deg)) translate3d(
			      @rand(-100%, 100%), @rand(-500%, 100%), 1px) }
			  }
			</css-doodle>
        </div>
        <div class="shuzi">
                    <div style="font-size:20px; font-weight: bold;">数字抽签</div>
                    <div style="font-size:50px; color:cadetblue; margin-top:10%">
                      {{ tweened.toFixed(0) }}
                    </div>
                    <div style="font-weight:bold">
                      <span v-if="isRandom">恭喜这个数数😸</span>
                      <span v-else >会是多少呢🙂</span>
                    </div>
                    <div style="margin-top:10%">
                      <el-button type="success" @click="start">开抽😋</el-button>
                    </div>
                    <div style="margin-top:10%">
                      <el-button type="warning" @click="edit">设置数字</el-button>
                    </div>
                    <div style="font-weight:bold">
                      请先设置数字喵🐹
                    </div>
        </div>
        <div class="diy">
                    <div style="font-size:20px; font-weight: bold;">自定义抽签</div>
                    <el-row>
                    <div style="font-size:50px; color:cadetblue; margin-top:10%" v-for="(item,index) in zdy" :key="index">
		                <el-col> &nbsp; {{ index+1 }}.{{ item }} &nbsp; </el-col>
                    </div>
                    </el-row>
                    <div style="font-weight:bold; margin-top:10%">
                      <div v-if='this.zdy.length>=2'>
                      <span v-if="isRandom2">是这个🐶</span>
                      <span v-else >会是哪个呢🙂</span>
                      </div>
                      <div v-else>
                      </div>
                    </div>
                    <div style="font-size:50px; color:cadetblue">
                      {{ zdy[random2-1] }} 
                    </div>
                    <div>

                    </div>
                    <el-row>
                      <el-col :span="8">
                    <div style="margin-top:5%">
                      <el-button type="success" @click="start2">开抽😋</el-button>
                    </div>
                      </el-col>
                      <el-col :span="8">
                    <div style="margin-top:5%">
                      <el-button type="warning" @click="edit2">添加内容</el-button>
                    </div>
                      </el-col>
                      <el-col :span="8">
                    <div style="margin-top:5%">
                      <el-button type="danger" @click="clean">清空内容</el-button>
                    </div>
                      </el-col>
                    </el-row>
                    <div style="font-weight:bold">
                      请先设置内容喵🐭
                    </div>
        </div>
    </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'
import gsap from 'gsap'
  export default{
    data(){
      return{
        number:'',
        tweened:0,
        random:'',
        random2:'',
        isRandom:false,
        isRandom2:false,
        isAdd:false,
        zdy:[]
      }
    },

    watch: {
      number(n) {
      gsap.to(this, { duration: 0.5, tweened: Number(n) || 0 })
    }
    },

    methods:{
      edit(){
        ElMessageBox.prompt('请输入数字喵🦝(抽签结果不含零)', '', {
        confirmButtonText: 'OK',
        cancelButtonText: '取消',
        inputPattern:/^[1-9]\d*$/,
        inputErrorMessage: '要大于0整数哦',
        })
        .then(({ value }) => {
        this.number=value
        this.random=value
        this.isRandom=false
        })
        .catch(() => {
        })
      },

      edit2(){
        ElMessageBox.prompt('一次添加一个🦊', '', {
        confirmButtonText: 'OK',
        cancelButtonText: '取消',
        })
        .then(({ value }) => {
        this.zdy.push(value)
        this.isRandom=false
        })
        .catch(() => {
        })
      },

      start(){
        if(this.random==''){
          ElMessage({
            message:'还没输入数字喵！',
            type:'warning'
          })
          return
        }
        if(this.random==1){
          ElMessage({
            message:'1的话那就只有1了喵',
            type:'warning'
          })
          return
        }
        this.number=Math.ceil(Math.random()*this.random) 
        setTimeout(this.isRandom=true,1000)
      },

      start2(){
        if(this.zdy.length==0 ){
          ElMessage({
            message:'还没输入内容喵！',
            type:'warning'
          })
          return
        }
        if(this.zdy.length==1){
          ElMessage({
            message:'1个怎么抽，黑幕😶',
            type:'warning'
          })
          return
        }
        this.random2=Math.ceil(Math.random()*this.zdy.length)
        this.isRandom2=true
      },

      clean(){
        this.zdy = []
        this.isRandom2=false
      }
    }
  }
</script>

<style>
.shuzi {
  width: 20%;
  position: absolute;
  top: 20%;
  left: 40%;
  background: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  box-shadow: 2px 2px 10px #909090;
}
.diy {
  width: 80%;
  position: absolute;
  top: 65%;
  right: 10%;
  background: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  box-shadow: 2px 2px 10px #909090;
}
</style>
