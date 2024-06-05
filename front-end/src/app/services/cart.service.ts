import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart';
  private cart = new BehaviorSubject<any[]>(this.isLocalStorageAvailable() ? this.getCartFromLocalStorage() : []);
  cart$ = this.cart.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  private isLocalStorageAvailable(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private getCartFromLocalStorage(): any[] {
    if (this.isLocalStorageAvailable()) {
      const cartString = localStorage.getItem(this.cartKey);
      return cartString ? JSON.parse(cartString) : [];
    }
    return [];
  }

  getCart(): any[] {
    if (this.isLocalStorageAvailable()) {
      const cartString = localStorage.getItem(this.cartKey);
      return cartString ? JSON.parse(cartString) : [];
    }
    return [];
  }

  addToCart(newItem: any): void {
    let cart = this.getCart();
    const existingItemIndex = cart.findIndex(item => item.id === newItem.id);

    if (existingItemIndex !== -1) {
      // Item already exists in the cart, increment the count
      cart[existingItemIndex].count += 1;
    } else {
      // Item does not exist, add it to the cart with count = 1
      newItem.count = 1;
      cart.push(newItem);
    }

    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.cartKey, JSON.stringify(cart));
    }
    this.cart.next(cart);
  }

  updateCount(index: number, value: number): void {
    let cart = this.getCart();
    cart[index].count = value;
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.cartKey, JSON.stringify(cart));
    }
    this.cart.next(cart);
  }

  removeFromCart(index: number): void {
    let cart = this.getCart();
    cart.splice(index, 1);
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.cartKey, JSON.stringify(cart));
    }
    this.cart.next(cart);
  }

  clearCart(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.cartKey);
    }
    this.cart.next([]);
  }
}
