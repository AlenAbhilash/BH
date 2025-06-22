import { Component, Output, Input, EventEmitter, OnChanges } from '@angular/core';
import { CardModule } from '@progress/kendo-angular-layout';
import { NgIf,NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeViewModule, CheckedState } from '@progress/kendo-angular-treeview';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DrawerModule } from '@progress/kendo-angular-layout';
import { of } from 'rxjs';

@Component({
  selector: 'app-seacrh-filter',
  standalone: true,
  imports: [
    CardModule,
    NgIf,
    NgClass,
    FormsModule,
    TreeViewModule,
    ButtonsModule,
    InputsModule,
    DrawerModule
  ],
  templateUrl: './seacrh-filter.component.html',
  styleUrls: ['./seacrh-filter.component.scss']
})
export class SearchFilterComponent implements OnChanges {
  @Input() collapsed = false;
  @Output() collapseToggled = new EventEmitter<boolean>();
  @Output() selectedNamesChange = new EventEmitter<string[]>();

  toggleSidebar(): void {
    this.collapseToggled.emit();
  }

  activeTab = 'my';
  filterExpanded = true;
  searchTerm = '';

  currentProjectChecked = false;
  currentProjectFav = false;
  myContracts = [
    {
      id: 'currentProject',
      name: '1104096',
      checked: false,
      favorite: false,
      children: [
        { id: 'sub-1', name: 'CP - Subproject A', checked: false, favorite: false, children: [] },
        { id: 'sub-2', name: '1104096-NCIC III Ammonia/Urea Plant - STCC - Compression', checked: false, favorite: false, children: [] }
      ]
    },
    {
      id: 'newProject',
      name: '1104097-oil and gas',
      checked: false,
      favorite: false,
      children: [
        { id: 'sub-7', name: '1104097-oil and gas ', checked: false, favorite: false, children: [] },
        { id: 'sub-8', name: '1104097-solid', checked: false, favorite: false, children: [] }
      ]
    }
  ];

  allContracts = [
    {
      id: 'project2',
      name: '1104088-Ar Ratawi',
      checked: false,
      favorite: false,
      children: [
        { id: 'sub3', name: 'HCC - Train #2 & 3 without', checked: false, favorite: false, children: [] },
        { id: 'sub4', name: 'HCC - Train #1 with string test', checked: false, favorite: false, children: [] }
      ]
    },
    {
      id: 'project3',
      name: '1104089-Basra Gas',
      checked: false,
      favorite: false,
      children: [
        { id: 'sub5', name: 'Compressor Station', checked: false, favorite: false, children: [] }
      ]
    },
    {
      id: 'project4',
      name: '1104090-South Oil',
      checked: false,
      favorite: false,
      children: [
        { id: 'sub6', name: 'Pipeline Project', checked: false, favorite: false, children: [] }
      ]
    },
    ...JSON.parse(JSON.stringify(this.myContracts))
  ];

  toggleFavorite(id: string, event: MouseEvent) {
    event.stopPropagation();
    const toggleInTree = (nodes: any[]): any => {
      let toggled = false;
      for (const node of nodes) {
        if (node.id === id) {
          node.favorite = !node.favorite;
          if (node.children && node.children.length > 0) {
            node.children.forEach((child: any) => {
              child.favorite = node.favorite;
            });
          }
          toggled = true;
        }
        if (node.children && node.children.length > 0) {
          toggled = toggleInTree(node.children) || toggled;
        }
      }
      return toggled;
    };
    toggleInTree(this.myContracts);
    toggleInTree(this.allContracts);
  }

  get favouriteContracts() {
    const flatten = (nodes: any[]): any[] => nodes.reduce((acc: any[], node: any) => {
      if (node.favorite) acc.push(node);
      if (node.children && node.children.length) acc.push(...flatten(node.children));
      return acc;
    }, []);
    const parents = this.allContracts.filter((parent: any) => {
      if (parent.favorite) return true;
      if (parent.children && parent.children.some((c: any) => c.favorite)) return true;
      return false;
    }).map((parent: any) => {
      const favChildren = (parent.children || []).filter((c: any) => c.favorite);
      return {
        ...parent,
        children: favChildren
      };
    });
    return parents;
  }

  expandedKeys: string[] = [];
  checkedKeys: string[] = [];
  previousCheckedKeys: string[] = [];

