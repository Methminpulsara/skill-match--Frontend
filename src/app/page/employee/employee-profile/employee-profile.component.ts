import { Component, OnInit } from '@angular/core';
import UserService from '../../../../service/UserService';

@Component({
  selector: 'app-employee-profile',
  imports: [],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.css'
})
export class EmployeeProfileComponent implements OnInit {



  constructor(private userSerivce:UserService){}

  ngOnInit(): void {
    
    const  user = this.userSerivce.getUser();
    if(user){
      console.log(user.userId);
    }else{
      console.log("user not found");
    }

  }


}
