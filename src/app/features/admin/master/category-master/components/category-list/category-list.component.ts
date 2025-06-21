import { Component } from '@angular/core';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { CategoryService } from '../../services/category.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';

@Component({
  selector: 'app-category-list',
  standalone: false,
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  public columns!: any;
  bsModalRef!: BsModalRef;
  userDetails: any
  categoryList: any;
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private categoryService: CategoryService,
    private commonService: CommonService,
    private modalService: BsModalService
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  ngOnInit() {
    this.setInitialValue()
    this.getCategoryList()
  }

  setInitialValue() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'Device category Name', title: 'Device category Name' },
      { key: 'Action', title: 'Action' },
    
    ]
  }

  getCategoryList(){
    this.isLoading =true
    this.categoryService.categoryList().subscribe((res:any)=> {
      this.isLoading =false
      if(res?.body?.isSuccess == true){
        this.categoryList = res?.body?.result
        this.pagesize.count = this.categoryList?.length
      }      
    })
  }

  onAddCategory(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateCategoryComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getCategoryList()
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
