import { Component } from '@angular/core';
import { AuthorityPlanService } from '../../services/authority-plan.service';
import { CreateAuthorityComponent } from '../../../authority-master/components/create-authority/create-authority.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { CreateAuthorityPlanComponent } from '../create-authority-plan/create-authority-plan.component';

@Component({
  selector: 'app-authority-plan-list',
  standalone: false,
  templateUrl: './authority-plan-list.component.html',
  styleUrl: './authority-plan-list.component.scss'
})
export class AuthorityPlanListComponent {
isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  }
  public columns!: any;
  bsModalRef!: BsModalRef;
  userDetails: any
  authorityList: any;
  selectedAuthority: any;
  authorityPlanList: any;
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private authorityPlanService: AuthorityPlanService,
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
      { key: 'Plan Name', title: 'Plan Name' },
      { key: 'Plan Validity (In Days)', title: 'Plan Validity (In Days)' },
      { key: 'Plan Price', title: 'Plan Price' },
      { key: 'Plan Description', title: 'Plan Description' },
      { key: 'Action', title: 'Action' },
    ]
  }

  getAuthorityList(){
    this.isLoading =true
    this.commonService.authorityList().subscribe((res:any)=> {
      this.isLoading =false
      if(res?.body?.isSuccess === true){
        this.authorityList =  res.body.result.map((item: any) => ({
          value: item.authority_Id,
          text: item.authority_Name
        }));        
        this.selectedAuthority = this.authorityList[0]
        this.getAuthorityPlanList()
      }      
    })
  }


  onSelectAuthority(event: any) {
    this.authorityPlanList = []
    this.selectedAuthority = event?.value
    this.getAuthorityPlanList()

  }

  getAuthorityPlanList() {
    this.authorityPlanList = []
    this.isLoading = true
    let payload = {
      "fk_authority_Id": Number(this.selectedAuthority?.value)
    }

    this.authorityPlanService.authorityPlanList(payload).subscribe((res: any) => {
      this.isLoading = false
      if (res?.body?.isSuccess == true) {
        this.authorityPlanList = res?.body?.result
        this.pagesize.count = this.authorityPlanList?.length

      }
    })
  }


  onAddAuthorityPlan(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        planData: this.selectedAuthority,
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateAuthorityPlanComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getAuthorityPlanList()
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
