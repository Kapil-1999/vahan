import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RawService } from '../../services/raw.service';

@Component({
  selector: 'app-raw-data-filter',
  standalone: false,
  templateUrl: './raw-data-filter.component.html',
  styleUrl: './raw-data-filter.component.scss'
})
export class RawDataFilterComponent {
  @Output() rawEmit = new EventEmitter();
  @Output() loadingEmit = new EventEmitter<boolean>();
  rawDataForm!: FormGroup;
  rawData:any

  constructor(
    private fb : FormBuilder,
    private rawDataService: RawService
  ) {};

  ngOnInit() {
    this.setInitialForm();
  }

  setInitialForm() {
    this.rawDataForm = this.fb.group({
      imei: ['',[Validators.required,Validators.pattern(/^\d{15}$/)]],
    })
  }

  submit(formvalue:any, e:any) {
    e.preventDefault();
    if (this.rawDataForm.invalid) {
      this.rawDataForm.markAllAsTouched();
      return;
    }
    let payload = {
      imei_no: formvalue.imei
    }
    this.loadingEmit.emit(true);
    this.rawDataService.rawData(payload).subscribe({
      next: (res:any) => {
        this.rawData = res?.body?.result;
        this.rawEmit.emit(this.rawData);
        this.loadingEmit.emit(false);
      },
      error: () => {
        this.loadingEmit.emit(false);
      }
    });
  }
}
