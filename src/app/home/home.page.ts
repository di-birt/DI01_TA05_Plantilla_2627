import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonFooter,
  IonList, IonItem, IonLabel, IonButton, IonInput,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  ToastController
} from '@ionic/angular/standalone';
// TODO TA05 – Formularios reactivos
// FormGroup agrupa los FormControl del formulario.
// FormControl representa cada campo individual.
// ReactiveFormsModule habilita las directivas [formGroup] y formControlName en el HTML.
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Elemento } from '../models/elemento.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonFooter,
    IonList, IonItem, IonLabel, IonButton, IonInput,
    // TODO TA05 - Añadimos los componentes Ionic necesarios para el formulario.
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    // TODO TA05 – Añadimos ReactiveFormsModule para habilitar [formGroup] y formControlName
    ReactiveFormsModule
  ],
})
export class HomePage {

  busqueda = signal<string>('');

  elementos = signal<Elemento[]>([
    { id: 1, nombre: 'Angular', descripcion: 'Framework SPA de Google', categoria: 'Frontend' },
    { id: 2, nombre: 'Ionic', descripcion: 'Framework para apps híbridas', categoria: 'Mobile' },
    { id: 3, nombre: 'TypeScript', descripcion: 'Superset tipado de JavaScript', categoria: 'Lenguaje' },
    { id: 4, nombre: 'Node.js', descripcion: 'Entorno de ejecución de JS en servidor', categoria: 'Backend' },
    { id: 5, nombre: 'Capacitor', descripcion: 'Puente nativo para apps Ionic', categoria: 'Mobile' },
  ]);


  hayElementos = computed<boolean>(() => this.elementos().length > 0);

  elementosFiltrados = computed<Elemento[]>(() => {
    const texto = this.busqueda().trim().toLowerCase();
    if (!texto) {
      return this.elementos();
    }

    return this.elementos().filter(e =>
      e.nombre.toLowerCase().includes(texto)
    );
  });

  private router = inject(Router);
  private toastController = inject(ToastController);

  // TODO TA05 – FormGroup: agrupa los campos del formulario.
  // Validators.required marca el campo como obligatorio.
  // Validators.minLength(3) exige un mínimo de caracteres.
  

  constructor() {};

  // TODO TA05 – Leer los valores del formulario con .value y añadir el nuevo elemento al signal.
  // elements.update() recibe la lista actual y devuelve una nueva lista con el elemento añadido.
  // Al final reseteamos el formulario con .reset() para dejarlo vacío.
  agregarElemento(): void {
    // TODO: Si el formulario no es válido, marcamos todos los campos como tocados
    // para que Angular muestre los errores en el HTML y salimos.

    //TODO: Recogemos como {nombre, descripcion, categoria} los valores que vienen desde el formulario formGroup

    // TODO: Guardamos sin espacios en blanco innecesarios (quitamos con trim los espacios anteriores y posteriores)
    // Si algún valor es null o undefined, lo manejamos con ?? para ponerlo a ''
    
    // TODO: Creamos un nuevo elemento con los valores recogidos desde el formulario.
    //Para la id: haremos uso de Date.now() para generar un id único basado en el timestamp actual

    // TODO: signal.update() permite modificar el array sin perder la reactividad.
    // Devolvemos un nuevo array con spread (...) para no mutar el original.

    // Limpiamos el formulario tras añadir el elemento

  }


  verDetalle(elementoHome: Elemento): void {
    this.router.navigate(['/detalle'], { state: { elementoHome } });
  }


  async mostrarToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Lista de tecnologías cargada correctamente',
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}
