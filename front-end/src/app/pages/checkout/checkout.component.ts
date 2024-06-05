import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  public cart: any[] = [];
  public inputValue: string = '';

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  navigateToProducts() {
    this.router.navigate(['/products']).then(() => {
      window.scrollTo(0, 0);
    });
  }

  removeItemFromCart(index: number): void {
    this.cartService.removeFromCart(index);
    this.cart = this.cartService.getCart();
  }

  getTotalCost(): number {
    return this.cart.reduce((total, item) => total + (item.price * item.count), 0);
  }

  getTotalCount(): number {
    return this.cart.reduce((total, item) => total + item.count, 0);
  }

  incrementCount(index: number) {
    this.cartService.updateCount(index, this.cart[index].count + 1);
    this.cart = this.cartService.getCart();
  }

  decrementCount(index: number) {
    if (this.cart[index].count > 1) {
      this.cartService.updateCount(index, this.cart[index].count - 1);
      this.cart = this.cartService.getCart();
    }
  }
}
