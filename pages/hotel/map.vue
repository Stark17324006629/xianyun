<template>
  
    <div id="container"></div>
  
</template>

<script>
export default {
  mounted() {
    window.onLoad = function() {
      var map = new AMap.Map("container", {
        zoom: 11, //放大级别
        // center: [116.397428, 39.90923], //中心点坐标
        center: [113.2759952545166, 23.117055306224895], //中心点坐标

        viewMode: "3D" //使用3D视图
      });
      var toolbar = new AMap.ToolBar();
      map.addControl(toolbar);

      // 创建一个 Marker 标记实例：
      var marker = new AMap.Marker({
        // content: "<div >1</div>",
        position: new AMap.LngLat(113.2759952545166, 23.117055306224895), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "北京"
      });


    //   将创建的标记添加到点实例中
        map.add(marker);
    };
    var key = "	3e44a3c796169f211244c3d1e94928ac";
    var url = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onLoad&plugin=AMap.ToolBar`;
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>

<style>
#container {
  width: 420px;
  height: 260px;
}
</style>
