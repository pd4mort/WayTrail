import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Componente } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/service/data.service';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation, Position } from '@capacitor/geolocation';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  @ViewChild('map') mapView: ElementRef;

  menuOpts: Observable<Componente[]>;
  printCurrentPosition: Position;
  constructor(
    private menuCtrol: MenuController,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.menuOpts = this.dataService.getMenuOpts();
    this.ionViewDidEnter()
    
  }

  ionViewDidEnter(){
    this.getCurrentLocation();
    this.createMap();
  }

  async createMap(){


    const mapRef = document.getElementById('map');
    
    const newMap = await GoogleMap.create({
      id: 'my-map', // Unique identifier for this map instance
      element: mapRef, // reference to the capacitor-google-map element
      apiKey: environment.firebaseConfig.mapKey, // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: this.printCurrentPosition.coords.latitude,
          lng: this.printCurrentPosition.coords.longitude,
        },
        zoom: 8, // The initial zoom level to be rendered by the map
      },
    });

    
    
  }

  async getCurrentLocation(){
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.printCurrentPosition=coordinates;
     
      return this.printCurrentPosition;
    } catch (e) {
      console.log(e);
    }

  }

  showCurrentPosition() {

    Geolocation.requestPermissions().then(async permissions => {
      const coordinates = await Geolocation.getCurrentPosition();

      CapacitorGoogleMaps.addMarker({
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
      });

    })

  }

  menu() {

    this.menuCtrol.toggle();

  }
}
