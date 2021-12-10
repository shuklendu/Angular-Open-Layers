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

  ngOnInit(): void {
    this.map = new Map({
      view: new View({
        center: fromLonLat([10, 53.55]),
        zoom: 12,
        maxZoom: 12,
      }),
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://tile.jawg.io/jawg-streets/{z}/{x}/{y}.png?access-token=sWmX5SwjXmDHtQNDFmI7CyUgBqUvRzxpT6CM5sSbBLqxd3bpJxNNAZ2O4Rivf1Eo',
          }),
        }),
        this.createMarkers(),
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
  }

  createMarkers() {
    const iconFeature = new Feature({
      geometry: new Point(fromLonLat([10, 53.55])),
      name: 'Null Island',
      population: 4000,
      rainfall: 500,
    });

    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 41],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://angular-ivy-zp1tik.stackblitz.io/assets/marker-icon-1x.png',
      }),
    });

    iconFeature.setStyle(iconStyle);

    const vectorSource = new VectorSource({
      features: [iconFeature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    return vectorLayer;
  }
}
