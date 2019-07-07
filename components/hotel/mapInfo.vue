<!-- eslint-disable -->
<template>
  <el-row type="flex" style="margin-bottom: 15px;">
    <el-col :span="14" style="padding-right: 10px;">
      <el-row type="flex">
        <el-col :span="3">
          区域：
        </el-col>
        <el-col :span="21">
          <div class="scenicsBlock" :style="flag ? '' : 'height: 50px;'">
            <a class="scenics" @click="handleClick(null)">全部</a>
            <a
              v-for="(item, key) in cityinfo.scenics"
              :key="key"
              class="scenics"
              href="javascript:;"
              @click="handleClick(item.id)"
            >
              {{ item.name }}
            </a>
          </div>
          <div class="icon" @click="flag = !flag">
            <i :class="flag ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
            <span
              >等
              {{ cityinfo.scenics ? cityinfo.scenics.length : 0 }} 个区域</span
            >
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" style="margin: 20px 0;">
        <el-col class="cityTile" :span="3">
          攻略:
        </el-col>
        <el-col :span="21">
          <p class="introduce">
            北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。
            景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。
            由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿
          </p>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col class="cityTile" :span="3">
          均价 
          <el-tooltip content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="top-start">
          <sup class="question-mark" style='
           background-color: #ccc;
            color: #fff;
            display: inline-block;
            width: 1.2em;
            height: 1.2em;
            text-align: center;
            border-radius: 100%;'>?</sup>
        </el-tooltip>
          :
        </el-col>

        <el-col>
        <el-row type="flex" justify="start">
          <el-col :span="6">
            <averagePrice :starLevel="3" price="332" />
          </el-col>
          <el-col :span="6">
            <averagePrice :starLevel="4" price="521" />
          </el-col>
          <el-col :span="8">
            <averagePrice :starLevel="5" price="768" />
            <!-- </el-tooltip> -->
          <!-- </el-col> -->
          </el-col>
        </el-row>
      </el-col>


        <!-- <el-col :span="21" class="average">
          <i v-for="i in 3" :key="i" class="el-icon-s-opportunity"></i>
          <span>￥245</span>
          <i v-for="i in 4" :key="i" class="el-icon-s-opportunity"></i>
          <span>￥445</span>
          <i v-for="i in 5" :key="i" class="el-icon-s-opportunity"></i>
          <span>￥745</span>
        </el-col> -->
      </el-row>
    </el-col>
    <el-col :span="10">
      <Map :h="260"  :hotellist='hotellist'/>
    </el-col>
  </el-row>
</template>
<script>
import Map from '@/components/hotel/map'
import averagePrice from '@/components/hotel/averagePrice'
export default {
    name: '',
    props:{
        cityinfo:{
            type:Object,
            // default: function () {
            // return {}
            // }
            default:{}
        },
        hotellist: {
          type: Array,
          default: function () {
            return []
          }
        }
    },
    components:{
        Map,
        averagePrice
    },
    data() {
        return {
            flag: false,
            scenics:''
        };
    },
    methods:{
        handleClick(id=null){
            this.$bus.$emit('scenices',id)
        }
    }
}
</script>
<style lang="less" scoped>
#container {
  height: 300px;
}
.scenicsBlock {
  overflow: hidden;
}
.scenics {
  color: #444;
  font-size: 12px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    color: #409eff;
    text-decoration: underline;
  }
}
.icon {
  font-size: 12px;
  cursor: pointer;
}
.introduce {
  font-size: 14px;
  line-height: 1.5;
}
.average {
  i {
    color: orange;
  }
  span {
    font-size: 14px;
    margin: 0 20px 0 10px;
  }
}
</style>


