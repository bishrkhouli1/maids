import { Component, DestroyRef, inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { user } from '../user.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-users-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './users-details.component.html',
})
export class UsersDetailsComponent {
  activatedRoute = inject(ActivatedRoute);
  des = inject(DestroyRef);
  http = inject(HttpService);

  data: user | null = null;

  constructor() {
    this.activatedRoute.params
      .pipe(
        switchMap((v) => {
          return this.get_Data(v['id']);
        })
      )
      .subscribe();
  }

  get_Data(id: any) {
    return this.http
      .get<{ data: user }>({
        link: `users/${id}`,
        showloader: true,
        des: this.des,
      })
      .pipe(
        map((v) => {
          this.data = v.data;
        })
      );
  }
}
