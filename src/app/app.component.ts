import { Component } from '@angular/core';
import { FlexInputDirective } from './flexInput/flex-input.directive';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [FlexInputDirective]
})
export class AppComponent {
}
