<template>
  <section class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="el-ico">
      <el-breadcrumb-item>酒店</el-breadcrumb-item>
      <el-breadcrumb-item>南京市酒店预订</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form style="margin-bottom:20px">
      <el-row type="flex" class="filters-top" justify="space-between" align="middle">
        <el-col :span="4">
          <el-autocomplete
            :fetch-suggestions="queryDepartSearch"
            placeholder="南京市"
            @select="handleDepartSelect"
            class="el-autocomplete"
          ></el-autocomplete>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="-"
            start-placeholder="入住日期"
            end-placeholder="离店日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="4">
          <el-select placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row
      type="flex"
      class="filters-top"
      justify="space-between"
      style="margin-left:-5px;margin-right:-5px;height:260px ;margin-bottom:20px"
    >
      <el-col :span="14">
        <el-row>
          <el-row type="flex" justify="space-between" class="el">
            <el-col :span="3">
              <div>区域:</div>
            </el-col>
            <el-col :span="24" class="bud">
              <div data-v-d0475a26 class="scenics-box">
                <!-- <a data-v-d0475a26 href="#" class="location-budget active">全部</a> -->
                <a data-v-d0475a26 href="#" class="location-budget active">全部</a>
                <a data-v-d0475a26 class="location-budget">镇兴路沿线</a>
                <a data-v-d0475a26 class="location-budget">视觉艺术学院</a>
                <a data-v-d0475a26 class="location-budget">大成名店</a>
                <a data-v-d0475a26 class="location-budget">南京西站</a>
              </div>
              <i data-v-d0475a26 class="el-icon-d-arrow-right" style="color:#f90">43</i>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between" class="el">
            <el-col :span="3">
              <div>攻略：</div>
            </el-col>
            <el-col :span="24" class="bud">
              <!-- <div>12</div> -->
              <div data-v-d0475a26 class="scenics-box">
                <a data-v-d0475a26 href="#" class="location-budget active">全部</a>
                <a data-v-d0475a26 class="location-budget">镇兴路沿线</a>
                <a data-v-d0475a26 class="location-budget">视觉艺术学院</a>
                <a data-v-d0475a26 class="location-budget">大成名店</a>
                <a data-v-d0475a26 class="location-budget">南京西站</a>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between" class="el">
            <el-col :span="3">
              <div>
                均价
                <sup
                  data-v-d0475a26
                  class="question-mark el-tooltip"
                  aria-describedby="el-tooltip-4657"
                  tabindex="0"
                  style="    background-color: #ccc;
                              color: #fff;
                            display: inline-block;
                            width: 1.2em;
                            height: 1.2em;
                            text-align: center;
                            border-radius: 100%;"
                >?</sup>:
              </div>
            </el-col>
            <el-col :span="24" class="icolor">
              <el-row type="flex">
                <el-col :span="6">
                  <span
                    data-v-d0475a26
                    class="el-tooltip"
                    aria-describedby="el-tooltip-3948"
                    tabindex="0"
                  >
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    <span class="price-budget">¥332</span>
                  </span>
                </el-col>
                <el-col :span="6">
                  <span
                    data-v-d0475a26
                    class="el-tooltip"
                    aria-describedby="el-tooltip-4954"
                    tabindex="0"
                  >
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    <span class="price-budget">¥521</span>
                  </span>
                </el-col>
                <el-col :span="8">
                  <span
                    data-v-d0475a26
                    class="el-tooltip"
                    aria-describedby="el-tooltip-4954"
                    tabindex="0"
                  >
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    <span class="price-budget">¥768</span>
                  </span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-row>
      </el-col>
      <el-col :span="10">
        <Map />
      </el-col>
    </el-row>
    <el-row type="flex" class="jiagexiala">
      <el-col :span="8" class="sslider">
        <el-row justify="space-between">
          <el-col :span="18">价格</el-col>
          <el-col :span="6">0-4000</el-col>
        </el-row>
        <el-slider v-model="value2" max="4000" style="205px"></el-slider>
      </el-col>
      <el-col :span="6">
        <el-dropdown class='buxian'>
          <span class="el-dropdown-link">
            下拉菜单
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <span>aaa</span>
            <el-radio :label="3">备选项</el-radio>
            <el-radio :label="6">备选项</el-radio>
            <el-radio :label="9">备选项</el-radio>
            
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="6">1</el-col>
      <el-col :span="6">1</el-col>
      <el-col :span="6">1</el-col>
    </el-row>
  </section>
</template>
<script>
import Map from "./map";
export default {
  components: {
    Map
  },
  data() {
    return {
      value1: "", //时间选择器
      value2: 0
    };
  },
  methods: {
    queryDepartSearch(value, cb) {
      cb([{ value: 1 }, { value: 2 }, { value: 3 }]);
    },
    // 出发城市下拉选择时触发
    handleDepartSelect(item) {}
  }
};
</script>
<style >
.container {
  width: 1000px;
  margin: 0 auto;
}
.container .el-ico {
  height: 62px;
  line-height: 62px;
}
.container .filters-top .el {
  margin-bottom: 20px;
  color: #666;
  font-size: 14px;
}
.container .filters-top .el .icolor .el-tooltip .iconfont {
  color: #f90;
}
.container .filters-top .el .bud .location-budget {
  margin-right: 1em;
  padding: 0 2px;
  border-radius: 4px;
  display: inline-block;
  color: inherit;
}
.container .filters-top .el .bud .active {
  background: #eee;
  cursor: auto;
  text-decoration: none;
  color: #999;
}
.jiagexiala {
  border-top: 1px solid #666;
  border-bottom: 1px solid #666;
  padding: 5px 20px;
  height: 80px;
  color: #666;
}
.sslider {
  /* line-height: 80px; */
  /* padding:10px; */
  padding-left: 20px;
  padding-right: 20px;
  border-right: 2px solid #999;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .buxian{
    width:100%;
  }
</style>


