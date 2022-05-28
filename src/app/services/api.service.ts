 
import { Kayit } from './../models/Kayit';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dosya } from '../models/Dosya';
import { Kullanici } from '../models/Kullanici';
import { Sonuc } from '../models/Sonuc';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
 
  public apiUrl = "https://localhost:44367/";
  constructor(
    public http: HttpClient
  ) {
  }
  /* Kullanici API  */
  KullaniciListe() {
    return this.http.get<Kullanici[]>(this.apiUrl + "api/kullaniciliste");
  }
  Kullanicibyid(KulId: string) {
    return this.http.get<Kullanici>(this.apiUrl + "api/kullanicibyid/" + KulId);
  }
  KullaniciEkle(kul: Kullanici) {
    return this.http.post<Sonuc>(this.apiUrl + "api/kullaniciekle", kul);
  }
  KullaniciDuzenle(kul: Kullanici) {
    return this.http.put<Sonuc>(this.apiUrl + "api/kullaniciduzenle", kul);
  }
  KullaniciSil(KulId: string) {
    return this.http.delete<Sonuc>(this.apiUrl + "api/kullanicisil/" + KulId);
  }
  
  /* Dosya API  */
  DosyaListe() {
    return this.http.get<Dosya[]>(this.apiUrl + "api/dosyaliste");
  }
  DosyaById(dosyaId: string) {
    return this.http.get<Dosya>(this.apiUrl + "api/dosyabyid/" + dosyaId);
  }
  DosyaEkle(dosya: Dosya) {
    return this.http.post<Sonuc>(this.apiUrl + "api/dosyaekle", dosya);
  }
  DosyaDuzenle(dosya: Dosya) {
    return this.http.put<Sonuc>(this.apiUrl + "api/dosyaduzenle", dosya);
  }
  DosyaSil(dosyaId: string) {
    return this.http.delete<Sonuc>(this.apiUrl + "api/dosyasil/" + dosyaId);
  }
  
  KayitEkle(kayit: Kayit) {
    return this.http.post<Sonuc>(this.apiUrl + "api/kayitekle", kayit);
  }
  KayitSil(kayitId: string) {
    return this.http.delete<Sonuc>(this.apiUrl + "api/kayitsil/" + kayitId);
  }

  
}
