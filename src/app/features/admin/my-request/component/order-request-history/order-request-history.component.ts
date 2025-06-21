import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrderService } from '../../../order/services/order.service';
import { Location } from '@angular/common';
import { MyRequestService } from '../../services/my-request.service';

@Component({
  selector: 'app-order-request-history',
  standalone: false,
  templateUrl: './order-request-history.component.html',
  styleUrl: './order-request-history.component.scss'
})
export class OrderRequestHistoryComponent {
  orderRequestHistoryData: any;
  requestId: any;
  createdBy: any;
  columns: any;
  isLoading : boolean = false;

  constructor(
    private route: ActivatedRoute,
    private myRequestService: MyRequestService,
    private modalService : BsModalService,
    private location : Location
  ) {
    this.route.params.subscribe(params => {
      this.requestId = params['id'];
      this.createdBy = params['createdBy'];
      this.getOrderHistoryData();
    });
  }
  ngOnInit() {
    this.setInitialTable();
  }

  setInitialTable() {
    this.columns = [
      { key: 'Dispatched On', title: 'Dispatched On' },
      { key: 'Dispatched By', title: 'Dispatched By' },
      { key: 'Device', title: 'Device' },
      { key: 'Quantity', title: 'Quantity' },
      // { key: 'Details', title: 'Details' },      

    ]
  }

  getOrderHistoryData() {
    this.isLoading = true;
    let payload = {
      "pk_request_id": Number(this.requestId),
      "created_by": Number(this.createdBy)
    }
    this.myRequestService.orderRequestHistory(payload).subscribe((res: any) => {    
      this.isLoading = false;  
      this.orderRequestHistoryData = res.body?.result || [];
    });
  }

  bsModalRef!: BsModalRef
  // onShowDetails(value:any) {
  //   const initialState: ModalOptions = {
  //     initialState: {
  //       editData: value
  //     },
  //   };
  //   this.bsModalRef = this.modalService.show(
  //     OrderHistoryDetailsComponent,
  //     Object.assign(initialState, {
  //       class: 'modal-xl modal-dialog-centered alert-popup',
  //     })
  //   );
  // }

  goBack() {
    this.location.back();
  }
}
