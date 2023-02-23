<template>
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
        <div class="image" v-for="item in tableData" :key="item">
            <div class="tu" >
            <el-image            
                style="width: auto ; height: 100%;  box-shadow: 5px 5px 10px #909090;"
                :src="item.detailedUrl"
                :preview-src-list="this.Curls"
                fit="cover"
                @load="getWH(item.detailedUrl,item.title)"
                 />
            </div>
            <div class="info" >
                <p><el-icon size="large"><Notification /></el-icon>{{ item.title }}</p>
                <div style="display:flex ;">
                <div v-for="item in tag" :key="item.index" style="flex-wrap: nowrap; padding-left: 20px;">
                  <el-tag round>{{ item.tag }}</el-tag>
                </div>
               </div>
                <p><el-icon size="large"><EditPen /></el-icon><el-link class="elink" :href=item.artistUrl :underline="false" target=blank>画师：{{ item.artist }}</el-link></p>
                <p><el-icon size="large"><Monitor /></el-icon>分辨率：{{ this.width }}x{{ this.height }}</p>
                <p style="align-self: center; padding: 0;"><el-button type="success" icon="Download" round @click="download(item.detailedUrl)">下载图片</el-button></p>
            </div>
        </div>
    </div>
</template>

<script>

    export default{
    data() {
        return {
            Curls: [],
            pictureId:'',
            tableData:[],
            tag:[],
            width:'',
            height:'',
            title:''
        };
    },
    components: {},

    created(){
      this.getId()
      this.getPictures()
      this.getTag()

    },

    mounted(){
    },

    methods:{
      getId(){
        this.pictureId=this.$route.query.id
      },

      async getPictures() {
        let params = {
          id: this.pictureId
        }
        // 这里使用http://localhost:3000是因为配置地方监听的3000端口
        // /api/sysuser 这一部分也是在index.js中引入配置的
        // /getlist 是在api接口里面的方法
        // 整个三部分组合成立通常使用的接口
        // 其中 前面地址部分可以自己全局去定义，同样$http(axios)也可以封装
        let that = this
        await that.$axios.get('http://111.230.199.85:3000/api/pictures/getDetailsPictures', { params: params })
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

      async getTag() {
        let params = {
          id: this.pictureId
        }
        // 这里使用http://localhost:3000是因为配置地方监听的3000端口
        // /api/sysuser 这一部分也是在index.js中引入配置的
        // /getlist 是在api接口里面的方法
        // 整个三部分组合成立通常使用的接口
        // 其中 前面地址部分可以自己全局去定义，同样$http(axios)也可以封装
        let that = this
        await that.$axios.get('http://111.230.199.85:3000/api/pictures/getTag', { params: params })
          .then(response => {
            console.log(response);
            if (response.status == 200) {
              let datas = response.data
              this.tag = datas
            } else {
              console.log(response)
            }
          })
          .catch(error => {
            console.log(error)
          })
      },

      getWH(url,title){
        let imgUrl = url
        var img = new Image()
        img.src = imgUrl
        this.Curls.push(imgUrl)
        this.width = img.width,
			  this.height = img.height
        document.title = title +'~ ~ 米拉'
      },

      download(url) {
        //url点击时间传过来的路径
        const link = document.createElement("a");
        fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
        // 将链接地址字符内容转变成blob地址
        link.href = URL.createObjectURL(blob);
        // console.log(link.href)
        link.download = "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        });
      }
  }
}
</script>

<style>
.tu {
  position: absolute;
  width: 60%;
  height: 70%;
  top: 20%;
  left: 2.5%;
}
.info {
  position: absolute;
  width: 30%;
  background-color: #455a64;
  right: 2.5%;
  top: 20%;
  box-shadow: 5px 5px 10px #909090;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.info p {
  color: white;
  padding: 10px 0 20px 20px
}
.elink{
  color: white;
}
</style>