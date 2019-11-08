import { Component, OnInit } from '@angular/core';
import {TableServiceService} from '../table-service.service';
import { MatDialog } from '@angular/material';
import {Router} from '@angular/router'
import { ToastrService } from 'ngx-toastr';

import { ConfirmationDialogComponent } from '../../../../theme/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmDialogService } from './../../../../theme/shared/components/confirmation-dialog/confirm-dialog.service'
import { LoaderService} from '../../../../theme/shared/components/loader.service'
@Component({
  selector: 'app-tbl-bootstrap',
  templateUrl: './tbl-bootstrap.component.html',
  styleUrls: ['./tbl-bootstrap.component.scss']
})
export class TblBootstrapComponent implements OnInit {
  // title = 'angular-confirmation-dialog';
  user_id : any;
  users : any ;
  title : 'angular-loader';
  postsPerPage = 2;
  size : any ;
  searchText;
  // name: String;
  constructor(private toastr: ToastrService,private loaderService : LoaderService,private router: Router, private tableServiceService: TableServiceService,public dialog: MatDialog , private confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
    this.getUserData(this.postsPerPage);


  }
 
  Search(value){
    console.log(value)
    this.tableServiceService.serchData(value).subscribe( data=> console.log(data));
  }

  deleteUser(userId){
    // console.log(userId)
    this.tableServiceService.delteUsers(userId).subscribe((data) => {       this.getUserData(this.postsPerPage);console.log(data)});
    // this.tableServiceService.getData().subscribe(data => { this.users = data, console.log(data)});

  }
  // [routerLink]="['/tables/reset', user._id]z"
  getUserData(id){
    console.log(id);
    console.log("geting user data")
    this.tableServiceService.getData(id).subscribe( (data:any)  =>  
      { if(data){ 
        this.users = data.data ;
        this.size = data.totalPages;
        // for(  let i =1 ; i<=this.size; i++ ){
        //   this.size.push(i);
        // }
        
        console.log(this.users);
        // console.log(data.totalPages);
      }

      }
      
      );
  }
  arrayOne(n: number): any[] {
    return Array(this.size);
  }

  pagesize(id){
    console.log(id);
    this.getUserData(id);
  }

  showDialog(id) {  
    console.log('showdialog call' + id)
    this.confirmDialogService.confirmThis("Are you sure to delete?", ()=> {
      this.deleteUser(id)
      this.showToaster('User Deleted', true);

      // alert("user data deleted");  
    }, function () {  
      // alert("No user delted");  
    })  
  }  
  

  editUser(id){
    console.log('/tables/reset/'+id)
    // this.loaderService.show();
  this.router.navigate(['/User/reset/'+id])
  }


  // openDialog(id): void {
  //   this.user_id = id;
  //   console.log('open dialog call')
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '500px',
  //     data: "Do you confirm the deletion of this data?"
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result) {
  //       console.log('Yes clicked');
  //       console.log(this.user_id)
  //      if(this.user_id){
  //        this.deleteUser(this.user_id);
  //      }
  //     }
  //   });
  // }


  showToaster(a:string, status){
    if(status){
      this.toastr.success(a,'sucess',{
        timeOut: 3000
      })
    }
    else{
      this.toastr.info(a, 'No User deleted',{
        timeOut: 2000
      });
    }
    
      
    }

}
