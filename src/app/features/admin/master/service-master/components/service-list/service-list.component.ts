import { Component } from '@angular/core';
import { ServiceMasterService } from '../../services/service-master.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { CreateComplainComponent } from '../../../complain-master/components/create-complain/create-complain.component';
import { CreateServiceComponent } from '../create-service/create-service.component';

@Component({
  selector: 'app-service-list',
  standalone: false,
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss'
})
export class ServiceListComponent {
isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  public columns!: any;
  bsModalRef!: BsModalRef;
  userDetails: any
  serviceList: any;
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private serviceMasterService: ServiceMasterService,
    private commonService: CommonService,
    private modalService: BsModalService
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  ngOnInit() {
    this.setInitialValue()
    this.getServiceList()
  }

  setInitialValue() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'Service Name', title: 'Service Name' },
      { key: 'Description', title: 'Description' },
      { key: 'Action', title: 'Action' }
    
    ]
  }

getServiceList(){
    this.isLoading =true
    this.serviceMasterService.serviceList().subscribe((res:any)=> {
      this.isLoading =false
      if(res?.body?.isSuccess == true){
        this.serviceList = res?.body?.result
        this.pagesize.count = this.serviceList?.length
      }      
    })
  }

  onAddService(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateServiceComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getServiceList()
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
