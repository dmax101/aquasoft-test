import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private items: Item[] = [
    { id: 1, nome: 'Danilo' },
    { id: 2, nome: 'Flavia' },
    { id: 3, nome: 'Sofia' },
  ];

  constructor() {}

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
  }

  // Atualiza um item existente
  updateItem(item: Item): void {
    const index = this.items.findIndex((e) => e.id === item.id);
    if (index !== -1) {
      this.items[index] = item;
    }
  }

  // Remove um item pelo ID
  removeItem(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
  }

  // Ordena os items pelo nome
  orderItems(): void {
    this.items.sort((a, b) => a.nome.localeCompare(b.nome));
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
    }
  }

  //Salva nova ordem dos elementos
  saveNewOrder(items: Item[]) {
    this.items = items;
  }
}
