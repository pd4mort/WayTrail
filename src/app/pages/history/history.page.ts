import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Componente } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  menuOpts: Observable<Componente[]>;

  constructor(
    private menuCtrol: MenuController,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.menuOpts = this.dataService.getMenuOpts();
  }

  menu() {

    this.menuCtrol.toggle();

  }

}
