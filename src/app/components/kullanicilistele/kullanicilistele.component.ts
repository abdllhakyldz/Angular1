import { Dosya } from 'src/app/models/Dosya';
import { Kullanici } from 'src/app/models/Kullanici';
import { OgrsecDialogComponent } from './../dialogs/ogrsec-dialog/ogrsec-dialog.component';
import { MatTableModule, MatTableDataSource } from '@angular/material/table'; 
import { AlertService } from './../../services/alert.service';
import { ApiService } from './../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Kayit } from 'src/app/models/Kayit';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-kullanicilistele',
  templateUrl: './kullanicilistele.component.html',
  styleUrls: ['./kullanicilistele.component.css']
})
export class KullanicilisteleComponent implements OnInit {
  secDosya: Dosya;
  dosyaId: string;
  KulId: string = "";
  kayitlar: Kayit[];
  dataSource: any;
  kullanicilar: Kullanici[];
  dosyalar: Dosya[];
  displayedColumns = ['KulFoto', 'KulAdsoyad', 'dosyaAdı', 'dosyaTuru','dosyaIcerigi', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  ogrDialogRef: MatDialogRef<OgrsecDialogComponent>;
  constructor(
    public route: ActivatedRoute,
    public apiServis: ApiService,
    public alert: AlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {this.route.params.subscribe((p: any) => {
    if (p) {
      this.dosyaId = p.dosyaId;
      this.DosyaGetir();
      this.KayitListele();
    }
  });
  }

  DosyaGetir() {
    this.apiServis.DosyaById(this.dosyaId).subscribe(d => {
      this.secDosya = d;
    });
  }

  KayitListele() {
    this.apiServis.KullaniciListe().subscribe(d => {
      this.kullanicilar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  


}
