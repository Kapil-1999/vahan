import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShippingService } from '../../services/shipping.service';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-add-shipping-address',
  standalone: false,
  templateUrl: './add-shipping-address.component.html',
  styleUrl: './add-shipping-address.component.scss'
})
export class AddShippingAddressComponent {
  @Output() mapdata = new EventEmitter()
  shippingAddress = [
    {
      "value": 1,
      "text": "Yes"
    },
    {
      "value": 0,
      "text": "No"
    },
  ];
  tittle : string = 'Create';
  cityData: any;
  stateData: any;
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  };
  shippingForm! : FormGroup;
  userDetails: any;
  editData: any;

  constructor(
    private modalService: BsModalService,
    private commonService : CommonService,
    private fb : FormBuilder,
    private shippingService : ShippingService,
    private notfication : NotificationService
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res; 
    })
  };

  ngOnInit() {    
    this.setInitialForm();
    this.getStateDropdown();
  };

  setInitialForm() {
    this.shippingForm = this.fb.group({
      orgName : ['', [Validators.required]],
      name : ['', [Validators.required]],
      email : ['', [Validators.required , Validators.email]],
      mobileNo : ['', [Validators.required , Validators.pattern(/^\d{10}$/)]],
      pincode : ['', [Validators.required]],
      isDefault : [0, [Validators.required]],
      address : [''],
      state : ['', [Validators.required]],
      city : ['', [Validators.required]]
    });

    if (this.editData) {
      this.tittle = 'Update'; 
      this.shippingForm.patchValue({
        orgName: this.editData.orgName,
        name: this.editData.contact_person_name,
        email: this.editData.contact_person_email,
        mobileNo: this.editData.contact_person_mobile,
        isDefault: this.editData.contact_person_mobile,
        pincode: this.editData.pinCode,
        address: this.editData.address, 
      })
    }
  }

  getStateDropdown() {
    this.commonService.stateDropdownList().subscribe((res: any) => {
      if (res?.body?.isSuccess == true) {
        this.stateData = res.body.result.map((item: any) => ({
          value: item.stateId,
          text: item.stateName
        }));
        if (this.editData?.pk_state_id) {
          const matchedState = this.stateData.find(
            (state: any) => state.value === this.editData.pk_state_id
          );
          if (matchedState) {
            this.shippingForm.patchValue({ state: matchedState });
            this.getCityDropdown(matchedState.value);
          }
        }
      }
    })
  }
  onSelectState(event: any) {
    this.cityData = [];
    if (event?.value?.value) {
      this.getCityDropdown(event?.value?.value);
    }
  }

  getCityDropdown(stateId: any) {
    let payload = {
      "stateId": Number(stateId)
    }
    this.commonService.cityDropdown(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess == true) {
        this.cityData = res?.body?.result.map((item: any) => ({
          value: item.city_id,
          text: item.city_name
        }));
        if (this.editData?.pk_city_id) {
          const matchedCity = this.cityData.find(
            (city: any) => city.value === this.editData.pk_city_id
          );
          if (matchedCity) {
            this.shippingForm.patchValue({ city: matchedCity });
          }
        }
      };
    })
  }

  submit(formvalue:any) {
    if (this.shippingForm.invalid) {
      this.shippingForm.markAllAsTouched();
      return;
    }
    let payload:any = {
      "empId": Number(this.userDetails?.Id),
      "orgName": formvalue?.orgName,
      "address": formvalue?.address,
      "pk_city_id": formvalue?.city?.value,
      "pk_state_id": formvalue?.state?.value,
      "pinCode": formvalue?.pincode,
      "contact_person_name": formvalue?.name,
      "contact_person_email": formvalue?.email,
      "contact_person_mobile": formvalue?.mobileNo.toString(),
      "isDefault": formvalue?.isDefault == 1 ? true : false 
    };
    let service = this.shippingService.addShippingAddress(payload);
    if(this.editData?.shipingId) {
      payload['shipingId'] = this.editData?.shipingId;
      service = this.shippingService.updateShippingAddress(payload);
    }
    service.subscribe((res: any) => {
     if(res?.body?.statusCode ==200){
      this.notfication.showSuccess(res?.body?.actionResponse);
      this.modalService.hide();
      this.mapdata.emit();
     } else {
      this.notfication.showError(res?.body?.actionResponse);
     }      
    })
  }

  cancel() {
    this.modalService.hide();
  }
}
