import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';



// Definindo as rotas da aplicação
export const routes: Routes = [
    { path: 'search', component: SearchComponent },
    { path: '', component: HomeComponent }, 
];
