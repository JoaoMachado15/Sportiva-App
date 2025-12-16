import { Component } from '@angular/core';
import {
  IonicModule,
  AlertController,
  ToastController
} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AtividadeService } from '../services/atividade.service';
import { Atividade } from '../models/atividade.model';

@Component({
  standalone: true,
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class Tab2Page {

  atividades: Atividade[] = [];

  constructor(
    private atividadeService: AtividadeService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ionViewWillEnter() {
    this.carregar();
  }

  carregar() {
    this.atividadeService.getAtividades().subscribe(data => {
      this.atividades = [...data];
    });
  }

  async confirmarApagar(id: number , slidingItem:any) {
    await slidingItem.close();
    const alert = await this.alertCtrl.create({
      header: 'Eliminar atividade',
      message: 'Tens a certeza que queres eliminar esta atividade?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => this.apagar(id)
        }
      ]
    });

    await alert.present();
  }

  apagar(id: number) {
    this.atividadeService.deleteAtividade(id).subscribe(() => {
      this.carregar();
      this.toast('Atividade eliminada');
    });
  }

  async toast(msg: string) {
    const t = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    t.present();
  }
}