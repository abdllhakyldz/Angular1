import { Kullanici } from './../../models/Kullanici';
import { FotoDialogComponent } from './../dialogs/foto-dialog/foto-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { OgrenciDialogComponent } from '../dialogs/ogrenci-dialog/ogrenci-dialog.component';

@Component({
  selector: 'app-ogrenci',
  templateUrl: './ogrenci.component.html',
  styleUrls: ['./ogrenci.component.css']
})
export class OgrenciComponent implements OnInit {
  dataSource: any;
  kullanicilar: Kullanici[];
  displayedColumns = ['kulAdSoyad', 'dosyaAdı', 'dosyaIcerigi', 'dosyaTuru'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<OgrenciDialogComponent>;
  fotoDialogRef: MatDialogRef<FotoDialogComponent>;
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

  KullaniciEkle() {
    var yeniKayit = new Kullanici(); 
    this.dialogRef = this.matDialog.open(OgrenciDialogComponent, {
      width: "400px",
      data: {
        islem: 'ekle',
        kayit: yeniKayit
      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.ogrFoto = "profil.png";
        this.apiServis.KullaniciEkle(d).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitGetir();
          }
        });
      }
    });
  }
  KullaniciDuzenle(kul: Kullanici) {
    this.dialogRef = this.matDialog.open(OgrenciDialogComponent, {
      width: "300px",
      data: {
        islem: 'duzenle',
        kayit: kul
      }
    });

    this.dialogRef.afterClosed().subscribe((d: Kullanici) => {
      if (d) { 
        kul.KulAdSoyad = d.KulAdSoyad;
        kul.KulMail = d.KulMail;
        kul.KulDogumTarihi = d.KulDogumTarihi;

        this.apiServis.KullaniciDuzenle(kul).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitGetir();
          }
        });
      }
    });
  }
  KullaniciSil(kul: Kullanici) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kul.KulAdSoyad + " isimli Kullanıcı Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KullaniciSil(kul.KulId).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitGetir();
          }
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
}
