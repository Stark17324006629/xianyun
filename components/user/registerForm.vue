<template>
    <el-form 
        :model="form" 
        ref="form"
        :rules="rules" 
        class="form">

        <el-form-item class="form-item" prop="username">
            <el-input 
            placeholder="用户名/手机"
            v-model="form.username">
            </el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="captcha">
            <el-input 
                placeholder="验证码" 
                v-model="form.captcha">
                <template slot="append">
                        <el-button @click="handleSendCaptcha">
                            发送验证码
                        </el-button>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="nickname">
            <el-input 
            placeholder="昵称"
            v-model="form.nickname">
            </el-input>
        </el-form-item>
        <el-form-item class="form-item" prop="password">
            <el-input 
            placeholder="密码"
            type='password'
            v-model="form.password">
            </el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="checkPassword">
            <el-input 
            placeholder="确认密码"
            type='password'
            v-model="form.checkPassword">
            </el-input>
        </el-form-item>

        <el-button 
        class="submit"
        type="primary"
        @click="handleLoginSubmit">
            注册
        </el-button>
    </el-form>

</template>
<script>
export default {
    data(){

        // rule当前的规则
        // value当前的表单字段
        // callback回调是必须要调用的，才会触发后面的代码
        const validatePass=(rule,value,callback)=>{
            if(value===''){
                callback(new Error('请再次输入密码'))
            }else if(value!==this.form.password){
                callback(new Error('两次输入的密码不一致'))
            }else{
                callback()
            }
        }
        return{
            // 注册表信息
            form:{
                username:'',
                captcha:'',  //验证码
                nickname:'',
                password:'',
                checkPassword:''
            },
            // 表单验证规则
            rules:{
                username:[
                    {required:true,message:'请输入用户名',trigger:'blur'}
                ],
                captcha:[
                    {required:true,message:'请输入验证码',trigger:'blur'}
                ],
                nickname:[
                    {required:true,message:'请输入昵称',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:'blur'}
                ],
                checkPassword:[
                    // validator是验证函数
                    {validator:validatePass,trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        // 发送表单验证码
        handleSendCaptcha(){
            // 如果手机号为空的话，直接返回
            if(!this.form.username){
                this.$message.warning('请输入手机号码')
                return;
            }

            this.$axios({
                url:'/captchas',
                method:'POST',
                data:{
                    tel:this.form.username
                }
            }).then(res=>{
                // console.log(res)
                const {code}=res.data;
                alert(code)
            })
        },
        // 注册
        handleLoginSubmit(){
            // 表单的验证
            this.$refs.form.validate(valid=>{
                if(valid){
                    // 注册需要传递四个参数，就是不要验证码，所以我们得去掉验证码，然后
                    // 再传入参数
                    const {checkPassword,...props}=this.form;

                    // 调用注册的接口
                    this.$axios({
                        url:'/accounts/register',
                        method:'POST',
                        data:props
                    }).then(res=>{
                        this.$store.commit('user/setUserInfo',res.data)
                        this.$message.success('注册成功')
                        console.log(res.data)
                        

                    })
                    this.form={}
                        this.$router.push('/user/login')
                }
            })
        }
    }


}
</script>
<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>

