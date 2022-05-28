import { DosyaDialogComponent } from './components/dialogs/dosya-dialog/dosya-dialog.component';
import { KullaniciDialogComponent } from './components/dialogs/kullanici-dialog/kullanici-dialog.component';
import { KullanicilisteleComponent } from './components/kullanicilistele/kullanicilistele.component';
import { DosyalarComponent } from './components/dosyalar/dosyalar.component';
import { KullanicilarComponent } from './components/kullanicilar/kullanicilar.component';
import { OgrsecDialogComponent } from './components/dialogs/ogrsec-dialog/ogrsec-dialog.component'; 
import { DersDialogComponent } from './components/dialogs/ders-dialog/ders-dialog.component'; 
import { OgrenciDialogComponent } from './components/dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { DersComponent } from './components/ders/ders.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    DersComponent, 
    KullanicilarComponent,
    DosyalarComponent,
    KullanicilisteleComponent,
    //dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    OgrenciDialogComponent,
    KullaniciDialogComponent,
    DersDialogComponent, 
    OgrsecDialogComponent,
    DosyaDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    OgrenciDialogComponent,
    KullaniciDialogComponent,
    DersDialogComponent, 
    OgrsecDialogComponent,
    DosyaDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
