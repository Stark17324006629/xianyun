<template>
    <div style="padding:50px;">
        
        高德地图
        <div id="container"></div>
    </div>
</template>

<script>
export default {
    mounted(){
        window.onLoad  = function(){
            // 初始化地区
            var map = new AMap.Map('container', {
                zoom:11,//放大级别
                center: [118.871, 31.328], //中心点坐标
                viewMode:'3D' //使用3D视图
            });

            // 初始化toolbar插件
            var toolbar = new AMap.ToolBar();
            // 调用插件
            map.addControl(toolbar);

            // 创建一个 标记 实例：
            var marker1 = new AMap.Marker({
                content: "<div style='width:20px; height:20px; background:red; color:#ff; text-align:center;'>1</div>",
                position: new AMap.LngLat(118.871, 31.328),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: '亮哥我喜欢你'
            });

            // 创建一个 标记 实例：
            var marker2 = new AMap.Marker({
                position: new AMap.LngLat(118.861, 31.338),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: '亮哥我喜欢你'
            });

            // 将创建的点标记添加到已有的地图实例：
            map.add([marker1, marker2 ]);
        }

        var key = "763aebf096e7824f4d4e14237beddac0";
        var url = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onLoad&plugin=AMap.ToolBar`;
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);
    }
}
</script>

<style>
#container{
    width:500px;
    height:500px;
}
</style>
