import { Dosya } from './../../models/Dosya'; 
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component'; 
import { DosyaDialogComponent } from '../dialogs/dosya-dialog/dosya-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dosyalar',
  templateUrl: './dosyalar.component.html',
  styleUrls: ['./dosyalar.component.css']
})
export class DosyalarComponent implements OnInit {
  dataSource: any; 
  dosyalar: Dosya[];
  displayedColumns = ['dosyaAdı', 'dosyaIcerigi', 'dosyaTuru', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<DosyaDialogComponent>; 

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: AlertService
    ) { }

  ngOnInit() {
    this.KayitGetir();
  }

  KayitGetir() {
    this.apiServis.DosyaListe().subscribe(d => {
      this.dosyalar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  Ekle(){
    var yeniKayit: Dosya = new Dosya(); 
    this.dialogRef = this.matDialog.open(DosyaDialogComponent, {
      width: "400px",
      data: { 
        islem: 'ekle', 
        kayit: yeniKayit
      } 
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
       this.apiServis.DosyaEkle(d).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
           this.KayitGetir(); 
        }
       });
     
    
      }

    });

  }


  Duzenle(kayit: Dosya) {
    this.dialogRef = this.matDialog.open(DosyaDialogComponent, {
      width: "400px",
      data: {
        islem: 'duzenle',
        kayit: kayit,
      }
    });

    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
 
      kayit.dosyaAdı=d.dosyaAdı;
      kayit.dosyaTuru=d.dosyaTuru;
      kayit.dosyaIcerigi=d.dosyaIcerigi;
    
       
  this.apiServis.DosyaDuzenle(kayit).subscribe((s:Sonuc)=>{
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

Sil(Kayit: Dosya) {
  this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
    width: "400px"
  });
  this.confirmDialogRef.componentInstance.dialogMesaj = Kayit.dosyaAdı + " isimli Dosya Silinecektir Onaylıyor musunuz?";
  this.confirmDialogRef.afterClosed().subscribe(d => {
    if (d) {
      this.apiServis.DosyaSil(Kayit.dosyaId).subscribe((s:Sonuc) => {
        this.alert.AlertUygula(s);
        if (s.islem) {
          this.KayitGetir();
        }
      });
    }
  });
}

}
