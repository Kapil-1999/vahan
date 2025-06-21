import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { CertificateService } from '../../services/certificate.service';
import { UploadCertificateComponent } from '../upload-certificate/upload-certificate.component';

@Component({
  selector: 'app-certificate-list',
  standalone: false,
  templateUrl: './certificate-list.component.html',
  styleUrl: './certificate-list.component.scss'
})
export class CertificateListComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  certificateList: any
  public columns!: any;
  bsModalRef!: BsModalRef;
  userDetails: any
  manuFactDrop: any;
  selectManu: any;
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }
  config = {
    displayKey: "text",
    height: '200px',
    search: true,
    placeholder: `Select Manufacturer`,
  }

  constructor(
    private commonService: CommonService,
    private certificateService: CertificateService,
    private modalService: BsModalService
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  ngOnInit() {
    this.getManufacturerList();
    this.setInitialValue();
  }

  setInitialValue() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'Manufacture Name', title: 'Manufacture Name' },
      { key: 'Product Name', title: 'Product Name' },
      { key: 'Issue Authority', title: 'Issue Authority' },
      { key: 'Certificate 1', title: 'Certificate 1' },
      { key: 'From date', title: 'From date' },
      { key: 'To Date', title: 'To Date' },
      { key: 'Certificate 2', title: 'Certificate 2' },
      { key: 'From date', title: 'From date' },
      { key: 'To Date', title: 'To Date' },
      { key: 'Created Date', title: 'Created Date' },
      { key: 'Action', title: 'Action' }
    ]
  }

  getManufacturerList() {
    let payload = {
      "roleId": Number(this.userDetails?.RoleId),
      "parentId": Number(this.userDetails?.Id)
    }
    this.commonService.manufacturerList(payload).subscribe((res: any) => {
      this.manuFactDrop = res?.body?.result || [];
      this.manuFactDrop = this.manuFactDrop?.map((item: any) => ({
        value: item.empId,
        text: item.contactPersonName
      }));
      if (this.manuFactDrop?.length > 0) {
        this.selectManu = this.manuFactDrop[0]
        this.getCertificateList(this.manuFactDrop[0].value)
      }
    })
  }

  onChangeManufacturer(event: any) {
    if(event?.value?.value) {
      this.selectManu = event?.value;
      this.certificateList = [];
      this.getCertificateList(event?.value?.value)
    } else {
      this.selectManu = null;
      this.certificateList = [];
    }

  }

  getCertificateList(manuId: any) {
    this.isLoading = true;
    let payload = {
      "manufacturerId": Number(manuId)
    }
    this.certificateService.certificateList(payload).subscribe((res: any) => {
      this.isLoading = false;
      this.certificateList = res?.body?.result || [];
      this.pagesize.count = this.certificateList?.length;
    })
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
  }

  onUploadCertificate(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : '',
        selectManu : this.selectManu
      },
    };
    this.bsModalRef = this.modalService.show(
      UploadCertificateComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getCertificateList(this.selectManu?.value)
    });
  }

  openPdf(pdfUrl: string | null) {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    } else {
      alert('PDF URL not available');
    }
  }
}
