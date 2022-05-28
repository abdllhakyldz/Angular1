import { Dosya } from 'src/app/models/Dosya';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { OgrenciDialogComponent } from '../ogrenci-dialog/ogrenci-dialog.component';

@Component({
  selector: 'app-ders-dialog',
  templateUrl: './ders-dialog.component.html',
  styleUrls: ['./ders-dialog.component.css']
})
export class DersDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Dosya;
  islem: string;
  frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<OgrenciDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuilder: FormBuilder
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Yeni Ders Ekle";
    }
    else {
      this.dialogBaslik = "Ders Düzenle";
    }
    this.frm = this.FormOlustur();
  }
  ngOnInit() {
  }

  FormOlustur(): FormGroup {
    return this.frmBuilder.group({
      "dosyaAdi": [this.yeniKayit.dosyaAdı],
      "dosyaTuru": [this.yeniKayit.dosyaTuru],
      "dosyaIcerigi": [this.yeniKayit.dosyaIcerigi],
    });
  }
}
