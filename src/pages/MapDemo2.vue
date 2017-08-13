<template>
  <div>
    <Row class="vm-table vm-panel">
      <div class="panel-heading">
        <div id="mainMap" style="width: 100%; height: 800px;"></div>
      </div>

    </Row>
    <Row class="vm-table vm-panel">
      <div class="panel-body">
        <Select v-model="iconType" style="width:100px">
          <Option v-for="item in iconList" :value="item" :key="item">{{ item }}</Option>
        </Select>
        <Select v-model="iconColor" style="width:100px">
          <Option v-for="item in colorList" :value="item" :key="item">{{ item }}</Option>
        </Select>
        <Input v-model="GPStext" type="textarea" placeholder="请输入..."></Input>
        <Button type="info" @click="pointGPS">Point</Button>
      </div>
    </Row>
  </div>

</template>
<script>
  import L from 'leaflet';
  import leafletDraw from 'leaflet-draw';
  import leafletAwesomeMarkers from '../components/leafletMarker/dist/leaflet.awesome-markers.min';
  import 'leaflet/dist/leaflet.css';
  import 'leaflet-draw/dist/leaflet.draw.css';
  import '../components/leafletMarker/dist/leaflet.awesome-markers.css';

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
        mymap: null,
        drawnLayer: null,
        iconType: 'institution',
        iconList: ['institution', 'comments', 'hotel'],
        iconColor: 'red',
        colorList: ['blue', 'red', 'black'],
        GPStext: ''
      }
    },
    computed: {},
    mounted(){
      //******leaflet toolbar 菜单中文化
      L.drawLocal = {
        // format: {
        // 	numeric: {
        // 		delimiters: {
        // 			thousands: ',',
        // 			decimal: '.'
        // 		}
        // 	}
        // },
        draw: {
          toolbar: {
            // #TODO: this should be reorganized where actions are nested in actions
            // ex: actions.undo  or actions.cancel
            actions: {
              title: '取消图形绘制',
              text: '取消'
            },
            finish: {
              title: '完成图形绘制',
              text: '完成'
            },
            undo: {
              title: '删除上一个标记的结点',
              text: '撤销'
            },
            buttons: {
              polyline: '绘制线路',
              polygon: '绘制多边形区域',
              rectangle: '绘制矩形区域',
              circle: '绘制圆形区域',
              marker: '绘制标记点'
            }
          },
          handlers: {
            circle: {
              tooltip: {
                start: '点击鼠标并拖动来绘制图形.'
              },
              radius: '区域半径'
            },
            marker: {
              tooltip: {
                start: '在地图中单击实现标记.'
              }
            },
            polygon: {
              tooltip: {
                start: '在地图中单击,开始区域绘制.',
                cont: '单击确定区域的范围.',
                end: '若要完成区域的绘制,双击标记最后一个结点.'
              }
            },
            polyline: {
              error: '<strong>Error:</strong> shape edges cannot cross!',
              tooltip: {
                start: '在线路开始处单击,开始线路绘制.',
                cont: '单击线路中的结点.',
                end: '若要完成线路的绘制,双击标记最后一个结点.'
              }
            },
            rectangle: {
              tooltip: {
                start: '点击鼠标并拖动来绘制图形.'
              }
            },
            simpleshape: {
              tooltip: {
                end: '释放鼠标左键完成图形绘制.'
              }
            }
          }
        },
        edit: {
          toolbar: {
            actions: {
              save: {
                title: '保存绘制.',
                text: '保存'
              },
              cancel: {
                title: '取消绘制.',
                text: '取消'
              },
              clearAll: {
                title: '清除所有图形.',
                text: '清除全部'
              }
            },
            buttons: {
              edit: '编辑图形',
              editDisabled: '没有可以编辑的图形',
              remove: '删除图形',
              removeDisabled: '没有可以删除的图形'
            }
          },
          handlers: {
            edit: {
              tooltip: {
                text: '拖动图形结点,或标记来修改图形',
                subtext: '若要撤销操作,请点击取消'
              }
            },
            remove: {
              tooltip: {
                text: '点击您将要清除的图形'
              }
            }
          }
        }
      };
      //******leaflet toolbar 菜单中文化结束

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
      this.mymap = L.map('mainMap', {
        layers: [qqMap]
      }).setView([34.26828, 108.94029], 13);
      this.mymap.addControl(layersControl);

      this.drawnLayer = new L.FeatureGroup();
      var drawnItems = this.drawnLayer;
      var drawControl = new L.Control.Draw({
        edit: {
          featureGroup: drawnItems,
          poly: {
            allowIntersection: false
          },
        },
        draw: {
          polygon: {
            allowIntersection: false,
            showArea: true
          }
        }
      });
      this.mymap.addLayer(drawnItems);
      this.mymap.addControl(drawControl);
      /* var toolbar = L.Toolbar();
       toolbar.addToolbar(mymap);*/
      this.mymap.on(L.Draw.Event.CREATED, function (event) {
        console.log(event)
        var layer = event.layer;
        var layerType = event.layerType;
        if ('marker' === layerType) {
          const marker = L.marker(layer._latlng, {
            icon: L.AwesomeMarkers.icon({
              icon: 'hotel',
              markerColor: 'blue',
              prefix: 'fa',
              spin: false
            })
          });
          drawnItems.addLayer(marker);
        } else {
          drawnItems.addLayer(layer);
        }
        console.log(drawnItems)
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
        /*L.marker(e.latlng, {
         icon: L.AwesomeMarkers.icon({
         icon: 'hotel',
         markerColor: 'blue',
         prefix: 'fa',
         spin: false
         })
         }).addTo(mymap);*/
//        marker.setLatLng(e.latlng).addTo(mymap);
//        popup.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString() + ",xy:" + e.layerPoint.toString()).openOn(mymap);
      }

//      mymap.on('click', onMapClick);
    },
    methods: {
      markPoint(latlng){
        let _this = this;
        if (latlng.toString().trim() != '' && latlng.toString().trim() != 'null') {
          const marker = L.marker(latlng, {
            icon: L.AwesomeMarkers.icon({
              icon: _this.iconType,
              markerColor: _this.iconColor,
              prefix: 'fa',
              spin: false
            })
          });//.addTo(this.mymap);
          if (marker._latlng != null) {
            _this.drawnLayer.addLayer(marker);
          }
        }
      },
      pointGPS: function () {
        //
        let _this = this;
        console.log(this.GPStext);
        this.GPStext.split(';').forEach(function (value, index, array) {
          /*console.log(value)
           console.log(index)
           console.log(array)*/
          _this.markPoint(value.split(","));
        })
      }
    }
  }
</script>
