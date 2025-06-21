import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  /**
   * show success toastr
   * @param message 
   */
  showSuccess(message: string) {
    this.toastr.success(message);
  }

  /**
   * show eroor toastr
   * @param message 
   */
  showError(message: string) {
    this.toastr.error(message);
  }


  /**
   * show information toastr
   * @param message 
   */
  showInfo(message: string) {
    this.toastr.info(message);
  }


  /**
   * show warning tastr
   * @param message 
   */
  showWarning(message: string) {
    this.toastr.warning(message);
  }

  successAlert(message:any){
    Swal.fire({
      position: "center",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 3000
    });
  }

  copyAlert(message:any){
    Swal.fire({
      position: "center",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 1000
    });
  }

  errorAlert(message: any): void {
    Swal.fire({
      position: "center",
      icon: "error", 
      title: message,
      showConfirmButton: false,
      timer: 3000
    });

    
}

confirmAction(title: string, text: string): Promise<any> {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });

  return swalWithBootstrapButtons.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true,
  });
}

showSuccessAlert(title: string, text: string): void {
  Swal.fire({
    icon: 'success',
    title: title,
    showConfirmButton: false,
    text: text,
    timer: 2000
  });
}

// SweetAlert for error
showErrorAlert(title: string, text: string): void {
  Swal.fire({
    icon: 'error',
    showConfirmButton: false,
    title: title,
    text: text,
    timer: 2000
  });
}
}
