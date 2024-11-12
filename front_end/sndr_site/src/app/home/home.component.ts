import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TemporaryDataService } from './temporary-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [TemporaryDataService]
})
export class HomeComponent {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router) {
    this.searchForm = this.fb.group({
      query: [''],
      image: [false],
      video: [false]
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      this.router.navigate(['/search'], { state: { formData : this.searchForm.value} });
    }
  }

  title = 'NASA';
  nasa_IMG = 'https://cdn.mos.cms.futurecdn.net/baYs9AuHxx9QXeYBiMvSLU.jpg';
}
