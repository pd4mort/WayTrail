import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Componente } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  menuOpts: Observable<Componente[]>;
  trails: any[] = [];

  constructor(
    private menuCtrol: MenuController,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.menuOpts = this.dataService.getMenuOpts();

    this.dataService.getAllTrail('routes').then(firebaseResponse => {
      firebaseResponse.subscribe(listTrailRef => {

        this.trails = listTrailRef.map(trailRef => {
          let trail = trailRef.payload.doc.data();
          trail['id'] = trailRef.payload.doc.id;
          return trail;
        })
      })
    })
  }

  menu() {
    this.menuCtrol.toggle();
  }

  async addFav(trailID) {

     const uid = (await this.dataService.getUserUid());
     const path = 'users/' + uid + '/fav'
     let data; 
     
     await this.dataService.getTrailId('routes', trailID).then(res => {
      res.subscribe(docRef => {
         data = docRef.data()
         console.log(data)
         this.dataService.create(path, data)
      })
     })
   }

}
