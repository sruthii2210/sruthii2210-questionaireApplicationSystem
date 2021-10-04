import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-head-master-dashboard',
  templateUrl: './head-master-dashboard.component.html',
  styleUrls: ['./head-master-dashboard.component.css']
})
export class HeadMasterDashboardComponent implements OnInit {

  constructor(private router:Router) { }
  logout()
  {
    this.router.navigate(['home'])
  }

  ngOnInit(): void {
  }

}
