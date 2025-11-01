import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  imports: [FormsModule, NzIconModule, NzSelectModule],
})
export class AutocompleteComponent implements OnInit {
  randomUserUrl = 'https://api.randomuser.me/?results=5';
  searchChange$ = new BehaviorSubject('');
  optionList: string[] = [];
  selectedUser?: string;
  loading = false;

  onSearch(value: string): void {
    this.loading = true;
    this.searchChange$.next(value);
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.searchChange$
      .pipe(
        debounceTime(500),
        switchMap((name) => this.getRandomNameList(name))
      )
      .subscribe((data) => {
        this.optionList = data;
        this.loading = false;
      });
  }

  getRandomNameList(name: string): Observable<string[]> {
    return this.http.get<{ results: any[] }>(`${this.randomUserUrl}`).pipe(
      map((res) => res.results),
      catchError(() => of<any[]>([])),
      map((list) => list.map((item) => `${item.name.first} ${name}`))
    );
  }
}
