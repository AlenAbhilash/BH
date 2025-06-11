import { Component } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-dashboard',
  standalone: true,
  imports: [
    ButtonsModule,
    ProgressBarModule,
    NgFor,
    NgIf,
    GridModule,
    FormsModule,
    NgClass
  ],
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent {
  selectedTabIndex = 0;
  ytdDate: string = this.getCurrentDate();
  progressValue: number = 71;

  tabs: string[] = [
    'ISPO',
    'VDR',
    'VDR Revision',
    'VDR Finalization',
    'OTD Trends',
    'Engineering Productivity',
    'Technical Alignment'
  ];
  activeTab: string = this.tabs[0];

  tags: string[] = [
    'Total Documents (1321)',
    'Backlogs (16)',
    'Forecast (199)',
    'Not Acknowledged (3)',
    'Step (5)',
    'Rulestream (3)',
  ];
  activeTag: string = this.tags[0];

  dateCards = [
    { label: 'Today', info: '1 out of 1 are not completed' },
    { label: 'FW 6, 2025 (This Week)', info: '6 out of 15 are not completed' },
    { label: 'FW 7, 2025 (Next Week)', info: '4 out of 8 are not completed' },
    { label: 'FW 8, 2025', info: '4 out of 8 are not completed' }
  ];
  currentCardIndex: number = 0;

  notificationCount = 3;
  showNotification = true;

  searchTerm: string = '';

  dropdownOptions: { [key: string]: string[] } = {
    'View As': ['Individual', 'Function'],
    'Individual': ['Ahmed', 'Fatima', 'John Doe'],
    'Function': ['Engineering', 'Procurement', 'Scheduling'],
    'Role': ['Lead Engineer', 'Design Coordinator', 'Planner'],
    'Status': ['Open', 'In Progress', 'Completed', 'On Hold'],
    'Priority': ['High', 'Medium', 'Low'],
    'Discipline': ['Mechanical', 'Electrical', 'Instrumentation', 'Piping'],
  };

  activities = [
    {
      projectId: '4065550120',
      activityId: '4065550120',
      subLabel: 'Rulestream',
      activityName: '6391 Elgin St. Celina, Delaware 1029',
      primaryResource: 'Amanda Johnson',
      earlyDate: '2024-10-14',
      lateDate: '2024-10-16',
    },
    {
      projectId: '2395550108',
      activityId: '2395550108',
      subLabel: '',
      activityName: '1901 Thornridge Cir. Shiloh, Hawaii',
      primaryResource: 'Robert Fox',
      earlyDate: '2024-10-14',
      lateDate: '2024-10-16',
    },
    {
      projectId: '4065550120',
      activityId: '4805550103',
      subLabel: '',
      activityName: '4140 Parker Rd. Allentown, New Mexico',
      primaryResource: 'Savannah Nguyen',
      earlyDate: '2024-10-14',
      lateDate: '2024-10-16',
    },
  ];

  get filteredActivities() {
    if (!this.searchTerm) return this.activities;
    return this.activities.filter(activity =>
      Object.values(activity).some(value =>
        value.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  getDropdownOptions(label: string): string[] {
    return this.dropdownOptions[label] || [];
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  setActiveTag(tag: string): void {
    this.activeTag = tag;
  }

  prevCard(): void {
    if (this.currentCardIndex > 0) {
      this.currentCardIndex--;
    }
  }

  nextCard(): void {
    if (this.currentCardIndex + 3 < this.dateCards.length) {
      this.currentCardIndex++;
    }
  }

  viewRequests(): void {
    console.log('View requests clicked');
  }

  dismissNotification(): void {
    this.showNotification = false;
  }

  private getCurrentDate(): string {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }
}
