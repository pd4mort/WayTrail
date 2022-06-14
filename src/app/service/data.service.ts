import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Componente, Trail } from "../interfaces/interfaces";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { collection, getFirestore } from "firebase/firestore";
import { collectionData } from "@angular/fire/firestore";
import { map } from "rxjs/operators";


@Injectable({ 
    providedIn: 'root'
 })

export class DataService {

    constructor( 
        private http: HttpClient,
        //private firestore: Firestore
        ) { }

    getMenuOpts() {
       
        return this.http.get<Componente[]>('/assets/data/menu.json')
        
    }
    
    getTrail() {

        const routesCollection = collection(getFirestore(), 'routes');
        console.log(routesCollection.id)
        return collectionData(routesCollection)
        
    }


    
}
/*
api.geonames.org/postalCodeSearchJSON?country=ES
http://api.geonames.org/search?name_startsWith=lon&country=GB&maxRows=10&username=pdamort




API KEY MAPS
AIzaSyB9fW-v1IJPbQ0-OCiKsp_oisdaFKkcmTw

  <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB9fW-v1IJPbQ0-OCiKsp_oisdaFKkcmTw&callback=initMap"></script>
*/