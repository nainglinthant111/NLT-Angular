import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/layouts/footer/footer.component";
import { HeaderComponent } from "./shared/layouts/header/header.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule,RouterOutlet, HeaderComponent, FooterComponent]
})
export class AppComponent {
  screenHeight:any;
  screenwidth:any;
  footermaxHeight!:number;
  title = 'student';
  constructor(){
    this.getScreenSize(event);
  }
  @HostListener("window:resize",["$event"])
  getScreenSize(event:any){
    this.screenHeight=window.innerHeight;
    this.screenwidth=window.innerWidth;

    this.footermaxHeight=this.screenHeight -160;
    
  }
}
