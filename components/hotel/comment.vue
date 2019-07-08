<template>
  <el-row type="flex" class="user-comment" >
    <div class="userheader">
      <el-row>
        <el-col :span="12">
          <div class="user-img">
            <img src="/img/1.jpeg" width="100%" />
          </div>
        </el-col>
        <el-col :span="12">
          <span class="level">LV.8</span>
        </el-col>
      </el-row>
      <p class="time">
          2019-6-26
        </p>
    </div>
    <div class="userinput">
      <p>{{prop.content}}</p>
      <el-input
        v-model="input"
        type="textarea"
        resize="none"
        :rows="inputheight"
        placeholder="请输入内容"
        @focus="inputfocus"
        @blur="inputblur"
      ></el-input>
      <div v-if="flag" class="clearfix">
        <el-button type="primary" size="mini" class="user-btn" @click="handleClick">回复</el-button>
      </div>
      <div v-if="prop.followed" style="padding-top:20px">
        <Comment v-for='(item,index) in prop.followed' :key="index" :prop="item" />
      </div>
    </div>
    
  </el-row>
</template>

<script>
export default {
  name: "Comment",
    props: {
        prop: {
            type: Object,
            default: function() {
                return {};
            }
        }
    },
    data() {
      return {
        input: "",
        inputheight: 1,
        flag: false,
        
      };
    },
    methods: {
      inputfocus() {
        this.inputheight = 3;
        this.flag = true;
      },
      inputblur() {
        this.inputheight = 1;
        this.flag = false;
      },
      handleClick(){
          console.log(1)
      }
    }
  
};
</script>

<style lang="less" scoped>
 
.user-comment {
  padding: 20px 0;
  border-top: 1px dashed #ddd;
}
.userheader {
  width: 110px;
}
.user-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid red;
}
.level {
  font-size: 12px;
  color: red;
}
.time {
  margin-top: 3px;
  font-size: 14px;
  color: #666;
}
.userinput {
  flex: 1;
  p {
    color: #888;
    line-height: 1.5;
    margin-bottom: 10px;
  }
}
.user-btn {
  float: right;
  margin-top: 10px;
}
</style>
