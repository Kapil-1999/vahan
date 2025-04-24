import { Component } from '@angular/core';
import { SupportService } from '../../services/support.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { CreateCityComponent } from '../../../../master/city-master/components/create-city/create-city.component';
import { CreateSupportComponent } from '../create-support/create-support.component';

@Component({
  selector: 'app-support-list',
  standalone: false,
  templateUrl: './support-list.component.html',
  styleUrl: './support-list.component.scss'
})
export class SupportListComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  }
  public columns!: any;
  bsModalRef!: BsModalRef;
  userDetails: any
  supportMemberList: any;
  selectedHead: any;
  headList: any;
  button:any = 'Head'
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private supportService: SupportService,
    private commonService: CommonService,
    private modalService: BsModalService
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  ngOnInit() {
    this.setInitialValue()
    this.getSupportList()
    this.getHeadDropdown()
  }

  setInitialValue() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'Employee Type', title: 'Employee Type' },
      { key: 'Employee Name', title: 'Employee Name' },
      { key: 'Email', title: 'Email' },
      { key: 'Mobile', title: 'Mobile' },
      { key: 'Action', title: 'Action' }

    ]
  }

  getHeadDropdown() {
    let payload = {
      "loginId": Number(this.userDetails?.Id)
    }
    this.commonService.headtList(payload).subscribe((res: any) => {
      if (res?.body?.isSuccess == true) {
        this.headList = res.body.result.map((item: any) => ({
          value: item.empId,
          text: item.contactPersonName
        }));
        // this.selectedHead = this.headList[0]
        // this.getSupportList()
      }
    })
  }

  onSelectHead(event: any) {
    this.supportMemberList = []
    this.selectedHead = event?.value
    this.button = this.selectedHead.length == 0 ? 'Head' : 'Member';
    this.getSupportList()
  }



  getSupportList() {
    this.supportMemberList = []
    this.isLoading = true
    let payload = {
      "supportHeadId": this.selectedHead?.value ? Number(this.selectedHead?.value) : 0,
      "loginId": Number(this.userDetails?.Id)
    }
    this.supportService.supportList(payload).subscribe((res: any) => {
      this.isLoading = false
      if (res?.body?.isSuccess == true) {
        this.supportMemberList = res?.body?.result
        this.pagesize.count = this.supportMemberList?.length

      }
    })
  }

  onAddSupport(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        headdata: this.selectedHead,
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateSupportComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getSupportList()
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
