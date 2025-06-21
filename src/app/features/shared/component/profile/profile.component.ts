import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/app.reducer';
import { selectUser } from '../../../../core/app.selectors';
import { NotificationService } from '../../services/notification.service';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  stateData: any;
  cityData: any;
  userProfile: any
  profileForm!: FormGroup
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  };
  config1 = {
    displayKey: "text",
    height: '200px',
    search: true
  };
  selectedState: any;
  userProfileDetail: any;
  showEmailVerify: boolean = false
  showMobileVerify:boolean = false
  emailVerified: boolean = false;
mobileVerified: boolean = false;
  selectedCityId: number | null = null;
  constructor(
    private commonService: CommonService,
    private userProfileService: UserProfileService,
    private fb: FormBuilder,
    private Store: Store<AppState>,
    private NotificationService: NotificationService
  ) {
    this.Store.select(selectUser).subscribe((res: any) => {
      this.userProfile = res
    })
  }

  ngOnInit() {
    this.setInitialForm()
    this.getStateDropdown()

  }

  setInitialForm() {
    this.profileForm = this.fb.group({
      personName: ['', Validators.required],
      mobileNo: ['', Validators.required],
      email: ['', Validators.required],
      veryfyEmail: ['', Validators.required],
      veryfyMobile: ['', Validators.required],
      orgnizationName: ['', Validators.required],
      gstn: ['', Validators.required],
      panNo: ['', Validators.required],
      state: [null, Validators.required],
      city: [null, Validators.required],
      address: ['', Validators.required],
    });
  }


  getStateDropdown() {
    this.commonService.stateDropdownList().subscribe((res: any) => {
      if (res?.body?.isSuccess == true) {
        this.stateData = res.body.result.map((item: any) => ({
          value: item.stateId,
          text: item.stateName
        }));
        this.getProfileDetail()
      }
    })
  }

  getCityDropdown(stateId: any) {
    let payload = {
      "stateId": Number(stateId)
    }
    this.commonService.cityDropdown(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess == true) {
        this.cityData = res.body.result.map((item: any) => ({
          value: item.city_id,
          text: item.city_name
        }));
        if (this.selectedCityId) {
          const matchedCity = this.cityData.find(
            (c: any) => c.value === this.selectedCityId
          );
          if (matchedCity) {
            this.profileForm.patchValue({ city: matchedCity });
          }
          this.selectedCityId = null; // reset after use
        }
      }

    })
  }

  onSelectState(event: any) {    
    this.cityData = [];
    this.profileForm.controls['city'].setValue(null)
    this.selectedState = event?.value?.value;
    if (this.selectedState) {
      this.getCityDropdown(this.selectedState);
    }
  }

  getProfileDetail() {
    const payload = {
      empId: Number(this.userProfile?.Id)
    };

    this.userProfileService.userDetail(payload).subscribe((res: any) => {
      this.userProfileDetail = res?.body?.result;
      if (this.userProfileDetail) {
        this.profileForm.patchValue({
          personName: this.userProfileDetail.firstName,
          mobileNo: this.userProfileDetail.contact,
          email: this.userProfileDetail.email,
          orgnizationName: this.userProfileDetail.orgName,
          gstn: this.userProfileDetail.gstNo,
          panNo: this.userProfileDetail.panNo,
          address: this.userProfileDetail.address
        });

        const matchedState = this.stateData.find(
          (s: any) => s.value === this.userProfileDetail.pk_state_id
        );

        if (matchedState) {
          this.profileForm.patchValue({ state: matchedState });
          this.selectedState = matchedState.value;

          this.selectedCityId = this.userProfileDetail.pk_city_id;
          this.getCityDropdown(matchedState.value);
        }
      }
    });
  }

  submit(formValue: any) {
 

    if (!this.mobileVerified || !this.emailVerified) {
      if (!this.mobileVerified) {
        this.NotificationService.errorAlert("Please verify your Mobile Number");
      }
      if (!this.emailVerified) {
        this.NotificationService.errorAlert("Please verify your Email");
      }
      if(!this.emailVerified && !this.mobileVerified){
        this.NotificationService.errorAlert("Please verify your Email And Mobile No.");
      }
      return;
    }
    let payload = {
      "empId": Number(this.userProfile?.Id),
      "firstName": formValue?.personName,
      "contact": formValue?.mobileNo,
      "email": formValue?.email,
      "orgName": formValue?.orgnizationName,
      "gstNo": formValue?.gstn,
      "panNo": formValue?.panNo,
      "address": formValue?.address,
      "pk_state_id": Number(formValue?.state?.value),
      "pk_city_id": Number(formValue?.city?.value)
    }

    this.userProfileService?.updateUserProfile(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.getProfileDetail()
        this.emailVerified = false
        this.mobileVerified = false
        this.NotificationService.successAlert(res?.body?.actionResponse)
      } else {
        this.NotificationService.errorAlert(res?.body?.actionResponse)
      }
    })

  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];

        const payload = {
          empId: this.userProfileDetail?.empId || 0,
          imagePath: base64String,
          imageName: file.name
        };

        this.userProfileService.updateUserProfileImage(payload).subscribe((res: any) => {
          this.getProfileDetail()
        });
      };
      reader.readAsDataURL(file);
    }
  }

  sendMobileOtp() {
    let payload = {
      "emp_id": Number(this.userProfile?.Id)
    }
    this.userProfileService.sendMobileOtp(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.showMobileVerify = true
        this.NotificationService.successAlert(res?.body?.actionResponse)
      } else {
        this.NotificationService.errorAlert(res?.body?.actionResponse)
      }
    })
  }

  sendEmailOtp() {
    let payload = {
      "emp_id": Number(this.userProfile?.Id)
    }
    this.userProfileService.sendEmailOtp(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.showEmailVerify = true
        this.NotificationService.successAlert(res?.body?.actionResponse)
      } else {
        this.NotificationService.errorAlert(res?.body?.actionResponse)
      }
    })
  }

  verifyMobileOtp(otpValue:any) {
    let payload = {
      "emp_id": Number(this.userProfile?.Id),
      "otp": otpValue
    }
    console.log("payload",payload);
    
    this.userProfileService.veryfyEmailOtp(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.showMobileVerify = false
        this.mobileVerified = true; 
        this.NotificationService.successAlert(res?.body?.actionResponse)
      } else {
        this.NotificationService.errorAlert(res?.body?.actionResponse)
      }
    })
  }
  verifyEmailOtp(otpValue:any) {
    let payload = {
      "emp_id": Number(this.userProfile?.Id),
      "otp": otpValue
    }
    console.log("payload",payload);
    
    this.userProfileService.veryfyEmailOtp(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess === true) {
        this.showEmailVerify = false
        this.emailVerified = true;
        this.NotificationService.successAlert(res?.body?.actionResponse)
      } else {
        this.NotificationService.errorAlert(res?.body?.actionResponse)
      }
    })
  }
}
