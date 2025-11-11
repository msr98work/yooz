import {
  Component,
  input,
  output,
  signal,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonInput,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonSpinner,
} from '@ionic/angular/standalone';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

export interface NgZorroOption {
  value: any;
  label: string;
  disabled?: boolean;
  icon?: string;
  group?: string;
}

@Component({
  selector: 'input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonSpinner,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class InputAutocompleteComponent implements OnInit, OnDestroy {
  @ViewChild('inputRef', { static: false })
  inputRef!: ElementRef<HTMLIonInputElement>;

  // Inputs
  control = input.required<FormControl>();
  placeholder = input<string>('');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  size = input<'small' | 'medium' | 'large'>('medium');
  options = input<NgZorroOption[]>([]);
  backfill = input<boolean>(false);
  overlayClassName = input<string>('');
  defaultActiveFirstOption = input<boolean>(true);

  // Outputs
  optionSelected = output<NgZorroOption>();
  search = output<string>();
  opened = output<void>();
  closed = output<void>();
  blur = output<void>();
  focus = output<void>();

  // Signals
  isOpen = signal(false);
  activeIndex = signal(-1);
  filteredOptions = signal<NgZorroOption[]>([]);
  groups = signal<{ [key: string]: NgZorroOption[] }>({});

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.setupValueChanges();
    this.filteredOptions.set(this.options());
    this.groupOptions();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupValueChanges() {
    this.control()
      .valueChanges.pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe((value) => {
        this.onSearch(value);
      });
  }

  private groupOptions() {
    const groups: { [key: string]: NgZorroOption[] } = {};
    this.options().forEach((option) => {
      if (option.group) {
        if (!groups[option.group]) {
          groups[option.group] = [];
        }
        groups[option.group].push(option);
      }
    });
    this.groups.set(groups);
  }

  onSearch(value: string) {
    const searchValue = value?.toLowerCase() || '';

    if (searchValue) {
      const filtered = this.options().filter((option) =>
        option.label.toLowerCase().includes(searchValue)
      );
      this.filteredOptions.set(filtered);
    } else {
      this.filteredOptions.set(this.options());
    }

    this.search.emit(searchValue);

    if (searchValue && this.filteredOptions().length > 0) {
      this.open();
      if (this.defaultActiveFirstOption()) {
        this.activeIndex.set(0);
      }
    } else {
      this.close();
    }
  }

  onInputFocus() {
    if (this.filteredOptions().length > 0) {
      this.open();
    }
    this.focus.emit();
  }

  onInputBlur() {
    setTimeout(() => {
      this.close();
      this.blur.emit();
    }, 150);
  }

  onInputKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveActiveIndex(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveActiveIndex(-1);
        break;
      case 'Enter':
        event.preventDefault();
        this.selectActiveOption();
        break;
      case 'Escape':
        this.close();
        break;
    }
  }

  private moveActiveIndex(direction: number) {
    if (!this.isOpen()) return;

    const options = this.filteredOptions();
    let newIndex = this.activeIndex() + direction;

    if (newIndex < 0) newIndex = options.length - 1;
    if (newIndex >= options.length) newIndex = 0;

    this.activeIndex.set(newIndex);

    // Backfill input with active option label
    if (this.backfill() && newIndex >= 0) {
      this.control().setValue(options[newIndex].label, { emitEvent: false });
    }
  }

  private selectActiveOption() {
    const activeIndex = this.activeIndex();
    const options = this.filteredOptions();

    if (activeIndex >= 0 && activeIndex < options.length) {
      this.selectOption(options[activeIndex]);
    }
  }

  selectOption(option: NgZorroOption) {
    if (option.disabled) return;

    this.control().setValue(option.label);
    this.optionSelected.emit(option);
    this.close();
  }

  open() {
    if (this.isOpen() || this.disabled()) return;

    this.isOpen.set(true);
    this.opened.emit();
  }

  close() {
    if (!this.isOpen()) return;

    this.isOpen.set(false);
    this.activeIndex.set(-1);
    this.closed.emit();
  }

  trackByValue(index: number, option: NgZorroOption) {
    return option.value;
  }

  hasGroups(): boolean {
    return Object.keys(this.groups()).length > 0;
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  isOptionActive(option: NgZorroOption, index: number): boolean {
    return this.activeIndex() === index && !option.disabled;
  }
}
