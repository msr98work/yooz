import { Component, inject, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { IonModal } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextComponent } from '@widget/input/input-text/input-text.component';
import { InputAutocompleteComponent } from '@widget/input/input-autocomplete/input-autocomplete.component';
import { ReorderEndCustomEvent } from '@ionic/core';
import { WorkflowService } from '@service/workflow/workflow.service';

@Component({
  selector: 'app-workflow-dialog',
  templateUrl: './workflow-dialog.component.html',
  styleUrls: ['./workflow-dialog.component.scss'],
  imports: [
    IonIcon,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    TranslateModule,
    InputTextComponent,
    ReactiveFormsModule,
    InputAutocompleteComponent,
  ],
})
export class WorkflowDialogComponent implements OnInit {
  private workflowService = inject(WorkflowService);
  modal = input<IonModal>();
  dismissChange = output<boolean>();

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    form: new FormControl(null, Validators.required),
    states: new FormControl(null, Validators.required),
  });
  loading = false;

  constructor() {}

  ngOnInit() {}

  getControl(key: string) {
    return this.form.get(key) as FormControl;
  }

  close() {
    const checked = !this.form.dirty;
    this.dismissChange.emit(checked);
    this.modal().dismiss();
  }

  closeFieldFormModal(modal: IonModal) {
    modal.dismiss();
  }

  handleReorderEnd(event: ReorderEndCustomEvent) {
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
    event.detail.complete();
  }

  onSubmit() {
    this.loading = true;
    this.workflowService
      .post({
        title: this.form.value.title,
        form: 1, //this.form.value.form
        start_state: 1,
        states: [
          {
            from_state: 1,
            to_state: 2,
          },
          {
            from_state: 2,
            to_state: 3,
          },
        ],
      })
      .subscribe((response) => {
        if (response.success) {
        }
        this.loading = false;
      });
  }
}
