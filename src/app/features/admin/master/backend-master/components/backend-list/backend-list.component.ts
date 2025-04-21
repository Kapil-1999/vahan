import { Component } from '@angular/core';
import { CreateBackendComponent } from '../create-backend/create-backend.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-backend-list',
  standalone: false,
  templateUrl: './backend-list.component.html',
  styleUrl: './backend-list.component.scss'
})
export class BackendListComponent {
 isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  public columns!: any;
  bsModalRef!: BsModalRef;
  userDetails: any
  backendListData: any;
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private backendService: BackendService,
    private commonService: CommonService,
    private modalService: BsModalService
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  ngOnInit() {
    this.setInitialValue()
    this.getBackendList()
  }

  setInitialValue() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'Name', title: 'Name' },
      { key: 'Action', title: 'Action' },
    
    ]
  }

  getBackendList(){
    this.isLoading =true
    this.backendService.backendList().subscribe((res:any)=> {
      this.isLoading =false
      if(res?.body?.isSuccess == true){
        this.backendListData = res?.body?.result
        this.pagesize.count = this.backendListData?.length

      }      
    })
  }

  onAddBackend(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateBackendComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getBackendList()
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
