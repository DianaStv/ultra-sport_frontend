import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent extends Unsubscribe implements OnInit {

  @Input() placeholder: string;
  @Output() searchInput: EventEmitter<string> = new EventEmitter<string>();
  searchControl: FormControl;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.searchControl = new FormControl('');

    this.searchControl.valueChanges
    .pipe(
      takeUntil(this.destroy),
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe(res => {
      this.searchInput.emit(res);
    });
  }

  clearSearchInput() {
    this.searchControl.reset();
  }

}
