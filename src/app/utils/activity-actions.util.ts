import { AlertController, ToastController } from '@ionic/angular/standalone';

export async function confirmDeleteAction(
  alertCtrl: AlertController,
  onConfirm: () => void | Promise<void>,
  title = 'Delete activity',
  message = 'Are you sure you want to delete?'
) {
  const alert = await alertCtrl.create({
    header: title,
    message,
    buttons: [
      { text: 'Cancel', role: 'cancel' },
      {
        text: 'Delete',
        role: 'destructive',
        handler: onConfirm,
      },
    ],
  });

  await alert.present();
}

export async function showDeleteToast(
  toastCtrl: ToastController,
  position: 'top' | 'bottom' = 'bottom'
) {
  const toast = await toastCtrl.create({
    message: 'Activity deleted',
    duration: 1000,
    position,
    cssClass: 'delete-toast',
  });

  await toast.present();
}
