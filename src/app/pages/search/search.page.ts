import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Componente } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  menuOpts: Observable<Componente[]>;

  trails: any [] = [];
  searchText = '';
  
  constructor(
    private menuCtrol: MenuController,
    private dataService: DataService
  ) { }

  async ngOnInit() {

    this.menuOpts = this.dataService.getMenuOpts();

     (await this.dataService.getAllTrail('routes'))
      .subscribe( trails => {
        this.trails = trails;
        
        
      } );
  }

  menu() {

    this.menuCtrol.toggle();

  }

  onSearch(event){ 

    this.searchText = event.detail.value;
    
  }

  async addFav(trailID) {

    const uid = (await this.dataService.getUserUid());
    const path = 'users/' + uid + '/fav'
    let data; 
    
    await this.dataService.getTrailId('routes', trailID).then(res => {
     res.subscribe(docRef => {
        data = docRef.data()
        console.log(data)

        if(path + trailID){
          this.dataService.create(path, data)
        }
        
     })
    })
  }

}
