import { Dosya } from './../../../models/Dosya';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit, Inject } from '@angular/core'; 

@Component({
  selector: 'app-dosya-dialog',
  templateUrl: './dosya-dialog.component.html',
  styleUrls: ['./dosya-dialog.component.css']
})
export class DosyaDialogComponent implements OnInit {
  dialogBaslik : string;
  islem:string;
  frm:FormGroup;
  yenikayit:Dosya;  
  constructor(
    
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<DosyaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.islem=data.islem;
    this.yenikayit=data.kayit;
    if (this.islem=='ekle'){this.dialogBaslik="Dosya Ekle";}

    if (this.islem=='duzenle'){this.dialogBaslik="Dosya Düzenle";}

this.frm=this.FormOlustur();
  }

  ngOnInit() {
  }


   
  FormOlustur(){
    return this.frmBuild.group({ 
      
      dosyaAdı:[this.yenikayit.dosyaAdı],
      
      dosyaIcerigi:[this.yenikayit.dosyaIcerigi],
       
      dosyaTuru:[this.yenikayit.dosyaTuru],
      
    });

    

}
}