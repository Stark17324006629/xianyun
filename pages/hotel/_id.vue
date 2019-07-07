<template>
  <div class="main" style='width: 1000px;margin: 0 auto;'>
    <!-- <el-divider></el-divider> -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="padding-bottom: 20px;"
    >
      <el-breadcrumb-item :to="{ path: '/' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/hotel' }">
        {{ data.real_city }}酒店
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ data.name }}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row type="flex">
      <h2>{{ data.name }}</h2>
      <el-rate v-model="data.stars" disabled show-score text-color="#ff9900">
      </el-rate>
    </el-row>

    <span class="synopsis">{{ data.alias }}</span>

    <p class="coordinate">
      <i class="el-icon-map-location"></i>
      {{ data.address }}
    </p>

    <el-row>
      <el-col :span="16" style="padding-right=20px">
        <img :src="img" alt="" width="640px" height="360px">
      </el-col>
      <el-col :span="8">
        <el-row type="flex" justify="space-between" class="banner">
          <img
            v-for="(item, key) in banner"
            :key="key"
            :src="item.url"
            width="160px"
            height="110px"
            @click="handleClick(item.url)"
          >
        </el-row>
      </el-col>
    </el-row>

    <el-table
      :data="data.products"
      style="width: 100%;margin:30px 0 50px"
      @row-click="handleRowClick"
    >
      <el-table-column prop="name" label="价格来源"></el-table-column>
      <el-table-column prop="bestType" label="低价房型"></el-table-column>
      <el-table-column label="最低价格/每晚" width="180px">
        <template v-slot="scope">
          <span class="table-price">
            ￥{{ scope.row.price }}
            <em>起</em>
            <i class="el-icon-arrow-right"></i>
          </span>
        </template>
      </el-table-column>
    </el-table>

    <MapID :list="data" />

    <div class="info">
      <el-row>
        <el-col :span="4" class="info-title">
          基本信息
        </el-col>
        <el-col :span="5">
          入住时间: 14:00之后
        </el-col>
        <el-col :span="5">
          离店时间: 12:00之前
        </el-col>
        <el-col :span="5">
          {{ data.creation_time }} / {{ data.renovat_time }}
        </el-col>
        <el-col :span="5">
          酒店规模: {{ data.roomCount }}间客房
        </el-col>       
         <!-- <el-divider></el-divider> -->
      </el-row>
     
     
     
      <el-row>
        <el-col :span="4" class="info-title">
          主要设施
        </el-col>
        <el-col :span="20">
          <el-tag
            v-for="(item, key) in data.hotelassets"
            :key="key"
            type="info"
          >
            {{ item.name }}
          </el-tag>
        </el-col>
         <!-- <el-divider></el-divider> -->
      </el-row>
    
      <el-row>
        <el-col :span="4" class="info-title">
          停车服务
        </el-col>
        <el-col :span="20">
          -
        </el-col>
         <template>
         <!-- <el-divider></el-divider> -->
      </template>
      </el-row>
    
      <el-row>
        <el-col :span="4" class="info-title">
          品牌信息
        </el-col>
        <el-col :span="20">
          -
        </el-col>
         <template>
         <!-- <el-divider></el-divider> -->
      </template>
      </el-row>
    
    </div>

    <div class="comments-head">
      <h4>{{ comments.length }}条真实用户评论</h4>
      <el-row>
        <el-col :span="4" class="head-title">
          <p>总评数：9</p>
          <p>好评数：1</p>
          <p>差评数：2</p>
        </el-col>
        <el-col :span="20">
          <el-row type="flex" align="middle" class="comments-top">
            <el-rate
              v-model="data.stars"
              disabled
              show-score
              text-color="#ff9900"
            >
            </el-rate>
            <span class="sort">
              环境
            </span>
            <span class="sort">
              产品
            </span>
            <span class="sort">
              服务
            </span>
            <div class="recommend">
              推荐
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>
 <Comment v-for="(item, index) in comments" :key="index" :prop="item" />
  </div> 
</template>

<script>
import MapID from '@/components/hotel/mapID.vue'
import Comment from '@/components/hotel/comment.vue'
export default {
  name: 'lpp',
  components: { MapID, Comment },
   data(){
     return{
        data:{},  //酒店详情数据
        banner:[{
        url: '/img/1.jpeg'
        }, 
        {
          url: '/img/2.jpeg'
        }, 
        {
          url: '/img/3.jpeg'
        }, 
        {
          url: '/img/4.jpeg'
        }, 
        {
          url: '/img/5.jpeg'
        }, 
        {
          url: '/img/6.jpeg'
        }],
        img:'/img/1.jpeg',
        comments:[]
     }
    

   },
   mounted(){
     this.$axios.get(`/hotels?id=${this.$route.params.id}`).then(res=>{
      //  console.log(res)
       this.data=res.data.data[0]
     })
     this.getCommnts()
   },
   methods:{
    handleClick(url) { this.img = url },
    handleRowClick(row, column, event) { window.open('https://hotels.ctrip.com/hotel/694679.html') },
    getCommnts(){
      this.$axios.get( `/hotels/comments`).then(res=>{
        console.log(res)
        this.comments = res.data.data
      })
    }
   }

}
</script>
<style lang="less">
.el-rate {
  height: 20px;
  line-height: 2.5;
}
.synopsis {
  font-size: 14px;
  color: #aaa;
  line-height: 2;
}
.coordinate {
  font-size: 16px;
  margin-bottom: 20px;
}
.banner {
  flex-wrap: wrap;
  img {
    margin-bottom: 15px;
    cursor: pointer;
  }
}
.table-price {
  color: orange;
  font-size: 16px;
  em {
    color: #333;
    margin-left: 3px;
  }
}
.el-table__row {
  cursor: pointer;
}
.info {
  font-size: 14px;
  color: #666;
  margin: 50px 0 40px;

  .info-title {
    color: #333;
  }

  .el-divider--horizontal {
    margin: 15px 0;
  }
  .el-divider {
    background-color: #f0f0f0;
  }

  .el-tag.el-tag--info {
    margin-right: 10px;
  }
}
.comments-head {
  padding-bottom: 30px;
  h4 {
    margin-bottom: 20px;
  }

  .head-title {
    color: #666;
    p {
      line-height: 1.6;
    }
  }
}
.comments-top {
  position: relative;

  .sort {
    padding-top: 25px;
    margin-left: 100px;
    color: orange;
  }

  .recommend {
    position: absolute;
    width: 75px;
    height: 75px;
    top: 0;
    left: 25px;
    border: 2px solid rgba(251, 165, 4, 0.3);
    color: rgba(251, 165, 4, 0.3);
    line-height: 75px;
    text-align: center;
    border-radius: 50%;
    font-size: 24px;
    transform: rotate(-50deg);
  }
}
</style>



