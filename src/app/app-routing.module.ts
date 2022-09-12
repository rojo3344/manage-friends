import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsFormComponent } from "./add-friends/form/friends-form/friends-form.component";


const routes: Routes = [
                          { path: 'add-friends', component: FriendsFormComponent },
                          { path: 'view-friends',
                            loadChildren: () => import('./view-friends/view-friends.module').then(m => m.ViewFriendsModule)
                          },
                          { path: '', component: FriendsFormComponent },

                          { path: '**', component: FriendsFormComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
