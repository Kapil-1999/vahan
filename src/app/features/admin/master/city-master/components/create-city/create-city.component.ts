import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-create-city',
  standalone: false,
  templateUrl: './create-city.component.html',
  styleUrl: './create-city.component.scss'
})
export class CreateCityComponent {
  stateData:any
  @Output() mapdata = new EventEmitter()
  cityForm!: FormGroup;
  tittle: string = 'Create';
  userDetails: any;
  editData: any
  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private NotificationService: NotificationService,
    private commonService: CommonService,
    private cityService: CityService,
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res
    });
  };

  ngOnInit() {
    this.setInitialForm();
  }

  setInitialForm() {
    this.cityForm = this.fb.group({
      cityName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
    })
    if (this.editData) {
      this.tittle = 'Update'
      this.cityForm.patchValue({
        cityName : this.editData?.city_name,
      })
    }
  }

  submit(formValue: any) {
    if (this.cityForm.invalid) {
      this.cityForm.markAllAsTouched();
      return;
    }
    let service: any;
    let successMessage: any;
    let payload: any = {
      "city_name": formValue?.cityName,
      "pk_state_id": Number(this.stateData?.value)
    };


    if (this.editData?.city_id) {
      successMessage = 'City Updated Succesfully'
      payload['city_id'] = Number(this.editData?.city_id);
      service = this.cityService.updateCity(payload)
    } else {
      successMessage = 'City Added Succesfully'
      service = this.cityService.addCity(payload);
    }
    service.subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.bsModalService.hide();
        this.mapdata.emit();
        this.NotificationService.successAlert(successMessage);
      } else {
        this.NotificationService.errorAlert(res?.body?.actionResponse);
      }
    })
  }

  cancel() {
    this.bsModalService.hide();
  }
}
