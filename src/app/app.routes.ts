import { Routes } from '@angular/router';
import { CreateComponent } from './post/create/create.component';
import { ReadComponent } from './post/read/read.component';
import { UpdateComponent } from './post/update/update.component';
import { ListComponent  } from './list/list.component';

export const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'create', component: CreateComponent },
  { path: ':postId/read' , component: ReadComponent},
  { path: ':postId/update' , component: UpdateComponent}
];
