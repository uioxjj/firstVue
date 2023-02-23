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
        <div class="search">
            <div class="input">
              <el-form :model="searchData">
                <el-form-item>
                <el-input
                v-model="searchData.tag"
                placeholder="寻找某种东西"
                prefix-icon="Search"
                style="width:500px;"
                clearable
                >    
                  <template #append>
                  <el-button @click="search(searchData.tag)">搜索</el-button>
                  </template>
                </el-input>
              </el-form-item>
              <div class="try">试试~
                <el-tag round style="margin-left: 10px;" @click="search('风景')">风景</el-tag>
                <el-tag round style="margin-left: 10px;" @click="search('人物')">人物</el-tag>
                <el-tag round style="margin-left: 10px;" @click="search('宝可梦')">宝可梦</el-tag>
              </div>
            </el-form>
            </div>  
            <!-- <div>
            <el-radio-group v-model="radio" :border="false" size="large">
                <el-radio-button  @click.prevent="clickRadio('1')" label="1" />
                <el-radio-button  @click.prevent="clickRadio('2')" label="2" />
                <el-radio-button  @click.prevent="clickRadio('3')" label="3" />
            </el-radio-group>
            </div> -->
        </div>
        <div class="image">
          <div class="img">
            <el-image v-for="item in tableData" :key="item.index" :src="item.thumbnailUrl" 
            style="width:250px;height:250px;border-radius: 5%;box-shadow: 2px 2px 10px #909090;margin: 5% 5% 0 0;"
            @click="details(item.id)"  />
          </div>
        </div>
        <div>
      <el-backtop :right="100" :bottom="100" style="background:#9bfee0; color:white" />
        </div>
    </div>
</template>

<script>

export default{
    comments: {
    },

    data() {
        return {
            searchData:[],
            input:'',
            radio:'',
            tableData:[]
        }
    },

    created(){
      this.getAllPictures()
    },

    mounted() {

  },

    methods:{
        clickRadio(e){
            e === this.radio ? this.radio = '' : this.radio = e
        },

        async getAllPictures() {
        let params = {

        }
        let that = this
        await that.$axios.get('http://111.230.199.85:3000/api/pictures/getAllPictures', { params: params })
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

      async search(tag){
        let params = {
          tag: tag
        }
        if (JSON.stringify(params)!=="{}")
        {let that = this
        await that.$axios.get('http://111.230.199.85:3000/api/pictures/getSearch', { params: params})
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
        }
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
.search {
  position: absolute;
  top: 10%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.input {
  color: blue;
  align-self: center;
}
.el-input__inner {
  background-color: #e6e6e6;
}
.el-input__wrapper {
  background-color: #e6e6e6;
}
.el-input__prefix-inner {
  color: black;
}
.el-input-group__append button.el-button {
  background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  color: white;
}
.try {
  color: yellowgreen;
}
.image {
  position: absolute;
  top: 20%;
}
.img{
  margin: 5%;

}
</style>