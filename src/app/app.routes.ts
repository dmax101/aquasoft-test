import { Routes } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component';
import { AddFormComponent } from './components/add-form/add-form.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';

export const routes: Routes = [
  {
    component: ItemListComponent,
    path: '',
  },
  {
    component: AddFormComponent,
    path: 'add',
  },
  {
    component: EditFormComponent,
    path: 'edit/:id',
  },
];
