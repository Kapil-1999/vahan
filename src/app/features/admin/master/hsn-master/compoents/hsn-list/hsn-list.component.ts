import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { HsnService } from '../../services/hsn.service';
import { CommonService } from '../../../../../shared/services/common.service';
import { CreateHsnComponent } from '../create-hsn/create-hsn.component';

@Component({
  selector: 'app-hsn-list',
  standalone: false,
  templateUrl: './hsn-list.component.html',
  styleUrl: './hsn-list.component.scss'
})
export class HsnListComponent {
 isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  hsnList: any
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
    private hsnService: HsnService,
    private commonService: CommonService,
    private modalService: BsModalService
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  ngOnInit() {
    this.setInitialValue()
    this.getHsnList()
  }

  setInitialValue() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'HSN Name', title: 'HSN Name' },
      { key: 'Hsn Code', title: 'Hsn Code' },
      { key: 'CGST', title: 'CGST' },
      { key: 'sGST', title: 'SGST' },
      { key: 'IGST', title: 'IGST' },
      { key: 'Date', title: 'Date' },
      { key: 'Action', title: 'Action' }
    ]
  }

  getHsnList(){
    this.isLoading =true
    this.hsnService.hsnList().subscribe((res:any)=> {
      this.isLoading =false
      if(res?.body?.isSuccess == true){
        this.hsnList = res?.body?.result || []
        this.pagesize.count = this.hsnList?.length

      }      
    })
  }

  onAddHsn(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateHsnComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getHsnList()
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
