import {Component, OnInit} from '@angular/core';
import {iterator} from "rxjs/internal-compatibility";

interface IOption {
  title: string,
  checked: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'dropdown-test';
  showOptions = false;

  selectOptions: IOption[] = [
    {
      title: 'Ava Trade website',
      checked: false,
    },
    {
      title: 'Forex Trading',
      checked: false,
    },
    {
      title: 'Branding',
      checked: false,
    },
    {
      title: 'Cryptocurrencies',
      checked: false,
    },

  ]

  public selectedItems: IOption[] = [];

  public filteredOptions: IOption[] = [];


  ngOnInit(): void {
    this.filteredOptions = this.selectOptions;
  }


  public toggleOption(option: IOption) {
    this.filteredOptions[this.filteredOptions.indexOf(option)].checked = !option.checked

    if (option && option.checked) {
      this.selectItems(option);
    } else {
      this.removeItem(option);
    }

  }

  public selectAll(event) {
    this.filteredOptions.forEach(item => item.checked = event.target.checked)
    this.selectItems()
  }

  public selectItems(item: IOption = null) {
    if (item) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems = this.filteredOptions.filter(item => item.checked)
    }
  }

  public removeItem(item: IOption) {
    this.filteredOptions[this.filteredOptions.indexOf(item)].checked = false;
    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
  }

  public search(search) {
    const value = search.target.value
    if (value) {
      this.filteredOptions = this.selectOptions.filter(item => item.title.toLowerCase().includes(value.toLowerCase()))
      // this.selectedItems = this.filteredOptions.filter(item => item.checked);
    } else {
      this.filteredOptions = this.selectOptions;
      this.selectItems();
    }
  }

  isAllChecked() {
    return this.filteredOptions.length === this.filteredOptions.filter(item => item.checked).length;
  }


}
