import { Kullanici } from 'src/app/models/Kullanici'; 
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ogrenci-dialog',
  templateUrl: './ogrenci-dialog.component.html',
  styleUrls: ['./ogrenci-dialog.component.css']
})
export class OgrenciDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Kullanici;
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
      this.dialogBaslik = "Yeni Kullanici Ekle";
    }
    else {
      this.dialogBaslik = "Kullanici Düzenle";
    }
    this.frm = this.FormOlustur();
  }
  ngOnInit() {
  }

  FormOlustur(): FormGroup {
    return this.frmBuilder.group({ 
      "KulAdSoyad": [this.yeniKayit.KulAdSoyad],
      "KulMail": [this.yeniKayit.KulMail],
      "KulDogTarihi": [this.yeniKayit.KulDogTarihi],
      "KulSifre": [this.yeniKayit.KulSifre],
    });
  }
}
