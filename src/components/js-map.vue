<template>
  <div id="mainMap" style="width: 100%; height: 400px;"></div>
</template>
<script>
  import L from 'leaflet';
  import leafletDraw from 'leaflet-draw';
//  import leafletAwesomeMarkers from 'leaflet.awesome-markers';
  import 'leaflet/dist/leaflet.css';
  import 'leaflet-draw/dist/leaflet.draw.css';
//  import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';

  export default {
    name: 'JsMap',
    props: {
      /*type: {
        type: String,
        default: 'vertical'
      }*/
    },
    data () {
      return {
        artList: [],
      }
    },
    computed: {},
    mounted(){

      const mapbox_default = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: '&copy; Mapbox地图',
        id: 'mapbox.streets'
      });//.addTo(mymap);
      const githubMap = L.tileLayer('https://c.tiles.mapbox.com/v3/github.map-xgq2svrz/{z}/{x}/{y}.png', {
        attribution: '&copy; Github地图',
        key: 'BC9A493B41014CAABB98F0471D759707',
        styleId: 22677
      });
      const gdMap = L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
        attribution: '&copy; 高德地图',
        maxZoom: 18,
        minZoom: 9,
        subdomains: "1234"
      });
      const openStreetMap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 18,
        minZoom: 6,
        subdomains: "abc"
      });
      const qqMap = L.tileLayer('http://rt{s}.map.gtimg.com/realtimerender?z={z}&x={x}&y={y}&type=vector&style=0', {
        tms: true,
        attribution: '&copy; 腾讯地图',
        maxZoom: 18,
        minZoom: 6,
        subdomains: "123"
      });
      const baseMaps = {
        'Github地图': githubMap,
        'OpenStreetMap': openStreetMap,
        'MapBox地图': mapbox_default,
        '高德地图': gdMap,
        '腾讯地图': qqMap
      };
      const layersControl = new L.Control.Layers(baseMaps);
      const mymap = L.map('mainMap', {
        layers: [qqMap]
      }).setView([34.26828, 108.94029], 13);
      mymap.addControl(layersControl);

      var drawnItems = new L.FeatureGroup();
      var drawControl = new L.Control.Draw({
        edit: {
          featureGroup: drawnItems,
          poly: {
            allowIntersection: false
          }
        },
        draw: {
          polygon: {
            allowIntersection: false,
            showArea: true
          }
        }
      });
      mymap.addLayer(drawnItems);
      mymap.addControl(drawControl);
     /* var toolbar = L.Toolbar();
      toolbar.addToolbar(mymap);*/
      mymap.on(L.Draw.Event.CREATED, function (event) {
          console.log(event)
        var layer = event.layer;
         /* console.log(layer)
          console.log(layer._latlng)
        L.marker(layer._latlng).addTo(mymap);*/
        drawnItems.addLayer(layer);
      });
      /*var drawControl = new L.Control.Draw({
        draw: {
          polygon: false,
          marker: false
        },
        edit: {
          featureGroup: drawnItems,
          edit: false
        }
      });*/

      /*mymap.addTiles(
       'http://rt{s}.map.gtimg.com/realtimerender?z={z}&x={x}&y={y}&type=vector&style=0',
       options=tileOptions(tms=TRUE, tileSize=256, minZoom=9, maxZoom=17, subdomains="0123"),
       attribution = '&copy; <a href="http://map.qq.com/">腾讯地图</a>'
       );*/

      const popup = L.popup();
      const marker = L.marker();

      function onMapClick(e) {
        marker.setLatLng(e.latlng).addTo(mymap);
        popup.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString() + ",xy:" + e.layerPoint.toString()).openOn(mymap);
      }

//      mymap.on('click', onMapClick);
    },
    methods: {
      deleteOk: function () {
        this.$emit('delete-ok')
      }
    }
  }
</script>
