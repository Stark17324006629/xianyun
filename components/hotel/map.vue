<!-- eslint-disable -->
<template>
  <div id="container"></div>
</template>

<script>
export default {
  name: '',
  components: {},
  directives: {},
  filters: {},
  mixins: [],
  props: {
    hotellist: {
      type: Array,
      default: function () {
        return []
      }
    },
    h: {
      type: Number,
      default: 300
    },
    zoom: {
      type: Number,
      default: 8
    },
    center: {
      type: Array,
      default: function () {
        return [118.92251, 31.75561]
      }
    },
    location: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      map: null,
      flag: false,
      markers: []
    }
  },
  computed: {},
  watch: {
    hotellist(to, from) {
      if (this.map) {
        this.removemarker()
        this.marker()
      }
    },
    location(to, from) {
      if (to !== from && to !== '') {
        this.setCenter(to)
      }
    }
  },
  mounted() {
    this.mapInit()
  },
  methods: {
    mapInit() {
      /* eslint-disable */
      window.onLoad = () => {
        this.createMap()
        const toolbar = new AMap.ToolBar()
        this.map.addControl(toolbar)
        this.marker()
      }
      const key = 'e80632d779dd039f183161855ad819d3'
      const url = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onLoad&plugin=AMap.ToolBar,AMap.Driving`
      const jsapi = document.createElement('script')
      jsapi.charset = 'utf-8'
      jsapi.src = url
      document.head.appendChild(jsapi)
      document.getElementById('container').style.height = this.h + 'px'
      /* eslint-enable */
    },
    marker() {
      /* eslint-disable */
      let arr = []
      this.hotellist.forEach((v) => {
        let array = v.location
        if(typeof(array)==='string'){
          array = array.split(",")
          array = {
            longitude: array[0],
            latitude: array[1]
          }
        }
        // 创建一个 Marker 实例：
        const marker = new AMap.Marker({
          content: "<i class='el-icon-location' style='color: red;font-size:20px'></i>",
          position: new AMap.LngLat(Number(array.longitude), Number(array.latitude)), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: v.name
        })
        marker.on('mouseover', (e) => {
          this.zoom = this.map.getZoom()
          this.center = [e.lnglat.Q, e.lnglat.P]
          this.map.setZoomAndCenter(this.zoom, this.center);
        })
        arr.push(marker)
        this.markers.push(marker)
      })

      // 将创建的点标记添加到已有的地图实例：
      this.map.add(arr)
    },
    createMap() {
      this.map = new AMap.Map('container', {
        zoom: this.zoom, // 级别
        center: this.center, // 中心点坐标
        viewMode: '3D' // 使用3D视图
      })
    },
    removemarker() {
      this.map.remove(this.markers)
      this.markers = []
    },
    setCenter(str) {
      const arr = str.split(",")
      this.map.setZoomAndCenter(this.map.getZoom(), arr)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
