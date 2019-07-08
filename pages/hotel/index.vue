<template>
  <section class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="el-ico">
      <el-breadcrumb-item>酒店</el-breadcrumb-item>
      <el-breadcrumb-item>南京市酒店预订</el-breadcrumb-item>
    </el-breadcrumb>
     <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="cityName" :placeholder="cityName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          type="daterange"
          range-separator="-"
          start-placeholder="入住日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="人数未定" suffix-icon="el-icon-user" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">
          查看价格
        </el-button>
      </el-form-item>
    </el-form>
    
   <MapInfo :cityinfo='cityinfo' :hotellistt='hotelList'/>

   <el-row type="flex" class="election">
      <el-col :span="4" class="election-block election-block-fist">
        <el-row type="flex" justify="space-between" class="election-title">
          <div>价格</div>
          <div>0-{{ price }}</div>
        </el-row>
        <div>
          <div class="block">
            <el-slider
              v-model="price"
              :max="4000"
              @change="handleChange"
            ></el-slider>
          </div>
        </div>
      </el-col>
      <el-col :span="5" class="election-block">
        <div class="election-title">
          住宿等级
        </div>
        <div class="election-option">
          <el-select
            v-model="levels"
            multiple  
            collapse-tags
            :placeholder="levels.length === 0 ? '不限' : ''"
            size="mini"
            @change="handleChange"
          >
            <el-option
              v-for="item in data.levels"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="5" class="election-block">
        <div class="election-title">
          住宿类型
        </div>
        <div class="election-option">
          <el-select
            v-model="types"
            multiple
            collapse-tags
            :placeholder="types.length === 0 ? '不限' : ''"
            size="mini"
            @change="handleChange"
          >
            <el-option
              v-for="item in data.types"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="5" class="election-block">
        <div class="election-title">
          酒店设施
        </div>
        <div class="election-option">
          <el-select
            v-model="assets"
            multiple
            collapse-tags
            :placeholder="assets.length === 0 ? '不限' : ''"
            size="mini"
            @change="handleChange"
          >
            <el-option
              v-for="item in data.assets"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="5" class="election-block">
        <div class="election-title">
          酒店品牌
        </div>
        <div class="election-option">
          <el-select
            v-model="brands"
            multiple
            collapse-tags
            :placeholder="brands.length === 0 ? '不限' : ''"
            size="mini"
            @change="handleChange"
          >
            <el-option
              v-for="item in data.brands"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    

    <div v-if='total!==0'>
      <div>
        <ul>
          <li v-for='(item,index) in hotelList' :key='index' class="hotel-list">
            <HotelList :item='item'/>
          </li>
        </ul>
      </div>

      <div class="pageblock">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <div v-if="total === 0" class="no">
      暂无符合条件的酒店
    </div>
   
    
  </section>
</template>
<script>
import MapInfo from "@/components/hotel/mapInfo";
import HotelList from '@/components/hotel/hotelList'
export default {
  components: {
    MapInfo,
    HotelList
  },
  data() {
    return {
      city: 74,
      cityName:'南京',
      cityinfo:{},  //查找的城市数据，比如远程搜索下的南京
      data:'',   //酒店选项数据，例如酒店等级下拉表中那些
      levels:[], //酒店星级等级，一星二星那些
      price:4000, //滑块的价格
      assets:[],  //酒店设施数据
      brands:[],  //酒店品牌数据
      types:[],  //酒店住宿类型
      total:0,
      scenis:null,  
      hotelList:[],  //酒店详情数据
      pageSize:10,     //条数
      currentPage:1,    //当前页数

    };
  },
  methods: {
    // queryDepartSearch(value, cb) {
    //   cb([{ value: 1 }, { value: 2 }, { value: 3 }]);
    // },
    // 出发城市下拉选择时触发
    // handleDepartSelect(item) {},
    // 获取查找的城市数据
    getCity(){
      this.$axios.get(`/cities?name=${this.cityName}`).then(res=>{
        // console.log(res)
        this.cityinfo=res.data.data[0]
      })
    },
    // handleChange(){
    //   console.log(1)
    // },
    // 获取酒店详情数据
  init(){
    const obj={
      params:{
        city:this.city,  //城市id
        _start: (this.currentPage - 1) * this.pageSize,    //分页（开始数据）
        _limit: this.pageSize,  //条数
          price_lt: this.price
        // price_in: this.price   //酒店价格

      }
    }
    let str = ''
      this.levels.forEach((v) => {
        str += `hotellevel_in=${v}&`
      })
      this.types.forEach((v) => {
        str += `hoteltype_in=${v}&`
      })
      this.assets.forEach((v) => {
        str += `hotelasset_in=${v}&`
      })
      this.brands.forEach((v) => {
        str += `hotelbrand_in=${v}&`
      })
      if (this.scenic) {
        obj.params.scenic = this.scenic
      } else {
        delete obj.params.scenic
      }
      this.$axios.get(`/hotels?${str}`, obj).then((res) => {
        console.log(res)
        console.log(1)
        this.hotelList = res.data.data
        this.total = res.data.total
      })
  },
    handleSizeChange(val) {
      this.pageSize = val
      this.init()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.init()
    },
    handleChange() {
      this.currentPage = 1
      this.init()
    }

    
  },
  mounted(){
    this.getCity()
    this.init()
    // 获取城市选项数据
    this.$axios.get('/hotels/options').then(res=>{
      // console.log(res)
      this.data=res.data.data
    })
  },
  create(){
    this.$bus.$on('scenics',(e)=>{
      this.scenis=e
      this.init()
    })
  },
  
};
</script>
<style lang="less">
.container {
  width: 1000px;
  margin: 0 auto;
}
.container .el-ico {
  height: 62px;
  line-height: 62px;
}
.hotel-main {
  width: 1000px;
  min-height: 550px;
  margin: auto;

  > h4 {
    margin: 20px 0;
  }
}
.election {
  padding: 5px;
  border: 1px solid #ddd;

  &:first-child .election-block {
    border-color: #fff;
  }

  .election-title {
    font-size: 12px;
    padding-left: 15px;
  }

  .el-input__inner {
    border: 1px solid #fff !important;
  }

  .election-block {
    border-left: 1px solid #ddd;
    padding: 5px 5px 0;

    &:first-child .election-title {
      padding-left: 0;
    }
  }
  .election-block-fist {
    padding-right: 15px;
    border-color: #fff;
  }
  .election-option {
    margin-top: 5px;
  }
}

.hotel-list {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  img {
    width: 100%;
    height: 222px;
  }

  .list-item {
    padding-left: 20px;

    h3 {
      font-size: 24px;
      cursor: pointer;

      &:hover {
        color: orange;
      }
    }

    p {
      color: #999;
      font-size: 14px;
      line-height: 1.5;
      i {
        color: orange;
      }
    }

    .item-evaluate {
      padding: 10px 0;
      font-size: 14px;

      .evaluate-content {
        padding: 0 20px;

        em {
          color: orange;
        }
      }
    }

    .position {
      color: #333;
      font-size: 14px;
    }
  }

  .price-item {
    padding: 15px 25px 15px 10px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #666;

    &:hover {
      background-color: #eee;
      cursor: pointer;
    }

    em {
      color: orange;
    }
  }
}
.pageblock {
  margin: 15px 0 50px;

  .el-pagination {
    text-align: right;
  }
}

.no {
  margin-top: 20px;
  text-align: center;
}
</style>





