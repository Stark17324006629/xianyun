<template>
  <div class="container">
      <!-- 轮播图开始 -->
    <el-carousel :interval='5000' arrow='always'>
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div class='banner-image' :style="`
        background:url(${$axios.defaults.baseURL+item.url}) center center no-repeat;
        background-size:contain contain;
        `"></div>
      </el-carousel-item>
    </el-carousel>
    <!-- 轮播图结束 -->
    <!-- 搜索框开始 -->
    <div class='banner-content'>
        <div class='search-bar'>
            <!-- tab开始 -->
            <el-row type='flex' class='search-tab'>
                <span v-for="(item,index) in options"
                :key='index'
                :class='{active:index===currentOption}'
                @click='handleOption(index)'
                >
                <i>{{item.name}}</i> </span>

            </el-row>
            <!-- tab栏结束 -->

            <!-- 输入框开始 -->
            <el-row type='flex' align='middle' class='search-input'>
                <input
                :placeholder="options[currentOption].placeholder"
                v-model='searchValue'
                @keyup.enter="handleSearch"
                />
                <i class='el-icon-search' @click='handleSearch'></i>
            </el-row>
            <!-- 输入框结束 -->
        </div>
    </div>
    <!-- 搜索框结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
        // 轮播图的数据
        banners:[],
        // 搜索框数据
        options:[
            {
                    name: "攻略", 
                 	placeholder: "搜索城市", 
                 	pageUrl: "/post?city="
                },
                {
                    name: "酒店", 
                    placeholder: "请输入城市搜索酒店", 
                    pageUrl: "/hotel?city="},
                {
                    name: "机票", 
                    placeholder: "请输入出发地", 
                    pageUrl: "/air"
                }
        ],
        // 当前点中的tab的index 
        currentOption:0,
        // 输入的内容
        searchValue:''
    };
  },
  mounted() {
    //   获取后台轮播图的 数据
    this.$axios({
        url:'/scenics/banners'
    }).then(res=>{
        // console.log(res)
        const {data}=res.data
        // console.log(data)
        this.banners=data
    })
  },
  methods: {
    //   切换tab时触发
      handleOption(index){
      
        // 如果点击的是机票，则跳转到 机票的页面
       
        if(index===2){
            return this.$router.push('/air')
        }
        // 先获取当前的索引,使得被选中变高亮
        this.currentOption=index
      },
    //   点击搜索触发
    handleSearch(){
        // 拼接要传递的路径和参数
        const url=this.options[this.currentOption].pageUrl+this.searchValue
        this.$router.push(url)
    }

  }
};
</script>

<style scoped lang="less">
.container {
  width: 1700px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }
}
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }

  .banner-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -500px;
    border-top: 1px transparent solid;

    .search-bar {
      width: 552px;
      margin: 0 auto;
    }

    .search-tab {
      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }

      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;

        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }

        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
        }
      }
    }

    .search-input {
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;

      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        outline: none;
        border: 0;
        font-size: 16px;
      }

      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
      }
    }
  }
}
</style>