
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-madeby',
  standalone: true,
  imports: [RouterOutlet], // Added FormsModule for template-driven forms
  templateUrl: './madeby.component.html',
  styleUrls: ['./madeby.component.scss']
})

export class MadebyComponent {
  
  nasa_IMG = 'https://cdn.mos.cms.futurecdn.net/baYs9AuHxx9QXeYBiMvSLU.jpg';

  constructor(private router: Router ) { }

  goToHome() {
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}

