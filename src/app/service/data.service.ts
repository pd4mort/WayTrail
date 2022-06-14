import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Componente } from "../interfaces/interfaces";


@Injectable({ 
    providedIn: 'root'
 })

export class DataService {

    constructor( private http: HttpClient) { }

    getMenuOpts() {
       
        return this.http.get<Componente[]>('/assets/data/menu.json')
        
    }
    
    getTrail() {
       
       let x =  this.http.get<any>('https://trailapi-trailapi.p.rapidapi.com/activity/?lat=37.76129576308755&limit=25&lon=-3.948276326441903&q-state_cont=Ja%C3%A9n&radius=25&q-activities_activity_type_name_eq=hiking')
        console.log(x)
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '671ae8bbcbmshc9ad5e65160b4d2p15497bjsn7e0d1d2e7460',
                'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
            }
        };
        
        fetch('https://trailapi-trailapi.p.rapidapi.com/activity/?lat=37.76129576308755&limit=25&lon=-3.948276326441903&q-state_cont=Ja%C3%A9n&radius=25&q-activities_activity_type_name_eq=hiking', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

        return x;
    }


    
}
/*
api.geonames.org/postalCodeSearchJSON?country=ES
http://api.geonames.org/search?name_startsWith=lon&country=GB&maxRows=10&username=pdamort




API KEY MAPS
AIzaSyB9fW-v1IJPbQ0-OCiKsp_oisdaFKkcmTw

  <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB9fW-v1IJPbQ0-OCiKsp_oisdaFKkcmTw&callback=initMap"></script>
*/