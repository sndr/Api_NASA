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
  
  nasa_IMG = 'https://cdn.mos.cms.futurecdn.net/baYs9AuHxx9QXeYBiMvSLU.jpg';

  goToHome() {
    this.router.navigate(['/']).then(() => {
      window.location.reload();
  });

  }
}
