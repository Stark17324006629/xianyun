<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 左侧菜单栏 -->
      <div class="menus-wrapper">
        <div class="menus-body" @mouseleave="handleMenuLeave()">
          <div class="menus">
            <div
              class="menu-item"
              :class="{active: currentMenu === index}"
              v-for="(item, index) in citys"
              :key="index"
              @mouseenter="handleMenuEnter(index)"
            >
              <span>{{item.type}}</span>
            </div>
          </div>

          <div class="sub-menus" v-if="showSubMenu">
            <ul>
              <li v-for="(item, index) in currentCities" :key="index" @click="jump(index)">
                <!-- <nuxt-link :to="`/post?city=${item.city}`"> -->

                <i>{{index + 1}}</i>
                <strong>{{item.city}}</strong>
                <span>{{item.desc}}</span>
                <!-- </nuxt-link> -->
              </li>
            </ul>
          </div>
        </div>

        <div class="aside-recommend">
          <h4 class="aside-title">推荐城市</h4>
          <nuxt-link to="#" class="aside-recommend-item">
            <img src="../../assets/images/10.jpg" />
          </nuxt-link>
        </div>
      </div>
      <!-- 右侧垃圾内容 -->
      <div class="post-wrapper">
        <div class="search-wrapper">
          <el-row type="flex" justify="space-between" align="middle" class="search-bar">
            <input
              type="text"
              placeholder="请输入想去的地方，比如：'广州'"
              v-model="city"
              @keyup.enter="handleSearch"
            />
            <i class="el-icon-search" @click="handleSearch"></i>
          </el-row>
          <div class="search-recommend">
            推荐：
            <span
              v-for="(item, index) in title"
              :key="index"
              @click="titleSearch(item.city)"
            >{{item.city}}</span>
          </div>
        </div>
        <el-row type="flex" justify="space-between" align="middle" class="post-title">
          <h4>推荐攻略</h4>
          <el-button type="primary" icon="el-icon-edit" @click="Writetravel">写游记</el-button>
        </el-row>

        <div class="post-list">
          <!-- <postCard v-for="(item, index) in postlist" :key="index" :data="item"></postCard> -->
          <Strategy v-for="(item, index) in postlist" :key="index" :data="item"></Strategy>
        </div>

        <el-row type="flex" justify="center" style="margin-top:10px;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="Math.floor(start / limit) + 1"
            :page-sizes="[3, 5, 10, 15]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-row>
      </div>
    </el-row>
  </div>
