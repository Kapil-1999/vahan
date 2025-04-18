import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DealerService } from '../../services/dealer.service';
import { CommonService } from '../../../../../shared/services/common.service';
import { CreateDealerComponent } from '../create-dealer/create-dealer.component';

@Component({
  selector: 'app-dealer-list',
  standalone: false,
  templateUrl: './dealer-list.component.html',
  styleUrl: './dealer-list.component.scss'
})
export class DealerListComponent {
 isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  dealerlist: any
  public columns!: any;
  bsModalRef!: BsModalRef;
  userDetails: any
  distributerDropdown: any;
  selectedDestributer: any;
  config = {
    displayKey: "text",
    height: '200px',
    search: true,
    placeholder:'Without Distributer'
  }
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private dealerService: DealerService,
    private commonService: CommonService,
    private modalService: BsModalService
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  ngOnInit() {
    this.setInitialValue()
    this.getDistributerDropDown()
  }

  setInitialValue() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'Organization Name', title: 'Organization Name' },
      { key: 'Contact Person', title: 'Contact Person' },
      { key: 'Email', title: 'Email' },
      { key: 'Mobile', title: 'Mobile' },
      { key: 'GST', title: 'GST' },
      { key: 'PAN', title: 'PAN' },
      { key: 'Action', title: 'Action' }
    ]
  }

  getDistributerDropDown() {
    this.isLoading = true
    let payload = {
      "distributorId": Number(this.userDetails?.Id)
    }
    this.commonService.distributerDropdown(payload).subscribe((res: any) => {
      this.isLoading = false
      if (res?.status == 200) {
        this.distributerDropdown = res?.body        
        this.selectedDestributer = this.distributerDropdown[0]
        this.getDealerList()
      }
    })
  }
  onSelectDistributer(event: any) {
    this.selectedDestributer = event?.value
    this.getDealerList()
  }

  getDealerList() {
    let parentId = this.selectedDestributer && Number(this.selectedDestributer?.value)
    ? Number(this.selectedDestributer?.value) : this.userDetails?.Id ? Number(this.userDetails?.Id) : null;

    this.isLoading = true;
    let payload = {
      "roleId": Number(this.userDetails?.RoleId),
      "parentId": parentId
    }
    this.dealerService.dealerListdetail(payload).subscribe((res: any) => {
      this.isLoading = false
      if (res?.body?.isSuccess == true) {
        this.dealerlist = res?.body?.result || []
        console.log("this.dealerlist",this.dealerlist);
        
        this.pagesize.count = this.dealerlist?.length

      }
    })
  }

    onAddDealer(value:any) {
      let parentId = this.selectedDestributer && Number(this.selectedDestributer?.value)
      ? Number(this.selectedDestributer?.value) : this.userDetails?.Id ? Number(this.userDetails?.Id) : null;
  
      const initialState: ModalOptions = {
        initialState: {
          editData: value ? value : '',
          selectedId:parentId
        },
      };
      this.bsModalRef = this.modalService.show(
        CreateDealerComponent,
        Object.assign(initialState, {
          class: 'modal-lg modal-dialog-centered alert-popup',
        })
      );
      this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
        this.pagesize.offset = 1;
        this.pagesize.limit = 25;
        this.getDealerList()
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
