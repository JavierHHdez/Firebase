import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';

@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

	// Creating a new Object 
	shoppingItem = {} as ShoppingItem;
	shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database : AngularFireDatabase) {

  	this.shoppingItemRef$ = this.database.list('shopping-list');

  	/*
		shopping-list : 

			0: 
				itemName : 'Pizza',
				itemNumber: 3
			1
				itemName : 'CheeseCake',
				itemNumber : 5
  	*/
  }

  AddShoppingItem(shoppingItem : ShoppingItem ){
  	/*
		Create a new anonymous object and convert itemNumber to a Number.
		Push this to our Firebase database under the 'shopping-list' node.
  	*/
  	this.shoppingItemRef$.push({
  		itemName : this.shoppingItem.itemName,
  		itemNumber : Number(this.shoppingItem.itemNumber)
  	});

  	// Reset our shoppingItem
  	this.shoppingItem = {} as ShoppingItem;

  	// Navigate the user back to the ShoppingListPage
  	this.navCtrl.pop();
  }

}
