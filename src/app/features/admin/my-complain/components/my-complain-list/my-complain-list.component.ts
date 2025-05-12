import { Component } from '@angular/core';
import { MycomplainService } from '../../services/mycomplain.service';
import { CommonService } from '../../../../shared/services/common.service';
import { GenerateComplainComponent } from '../generate-complain/generate-complain.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AssignComplainComponent } from '../assign-complain/assign-complain.component';

@Component({
  selector: 'app-my-complain-list',
  standalone: false,
  templateUrl: './my-complain-list.component.html',
  styleUrl: './my-complain-list.component.scss'
})
export class MyComplainListComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  myComplainData: any;
  userDetails: any;
  label: string = 'Pending';
  statusType: any = 1;
  bsModalRef!: BsModalRef
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  };
  columns: any;

  constructor(
    private commonService: CommonService,
    private myComplainService: MycomplainService,
    private modalService: BsModalService,
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res;
    })
  };

  ngOnInit() {
    this.setInialTable();
    this.getMyComplainData();
  }

  setInialTable() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'Complain Status', title: 'Complain Status' },
      { key: 'Created On', title: 'Created On' },
      { key: 'Created By', title: 'Created By' },
      { key: 'Category Name', title: 'Category Name' },
      { key: "Refrence Name", title: "Refrence Name" },
      { key: "Refrence Value", title: "Refrence Value" },
      { key: "Priority", title: "Priority" },
      { key: 'Last Update Date', title: 'Updated Date' },
      { key: 'Remark', title: 'Remark' },
      {key : 'Action', title : 'Action'},
    ]
  }

  getMyComplainData() {
    this.isLoading = true;
    let payload = {
      "request_by": Number(this.userDetails.Id),
      "status_id": this.statusType
    }
    this.myComplainService.myComplainData(payload).subscribe((res: any) => {
      this.isLoading = false;
      this.myComplainData = res?.body?.result || {};
      this.pagesize.count = res?.body?.result?.complaintList?.length || 0;
    })
  }

  calculatePercentage(value: number): number {
    if (!value) return 0;
    const total = this.myComplainData?.pending + this.myComplainData?.processing +
      this.myComplainData?.dispatched + this.myComplainData?.rejected;
    return Math.round((value / total) * 100);
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
  }

  onShowOrder(label: any, statusType: any) {
    this.label = label;
    this.statusType = statusType;
    this.myComplainData = {
      serviceList: [],
      pending: 0,
      processing: 0,
      dispatched: 0,
      rejected: 0
    };
    this.pagesize = {
      limit: 25,
      offset: 1,
      count: 0
    };
    this.getMyComplainData();
  }

  onComplainGenerate(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      GenerateComplainComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getMyComplainData()
    });
  }

  assignComplain(value: any){
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      AssignComplainComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getMyComplainData()
    });
  }
}
