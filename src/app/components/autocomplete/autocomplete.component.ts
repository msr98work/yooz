import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface SearchItem {
  id: number;
  name: string;
  category: string;
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class AutocompleteComponent implements OnInit {
  searchForm: FormGroup;
  filteredItems: SearchItem[] = [];
  showResults: boolean = false;
  isLoading: boolean = false;

  items: SearchItem[] = [
    { id: 1, name: 'تهران', category: 'شهر' },
    { id: 2, name: 'مشهد', category: 'شهر' },
    { id: 3, name: 'اصفهان', category: 'شهر' },
    { id: 4, name: 'شیراز', category: 'شهر' },
    { id: 5, name: 'ایران خودرو', category: 'شرکت' },
    { id: 6, name: 'سایپا', category: 'شرکت' },
    { id: 7, name: 'سامسونگ', category: 'برند' },
    { id: 8, name: 'اپل', category: 'برند' },
  ];

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: ['', [Validators.minLength(2)]],
      selectedItem: [null], // برای ذخیره آیتم انتخاب شده
    });
  }

  ngOnInit() {
    // گوش دادن به تغییرات فیلد جستجو
    this.searchForm.get('search')?.valueChanges.subscribe((value) => {
      this.onSearchChange(value);
    });
  }

  onSearchChange(value: string) {
    if (!value || value.length < 2) {
      this.clearResults();
      return;
    }

    this.isLoading = true;

    // شبیه‌سازی تاخیر برای جستجو
    setTimeout(() => {
      this.filteredItems = this.items.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      this.showResults = true;
      this.isLoading = false;
    }, 300);
  }

  selectItem(item: SearchItem) {
    // تنظیم مقدار فیلد جستجو
    this.searchForm.patchValue({
      search: item.name,
      selectedItem: item,
    });

    this.showResults = false;

    console.log('آیتم انتخاب شده:', item);
    console.log('مقدار فرم:', this.searchForm.value);
  }

  clearResults() {
    this.filteredItems = [];
    this.showResults = false;
    this.searchForm.patchValue({
      selectedItem: null,
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      console.log('فرم ارسال شد:', this.searchForm.value);
      // ارسال به سرور یا پردازش داده‌ها
    }
  }

  // برای ریست کردن فرم
  resetForm() {
    this.searchForm.reset();
    this.clearResults();
  }
}
