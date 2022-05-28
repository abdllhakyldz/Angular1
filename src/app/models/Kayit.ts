import { Dosya } from 'src/app/models/Dosya';
import { Kullanici } from 'src/app/models/Kullanici';
export class Kayit {
  kayitId: string;
  kayitKulId: string;
  kayitDosyaId: string;
  kulBilgi: Kullanici;
  dosBilgi: Dosya;
}
