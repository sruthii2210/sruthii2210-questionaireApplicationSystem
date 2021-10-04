import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.css']
})
export class StaffDashboardComponent implements OnInit {

  constructor(private router:Router) { }

  logout()
  {
    let response=window.confirm("Are you sure to logout..")
    if(response)
    this.router.navigate(['home'])
  }
  ngOnInit(): void {
  }

}
