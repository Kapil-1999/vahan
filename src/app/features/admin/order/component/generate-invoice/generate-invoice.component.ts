import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { VahanDeviceDropdownComponent } from '../vahan-device-dropdown/vahan-device-dropdown.component';

@Component({
  selector: 'app-generate-invoice',
  standalone: false,
  templateUrl: './generate-invoice.component.html',
  styleUrl: './generate-invoice.component.scss'
})
export class GenerateInvoiceComponent {
  columns: any;
  requestId: any;
  createdBy: any;
  requestOrderDetails: any;
  orderForm!: FormGroup
  shippingList: any;
  config = {
    displayKey: "orgName",
    height: '200px',
    search: true
  };
  taxSlabData: any;
  bsModalRef! :BsModalRef

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private fb: FormBuilder,
    private modalService: BsModalService,
  ) {
    this.route.params.subscribe(params => {
      this.requestId = params['id'];
      this.createdBy = params['createdBy'];
      this.getRequestDetails();
    });
  }

  ngOnInit() {
    this.setInitalform();
    this.setInitialTable();
  }

  setInitalform() {
    // Initialize form with formatted values
    this.orderForm = this.fb.group({
      billingAddress: [''],
      shippingAddress: [''],
      billingDate: [''],
      createdDate: [''],
      hsn: ['0'],
      reqQty: ['0'],
      saleQty: ['0'],
      rate: ['0.00'],
      amt: ['0.00'],
      discount: ['0.00'],
      disAmount: ['0.00'],
      totalAmount: ['0.00']
    });
  
    const fieldsToFormat = ['amt', 'rate', 'totalAmount', 'discount', 'disAmount'];
  
    fieldsToFormat.forEach(field => {
      const control = this.orderForm.get(field);
      control?.setValue(parseFloat('0').toFixed(2));

      control?.valueChanges.subscribe(value => {
        if (value !== null && value !== undefined) {
          const numValue = parseFloat(value);
          if (!isNaN(numValue)) {
            const formatted = numValue.toFixed(2);
            if (value !== formatted) {
              control.setValue(formatted, { emitEvent: false });
            }
          } else {
            control.setValue('0.00', { emitEvent: false });
          }
        }
      });
    });
  
    this.orderForm.get('hsn')?.disable();
    this.orderForm.get('reqQty')?.disable();
    this.orderForm.get('saleQty')?.disable();
    this.orderForm.get('amt')?.disable();
    this.orderForm.get('totalAmount')?.disable();
  }
  

  setInitialTable() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'Item Name', title: 'Item Name' },
      { key: 'HSN', title: 'HSN' },
      { key: 'Request Qty', title: 'Request Qty' },
      { key: 'Sale Qty', title: 'Sale Qty', hasButton: true },
      { key: 'Rate', title: 'Rate' },
      { key: 'Amount(₹)', title: 'Amount(₹)' },
      { key: 'Discount(%)', title: 'Discount(%)' },
      { key: 'Dis Amount(₹)', title: 'Dis Amount(₹)' },
      { key: 'Total Amount(₹)', title: 'Total Amount(₹)' },
    ]
  }

  getRequestDetails() {
    let payload = {
      "pk_request_id": this.requestId,
      "created_by": this.createdBy
    }
    this.orderService.requestById(payload).subscribe((res: any) => {
      this.requestOrderDetails = res?.body?.result || [];
      this.getShippingAddress();
      const formatDate = (date: any) => {
        if (!date) return '';
        if (date instanceof Date) {
          return date.toISOString().split('T')[0];
        }
        if (typeof date === 'string') {
          return date.split('T')[0];
        }
        return '';
      };

      if (this.requestOrderDetails?.length > 0) {
        this.orderForm.patchValue({
          billingAddress: this.requestOrderDetails[0]?.party_name,
          billingDate: formatDate(this.requestOrderDetails[0]?.created_date),
          hsn: this.requestOrderDetails[0]?.hsN_CODE,
          reqQty: this.requestOrderDetails[0]?.request_qty,
          amount: this.requestOrderDetails[0]?.amount,
        });
      }
    });
  }

  getShippingAddress() {
    let payload = {
      "empId": this.requestOrderDetails[0]?.created_by
    }
    this.orderService.shippingAdderss(payload).subscribe((res: any) => {
      this.shippingList = res?.body?.result || [];
    });
  }

  onChangeShippingAddress(event: any) {
    this.getTaxSlab();
  }

  getTaxSlab() {
    let payload = {
      "shipingId": this.orderForm.value.shippingAddress?.shipingId,
      "pk_request_id": this.requestOrderDetails[0]?.pk_request_id,
      "created_by": this.requestOrderDetails[0]?.created_by
    }
    this.orderService.interIntraStatus(payload).subscribe((res: any) => {
      this.taxSlabData = res?.body?.result || [];
    });
  }

  onQtyButtonClick() {
    const initialState: ModalOptions = {
      initialState: {
        editData: this.requestOrderDetails[0]?.pk_request_id,
      },
    };
    this.bsModalRef = this.modalService.show(
      VahanDeviceDropdownComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {

    });
  }

  
}