  get filteredContracts() {
    let contracts: any[] = [];
    if (this.activeTab === 'my') {
      contracts = this.myContracts;
    } else if (this.activeTab === 'all') {
      contracts = this.allContracts;
    } else if (this.activeTab === 'fav') {
      contracts = this.favouriteContracts;
    }
    const term = this.searchTerm?.toLowerCase().trim() || '';
    if (!term) return contracts;
    const matches = (item: any): boolean =>
      item.name.toLowerCase().includes(term) || (item.id && item.id.toLowerCase().includes(term));
    const filterProjects = (projects: any[]) => {
      return projects
        .map(project => {
          const matchedChildren = (project.children || []).filter(matches);
          if (matches(project) || matchedChildren.length > 0) {
            return {
              ...project,
              children: matchedChildren.length > 0 ? matchedChildren : project.children
            };
          }
          return null;
        })
        .filter(Boolean);
    };
    return filterProjects(contracts);
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

  onCheckedKeysChange(checkedKeys: string[]) {
    let activeTree = this.myContracts;
    if (this.activeTab === 'all') {
      activeTree = this.allContracts;
    }
    const getNodeByKey = (projects: any[], key: string): any => {
      const path = key.split('_').map(idx => parseInt(idx, 10));
      let node = null;
      let arr = projects;
      for (const i of path) {
        node = arr[i];
        if (!node) return null;
        arr = node.children || [];
      }
      return node;
    };
    const collectDescendantKeys = (node: any, prefix: string): string[] => {
      let keys: string[] = [];
      if (node.children && node.children.length > 0) {
        node.children.forEach((child: any, idx: number) => {
          const childKey = prefix + '_' + idx;
          keys.push(childKey);
          keys = keys.concat(collectDescendantKeys(child, childKey));
        });
      }
      return keys;
    };
    const updateCheckedProperty = (projects: any[], prefix = '', checkedKeysSet: Set<string>) => {
      projects.forEach((p, idx) => {
        const key = prefix === '' ? '' + idx : prefix + '_' + idx;
        p.checked = checkedKeysSet.has(key);
        if (p.children && p.children.length > 0) {
          updateCheckedProperty(p.children, key, checkedKeysSet);
        }
      });
    };
    const isParentChecked = (key: string, checkedSet: Set<string>) => {
      if (!key.includes('_')) return false;
      let parentKey = key.substring(0, key.lastIndexOf('_'));
      if (parentKey === '') return false;
      while (parentKey) {
        if (checkedSet.has(parentKey)) return true;
        if (!parentKey.includes('_')) break;
        parentKey = parentKey.substring(0, parentKey.lastIndexOf('_'));
      }
      return false;
    };
    const parentKeys = activeTree.map((_: any, idx: number) => idx.toString());
    const checkedParentKeys = checkedKeys.filter(key => parentKeys.includes(key));
    let checkedKeysSet: Set<string>;
    if (checkedParentKeys.length > 0) {
      const lastParentKey = checkedParentKeys[checkedParentKeys.length - 1];
      const node = getNodeByKey(activeTree, lastParentKey);
      const allowedKeys = [lastParentKey, ...collectDescendantKeys(node, lastParentKey)];
      checkedKeysSet = new Set(checkedKeys.filter(key => allowedKeys.includes(key)));
      const childKeys = collectDescendantKeys(node, lastParentKey);
      childKeys.forEach(k => checkedKeysSet.add(k));
    } else {
      checkedKeysSet = new Set(checkedKeys);
    }
    const getAllKeys = (projects: any[], prefix = ''): string[] => {
      let keys: string[] = [];
      projects.forEach((p, idx) => {
        const key = prefix === '' ? '' + idx : prefix + '_' + idx;
        keys.push(key);
        if (p.children && p.children.length > 0) {
          keys = keys.concat(getAllKeys(p.children, key));
        }
      });
      return keys;
    };
    const allKeys = getAllKeys(activeTree);
    allKeys.forEach(key => {
      const node = getNodeByKey(activeTree, key);
      if (node && node.children && node.children.length > 0 && !Array.from(checkedKeysSet).includes(key)) {
        const childKeys = collectDescendantKeys(node, key);
        childKeys.forEach(k => checkedKeysSet.delete(k));
      }
    });
    updateCheckedProperty(activeTree, '', checkedKeysSet);
    let filteredKeys: string[];
    if (checkedParentKeys.length > 0) {
      filteredKeys = Array.from(checkedKeysSet).filter(key => !isParentChecked(key, checkedKeysSet));
    } else {
      filteredKeys = checkedKeys.filter(key => !isParentChecked(key, new Set(checkedKeys)));
    }
    const selectedNames: string[] = [];
    filteredKeys.forEach(key => {
      const node = getNodeByKey(activeTree, key);
      if (node) {
        selectedNames.push(node.name);
      }
    });
    if (selectedNames.length === 0) {
      this.selectedNamesChange.emit(["No project selected"]);
    } else {
      this.selectedNamesChange.emit(selectedNames);
    }
  }

  showAdvancedFilter = false;
  advancedJobTitle = '';
  advancedJobNumber = '';
  advancedJobType = '';
  jobTypes = [
    { text: 'Full Time', value: 'fulltime' },
    { text: 'Part Time', value: 'parttime' },
    { text: 'Contract', value: 'contract' },
    { text: 'Internship', value: 'internship' }
  ];

  toggleAdvancedFilter() {
    this.showAdvancedFilter = !this.showAdvancedFilter;
  }

  applyAdvancedFilter() {
    // Implement filter logic here
    console.log('Apply advanced filter:', this.advancedJobTitle, this.advancedJobNumber, this.advancedJobType);
    this.showAdvancedFilter = false;
  }

  resetAdvancedFilter() {
    this.advancedJobTitle = '';
    this.advancedJobNumber = '';
    this.advancedJobType = '';
  }

  ngOnChanges(changes: any) {
    if (changes.collapsed && changes.collapsed.currentValue !== changes.collapsed.previousValue) {
      if (!this.collapsed) {
        this.filterExpanded = true;
      }
    }
  }
}
