import { Component, Output, EventEmitter } from '@angular/core';
import { DrawerModule } from '@progress/kendo-angular-layout';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-iep-siderbar',
  standalone: true,
  imports: [DrawerModule, NgClass],
  templateUrl: './iep-siderbar.component.html',
  styleUrls: ['./iep-siderbar.component.scss']
})
export class IEPSIDERBARComponent {
  public selectedItem: number = 0;
  public items = [
    { text: 'Apps', icon: 'apps' },
    { text: 'Managed Folder', icon: 'folder_managed' },
    { text: 'Folder', icon: 'folder' },
    { text: 'Verified', icon: 'verified' },
    { text: 'Engineering', icon: 'engineering' },
    { text: 'Settings', icon: 'settings' }
  ];

  @Output() topIconClicked = new EventEmitter<void>();
  isDeviceHubActive = false;

  onTopIconClick() {
    this.isDeviceHubActive = !this.isDeviceHubActive;
    this.topIconClicked.emit();
  }
}
