import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cms';
  pageSelect = 'messages';

  switchView(selectedFeature: string){
    this.pageSelect = selectedFeature;
  } 
}
