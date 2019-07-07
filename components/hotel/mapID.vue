<template>
  <div>
    <el-row>
      <el-col :span="16" style="padding-right:20px;">
        <div style="width:640px">
          <Map :h="360" :zoom="13" :location="center" :center="location.split(',')" :hotellist="scenery" />
        </div>
      </el-col>
      <el-col :span="8">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="风景" name="first" class="list">
            <div
              v-for="(item, index) in scenery"
              :key="index"
              @mouseenter="handleOver(item.location)"
            >
              <el-row
                type="flex"
                justify="space-between"
                class="item"
              >
                <div>{{ item.name }}</div>
                <div>1.5公里</div>                <!-- <div>{{ Number(Math.random() * 5).toFixed(2) }}公里</div> -->
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="交通" name="second" class="list">
            <div
              v-for="(item, index) in scenery"
              :key="index"
              @mouseenter="handleOver(item.location)"
            >
              <el-row
                type="flex"
                justify="space-between"
                class="item"
              >
                <div>{{ item.name }}</div>
                <div>1.5公里</div>
                <!-- <div>{{ Number(Math.random() * 5).toFixed(2) }}公里</div> -->
              </el-row>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Map from '@/components/hotel/map.vue'
export default {
  name:'',
  components:{Map},
  props:{
      list:{
          type:Object,
          default:function(){
              return{}
          }
      },
      location:{
          type:String,
          default:'118.90939,31.326161'
      }
  },
  data(){
      return{
          activeName:'first',
          scenery:[],
        //   key:'e80632d779dd039f183161855ad819d3',
          key:'79041dfa1c752f49599e2b507c64da42',
          center:'',
          types:'风景名胜'
      }
  },
  mounted(){
      this.getJson()
  },
  methods:{
      handleClick(tab,event){
          this.types=this.types==='风景名胜'?'交通设施服务':'风景名胜'
          this.getJson()
      },
      getJson(){
          const obj={
              params:{
                  city:this.list.real_city,
                  location:this.location,
                  types:this.types,
                  output:'json',
                  page:1,
                  offset:10,
                  key:this.key
              }
          }
          this.$axios('https://restapi.amap.com/v3/place/text',obj).then(res=>{
            //   console.log(res)
            this.scenery=res.data.pois
          })
      },
      handleOver(str){
          this.center=str
      }
  }
}
</script>

<style lang="less">
.list {
  padding: 0 15px 15px 15px;
  height: 306px;
  box-sizing: border-box;
  overflow-y: scroll;
  .item {
    font-size: 14px;
    color: #666;
    padding-bottom: 20px;
    cursor: pointer;
  }
}
</style>
