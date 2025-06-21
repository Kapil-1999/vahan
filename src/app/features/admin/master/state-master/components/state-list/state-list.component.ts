import { Component } from '@angular/core';
import { StateService } from '../../services/state.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { CreateStateComponent } from '../create-state/create-state.component';

@Component({
  selector: 'app-state-list',
  standalone: false,
  templateUrl: './state-list.component.html',
  styleUrl: './state-list.component.scss'
})
export class StateListComponent {
 isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  public columns!: any;
  bsModalRef!: BsModalRef;
  userDetails: any
  stateListData: any;
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private stateService: StateService,
    private commonService: CommonService,
    private modalService: BsModalService
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  ngOnInit() {
    this.setInitialValue()
    this.getStateList()
  }

  setInitialValue() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'Name', title: 'Name' },
      { key: 'Action', title: 'Action' },
    
    ]
  }

  getStateList(){
    this.isLoading =true
    this.stateService.stateList().subscribe((res:any)=> {
      this.isLoading =false
      if(res?.body?.isSuccess == true){
        this.stateListData = res?.body?.result
        this.pagesize.count = this.stateListData?.length
      }      
    })
  }

  onAddState(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateStateComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getStateList()
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
