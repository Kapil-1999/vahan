import { Component } from '@angular/core';
import { CreateSubCategoryComponent } from '../create-sub-category/create-sub-category.component';
import { SubCategoryService } from '../../services/sub-category.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';

@Component({
  selector: 'app-sub-category-list',
  standalone: false,
  templateUrl: './sub-category-list.component.html',
  styleUrl: './sub-category-list.component.scss'
})
export class SubCategoryListComponent {
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
  categoryList: any;
  selectedCategory: any;
  subCategoryList: any;

  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private subCategoryService: SubCategoryService,
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
      { key: 'Device Category', title: 'Device Category' },
      { key: 'Device Sub Category', title: 'Device Sub Category' },
      { key: 'HSN Name', title: 'HSN Name' },
      { key: 'HSN Code', title: 'HSN Code' },
      { key: 'CGST', title: 'CGST' },
      { key: 'SGST', title: 'SGST' },
      { key: 'IGST', title: 'IGST' },
      { key: 'Rate', title: 'Rate' },
      { key: 'Action', title: 'Action' },
    ]
  }

  getCategoryList(){
    this.isLoading =true
    this.commonService.categoryList().subscribe((res:any)=> {
      this.isLoading =false
      if(res?.body?.isSuccess === true){
        this.categoryList =  res.body.result.map((item: any) => ({
          value: item.pk_device_category_id,
          text: item.device_category_name
        }));        
        this.selectedCategory = this.categoryList[0]
        this.getSubCategoryList()
      }      
    })
  }


  onSelectCategory(event: any) {
    this.selectedCategory = event?.value
    this.getSubCategoryList()

  }

  getSubCategoryList() {
    this.subCategoryList = []
    this.isLoading = true
    let payload = {
      "fk_device_category_id": Number(this.selectedCategory?.value)
    }
    this.subCategoryService.subCategoryList(payload).subscribe((res: any) => {
      this.isLoading = false
      if (res?.body?.isSuccess == true) {
        this.subCategoryList = res?.body?.result || []
        this.pagesize.count = this.subCategoryList?.length
      }
    })
  }



  onAddSubCategory(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        categoryData: this.selectedCategory,
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateSubCategoryComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getSubCategoryList()
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
