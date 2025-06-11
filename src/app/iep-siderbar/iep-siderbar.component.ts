import { Component } from '@angular/core';
import { DrawerModule } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-iep-siderbar',
  standalone: true,
  imports: [DrawerModule],
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
}
