import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { Dosya } from 'src/app/models/Dosya';
import { MatTableDataSource } from '@angular/material/table';
import { Kayit } from './../../models/Kayit';
import { Kullanici } from 'src/app/models/Kullanici';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-dosyalistele',
  templateUrl: './dosyalistele.component.html',
  styleUrls: ['./dosyalistele.component.css']
})
export class DosyalisteleComponent implements OnInit {
  secKullanici: Kullanici;
  KulId: string;
  dosyaId: string = "";
  kayitlar: Kayit[];
  dosyalar: Dosya[];
  dataSource: any;
  displayedColumns = ['dosyaAdı', 'dosyaIcerigi', 'dosyaTuru', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;





  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public alert: AlertService,
    public matDialog: MatDialog) { }

  ngOnInit() {
    this.ListeGetir();
    this.route.params.subscribe((p: any) => {
      if (p) {
        this.KulId = p.KulId;
        this.OgrenciGetir();
        this.ListeGetir();
      }
    });
  }

  OgrenciGetir() {
    this.apiServis.Kullanicibyid(this.KulId).subscribe(d => {
      this.secKullanici = d;
    });
  }

  ListeGetir() {
    this.apiServis.DosyaListe().subscribe(d => {
      this.dosyalar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  DersSec(d: string) {
    this.dosyaId = d;
  }
  Kaydet() {
    if (this.dosyaId == "") {
      var s: Sonuc = new Sonuc();
      s.islem = false;
      s.mesaj = "Dosya Yükleyiniz!";
      this.alert.AlertUygula(s);
    } else {

      var kayit = new Kayit();
      kayit.kayitKulId = this.KulId;
      kayit.kayitDosyaId = this.dosyaId;
      this.apiServis.KayitEkle(kayit).subscribe(s => {
        this.alert.AlertUygula(s);
        if (s.islem) {
          this.ListeGetir();
        }
      });
    }

  }
  DosyaSil(kayit: Kayit) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.dosBilgi.dosyaAdı + " Adlı Dosya Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KayitSil(kayit.kayitId).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.ListeGetir();
          }
        });
      }
    });
  }

  


}
