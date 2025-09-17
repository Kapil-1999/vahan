import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { FitmentService } from '../../services/fitment.service';

@Component({
  selector: 'app-create-fitment',
  standalone: false,
  templateUrl: './create-fitment.component.html',
  styleUrl: './create-fitment.component.scss'
})
export class CreateFitmentComponent {
  @Output() mapdata = new EventEmitter();
  selectManu: any;
  editData: any;
  fitmentForm!: FormGroup
  rtoList: any;
  tittle: string = 'Add';
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  };
  userDetails: any;
  stateData: any;
  vehicleTypeData: any;
  productList: any;
  backendListData: any;
  base64Aadhar: any;
  aadharImageError: boolean = false;
  vehicleRcError: boolean = false;
  aadharImage: any;
  vehicleRc: any;
  base64VehicleRc: any;
  dealerValue: any
  showInput: boolean = false;
  selectedState: any;
  activatiDetailById: any;
  errorMessage: any;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private modalService: BsModalService,
    private NotificationService: NotificationService,
    private fitmentService: FitmentService
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res
    })
  };

  ngOnInit() {
    this.setInitialForm();
    this.getProductList()
    this.getStateDropdown()
    this.getBackendList()
    this.getVehicleType()
  }

  setInitialForm() {
    this.fitmentForm = this.fb.group({
      deviceImei: ['', [Validators.required, Validators.pattern(/^\d{15}$/)]],
      state: [null, [Validators.required]],
      stateValue: [''],
      backend: [null, [Validators.required]],
      rto: ['', [Validators.required]],
      registrationType: ['', [Validators.required]],
      vehicleMake: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]{2,50}$/)]],
      vehicleModel: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9\s-]{2,50}$/)]],
      registraionYear: ['', [Validators.required, Validators.pattern(/^(19|20)\d{2}$/),]],
      engineNo: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{5,20}$/),]],
      chassisNo: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{5,20}$/)]],
      vehicleNo: ['', [Validators.required, Validators.pattern(
        /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/
      )]],
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      customerName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]{3,30}$/)]],
      aadharNo: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
      aadharFile: ['', [Validators.required]],
      vehicleFile: ['', [Validators.required]],
      address: [''],
    })

    if (this.editData) {
      this.tittle = 'Update'
      this.fitmentForm.patchValue({
        deviceImei: this.editData?.imei,
        vehicleMake: this.editData?.vehicleMake,
        vehicleModel: this.editData?.vehicleModel,
        registraionYear: this.editData?.vehicleMfgYear,
        engineNo: this.editData?.vehicleEngineNo,
        chassisNo: this.editData?.vehicleChassisNo,
        vehicleNo: this.editData?.vehicleNo,
        mobileNo: this.editData?.permitHolderMobile,
        customerName: this.editData?.permitHolderName,
        aadharNo: this.editData?.permitHolderAadhar,
        address: this.editData?.permitHolderAddress,
      })
    }
    this.aadharImage = this.editData?.aadharDocument;
    this.vehicleRc = this.editData?.rcDocument;
  }

  onSelectState(event: any) {
    this.selectedState = event?.value
    this.getRtoList(this.selectedState)
  }

  toggleButton() {
    this.fitmentForm.controls['state'].setValue(null)
    this.showInput = !this.showInput
  }

  getImageUrl(path: string): string {
    return path ? `${path.replace(/\\/g, '/')}` : '';
  }

  addState() {
    let successMessage = 'State Created Succesfully'
    let errorMessage = 'State Not Created'
    let payload = {
      "stateName": this.fitmentForm?.value?.stateValue,
      "createdBy": this.userDetails?.Id
    }
    this.commonService.createState(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.fitmentForm.controls['stateValue'].setValue(null)
        this.showInput = false;
        this.getStateDropdown()
        this.NotificationService.successAlert(successMessage)
      } else {
        this.NotificationService.errorAlert(errorMessage)
      };
    });
  };
  
  // product dropdown
  getProductList() {
    this.commonService.productList().subscribe((res: any) => {
      if (res?.status == 200) {
        this.productList = res.body.result.map((item: any) => ({
          value: item.productId,
          text: item.product_Name
        }));

        if (this.editData?.pk_product_id) {
          const matchedProduct = this.productList.find(
            (data: any) => data.value == this.editData.pk_product_id
          );
          if (matchedProduct) {
            this.fitmentForm.patchValue({ product: matchedProduct });
          }
        }
      }
    })
  }

  // registration type dropdown
  getVehicleType() {
    this.commonService.vehicleTypeDropdown().subscribe((res: any) => {
      if (res?.status == 200) {
        this.vehicleTypeData = res.body.result.map((item: any) => ({
          value: item.pk_reg_type_id,
          text: item.reg_type_name
        }));

        if (this.editData?.fkRegistrationType) {
          const matchedRegistration = this.vehicleTypeData.find(
            (type: any) => type.value === this.editData.fkRegistrationType
          );
          if (matchedRegistration) {
            this.fitmentForm.patchValue({ registrationType: matchedRegistration });
          }
        }

      }
    })
  }

  // state dropdown
  getStateDropdown() {
    this.commonService.stateDropdownList().subscribe((res: any) => {
      if (res?.body?.isSuccess == true) {
        this.stateData = res.body.result.map((item: any) => ({
          value: item.stateId,
          text: item.stateName
        }));
        if (this.editData?.fkStateId) {
          const matchedState = this.stateData.find(
            (state: any) => state.value === this.editData.fkStateId
          );
          if (matchedState) {
            this.fitmentForm.patchValue({ state: matchedState });
            this.getRtoList(matchedState);
          }
        }
      }
    })
  }

  // backend dropdown
  getBackendList() {
    this.commonService.backendList().subscribe((res: any) => {
      if (res?.body?.isSuccess == true) {
        this.backendListData = res.body.result.map((item: any) => ({
          value: item.backendId,
          text: item.backendName
        }));

        if (this.editData?.fkStateBackendMap) {
          const matchedBackend = this.backendListData.find(
            (backend: any) => backend.value === this.editData.fkStateBackendMap
          );
          if (matchedBackend) {
            this.fitmentForm.patchValue({ backend: matchedBackend });
            this.getRtoList(matchedBackend);
          }
        }
      }
    })
  }

  // rto Dropdown
  getRtoList(state: any) {
    let payload = {
      "pk_StateId": Number(state?.value)
    }
    this.commonService.rtoListdetail(payload).subscribe((res: any) => {
      if (res?.status == 200) {
        this.rtoList = res.body.result.map((item: any) => ({
          value: item.rtoId,
          text: item.rtoName
        }));

        if (this.editData?.fkRtoId) {
          const matchedRto = this.rtoList.find(
            (state: any) => state.value === this.editData.fkRtoId
          );
          if (matchedRto) {
            this.fitmentForm.patchValue({ rto: matchedRto });
          }
        }
      }
    })
  }

  getActivationdetail(event: any) {
    const imeiNo = event?.target?.value

    let payload = {
      "device_imei": imeiNo,
      "EmployeeId": Number(this.userDetails?.Id)

    }
    this.fitmentService.activationDetail(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.errorMessage = null
        this.activatiDetailById = res?.body?.actionResponse
      } else {
        this.errorMessage = res?.body?.actionResponse
      }
    })
  }


  onFileChange(event: any, documentType: string): void {
    this.aadharImageError = false;
    this.vehicleRcError = false;
    const file = event.target.files[0];

    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const base64String = e.target.result.split(',')[1];

          if (documentType === 'aadharImage') {
            this.base64Aadhar = base64String;
            this.aadharImage = e.target.result;
            this.aadharImageError = false;
          } else if (documentType === 'vehicleRc') {
            this.base64VehicleRc = base64String;
            this.vehicleRc = e.target.result;
            this.vehicleRcError = false;
          }
        };
        reader.readAsDataURL(file);
      } else {
        if (documentType === 'aadharImage') {
          this.aadharImage = null
          this.aadharImageError = true;
        } else if (documentType === 'vehicleRc') {
          this.vehicleRc = null
          this.vehicleRcError = true;
        }
      }
    }
  }

  submit(formValue: any) {
    if (this.fitmentForm.invalid) {
      this.fitmentForm.markAllAsTouched();
      return;
    }
    let successMessage: any
    let errorMessage: any
    let payload: any = {
      "fk_manufacturer_id": this.editData?.fkManufacturerId ? Number(this.editData?.fkManufacturerId) : 0,
      "fk_distributor_Id": 0,
      "fk_dealer_id": Number(this.userDetails?.Id),
      "fk_device_id": this.editData?.fkDeviceId ? Number(this.editData?.fkDeviceId) : 0,
      "fk_state_id": Number(formValue?.state?.value),
      "fk_rto_id": Number(formValue?.rto?.value),
      "fk_state_backend_map": Number(formValue?.backend?.value),
      "permit_holder_name": formValue?.customerName,
      "permit_holder_mobile": String(formValue?.mobileNo),
      "permit_holder_address": formValue?.address,
      "permit_holder_aadhar": formValue?.aadharNo,
      "fk_registration_type": Number(formValue?.registrationType?.value),
      "vehicle_no": formValue?.vehicleNo,
      "vehicle_mfg_year": Number(formValue?.registraionYear),
      "vehicle_chassis_no": formValue?.chassisNo,
      "vehicle_engine_no": formValue?.engineNo,
      "vehicle_make": formValue?.vehicleMake,
      "vehicle_model": formValue?.vehicleModel,
      "rc_document": "",
      "fk_created_by": 1,
      "aadhar_document": "",
      "rc_document_upload": this.base64VehicleRc,
      "aadhar_document_upload": this.base64Aadhar,
      "device_imei": formValue?.deviceImei
    };

    if (this.editData?.fk_manufacture_id) {
      successMessage = 'Fitment Request Updated Succesfully'
      errorMessage = 'Fitment Request Not Updated'
    } else {
      successMessage = 'Fitment Request Added Succesfully'
      errorMessage = 'Fitment Request Not Added'
    }
    this.fitmentService.modifyActivation(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.modalService.hide()
        this.mapdata.emit()
        this.NotificationService.successAlert(successMessage)
      } else {

        this.NotificationService.errorAlert(res?.body?.actionResponse)
      }

    })
  }

  cancel() {
    this.modalService.hide();
  };

  onEngineNoInput(event: any) {
    const input = event.target as HTMLInputElement;
    const formattedValue = this.commonService.formatEngineNo(input.value);
    input.value = formattedValue;
    this.fitmentForm.get('engineNo')?.setValue(formattedValue, { emitEvent: false });
  };

  onVehicleNoInput(event: any) {
    const input = event.target as HTMLInputElement;
    const formattedValue = this.commonService.formatVehicleNo(input.value);
    input.value = formattedValue;
    this.fitmentForm.get('vehicleNo')?.setValue(formattedValue, { emitEvent: false });
  }

  onChassisNoInput(event: any) {
  const input = event.target as HTMLInputElement;
  const formattedValue = this.commonService.formatChassisNo(input.value);
  input.value = formattedValue;
  this.fitmentForm.get('chassisNo')?.setValue(formattedValue, { emitEvent: false });
}

}

