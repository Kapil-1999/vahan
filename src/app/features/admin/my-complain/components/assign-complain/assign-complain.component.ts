import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../shared/services/common.service';
import { SubCategoryService } from '../../../master/sub-category-master/services/sub-category.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { MycomplainService } from './../../services/mycomplain.service';

@Component({
  selector: 'app-assign-complain',
  standalone: false,
  templateUrl: './assign-complain.component.html',
  styleUrl: './assign-complain.component.scss'
})
export class AssignComplainComponent {
  @Output() mapdata = new EventEmitter()
  assignComplainForm!: FormGroup;
  userDetails: any;
  editData: any
  employeeList: any
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  }
  supportTeamList: any;
  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private NotificationService: NotificationService,
    private commonService: CommonService,
    private myComplainService: MycomplainService,

  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res
    });
  };

  ngOnInit() {    
    console.log('editData',this.editData);
    
    this.setInitialForm();
    this.getSupportTeamList()
  }

  setInitialForm() {
    this.assignComplainForm = this.fb.group({
      empName: [null, [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  getSupportTeamList(){
    let payload = {
      "login_id": Number(this.userDetails.Id)
    }
    this.myComplainService.supportTeamList(payload).subscribe((res:any) =>{      
      this.supportTeamList = res?.body?.result.map((item: any) => ({
        value: item.emp_id,
        text: item.emp_name
      }));
      
    })
  }


  submit(formValue: any) {
    if (this.assignComplainForm.invalid) {
      this.assignComplainForm.markAllAsTouched();
      return;
    }
    let payload = {
      "pk_complaint_id": Number(this.editData?.pk_complaint_id),
      "fk_assign_emp_id": Number(formValue?.empName?.value),
      "action_description": formValue?.description,
      "log_by": Number(this.userDetails.Id),
    }
    this.myComplainService.assignComplain(payload).subscribe((res: any) => {
      if (res?.body?.statusCode == 200) {
        this.bsModalService.hide();
        this.mapdata.emit();
        this.NotificationService.successAlert(res?.body?.actionResponse);
      } else {
        this.NotificationService.errorAlert(res?.body?.actionResponse);
      }
    })
  }

  cancel() {
    this.bsModalService.hide();
  }
}
