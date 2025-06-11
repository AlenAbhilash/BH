import { Component, Output, EventEmitter } from '@angular/core';
import { KENDO_TOOLBAR } from "@progress/kendo-angular-toolbar";
import { IEPSIDERBARComponent } from "../iep-siderbar/iep-siderbar.component";
import { SearchFilterComponent } from "../seacrh-filter/seacrh-filter.component";
import { ProjectDashboardComponent } from "../project-dashboard/project-dashboard.component";


@Component({
  selector: 'app-iep-dashboard',
  standalone: true,
  imports: [KENDO_TOOLBAR, IEPSIDERBARComponent, SearchFilterComponent, ProjectDashboardComponent],
  templateUrl: './iep-dashboard.component.html',
  styleUrl: './iep-dashboard.component.scss'
})

export class IEPDashboardComponent {
   sidebarCollapsed = false;
@Output() collapseToggled = new EventEmitter<boolean>();

collapsed = false;
toggleSidebar(): void {
  this.sidebarCollapsed = !this.sidebarCollapsed;
  console.log("Sidebar collapsed state is now:", this.sidebarCollapsed);
}



}
