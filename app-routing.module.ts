import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { SignupComponent } from 'src/app/signup/signup.component';
import { UserProfileComponent } from 'src/app/user-profile/user-profile.component';
import { CartComponent } from 'src/app/cart/cart.component';
import { CheckoutComponent } from 'src/app/checkout/checkout.component';
import { CheckoutSummaryComponent } from 'src/app/checkout-summary/checkout-summary.component';


const routes: Routes = [
  {path: '', redirectTo: '/signup', pathMatch: 'full'},
  // Please change this to which ever component you are testing and implementing
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'checkout-summary', component: CheckoutSummaryComponent},
  {path: 'userprofile', component: UserProfileComponent},
  {path: 'cart', component: CartComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }