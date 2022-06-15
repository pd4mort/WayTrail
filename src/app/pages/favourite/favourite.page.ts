import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Componente } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {

  menuOpts: Observable<Componente[]>;
  trails: any[] = [];

  constructor(
    private menuCtrol: MenuController,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.menuOpts = this.dataService.getMenuOpts();
    this.loadFav()
  }


  menu() {

    this.menuCtrol.toggle();

  }

  async loadFav() {
    const uid = (await this.dataService.getUserUid());
   
    const path = 'users/' + uid + '/fav';
    console.log(path)

    this.dataService.getAllTrail(path).then(firebaseResponse => {
      firebaseResponse.subscribe(listTrailRef => {

        this.trails = listTrailRef.map(trailRef => {
          let trail = trailRef.payload.doc.data();
          trail['id'] = trailRef.payload.doc.id;
          return trail;
        })
      })
    })
  }

}
