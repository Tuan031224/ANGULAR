import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Products } from './common/product';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './App.html',
})


export class AppComponent {
id_cate: any;
  title(title: any) {
    throw new Error('Method not implemented.');
  }

}