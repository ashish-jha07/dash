// import { Component, OnInit } from '@angular/core';
import { Component, Inject ,OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogService } from './confirm-dialog.service'  

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  message: any;  
  constructor(  
    private confirmDialogService: ConfirmDialogService  
) { }  

ngOnInit() {  
    //this function waits for a message from alert service, it gets   
    //triggered when we call this from any other component  
    this.confirmDialogService.getMessage().subscribe(message => {  
        this.message = message;  
        console.log(JSON.stringify(this.message) + 'confirm dialog message')
    });  
}  
  // constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,@Inject(MAT_DIALOG_DATA) public message: string) { }
  
  
  
  //   onNoClick(): void {
  //   this.dialogRef.close();
  // }

}
