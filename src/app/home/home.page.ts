import { Component, ViewChild } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { Platform, ToastController, IonList } from "@ionic/angular";

import { Item } from '../interfaces/item';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  
  items: Item[] = [];
  newItem: Item = <Item>{};

  @ViewChild('mylist')mylist: IonList;

  constructor(
    private storageService: StorageService,
    private plt: Platform,
    private toastController: ToastController
  ) {
    this,plt.ready().then(() => {
      this.loadItems();
    }) 
  }

  // CREATE
  addItem() {
    this.newItem.modified = Date.now();
    this.newItem.id = Date.now();

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
      this.showToast('Item Added!');
      this.loadItems();
    });
  }

  // READ
  loadItems() {
    this.storageService.getItems().then(items => {
      this.items = items;
    });
  }

  // UPDATE
  updateItem(item: Item) {
    item.title = `UPDATED: ${item.title}`;
    item.modified = Date.now();

    this.storageService.updateItem(item).then(item => {
      this.showToast('Item Updated!');
      this.loadItems();
    });
  }

  // DELETE
  deleteItem(item: Item) {
    this.storageService.deleteItem(item).then(item => {
      this.showToast('Item Deleted!');
      this.mylist.closeSlidingItems()
      this.loadItems();
    });
  }

  // ALERT
  async showToast(message: string) {
    let toast = await this.toastController.create({
      message: message,
      duration: 2000
    });

    toast.present();
  }
}
