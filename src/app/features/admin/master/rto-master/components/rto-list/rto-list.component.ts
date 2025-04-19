import { Component } from '@angular/core';
import { RtoService } from '../../services/rto.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { CreateRtoComponent } from '../create-rto/create-rto.component';

@Component({
  selector: 'app-rto-list',
  standalone: false,
  templateUrl: './rto-list.component.html',
  styleUrl: './rto-list.component.scss'
})
export class RtoListComponent {
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
  rtoListData: any;
  selectedState: any;
  stateData: any;
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private rtoService: RtoService,
    private commonService: CommonService,
    private modalService: BsModalService
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  ngOnInit() {
    this.setInitialValue()
    this.getStateDropdown()
  }

  setInitialValue() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'Code', title: 'Code' },
      { key: 'Name', title: 'Name' },
      { key: 'State', title: 'State' },
      { key: 'Action', title: 'Action' }
    ]
  }

  getStateDropdown() {
    this.commonService.stateDropdownList().subscribe((res: any) => {
      if (res?.body?.isSuccess == true) {
        this.stateData = res.body.result.map((item: any) => ({
          value: item.stateId,
          text: item.stateName
        }));
        this.selectedState = this.stateData[0]
        this.getRtoList()
      }
    })
  }

  onSelectState(event: any) {
    this.rtoListData = []
    this.selectedState = event?.value
    this.getRtoList()

  }


  getRtoList() {
    this.rtoListData = []
    this.isLoading = true
    let payload = {
      "pk_StateId": Number(this.selectedState?.value)
    }
    this.rtoService.rtoListdetail(payload).subscribe((res: any) => {
      this.isLoading = false
      if (res?.body?.isSuccess == true) {
        this.rtoListData = res?.body?.result
        this.pagesize.count = this.rtoListData?.length
      }
    })
  }

  onAddRto(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        stateData: this.selectedState,
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateRtoComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getRtoList()
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
