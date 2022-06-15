import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Componente, Trail } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  menuOpts: Observable<Componente[]>;
  trails: any [] = [];

  constructor(
    private menuCtrol: MenuController,
    private dataService: DataService
    ) { }
 
  ngOnInit() {
    this.menuOpts = this.dataService.getMenuOpts();
     
    this.dataService.getTrail()
      .subscribe( trails => {
       console.log(trails)
        this.trails = trails;
      } );
  }

  menu(){

    this.menuCtrol.toggle();

  }

}
