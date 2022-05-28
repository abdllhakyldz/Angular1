import { KullaniciDialogComponent } from './../dialogs/kullanici-dialog/kullanici-dialog.component';
 import { Kullanici } from './../../models/Kullanici'; 
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component'; 

@Component({
  selector: 'app-kullanicilar',
  templateUrl: './kullanicilar.component.html',
  styleUrls: ['./kullanicilar.component.css']
})
export class KullanicilarComponent implements OnInit {
  dataSource: any;
  kullanicilar: Kullanici[];
  displayedColumns = ['KulAdSoyad', 'KulMail', 'KulDogTarihi', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<KullaniciDialogComponent>; 

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: AlertService
    ) { }

  ngOnInit() {
    
    this.KayitGetir();
  }
  KayitGetir() {
    this.apiServis.KullaniciListe().subscribe(d => {
      this.kullanicilar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  Ekle() {
    var yeniKayit: Kullanici = new Kullanici(); 
    this.dialogRef = this.matDialog.open(KullaniciDialogComponent, {
      width: "400px",
      data: { 
        islem: 'ekle', 
        kayit: yeniKayit
      }
    });
this.dialogRef.afterClosed().subscribe(d=>{
  if(d){
   this.apiServis.KullaniciEkle(d).subscribe((s:Sonuc)=>{
    this.alert.AlertUygula(s);
    if(s.islem){
       this.KayitGetir(); 
    }
   });
 

  }

});

      
  }
  Duzenle(kayit: Kullanici) {
    this.dialogRef = this.matDialog.open(KullaniciDialogComponent, {
      width: "300px",
      data: {
        islem: 'duzenle',
        kayit: kayit,
      }
    });

    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
      kayit.KulAdSoyad=d.KulAdSoyad;
      kayit.KulMail=d.KulMail;
      kayit.KulDogTarihi=d.KulDogTarihi;
      kayit.KulSifre=d.KulSifre;
    
       
  this.apiServis.KullaniciDuzenle(kayit).subscribe((s:Sonuc)=>{
    this.alert.AlertUygula(s);
  });
  
}
  });

   
}  

  Filterele(e: any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   Sil(Kayit: Kullanici) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = Kayit.KulAdSoyad + " isimli Kullanıcı Silinecektir Onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KullaniciSil(Kayit.KulId).subscribe((s:Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitGetir();
          }
        });
      }
    });
}
}