import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Componente } from "../interfaces/interfaces";
import { collection, getFirestore } from "firebase/firestore";
import { collectionData } from "@angular/fire/firestore";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AuthService } from "./auth.service";


@Injectable({
    providedIn: 'root'
})

export class DataService {

    constructor(
        private http: HttpClient,
        private firestore: AngularFirestore,
        private auth: AuthService,
    ) { }

    getMenuOpts() {

        return this.http.get<Componente[]>('/assets/data/menu.json')

    }

    async getAllTrail(collection){
        return await this.firestore.collection(collection).snapshotChanges();
    }

    async getTrailId(collection, id) {

        return await this.firestore.collection(collection).doc(id).get();
        

    }

    async getUserUid() {

       return (await this.auth.afAuth.currentUser).uid;

    }

    async create(collection, data) {
        return await this.firestore.collection(collection).add(data)
    }

}
/*
api.geonames.org/postalCodeSearchJSON?country=ES
http://api.geonames.org/search?name_startsWith=lon&country=GB&maxRows=10&username=pdamort




API KEY MAPS
AIzaSyB9fW-v1IJPbQ0-OCiKsp_oisdaFKkcmTw

  <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB9fW-v1IJPbQ0-OCiKsp_oisdaFKkcmTw&callback=initMap"></script>
*/