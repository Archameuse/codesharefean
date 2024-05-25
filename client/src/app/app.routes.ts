import { Routes } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { fetchResolver } from './fetch-resolver';

export const routes: Routes = [
    {path: '', component: EditorComponent},
    {path: ':id', component: EditorComponent, resolve: [fetchResolver]}
];
