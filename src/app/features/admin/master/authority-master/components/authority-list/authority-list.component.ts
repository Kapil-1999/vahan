import { Component } from '@angular/core';
import { CreateAuthorityComponent } from '../create-authority/create-authority.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { SalesManagerService } from '../../../../sales-manager/sales-manager-manage/services/sales-manager.service';
import { AuthorityService } from '../../services/authority.service';

@Component({
  selector: 'app-authority-list',
  standalone: false,
  templateUrl: './authority-list.component.html',
  styleUrl: './authority-list.component.scss'
})
export class AuthorityListComponent {
 isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  authorityList: any
  public columns!: any;
  bsModalRef!: BsModalRef;
  userDetails: any
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private authorityService: AuthorityService,
    private commonService: CommonService,
    private modalService: BsModalService
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  ngOnInit() {
    this.setInitialValue()
    this.getAuthorityList()
  }

  setInitialValue() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'Authority Name', title: 'Authority Name' },
      { key: 'State Name', title: 'State Name' },
      { key: 'City Name', title: 'City Name' },
      { key: 'Action', title: 'Action' }
    ]
  }

  getAuthorityList(){
    this.isLoading =true
    this.authorityService.authorityList().subscribe((res:any)=> {
      this.isLoading =false
      if(res?.body?.isSuccess == true){
        this.authorityList = res?.body?.result || []
        this.pagesize.count = this.authorityList?.length

      }      
    })
  }

  onAddAuthority(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateAuthorityComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getAuthorityList()
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
