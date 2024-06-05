import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Products } from '../../common/product';
import { CartService } from '../../services/cart.service';
import { PostService } from '../../services/post.service';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, RouterOutlet, HttpClientModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
[x: string]: any;
constructor(private router: Router, private http: HttpClient, private cartService: CartService) { }
    list_pr: Products[] = [];
    list_new_pr: Products[] = [];
  
    ngOnInit(): void {
      fetch(`http://localhost:3000/newproduct`)
        .then(res => res.json())
        .then(data => {
          this.list_new_pr = data.newproducts;
        });
      fetch(`http://localhost:3000/product`)
      .then(res => res.json())
      .then(data => {
        this.list_pr = data.products;
      });
    }
    addToCart(item: any): void {
      this['cartService'].addToCart(item);
      console.log(this['cartService'].getCart())
    }
  }
