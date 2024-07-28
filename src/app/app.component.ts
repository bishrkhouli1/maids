import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingService } from './services/loading.service';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ProgressSpinnerModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'maids';

  loading = inject(LoadingService);

  ngOnInit(): void {}
}
