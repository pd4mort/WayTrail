import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPage } from '../search/search.page';

import { IonicModule } from '@ionic/angular';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'maps',
        loadChildren: () => import('../maps/maps.module').then(m => m.MapsPageModule)
      },
      {
        path: 'favourite',
        loadChildren: () => import('../favourite/favourite.module').then(m => m.FavouritePageModule)
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
