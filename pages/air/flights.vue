<template>
    <section class='contianer'>
        <el-row type='flex' justify='space-between'>
            <!-- 顶部过滤列表 -->
            <div class='flights-content'>
                <!-- 过滤条件 -->
                <FlightsFilters :data='cacheFlightsData'
                @setDataList='setDataList'/>
                <!-- 航班头部布局 -->
                <FlightsListHead/>
                <!-- 航班信息 -->
                <div>
                    <!-- 航班列表 -->
                    <FlightsItem v-for="(item,index) in dataList" :key='index'
                    :data='item'/>

                    <!-- 分页 -->
                    <el-row type="flex" justify="center" style="margin-top:10px;">
                        <!-- size-change：切换条数时候触发 -->
                        <!-- current-change：选择页数时候触发 -->
                        <!-- current-page: 当前页数 -->
                        <!-- page-size：当前条数 -->
                        <!-- total：总条数 -->
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="flightsData.total">
                        </el-pagination>
                    </el-row>
                </div>
            </div>

            <!-- 侧边栏 -->
            <div class='aside'>
                <!-- 侧边栏组件 -->
                <FlightsAside/>
            </div>  
        </el-row>

    </section>
</template>
<script>
import FlightsListHead from '@/components/air/flightsListHead.vue'
import FlightsItem from '@/components/air/flightsItem.vue'
import FlightsFilters from '@/components/air/FlightsFilters.vue'
import FlightsAside from '@/components/air/FlightsAside.vue'
export default {
    data(){
        return{
            flightsData:{
                flights:[],
                info:{},
                options:{}
            },   //航班总信息
            // 缓存对象，缓存对象一旦赋值之后就不会被修改
            cacheFlightsData:{
                flights:[],
                info:{},
                options:{}
            },
            dataList:[],    //航班列表数据
            pageIndex:1,  //当前页数
            pageSize:5,   //显示条数
            total:0  //默认的总条数
        }
    },
    components:{
       FlightsListHead ,
       FlightsItem,
       FlightsFilters,
       FlightsAside
    },

    methods:{
        // 获取航班总数据
        getData(){
            this.$axios({
                url: `airs`,
                params:this.$route.query
            }).then(res=>{
                // console.log(res)
                 this.flightsData = res.data;
                //  缓存数据，一旦被赋值之后不能修改
                this.cacheFlightsData={...res.data}
                 console.log(this.flightsData)
                this.dataList = this.flightsData.flights;
                this.total=this.flightsData.total
            })
        },// 设置dataList数据
        setDataList(arr){

            if(arr){
                this.flightsData.flights=arr;
                 
                //  初始化分类数据
                this.pageIndex=1;
                this.total=arr.length
            }
            // const start=(this.pageIndex-1)*this.pageSize
            // const end=start+this.pageSize;
            // 在总列表中截取当前页的数据
            this.dataList=this.flightsData.flights.slice(
                (this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize
            )

        },
        // 切换条数时触发
        handleSizeChange(value){
            this.pageSize=value;
            this.setDataList();
        },
        // 切换页数时触发
        handleCurrentChange(value){
            this.pageIndex=value;
            this.setDataList()
        }
        

    },
    mounted(){
        this.getData()
    },
    watch:{
        $route(){
            this.getData()
        }
    }
}
</script>
<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>


