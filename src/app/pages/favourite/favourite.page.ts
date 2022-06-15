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

  constructor(
    private menuCtrol: MenuController,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.menuOpts = this.dataService.getMenuOpts();
  }

  loadFav(){

    
  }

  menu() {

    this.menuCtrol.toggle();

  }

}
