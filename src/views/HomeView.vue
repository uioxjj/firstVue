<template>
  <div class="home">
    <div>
    <topHead/>
    </div>
    <div>
      <div>
        <el-carousel indicator-position="outside" height="500px">
      <el-carousel-item v-for="item in Curls" :key="item">
        <img alt="background" :src='item.url' style="width:100%;height: 100%;">
      </el-carousel-item>
       </el-carousel>
      </div>
    </div>
    <div class="head">
      <div class="zi">
        <p class="wow bounceInLeft" data-wow-duration="2s" data-wow-delay="1s"><el-icon><Lollipop /></el-icon>插画收集</p>
      </div>
      <div class="more">
        <p><el-link class="wow bounceInRight" data-wow-duration="1s" data-wow-delay="2s" icon="More" href="#/more" style="font-size:25px" :underline="false">更多</el-link></p>
      </div>
    </div>
    <div></div>
    <div class="bg">
			<css-doodle>
        @grid: 10 / 100% 100vmin;
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
    <div class="tab-container" id="tabContainer">
    <div class="tab-item" v-for="item in tableData" :key="item.index" style="border-radius: 5%;box-shadow: 2px 2px 10px #909090;">
      <el-image :src="item.thumbnailUrl" 
                style="border-radius: 5%;box-shadow: 2px 2px 10px #909090;" 
                lazy 
                @load="water()"
                @click="details(item.id)">
        <template #placeholder>
          <div class="image-slot">Loading<span class="dot">...</span></div>
        </template>
        <template #error> 
          <div class="image-slot">
            <el-icon><icon-picture /></el-icon>
          </div>
        </template>
      </el-image>
    </div>
  </div>
    <div>
      <el-backtop :right="100" :bottom="100" style="background:#9bfee0; color:white" />
    </div>
  </div>
</template>

<script>
import { waterFall } from '@/function/waterFall';
import { WOW } from 'wowjs'

export default {
  name: 'HomeView',
  components: {
     
},
  data() {
    return {
      Curls:[
        {url:'https://img.vinua.cn/images/HDwQ.jpeg'},
        {url:'https://img.vinua.cn/images/HVA4.png'},
        {url:'https://img.vinua.cn/images/Hnfh.png'},
        {url:'https://img.vinua.cn/images/HC1v.png'},
    ],
      tableData:[]
    }
  },

  created(){
    this.getPictures();
  },

  mounted() {
    let wow = new WOW({
        boxClass: "wow", // animated element css class (default is wow)
        animateClass: "animated", // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
        callback: function (box) {
          // the callback is fired every time an animation is started
          // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null, // optional scroll container selector, otherwise use window
      });
      wow.init()
    // 窗口变化自适应布局
    window.onresize = () => {
      return (() => {
        waterFall("#tabContainer", ".tab-item");
      })();
    };
  },

  watch() {
    
  },

  methods: {
    async getPictures() {
        let params = {
          keyword: this.keyword,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
        // 这里使用http://localhost:3000是因为配置地方监听的3000端口
        // /api/sysuser 这一部分也是在index.js中引入配置的
        // /getlist 是在api接口里面的方法
        // 整个三部分组合成立通常使用的接口
        // 其中 前面地址部分可以自己全局去定义，同样$http(axios)也可以封装
        let that = this
        await that.$axios.get('http://111.230.199.85:3000/api/pictures/getPictures', { params: params })
          .then(response => {
            console.log(response);
            if (response.status == 200) {
              let datas = response.data
              this.tableData = datas
            } else {
              console.log(response)
            }
          })
          .catch(error => {
            console.log(error)
          })
      },

      water(){
        waterFall("#tabContainer", ".tab-item");
      },

      details(id){
        let routeData = this.$router.resolve({
　　      path:'/details',
　　      query:{id: id}
         });
        window.open(routeData.href, '_blank');
    },
  }
}
</script>

<style>
body {
  margin: 0px;
}
.bg {
  z-index: -1;
}
.img {
  margin-top: -40%;
}
.zi {
  font-size: 35px;
  float: left;
  margin-top: 3%;
  color: #606266;
}
.more {
  float: right;
  margin-top: 5%;
  margin-right: 5%;
}
/* 最外层大盒子 */
.tab-container {
  position: relative;
  margin-top: -30%;
}
/* 每个小盒子 */
.tab-container .tab-item {
  position: absolute;
  height: auto;
  border: 1px solid #ccc;
  /* 元素不能中断显示 */
  break-inside: avoid;
  text-align: center;
}
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 14px;
}
</style>