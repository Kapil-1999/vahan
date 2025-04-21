import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../../shared/services/common.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { CertificateService } from '../../services/certificate.service';
import { OrderService } from '../../../../order/services/order.service';

@Component({
  selector: 'app-upload-certificate',
  standalone: false,
  templateUrl: './upload-certificate.component.html',
  styleUrl: './upload-certificate.component.scss'
})
export class UploadCertificateComponent {
  @Output() mapdata = new EventEmitter();
  selectManu: any;
  editData: any;
  certificateForm!: FormGroup
  productList: any;
  authorityList: any;
  tittle: string = 'Upload';
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  };
  certificate1Error : boolean = false;
  certificate2Error : boolean = false;
  userDetails: any;
  existingCertificate1Name: any;
  existingCertificate2Name: any;

  constructor(
    private fb : FormBuilder,
    private commonService : CommonService,
    private modalService : BsModalService,
    private NotificationService : NotificationService,
    private certificateService : CertificateService,
    private OrderService : OrderService,
  ) {
    this.commonService.getUserDetails().subscribe((res:any) => {
      this.userDetails = res
    })
  };

  ngOnInit() {        
    this.setInitialForm();
    this.getProductList();
    this.getAuthorityList();
  }

  async setInitialForm () {
    this.certificateForm = this.fb.group({
      product: [null, [Validators.required]],
      authority: [null, [Validators.required]],
      certificate1: ['', [Validators.required]],
      fromDate1: ['', [Validators.required]],
      toDate1: ['', [Validators.required]],
      certificate2: ['', [Validators.required]],
      fromDate2: ['', [Validators.required]],
      toDate2: ['', [Validators.required]],
    });
    const formatDate = (date: any) => {
      if (!date) return '';
      if (date instanceof Date) {
        return date.toISOString().split('T')[0];
      }
      if (typeof date === 'string') {
        return date.split('T')[0];
      }
      return '';
    };
  
    this.certificateForm.patchValue({
      fromDate1: formatDate(this.editData.from_date1),
      toDate1: formatDate(this.editData.expiry_date1),
      fromDate2: formatDate(this.editData.from_date2),
      toDate2: formatDate(this.editData.expiry_date2)
    });

    if (this.editData.certificate1_path) {
      this.existingCertificate1Name = this.getFileNameFromUrl(this.editData.certificate1_path);
      try {
        const base64String = await this.convertPdfUrlToBase64(this.editData.certificate1_path);
        this.certificateForm.patchValue({
          certificate1: base64String
        });
      } catch (error) {
        console.error('Failed to load certificate1:', error);
      }
      
    }
    if (this.editData.certificate2_path) {
      this.existingCertificate2Name = this.getFileNameFromUrl(this.editData.certificate2_path);
      try {
        const base64String = await this.convertPdfUrlToBase64(this.editData.certificate2_path);
        this.certificateForm.patchValue({
          certificate2: base64String
        });
      } catch (error) {
        console.error('Failed to load certificate2:', error);
      }
    }
  }

  async convertPdfUrlToBase64(url: string): Promise<string> {
    try {
     const response = await fetch(url);
      const blob = await response.blob();
      
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = (reader.result as string).split(',')[1];
          resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting PDF to Base64:', error);
      throw error;
    }
  }

  getFileNameFromUrl(url: string): string {
    return url.split('/').pop() || 'certificate.pdf';
  }

  
  // product dropdown
  getProductList() {
    let payload = {
      fk_device_category_id: 0
    }
    this.OrderService.orderProductList(payload).subscribe((res: any) => {      
      if (res?.status == 200) {
        this.productList = res.body.result.map((item: any) => ({
          value: item.fk_device_category_id,
          text: item.device_subcategory_name
        }));

        if (this.editData?.pk_product_id) {
          const matchedProduct = this.productList.find(
            (data: any) => data.value == this.editData.pk_product_id
          );
          if (matchedProduct) {
            this.certificateForm.patchValue({ product: matchedProduct });
          }
        }
      }
    })
  }

  // authority Dropdown
  getAuthorityList() {
    this.commonService.authorityList().subscribe((res: any) => {
      if (res?.status == 200) {
        this.authorityList = res.body.result.map((item: any) => ({
          value: item.authority_Id,
          text: item.authority_Name
        }));
        if (this.editData?.pk_issueby_id) {
          const matchedAuthority = this.authorityList.find(
            (data: any) => data.value == this.editData.pk_issueby_id
          );
          if (matchedAuthority) {
            this.certificateForm.patchValue({ authority: matchedAuthority });
          }
        }
      }
    })
  }

  onFileChange(event: any, certificateType: string): void {
    // Reset errors
    if (certificateType === 'certificate1') {
      this.certificate1Error = false;
    } else {
      this.certificate2Error = false;
    };  
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      console.log(file);
      if (fileExtension === 'pdf') {
        const reader = new FileReader();
        reader.onload = (e: any) => {          
          const base64String = e.target.result.split(',')[1];
          if (certificateType === 'certificate1') {
            this.certificate1Error = false;
            this.certificateForm.patchValue({
              certificate1: base64String
            });
          } else if (certificateType === 'certificate2') {
            this.certificate2Error = false;
            this.certificateForm.patchValue({
              certificate2: base64String
            });
          }
        };
        reader.readAsDataURL(file);
      } else {
        if (certificateType === 'certificate1') {
          this.certificate1Error = true;
        } else if (certificateType === 'certificate2') {
          this.certificate2Error = true;
        }
        event.target.value = '';
      }
    }
  }

  submit(formValue:any) {
    if (this.certificateForm.invalid) {
      this.certificateForm.markAllAsTouched();
      return;
    }
    let successMessage: any
    let service: any;
    let payload: any = {
      "pk_emp_id": Number(this.selectManu.value),
      "pk_product_id": Number(formValue?.product?.value),
      "pk_issueby_id": Number(formValue?.authority?.value),
      "expiry_date1": (formValue?.toDate1),
      "expiry_date2": (formValue?.toDate2),
      "certificate1_path": "#",
      "certificate1_name": formValue.certificate1,
      "certificate2_name": formValue.certificate2,
      "certificate2_path": "#",
      "createdBy": this.userDetails?.Id,
      "activated": 1,
      "deleted": 0,
      "from_date1": (formValue?.fromDate1),
      "from_date2": (formValue?.fromDate2),
    };
    
    if (this.editData?.manufacturer_product_id) {
      successMessage = 'Certificate Updated Succesfully'
      payload['manufacturer_product_id'] = Number(this.editData?.manufacturer_product_id);
      payload['pk_emp_id'] = Number(this.editData?.pk_emp_id);
      service = this.certificateService.updateCertificate(payload)
    } else {
      successMessage = 'Certificate Uploaded Succesfully'
      service = this.certificateService.uploadCertificate(payload);
    }
    service.subscribe((res: any) => {
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
  }
}
