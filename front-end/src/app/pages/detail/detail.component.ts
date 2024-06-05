import { Component } from '@angular/core';
import { Products } from '../../common/product';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, RouterOutlet, HttpClientModule,],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  addToCart(item: any): void {
    this['cartService'].addToCart(item);
    console.log(this['cartService'].getCart())
  }
  sanpham: Products | undefined;

  constructor(private route: ActivatedRoute,private http: HttpClient ,private cartService: CartService) { }

  ngOnInit(): void {
    this.getSanpham();
  }

  getSanpham(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<Products>(`http://localhost:3000/product/${id}`).subscribe(data => {
        this.sanpham = data;
      });
    }
  }
  
 
}
