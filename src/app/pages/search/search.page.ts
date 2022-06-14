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

  ngOnInit() {

    this.menuOpts = this.dataService.getMenuOpts();

    this.dataService.getTrail()
      .subscribe( trails => {
       
        this.trails = trails;
      } );
  }

  menu() {

    this.menuCtrol.toggle();

  }

  onSearch(event){ 

    this.searchText = event.detail.value;
    console.log(event)
  }

}
