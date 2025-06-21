import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DealerService } from '../../../../../dealer/dealer-manage/services/dealer.service';
import { NotificationService } from '../../../../../../shared/services/notification.service';

@Component({
  selector: 'app-move',
  standalone: false,
  templateUrl: './move.component.html',
  styleUrl: './move.component.scss'
})
export class MoveComponent {
  @Output() mapdata = new EventEmitter()
  moveValue: any
  moveForm!: FormGroup
  tittle: any
  button: any
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  };
  manufactureData: any;
  productList: any;
  dealerList: any;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private dealerService: DealerService,
    private NotificationService: NotificationService,

  ) { }

  ngOnInit() {
    console.log("this.moveValue",this.moveValue);
    
    this.setInitialForm()
    this.getDealerDropDown()
  }

  /*For Form Control*/
  setInitialForm() {
    if (this.moveValue) {
      this.moveForm = this.fb.group({
        dealer: ['', [Validators.required]],
      })
    }
  }

  getDealerDropDown() {
    let payload = {
      "roleId": Number(localStorage.getItem('role_id')),
      "parentId": Number(localStorage.getItem('parentId')),
    }
    this.dealerService.dealerListdetail(payload).subscribe((res: any) => {
      if (res?.status == 200) {
        this.dealerList = res?.body?.result?.map((item: any) => ({
          value: item.empId,
          text: item.contactPersonName
        }));
        if (this.moveValue?.pk_product_id) {
          const matchedDealer = this.productList.find(
            (data: any) => data.value == this.moveValue.pk_product_id
          );
          if (matchedDealer) {
            this.moveForm.patchValue({ dealer: matchedDealer });
          }
        }
      }
    })
  }

  /* for Hide Modal */
  cancel() {
    this.modalService.hide()
  }
}
