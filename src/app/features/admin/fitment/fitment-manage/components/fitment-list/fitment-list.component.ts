import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { CreateCategoryComponent } from '../../../../master/category-master/components/create-category/create-category.component';
import { CreateFitmentComponent } from '../create-fitment/create-fitment.component';
import { FitmentService } from '../../services/fitment.service';
import { SimDetailComponent } from '../action-detail/sim-detail/sim-detail.component';
import { CustomerDetailComponent } from '../action-detail/customer-detail/customer-detail.component';
import { VehicleDetailComponent } from '../action-detail/vehicle-detail/vehicle-detail.component';
import { DeviceDetailComponent } from '../action-detail/device-detail/device-detail.component';
import { MoveComponent } from '../action-detail/move/move.component';
import { StatusComponent } from '../action-detail/status/status.component';
import { CertificateComponent } from '../action-detail/certificate/certificate.component';
import { MisDetailComponent } from '../action-detail/mis-detail/mis-detail.component';
import { MisDownloadComponent } from '../action-detail/mis-download/mis-download.component';
import { DownloadCertificateComponent } from '../action-detail/download-certificate/download-certificate.component';

@Component({
  selector: 'app-fitment-list',
  standalone: false,
  templateUrl: './fitment-list.component.html',
  styleUrl: './fitment-list.component.scss'
})
export class FitmentListComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  StatusDropdown = [
    {
      "value": 1,
      "text": "Active"
    },
    {
      "value": 0,
      "text": "Barred"
    },
  ];
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  }
  public columns!: any;
  bsModalRef!: BsModalRef;
  fitmentList: any
  userDetails: any
  dealerList: any;
  selectedDealer: any;
  selectedStatus: any;
  fitmentUrlPath:any[] = []
  selectedRowdata: any;
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private commonService: CommonService,
    private modalService: BsModalService,
    private fitmentService:FitmentService
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  ngOnInit() {
    this.setInitialValue()
    this.getDealerDropDown()
    this.selectedStatus = {"value": 1,"text": "Active"}
  }

  setInitialValue() {
    this.columns = [
      { key: 'S No.', title: 'S No.' },
      { key: 'AR Id', title: 'AR Id' },
      { key: 'Date', title: 'Date' },
      { key: 'Dealer', title: 'Dealer' },
      { key: 'Device', title: 'Device' },
      { key: 'SIM', title: 'SIM' },
      { key: 'Vehicle', title: 'Vehicle' },
      { key: 'Customer', title: 'Customer' },
      { key: 'Backend', title: 'Backend' },
      { key: 'RTO', title: 'RTO' },
      { key: 'Status', title: 'Status' },
      { key: 'Connected', title: 'Connected' },
      { key: 'Action', title: 'Action' },

    ]
  }

  getDealerDropDown() {
    let payload = {
      "roleId": Number(this.userDetails?.RoleId),
      "parentId": Number(this.userDetails?.Id),
    }
    this.commonService.dealerListdetail(payload).subscribe((res: any) => {
      if (res?.status == 200) {
        this.dealerList = res?.body?.result?.map((item: any) => ({
          value: item.empId,
          text: item.contactPersonName
        }));
        this.selectedDealer = this.dealerList[0]
        this.getFitmentList()
      }
    })
  }

  onSelectedStatus(event:any){
    this.selectedStatus = event?.value
    this.getFitmentList()
  }

  onSelectDealer(event: any) {
    if(event?.value?.value){
      this.selectedDealer = event?.value
      this.fitmentList = []
      this.getFitmentList()
    }
  }


  getFitmentList() {
    this.isLoading = true
    let payload = {
      "employeeId": Number(this.userDetails?.Id),
      "statusId": 0
    }
    this.fitmentService.activationList(payload).subscribe((res: any) => {
      this.isLoading = false
      if (res?.body?.isSuccess === true) {
        this.fitmentList = res?.body?.result
        this.pagesize.count = this.fitmentList?.length

      }
    })
  }

  getActionMenu(status: any) {
    this.selectedRowdata = status;
    if (status?.ar_status_model?.fk_status == 0) {
      this.fitmentUrlPath = [
        { name: 'Edit', path: 'edit', disabled: false },
        { name: 'Status', path: 'status', disabled: false },
        // { name: 'Move', path: 'move', disabled: false },
        // { name: 'MIS Details', path: 'mis-details', disabled: false },
        { name: 'MIS Download', path: 'mis-download', disabled: false },
        // { name: 'Delete', path: 'delete', disabled: false },
        // { name: 'Raw Data', path: 'raw-data', disabled: false },
        { name: 'Upload Certificate', path: 'upload-certificate', disabled: false },
        { name: 'Download Certificate', path: 'download-certificate', disabled: true },
      ];
    } else if(status?.ar_status_model?.fk_status == 1) {
      this.fitmentUrlPath = [
        { name: 'Edit', path: 'edit', disabled: true },
        { name: 'Status', path: 'status', disabled: true },
        // { name: 'Move', path: 'move', disabled: true },
        // { name: 'MIS Details', path: 'mis-details', disabled: false },
        { name: 'MIS Download', path: 'mis-download', disabled: false },
        // { name: 'Delete', path: 'delete', disabled: true },
        // { name: 'Raw Data', path: 'raw-data', disabled: false },
        { name: 'Upload Certificate', path: 'upload-certificate', disabled: true },
        { name: 'Download Certificate', path: 'download-certificate', disabled: false },
      ];
    }
  }

  getVehicleColor(status: string): string {
    switch (status) {
      case 'Pending':
        return 'status-0';
      case 'Approved':
        return 'status-1';
      case 'In Progress':
        return 'status-2';
      case 'Rejected':
        return 'status-3';
      default:
        return '';
    }
  }
  showDetail(data: any, type: any) {
    if (type == 'device') {
      this.deviceDetail(data)
    } else if (type == 'sim') {
      this.simdetail(data)
    } else if (type == 'vehicle') {
      this.vehicleDetail(data)
    }else if (type == 'customer') {
      this.customerdetail(data)
    }
  }

  deviceDetail(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        tittle: 'Device Details',
        button: 'Done',
        deviceValue: value
      },
    };
    this.bsModalRef = this.modalService.show(
      DeviceDetailComponent,
      Object.assign(initialState, {
        class: 'modal-lg  modal-dialog-centered alert-popup',
      })
    );
  }

  vehicleDetail(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        tittle: 'Vehicle Details',
        button: 'Done',
        vehicleValue: value
      },
    };
    this.bsModalRef = this.modalService.show(
      VehicleDetailComponent,
      Object.assign(initialState, {
        class: 'modal-lg  modal-dialog-centered alert-popup',
      })
    );
  }

  customerdetail(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        tittle: 'Customer Details',
        button: 'Done',
        customerValue: value
      },
    };
    this.bsModalRef = this.modalService.show(
      CustomerDetailComponent,
      Object.assign(initialState, {
        class: 'modal-lg  modal-dialog-centered alert-popup',
      })
    );
  }

  simdetail(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        tittle: 'Modify Sim Details',
        button: 'Modify',
        simValue: value
      },
    };
    this.bsModalRef = this.modalService.show(
      SimDetailComponent,
      Object.assign(initialState, {
        class: 'modal-lg  modal-dialog-centered alert-popup',
      })
    );

    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.getFitmentList()
    });
  }

  onAddFitment(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        dealerValue:this.selectedDealer,
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateFitmentComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getFitmentList()
    });
  }

  redirectTo(name: string, path: string): void {
    switch (name) {
      case 'edit':
        this.onAddFitment(this.selectedRowdata);
        break;
      case 'status':
        this.updateStatus(this.selectedRowdata);
        break;
      case 'move':
        this.updateMove(this.selectedRowdata);
        break;
      case 'mis-details':
        this.updateMisdetails(this.selectedRowdata);
        break;
      case 'mis-download':
        this.updateMisDownload(this.selectedRowdata);
        break;
      case 'upload-certificate':
        this.uploadCertificate(this.selectedRowdata);
        break;
      case 'download-certificate':
        this.downloadCertificate(this.selectedRowdata);
        break;
      default:
        console.warn('Unknown path:', path);
    }
  }


  updateStatus(data:any){
    const initialState: ModalOptions = {
      initialState: {
        tittle: `Update Status For : ${data?.vehicleNo}`,
        button: 'Modify',
        statusValue: data
      },
    };
    this.bsModalRef = this.modalService.show(
      StatusComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.getFitmentList()
    });
  }

  updateMove(data:any){
    const initialState: ModalOptions = {
      initialState: {
        tittle: `Move AR ( ${data?.arValue} ) To`,
        button: 'Modify',
        moveValue: data
      },
    };
    this.bsModalRef = this.modalService.show(
      MoveComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
  }

  uploadCertificate(data:any){
    const initialState: ModalOptions = {
      initialState: {
        tittle: `Upload Certificate for Vehicle : ${data?.vehicleNo}`,
        button: 'Upload',
        certificateValue: data
      },
    };
    this.bsModalRef = this.modalService.show(
      CertificateComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.getFitmentList()
    });
  }

  updateMisdetails(data:any){
    const initialState: ModalOptions = {
      initialState: {
        tittle: 'Mis Details',
        button: 'Modify',
        misValue: data
      },
    };
    this.bsModalRef = this.modalService.show(
      MisDetailComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.getFitmentList()
    });
  }

  updateMisDownload(data:any){
    const initialState: ModalOptions = {
      initialState: {
        tittle: 'Mis Details',
        button: 'Modify',
        misDownloadData: data
      },
    };
    this.bsModalRef = this.modalService.show(
      MisDownloadComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
  }

  downloadCertificate(data:any){
    const initialState: ModalOptions = {
      initialState: {
        tittle: `Download Certificate for Vehicle : ${data?.vehicleNo}`,
        button: 'Modify',
        certificateValue: data
      },
    };
    this.bsModalRef = this.modalService.show(
      DownloadCertificateComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.getFitmentList()
    });
  }



  onTablePageChange(event: number) {
    this.pagesize.offset = event;
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
  }
}