</template>
<script>
import Strategy from "../../components/post/strategy"
export default {
    components: {
        Strategy
    },
  data() {
    return {
        // 搜索框下面默认展示内容
        title:[
            {
                city:"北京"
            },
            {
                city:"广州"
            },
            {
                city:"成都"
            },
            {
                city:"华盛顿"
            }






        ],
        // 垃圾数据存放
        // para:{
        //   city:""
        // },
        // 分页数据存放
        start: 0,
        limit: 3,
        total: 0,

        // 搜索框内容
        city:"",
    //   推荐文章存放
        postlist:[] , 
      //  跳转数据存放
      jumpData: "",
      //  子项列表是否显示初始值
      showSubMenu: false,
      //   样式初始值
      currentMenu: "99999",
      //   父类数据存放
      citys: [],
      //   子类数据存放
      currentCities: []
    };
  },

  //  跳一哈子
  methods: {
    jump: function(b) {
      // console.log(this.currentCities[b].city);
      
      this.jumpData = this.currentCities[b].city;
      this.$router.push({
        //   path:"/post",
        query: {
          city:this.jumpData
        },

      });
      this.$axios({
            url:"/posts",
            method:"GET",
            params:{
              city:this.jumpData
            }
        }).then((result)=>{
            // console.log(result);
            
            
            this.postlist=result.data.data
            this.total=result.data.total
            
        })
      
    },
    // 获取导航栏城市列表
    //   后台请求数据
    getCityList: function() {
      this.$axios({
        url: "/posts/cities",
        method: "GET"
      }).then(result => {
        this.citys = result.data.data;
        console.log(11)
        console.log(this.citys)
        // console.log(this.citys);
      });
    },
    // 光标进入事件
    handleMenuEnter: function(a) {
      // a是上面传下来的索引
      this.currentMenu = a;
      this.currentCities = this.citys[a].children;
      this.showSubMenu = true;
    },
    // 光标离开事件
    handleMenuLeave: function() {
      this.currentMenu = 99999;
      this.showSubMenu = false;
    },
    // 标题搜索
    

    // 获取文章列表
    getPostList(){
     
        this.$axios({
            url:"/posts",
            method:"GET",
            params:""
        }).then((result)=>{
            // console.log(result);
            
            
            this.postlist=result.data.data
            this.total=result.data.total
            
        })
    },
    // 写游记
    Writetravel:function(){
        this.$router.push("/post/create")
    },
    // 搜索事件
    handleSearch:function(){
      if(this.city){
        this.$axios({
            url:"/posts",
            method:"GET",
            params:{
              city:this.city
            }
        }).then((result)=>{
            // console.log(result);
            
            
            this.postlist=result.data.data
            this.total=result.data.total
            
        })
      }else{
        this.$axios({
            url:"/posts",
            method:"GET",
            params:""
        }).then((result)=>{
            // console.log(result);
            
            
            this.postlist=result.data.data
            this.total=result.data.total
            
        })
      }




    },
    // 标题搜索
    titleSearch:function(ct){
        this.city=ct
        this.$router.push({
          path:"",
          query:{
            city:ct
          }
        })
        this.$axios({
            url:"/posts",
            method:"GET",
            params:{
              city:ct
            }
        }).then((result)=>{
            // console.log(result);
            
            
            this.postlist=result.data.data
            this.total=result.data.total
            
        })

    },
    // 分页
    handleSizeChange(value){
      this.limit = value;
      this.start = 0;
      this.getPostList();
    },

    handleCurrentChange(value){
      this.start = this.limit * (value - 1);
      this.getPostList();
    },

    

  },
  mounted() {
    this.getCityList();
    this.getPostList()
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
}

/* 菜单栏 */
.menus-wrapper {
  position: relative;
  width: 260px;
  z-index: 2;

  .menus {
    width: 260px;
    border: 1px #ddd solid;
    border-right: none;
    border-bottom: none;
    box-shadow: 0 0 1px #f5f5f5;
    z-index: 2;
  }

  .menu-item {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px #ddd solid;
    border-right: 1px #ddd solid;
    padding: 0 20px;
    font-size: 14px;
    position: relative;
    z-index: 2;

    &:after {
      display: block;
      content: "";
      width: 10px;
      height: 10px;
      border-right: 1px #999 solid;
      border-top: 1px #999 solid;
      transform: rotate(45deg);
      position: absolute;
      right: 20px;
      top: 15px;
    }

    &.active {
      border-right-color: #fff;
      color: orange;

      &:after {
        border-right-color: orange;
        border-top-color: orange;
      }
    }
  }

  .sub-menus {
    position: absolute;
    left: 260px;
    top: 0;
    width: 350px;
    padding: 10px 20px;
    box-sizing: border-box;
    background: #fff;
    border: 1px #ddd solid;

    ul li {
      font-size: 14px;
      line-height: 1.5;

      * {
        vertical-align: middle;
      }

      i {
        color: orange;
        font-size: 24px;
        font-style: italic;
      }

      strong {
        margin: 0 10px;
        color: orange;
        font-weight: normal;
        &:hover {
          text-decoration: underline;
        }
      }

      span {
        color: #999;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

/* 侧边栏推荐 */
.aside-recommend {
  margin-top: 20px;

  .aside-title {
    font-weight: normal;
    padding-bottom: 10px;
    border-bottom: 1px #ddd solid;
    margin-bottom: 10px;
  }

  .aside-recommend-item {
    img {
      width: 100%;
      display: block;
    }
  }
}

/*内容*/
.post-wrapper {
  width: 700px;
}

/*搜索栏*/
.search-wrapper {
  .search-bar {
    width: 100%;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    border: 3px orange solid;

    input {
      flex: 1;
      padding: 0 20px;
      line-height: 40px;
      outline: none;
      border: none;
      background: none;
    }

    i {
      font-size: 24px;
      color: orange;
      font-weight: bold;
      margin-right: 10px;
    }
  }

  .search-recommend {
    padding: 10px 0;
    font-size: 12px;
    color: #666;

    span {
      margin-right: 5px;
      &:hover {
        color: orange;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}

/* 标题 */
.post-title {
  padding-bottom: 10px;
  border-bottom: 1px #eee solid;
  position: relative;

  h4 {
    font-weight: normal;
    font-size: 18px;
    color: orange;

    &:after {
      display: block;
      content: "";
      width: 72px;
      height: 2px;
      background: orange;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}
</style>



