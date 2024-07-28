import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface user {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  filter$ = new BehaviorSubject<string>('');
}
