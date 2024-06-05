import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Products } from '../../common/product';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, RouterOutlet, HttpClientModule,],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  list_sp_all: Products[] = [];
  list_filtered: Products[] = [];

  constructor(private route: ActivatedRoute , router: Router, private http: HttpClient, private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.route.params.subscribe(params => {
      const id_cate = params['id_cate'];
      if (id_cate) {
        this.fetchProductsByCategory(id_cate);
      } else {
        this.list_filtered = this.list_sp_all;
      }
    });
  }

  fetchProducts(): void {
    fetch('http://localhost:3000/product')
      .then(res => res.json())
      .then(data => {
        this.list_sp_all = data.products;
        this.list_filtered = this.list_sp_all;
      });
  }

  fetchProductsByCategory(id_cate: string): void {
    fetch(`http://localhost:3000/shop/${id_cate}`)
      .then(res => res.json())
      .then(data => {
        this.list_filtered = data.products_all;
      });
  }
  addToCart(item: any): void {
    this['cartService'].addToCart(item);
    console.log(this['cartService'].getCart())
  }
}
