import { Component, Output,Input, EventEmitter } from '@angular/core';
import { CardModule } from '@progress/kendo-angular-layout';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeViewModule, CheckedState } from '@progress/kendo-angular-treeview';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { of } from 'rxjs';

@Component({
  selector: 'app-seacrh-filter',
  standalone: true,
  imports: [
    CardModule,
    NgIf,
    FormsModule,
    TreeViewModule,
    ButtonsModule,
    InputsModule
  ],
  templateUrl: './seacrh-filter.component.html',
  styleUrls: ['./seacrh-filter.component.scss']
})
export class SearchFilterComponent {
 @Input() collapsed = false;
@Output() collapseToggled = new EventEmitter<boolean>();

toggleSidebar(): void {
  console.log("Toggle clicked. Current collapsed:", this.collapsed);
  this.collapseToggled.emit();
}


  activeTab = 'my';
  filterExpanded = false;
  searchTerm = '';

  currentProjectChecked = false;
  currentProjectFav = false;
projects = [
  {
    id: 'currentProject',
    name: 'Current Project',
    checked: this.currentProjectChecked,
    favorite: this.currentProjectFav,
    children: [
      {
        id: 'cp-sub1',
        name: 'CP - Subproject A',
        checked: false,
        favorite: false
      },
      {
        id: 'cp-sub2',
        name: 'CP - Subproject B',
        checked: false,
        favorite: false
      }
    ]
  },
  {
    id: 'project1',
    name: '1104096-NCIC III Ammonia/Urea Plant - STCC - Compression',
    checked: false,
    favorite: false,
    children: []
  },
  {
    id: 'project2',
    name: '1104088-Ar Ratawi',
    checked: false,
    favorite: false,
    children: [
      { id: 'sub3', name: 'HCC - Train #2 & 3 without', checked: false, favorite: false },
      { id: 'sub4', name: 'HCC - Train #1 with string test', checked: false, favorite: false }
    ]
  }
];


  expandedKeys: string[] = [];
  checkedKeys: string[] = [];

get filteredContracts() {
  const term = this.searchTerm.toLowerCase().trim();

  if (!term) {
    this.filterExpanded = true;
    return this.projects;
  }

  const matches = (item: any): boolean =>
    item.name.toLowerCase().includes(term) || item.id.toLowerCase().includes(term);

  const filterProjects = (projects: any[]) => {
    return projects
      .map(project => {
        const matchedChildren = (project.children || []).filter(matches);
        if (matches(project) || matchedChildren.length > 0) {
          return {
            ...project,
            children: matchedChildren
          };
        }
        return null;
      })
      .filter(Boolean);
  };

  const result = filterProjects(this.projects);
  this.filterExpanded = result.length > 0;
  return result;
}



  openAdvancedSearch() {
    console.log('Advanced search opened');
  }

  fetchChildren = (item: any) => {
    return of(item.children || []);
  };

  hasChildren = (item: any): boolean => {
    return item.children && item.children.length > 0;
  };

 isItemChecked = (dataItem: any, index: string): CheckedState => {
  return dataItem.checked ? 'checked' as CheckedState : 'unchecked' as CheckedState;
};


  onNodeCheck(dataItem: any): void {
    dataItem.checked = !dataItem.checked;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  toggleFilter() {
    this.filterExpanded = !this.filterExpanded;
  }

  toggleFavorite(id: string, event: MouseEvent) {
  event.stopPropagation();

  const toggleInProjects = (projects: any[]) => {
    for (const p of projects) {
      if (p.id === id) {
        p.favorite = !p.favorite;
        if (id === 'currentProject') {
          this.currentProjectFav = p.favorite;
        }

        return true;
      }
      if (p.children) {
        for (const sub of p.children) {
          if (sub.id === id) {
            sub.favorite = !sub.favorite;
            return true;
          }
        }
      }
    }
    return false;
  };

  toggleInProjects(this.projects);
}

}
