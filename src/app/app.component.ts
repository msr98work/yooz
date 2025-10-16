import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  eyeOffOutline,
  eyeOutline,
  fingerPrintOutline,
  fingerPrint,
  settingsOutline,
  layersSharp,
  notificationsOutline,
  logoGithub,
  logoLinkedin,
  logoInstagram,
  checkmarkOutline,
  chevronForwardOutline,
  chevronBackOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      eyeOffOutline,
      eyeOutline,
      fingerPrintOutline,
      fingerPrint,
      settingsOutline,
      layersSharp,
      notificationsOutline,
      logoGithub,
      logoLinkedin,
      logoInstagram,
      checkmarkOutline,
      chevronForwardOutline,
      chevronBackOutline,
    });
  }
}
