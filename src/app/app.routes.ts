import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BuyerDashboardComponent } from './customer/buyer/buyer-dashboard/buyer-dashboard.component';
import { CheckoutComponent } from './customer/buyer/checkout/checkout.component';
import { SellerDashboardComponent } from './customer/seller/seller-dashboard/seller-dashboard.component';
import { SignSignupComponent } from './customer/sign-signup/sign-signup.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { PageNotFoundComponent } from './shared/layouts/page-not-found/page-not-found.component';
import { AdminAuthGuardLogin, AdminAuthGuardService, BuyerAuthGuardService, SelleBuyerAruthGuardLogin, SellerAuthGuardService } from './shared/services/auth-guard.service';
import { UserCrudComponent } from './user-crud/user-crud.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [
    { path: " ", redirectTo: "/", pathMatch: "full" },
    { path: "", component: HomeComponent },
    { path: "my-profile", component: UserProfileComponent },
    { path: "contact-us", component: ContactUsComponent },
    //admin
    {
        path: '',canActivate:[AdminAuthGuardLogin], children: [
            { path: "admin-login", component: AdminLoginComponent }
        ]
    },
    {
        path: '',canActivate:[AdminAuthGuardService], children: [
            { path: "admin-dashboard", component: AdminDashboardComponent },
            { path: "admin/user", component: UserCrudComponent },
            { path: "admin/product", component: ProductComponent }
        ]
    },
    {
        path: '',canActivate:[SelleBuyerAruthGuardLogin], children: [
            { path: "sign-in", component: SignSignupComponent },
            { path: "sing-up", component: SignSignupComponent }
        ]
    },
    {
        path: '',canActivate:[SellerAuthGuardService], children: [
            { path: "seller-dashboard", component: SellerDashboardComponent },
            { path: "seller/product", component: ProductComponent }
        ]
    },
    {
        path: '',canActivate:[BuyerAuthGuardService], children: [
            { path: "buyer-dashboard", component: BuyerDashboardComponent },
            { path: "checkout", component: CheckoutComponent }
        ]
    },
    { path: "**", component: PageNotFoundComponent }

];
