<template>
    <div class='search-form'>
        <!-- 头部切换 -->
        <el-row type='flex' class='search-tab'>
            <span v-for='(item,index) in  tabs' :key='index'
            @click='handleSearchTab(item,index)'
            :class='{active: index===currentTab}'
            >
            <i :class='item.icon'></i>{{item.name}}
            </span>
        </el-row>
        <el-form class='search-form-content' ref='form' label-width='80px'>
            <el-form-item label='出发城市'>
                <!-- fetch-suggestions 返回输入建议方法 -->
                <!-- select 点击选中建议项时触发 -->
                <el-autocomplete
                 :fetch-suggestions="queryDepartSearch"
                placeholder='请搜索出发城市'
                @select='handleDepartSelect'
                class='el-autocomplete'
                v-model='form.departCity'
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label='到达城市'>
                <!-- fetch-suggestions 返回输入建议方法 -->
                <!-- select 点击选中建议项时触发 -->
                <el-autocomplete
                 :fetch-suggestions="queryDestSearch"
                placeholder='请搜索到达城市'
        zzhishzhishzhih        @select='handleDestSelect'
                class='el-autocomplete'
                v-model='form.destCity'
               
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label='出发时间'>
                <!-- change 用户确认选择日期时触发 -->
                <el-date-picker type='date'
                placeholder='请选择日期'
                @change='handleDate'
                style='width:100%'
                v-model='form.departDate'
                ></el-date-picker>
            </el-form-item>
            <el-form-item label=''>
                <!-- change 用户确认选择日期时触发 -->
                <el-button type='primary'
                icon='el-icon-search'
                @click='handleSubmit'
                style='width:100%'
                搜索
                ></el-button>
            </el-form-item>
             <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>
        </el-form>
    </div>
</template>
<script>

import moment from "moment";
export default {
    data(){
        return {
            tabs:[
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            // 当前选中的item的索引
            currentTab:0,
            // 获取城市数据
            form:{  
                departCity:'', //出发城市
                departCode:'', //出发城市代码
                destCity:'', //到达城市
                destCode:'', //到达城市代码
                departDate:'', //日期字符串
            }
        }
    },
    methods:{
        // tab切换时触发
        handleSearchTab(item,index){
            if(index==1){
              this.$confirm('业务暂时不提供往返','提示',{
                confirmButtonText:'确定',
                type:'warning'
              })
            }
        },
        // 出发城市输入框获得焦点触发
        // value是输入框的值,cb是回调函数,接收要展示的列表
        async queryDepartSearch(value,cb){
          // if(!value) return;
          const arr=await this.querySearchAsync(value)
           if(arr.length>0){
                this.form.departCity=arr[0].value;
                this.form.departCode=arr[0].sort;
                // console.log( this.form.departCity);
            }
          cb(arr)
        },

        // 目标城市输入框获得焦点触发
        // value是选中的 值，cb是回调函数，接收要展示的列表
        async queryDestSearch(value,cb){
          const arr=await this.querySearchAsync(value)
          if(arr.length>0){
                this.form.destCity=arr[0].value;
                this.form.destCode=arr[0].sort
            }
          cb(arr)
        },
        // 接收城市接口函数封账一下
          querySearchAsync(queryString){
            return new Promise((resolve,reject)=>{
                // 如果关键字是空的，直接返回
                if(!queryString){
                    return resolve([])
                }
            this.$axios({
              url:"/airs/city?name=" + queryString,
              method:'GET'
            }).then(res=>{
              // console.log(res.data)
              const {data}=res.data
              // 传参的时候需要传value，即是城市名，并且不要加市字
              const newData=data.map(v=>{
                return {
                  ...v,
                  value:v.name.replace('市','')
                }
              })
              
              resolve(newData)

            })
            })
          },
        // 出发城市下拉选中时触发
        handleDepartSelect(item) {
          // console.log(111)
          // console.log(item)
            this.form.departCity=item.value;
            this.form.departCode=item.sort
        },
        // 目标城市下拉选择时触发
        handleDestSelect(item) {
            // console.log(item)
            this.form.destCity=item.value;
            this.form.destCode=item.sort
        },

        // 确认选择日期时触发
        handleDate(value){
          //  console.log(item)
          this.form.departDate=moment(value).format('YYYY-MM-DD')
          console.log(this.form.departDate)
        },

        // 触发和目标城市切换时触发
        // 切换时除了时间之外啥都换
        handleReverse(){
            // console.log(11)
            const {departCity,departCode,destCode,destCity}=this.form

            // 出发城市切换到到达城市
            this.form.destCity=departCity;
            this.form.destCode=departCode

            // 到达的切换到出发 的
            this.form.departCity=destCity
            this.form.departCode=destCode
        },

        // 提交表单是触发
        handleSubmit(){
          //  console.log('tijiao')
          // 自定义表单验证
          const rules={
            depart:{
              value:this.form.departCity,
              message:'请选择出发城市啦'
            },
            dest:{
              value:this.form.destCity,
              message:'请选择到达城市'
            },
            departDate:{
              value:this.form.departDate,
              message:'请选择出发时间'
            }
          };

          // 验证变量哦，默认验证通过
          let valid=true;

          // console.log(Object.keys(rules))
          const newarr=Object.keys(rules).forEach(v=>{
            if(!valid) return;
              // 如果有一项数据不存在
              if(!rules[v].value){
                this.$message.warning(rules[v].message)
                // 验证不通过
                valid=false
              }
            
          })



          // console.log(newarr)
          if(!valid) return;




           // 添加到本地存储
          const airs=JSON.parse(localStorage.getItem('airs')||`[]`);
          airs.push(this.form);
          localStorage.setItem('airs',JSON.stringify(airs));
          this.$router.push({
            path:'/air/flights',
            query:this.form
          })



         
        

        }

    },
    mounted(){

    }
}
</script>
<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>


