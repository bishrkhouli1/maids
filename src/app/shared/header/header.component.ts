import { Component, inject } from '@angular/core';
import { UserService } from '../../users/user.service';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, InputTextModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  user = inject(UserService);
}
