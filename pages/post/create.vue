
<template>
  <div class="container">
    <section>
      <div class="post">
        <span class="title">发表新攻略</span>
        <span>分享你的个人经历，让大家伙看看</span>
        <br />
        <input type="text" placeholder="输入主题" v-model="addPost.title"/>
      </div>
      <div
        class="quill-editor"
        :content="addPost.content"
        @change="onEditorChange($event)"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        v-quill:myQuillEditor="editorOption"
      ></div>
    </section>
    
    <div>
        <el-form ref="form" :model="addPost" >
        <el-form-item label="选择城市">
      <!-- fetch-suggestions 返回输入建议方法 -->
      <!-- select 点击选中建议项时触发 -->
      <el-autocomplete
        :fetch-suggestions="queryDepartSearch"
        placeholder="请搜索出发城市"
        @select="handleDepartSelect"
        class="el-autocomplete"
        v-model="addPost.city"
      ></el-autocomplete>
    </el-form-item>
    </el-form>
    </div>
    
    <div class="laji">
        <input type="button" value="发布" @click="postData" />
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
        addPost:{
            content:"",
            title:"",
            city:""
        },
      
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block", "image", "video"]
          ]
        }
      }
    };
  },
  mounted() {
    
  },
  methods: {
    onEditorBlur(editor) {
    //   console.log("editor blur!", editor);
    },
    onEditorFocus(editor) {
    //   console.log( editor);
    },
    onEditorReady(editor) {
    //   console.log( editor);
    },
    onEditorChange({ editor, html, text }) {
        // console.log(editor);
        // console.log("-----------------------------");
        // console.log(html);
        // console.log("-----------------------------");
        // console.log(text);
        this.addPost.content=html
        
        
    //   console.log("editor change!", editor, html, text);
    //   this.content = html;
    },
    // 模糊搜索
    queryDepartSearch:function(value,cb){
        if (!value) {
        return;
      }
      this.$axios({
        url: "http://157.122.54.189:9095/airs/city",
        method: "GET",
        params: {
          name: value
        }
      }).then(result => {
        // console.log(result);
        const { data } = result.data;
        const Search = data.map(v => {
          return {
            ...v,
            value: v.name.replace("市", "")
          };
        });
        

        
        cb(Search);
      });
    },
    // 确认选择后得数据
    handleDepartSelect:function(item){
        // console.log(item.value);
        this.addPost.city=item.value
    },
    postData:function(){
        const {user:{userInfo}}=this.$store.state;
        this.$axios({
            url:"posts",
            method:"POST",
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            },
            data:this.addPost
        }).then((result)=>{
            const message="攻略成功"
            if(result.status===200){
                this.$message({
                       message ,
                        type: "success"
                    });
            }
            
        })
        
    }

  }
};
</script>
 
<style lang="less" scoped>
.container {
  width: 60%;
  margin: 0 auto;
  padding: 50px 0;
  .post {
    .title {
      font-size: 23px;
      color: black;
      display: inline-block;
      padding-bottom: 15px;
    }
    span {
      display: block;
      font-size: 14px;
      color: #999999;
      // margin-top: 5px;
      // margin-bottom: 5px;
    }
    input {
      width: 98%;
      height: 40px;
      font-size: 15px;
      padding-left: 10px;
      margin-bottom: 25px;
    }
  }
  .laji{
      input{
          width: 68px;
          height: 40px;
          border-radius: 5px;

          background-color: aqua;
          color: aliceblue
      }
  }

  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
}
</style>










