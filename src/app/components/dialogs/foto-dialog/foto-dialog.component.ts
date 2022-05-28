 
import { Kullanici } from 'src/app/models/Kullanici';
import { ApiService } from './../../../services/api.service';  
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-foto-dialog',
  templateUrl: './foto-dialog.component.html',
  styleUrls: ['./foto-dialog.component.css']
})
export class FotoDialogComponent implements OnInit {
  secilenFoto: any; 
  secKullanici: Kullanici;
  constructor(
    public dialogRef: MatDialogRef<FotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiServis: ApiService
  ) {
    this.secKullanici = this.data;
  }

  ngOnInit() {
  }
   
}
