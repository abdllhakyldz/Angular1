import { DosyalisteleComponent } from './components/dosyalistele/dosyalistele.component';
import { KullanicilisteleComponent } from './components/kullanicilistele/kullanicilistele.component';
import { DosyalarComponent } from './components/dosyalar/dosyalar.component';
import { KullanicilarComponent } from './components/kullanicilar/kullanicilar.component';  
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { HomeComponent } from './components/home/home.component'; 

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'kullanici', component: KullanicilarComponent
  },
  {
    path: 'dosya', component: DosyalarComponent
  },
  {
    path: 'kullanicilistele', component: KullanicilisteleComponent
  },
   
  {
    path: 'dosyalistele/:kulId', component: DosyalisteleComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
