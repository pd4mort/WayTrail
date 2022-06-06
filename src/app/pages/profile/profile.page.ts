import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { Componente } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  menuOpts: Observable<Componente[]>;

  constructor(
    private menuCtrol: MenuController,
    private dataService: DataService
    ) { }
 
  ngOnInit() {
    this.menuOpts = this.dataService.getMenuOpts();
  }

  menu(){

    this.menuCtrol.toggle();

  }
}
