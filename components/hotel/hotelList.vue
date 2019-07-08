<template>
  <el-row>
    <el-col :span="8">
      <img :src="item.photos" @click="handleRouter(item.id)" >
    </el-col>
    <el-col :span="16" class="list-item">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="14" style="height: 222px;">
          <h3 @click="handleRouter(item.id)">
            {{ item.name }}
          </h3>
          <p>
            {{ item.alias }}
            <span v-if="item.hotellevel">
              <i
                v-for="i in Number(item.hotellevel.level)"
                :key="i"
                class="el-icon-s-opportunity"
              ></i>
            </span>
            {{ item.hoteltype.name }}
          </p>
          <el-row type="flex" class="item-evaluate">
            <el-rate
              v-model="item.stars"
              disabled
              show-score
              text-color="#ff9900"
              :score-template="`${item.stars}分`"
            >
            </el-rate>
            <span class="evaluate-content"><em>64</em> 条评价</span>
            <span class="evaluate-content"><em>7</em> 篇游记</span>
          </el-row>
          <span class="position">
            <i class="el-icon-location">位于：</i>
            {{ item.address }}
          </span>
        </el-col>
        <el-col :span="9">
          <ul>
            <li v-for="(v, i) in item.products" :key="i" class="price-item">
              <a :href="`https://hotels.ctrip.com/hotel/694679.html`" target="_blank">
                <el-row type="flex" justify="space-between">
                  <div>{{ v.name }}</div>
                  <div>
                    <em>￥{{ v.price }}</em>起
                    <i class="el-icon-arrow-right"></i>
                  </div>
                </el-row>
              </a>
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: '',
  components: {},
  directives: {},
  filters: {},
  mixins: [],
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    handleRouter(id) {
      this.$router.push(`/hotel/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
