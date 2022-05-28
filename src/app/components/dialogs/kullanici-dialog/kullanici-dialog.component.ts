import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Kullanici } from 'src/app/models/Kullanici';

@Component({
  selector: 'app-kullanici-dialog',
  templateUrl: './kullanici-dialog.component.html',
  styleUrls: ['./kullanici-dialog.component.css']
})
export class KullaniciDialogComponent implements OnInit {
 dialogBaslik : string;
 islem:string;
 frm:FormGroup;
 yenikayit:Kullanici;
  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<KullaniciDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem=data.islem
    this.yenikayit=data.kayit;
    if (this.islem=='ekle'){this.dialogBaslik="Kullanıcı Ekle";}

    if (this.islem=='duzenle'){this.dialogBaslik="Kullanıcı Düzenle";}

this.frm=this.FormOlustur();

   }

  ngOnInit() {
  }
FormOlustur(){
  return this.frmBuild.group({
    KulAdSoyad:[this.yenikayit.KulAdSoyad],
    
    KulMail:[this.yenikayit.KulMail],
    
    KulDogTarihi:[this.yenikayit.KulDogTarihi],
    
    KulSifre:[this.yenikayit.KulSifre],
    
  });
  
}


}

