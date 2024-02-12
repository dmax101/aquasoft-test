import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../../interfaces/item';
import { ItemsService } from '../../services/items.service';
import { AddFormComponent } from '../add-form/add-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AddFormComponent],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
})
export class ItemListComponent implements OnInit {
  items = new BehaviorSubject<Item[]>([
    { id: 1, nome: 'Item 1' },
    { id: 2, nome: 'Item 2' },
  ]);

  constructor(private itemsService: ItemsService, private router: Router) {}

  ngOnInit(): void {
    this.updateItems();
  }

  updateItems() {
    this.items.next(this.itemsService.getItems());
  }

  onClickEdit(id: number) {
    console.log('Edit', id);
  }

  onClickDelete(id: number) {
    this.itemsService.removeItem(id);
    this.updateItems();
  }

  onClickSwitch(index: number, order: 1 | -1) {
    this.itemsService.switchItemsById(
      this.items.value[index - order].id,
      this.items.value[index].id
    );
    this.updateItems();
  }

  onClickSaveNewOrder() {
    this.itemsService.saveNewOrder(this.items.value);
    alert('Nova ordem salva!');
  }

  onClickAddForm() {
    this.router.navigate(['/add']);
  }
}
