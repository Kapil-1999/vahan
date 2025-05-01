import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { OrderHistoryDetailsComponent } from '../order-history-details/order-history-details.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-history',
  standalone: false,
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent {
  orderHistoryData: any;
  requestId: any;
  createdBy: any;
  columns: any;
  isLoading : boolean = false;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
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
      { key: 'Details', title: 'Details' },      

    ]
  }

  getOrderHistoryData() {
    this.isLoading = true;
    let payload = {
      "pk_request_id": Number(this.requestId),
      "created_by": Number(this.createdBy)
    }
    this.orderService.orderHistory(payload).subscribe((res: any) => {    
      this.isLoading = false;  
      this.orderHistoryData = res.body?.result || [];
    });
  }

  bsModalRef!: BsModalRef
  onShowDetails(value:any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value
      },
    };
    this.bsModalRef = this.modalService.show(
      OrderHistoryDetailsComponent,
      Object.assign(initialState, {
        class: 'modal-xl modal-dialog-centered alert-popup',
      })
    );
  }

  goBack() {
    this.location.back();
  }
}
