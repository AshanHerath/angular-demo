import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  constructor(private router:Router, private activatedRoute:ActivatedRoute) {

  }

  userObject:any ;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(response=>{
      this.userObject = response.get('userId');
      console.log(this.userObject);
    })
  }



}
