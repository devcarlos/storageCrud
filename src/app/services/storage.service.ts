import { Injectable } from '@angular/core';
import { Item } from "../interfaces/item";
import { Storage } from '@ionic/storage';

const ITEMS_KEY = 'my-items';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  // Create
  addItem(item: Item): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (items) { 
        items.push(item);
        return this.storage.set(ITEMS_KEY, items);
      } else {
        return this.storage.set(ITEMS_KEY, [item]);
      }
    });
  }

  // Read
  getItems(): Promise<Item[]> {
    return this.storage.get(ITEMS_KEY);
  }

  // Update
  updateItem(item: Item): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (!items || items.length === 0) { 
        return null;
      }
       
      let newItems = items.map(element => {
        if (item.id === element.id) {
          return item;
        }
        return element;
      });

      console.log('NEW ITEMS => ', newItems);

      return this.storage.set(ITEMS_KEY, newItems);
    });
  }

  // Delete
  deleteItem(id: Number): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (!items || items.length === 0) { 
        return null;
      }
       
      let keepItems = items.filter(element => {
        if (id !== element.id) {
          return element;
        }
      });

      console.log('KEEP ITEMS => ', keepItems);

      return this.storage.set(ITEMS_KEY, keepItems);
    });
  }
}
