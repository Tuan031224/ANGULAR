import { Routes } from '@angular/router';
import { ShopComponent } from './pages/shop/shop.component';
import { DetailComponent } from './pages/detail/detail.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
export const routes: Routes = [
    {path :'', component: HomeComponent},
    {path :'shop', component: ShopComponent},
    {path :'shop/:id_cate', component: ShopComponent},
    {path :'detail/:id', component: DetailComponent},
    {path :'cart', component: CartComponent},
    {path :'checkout', component: CheckoutComponent},
    {path :'login', component: LoginComponent},
    {path :'signin', component: SigninComponent}
];