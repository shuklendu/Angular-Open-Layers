import { Component, OnInit, VERSION } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import Stamen from 'ol/source/Stamen';
import { fromLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Point from 'ol/geom/Point';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  map: Map;
  lockList = [
    [10.48835952, 53.29207698],
    [12.55650104, 52.40627709],
    [12.00817351, 52.87847813],
  ];

  ngOnInit(): void {
    let pointsData = this.createMarkers();
    let extent = pointsData.markers.getSource().getExtent();
    this.map = new Map({
      view: new View({
        center: fromLonLat(pointsData.center),
        maxZoom: 16,
        /* extent: fromLonLat([
          pointsData.xMin + 1,
          pointsData.yMin + 1,
          pointsData.xMax + 1,
          pointsData.yMax + 1,
        ]), */
      }),
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://tile.jawg.io/jawg-streets/{z}/{x}/{y}.png?access-token=sWmX5SwjXmDHtQNDFmI7CyUgBqUvRzxpT6CM5sSbBLqxd3bpJxNNAZ2O4Rivf1Eo',
          }),
        }),
        pointsData.markers,
        /* new TileLayer({
          source: new OSM(),
        }),
        new TileLayer({
          source: new Stamen({
            layer: 'watercolor',
          }),
        }), */
      ],
      target: 'ol-map',
    });
    this.map.getView().fit(extent, { size: this.map.getSize() });
  }

  getCenter() {}

  createMarkers() {
    let icons = [];
    let xPoints = [];
    let yPoints = [];
    let data: any = {
      markers: '',
      xMin: 0,
      xMax: 0,
      yMin: 0,
      yMax: 0,
      center: [0, 0],
    };
    let xMin, xMax, yMin, yMax;
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 41],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://cdn.jsdelivr.net/gh/shuklendu/Angular-Open-Layers@develop/src/assets/marker-icon.png',
      }),
    });
    this.lockList.forEach((lock) => {
      console.log(lock);
      xPoints.push(lock[0]);
      yPoints.push(lock[1]);
      const iconFeature = new Feature({
        geometry: new Point(fromLonLat(lock)),
        name: 'Null Island',
        population: 4000,
        rainfall: 500,
      });
      iconFeature.setStyle(iconStyle);
      icons.push(iconFeature);
    });
    console.log(icons);
    const vectorSource = new VectorSource({
      features: icons,
    });
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    data.markers = vectorLayer;
    data.xMin = Math.min(...xPoints);
    data.xMax = Math.max(...xPoints);
    data.yMin = Math.min(...yPoints);
    data.yMax = Math.max(...yPoints);
    data.center = [(data.xMin + data.xMax) / 2, (data.yMin + data.yMax) / 2];

    return data;
  }
}
