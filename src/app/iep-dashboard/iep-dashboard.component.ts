import { Component, Output, EventEmitter } from '@angular/core';
import { KENDO_TOOLBAR } from "@progress/kendo-angular-toolbar";
import { IEPSIDERBARComponent } from "../iep-siderbar/iep-siderbar.component";
import { SearchFilterComponent } from "../seacrh-filter/seacrh-filter.component";
import { ProjectDashboardComponent } from "../project-dashboard/project-dashboard.component";
import { DrawerModule } from '@progress/kendo-angular-layout';
import { CommonModule, NgIf } from '@angular/common';


@Component({
  selector: 'app-iep-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    DrawerModule,
    KENDO_TOOLBAR,
    IEPSIDERBARComponent,
    SearchFilterComponent,
    ProjectDashboardComponent
  ],
  templateUrl: './iep-dashboard.component.html',
  styleUrl: './iep-dashboard.component.scss'
})

export class IEPDashboardComponent {
  sidebarCollapsed = false;
  @Output() collapseToggled = new EventEmitter<boolean>();

  collapsed = false;

  selectedProjectNames: string[] = [];

  overlaySidebarOpen = false;
  activeIcon: string = '';

  public items = [
    { text: 'Apps', icon: 'apps' },
    { text: 'Managed Folder', icon: 'folder_managed' },
    { text: 'Folder', icon: 'folder' },
    { text: 'Verified', icon: 'verified' },
    { text: 'Engineering', icon: 'engineering' },
    { text: 'Settings', icon: 'settings' }
  ];

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    console.log("Sidebar collapsed state is now:", this.sidebarCollapsed);
  }

  toggleSidebarFromIcon(): void {
    this.toggleSidebar();
  }

  onProjectSelectionChanged(names: string[]) {
    this.selectedProjectNames = names;
  }

  openOverlaySidebar() {
    this.overlaySidebarOpen = true;
  }

  closeOverlaySidebar() {
    this.overlaySidebarOpen = false;
  }

  setActiveIcon(icon: string) {
    this.activeIcon = icon;
    this.closeOverlaySidebar(); 
  }

}
