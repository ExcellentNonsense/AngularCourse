import { Component, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'ac-news-theme-selector',
  templateUrl: './news-theme-selector.component.html',
  styleUrls: ['./news-theme-selector.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: NewsThemeSelectorComponent
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: NewsThemeSelectorComponent
  }]
})
export class NewsThemeSelectorComponent implements ControlValueAccessor, Validator {
  @Input() themes: string[] = [];

  public selectedTheme: string | null = "";

  private onChange = (value: any) => { };
  private onTouched = () => { };

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(value: string): void {
    this.selectedTheme = value;
  }

  selectTheme(selectedTheme: string) {
    if (this.selectedTheme === "") {
      this.selectedTheme = null;
    }
    else {
      this.selectedTheme = selectedTheme;
    }

    this.onChange(selectedTheme);
  }

  onBlur() {
    this.onTouched();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let error = Validators.required(control);

    if (error) {
      return error;
    }
    else {
      let day = new Date().getDay();
      let todayIsOddDay = day % 2 != 0;

      if (control.value === "Политика" && todayIsOddDay) {
        return { politicsFreeDay: { valid: false } }
      }
    }

    return null;
  }
}
