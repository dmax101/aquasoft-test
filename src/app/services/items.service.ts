import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private items!: Item[];

  constructor() {
    this.loadItems();
  }

  // Carrega os itens do localStorage
  private loadItems(): void {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      this.items = JSON.parse(storedItems);
    } else {
      this.items = [
        { id: 1, nome: 'Danilo' },
        { id: 2, nome: 'Flavia' },
        { id: 3, nome: 'Sofia' },
      ];
    }
  }

  // Salva os itens no localStorage
  private saveItems(): void {
    localStorage.setItem('items', JSON.stringify(this.items));
  }

  // Retorna todos os items
  getItems(): Item[] {
    return this.items;
  }

  // Retorna um item pelo ID
  getItemById(id: number): Item | undefined {
    return this.items.find((item) => item.id === id);
  }

  // Adiciona um novo item
  addItem(item: Item): void {
    const newId = Math.max(...this.items.map((item) => item.id)) + 1;

    this.items.push({ ...item, id: newId });

    this.saveItems();
  }

  // Atualiza um item existente
  updateItem(item: Item): void {
    const index = this.items.findIndex((e) => e.id === item.id);
    if (index !== -1) {
      this.items[index] = item;

      this.saveItems();
    }
  }

  // Remove um item pelo ID
  removeItem(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
    this.saveItems();
  }

  // Ordena os items pelo nome
  orderItems(): void {
    this.items.sort((a, b) => a.nome.localeCompare(b.nome));
    this.saveItems();
  }

  // Troca a ordem de elementos existentes pelos índices fornecidos
  switchItemsById(id1: number, id2: number): void {
    const index1 = this.items.findIndex((item) => item.id === id1);
    const index2 = this.items.findIndex((item) => item.id === id2);

    if (index1 !== -1 && index2 !== -1) {
      [this.items[index1], this.items[index2]] = [
        this.items[index2],
        this.items[index1],
      ];
      this.saveItems();
    }
  }

  //Salva nova ordem dos elementos
  saveNewOrder(items: Item[]) {
    this.items = items;
    this.saveItems();
  }
}
