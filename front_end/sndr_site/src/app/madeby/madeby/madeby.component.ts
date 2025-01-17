import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-madeby',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './madeby.component.html',
  styleUrl: './madeby.component.scss'
})
export class MadebyComponent {
  constructor(private router: Router) {}
  
}
