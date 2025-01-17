import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { MadebyComponent } from './madeby/madeby/madeby.component';



// Definindo as rotas da aplicação
export const routes: Routes = [
    { path: 'madeby' , component:MadebyComponent},
    { path: 'search', component: SearchComponent },
    { path: '', component: HomeComponent }, 
];
