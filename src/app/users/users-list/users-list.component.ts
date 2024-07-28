import { Component, DestroyRef, inject } from '@angular/core';
import { column, TableComponent } from '../../shared/table/table.component';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { map, skip, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { user, UserService } from '../user.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [TableComponent, CommonModule],
  templateUrl: './users-list.component.html',
})
export class UsersListComponent {
  des = inject(DestroyRef);
  http = inject(HttpService);
  router = inject(Router);
  user = inject(UserService);

  page$ = new BehaviorSubject<any>({ first: 1, rows: 10 });

  config$ = new BehaviorSubject<{ total: number; per_page: number }>({
    total: 0,
    per_page: 0,
  });

  data = this.page$.pipe(
    skip(1),
    switchMap((val) => {
      return this.get_Data(val);
    })
  );
  getData = combineLatest([this.data, this.user.filter$]).pipe(
    map(([data, filter]) => {
      return data.filter((v) => v.id.toString().includes(filter));
    })
  );

  get_Data(val: any) {
    return this.http
      .get<{ data: user[]; total: number; per_page: number }>({
        link: `users?page=${val.first / this.config$.value.per_page + 1}`,
        showloader: true,
        des: this.des,
      })
      .pipe(
        map((v) => {
          this.config$.next({ total: v.total, per_page: v.per_page });
          return v.data;
        })
      );
  }

  cols: column[] = [
    { type: 'default', header: 'Id', key: 'id', sort: false },
    { type: 'image', header: 'Avatar', key: 'avatar', sort: false },
    { type: 'default', header: 'First Name', key: 'first_name', sort: false },
    { type: 'default', header: 'Last Name', key: 'last_name', sort: false },
    { type: 'default', header: 'Email', key: 'email', sort: false },
  ];

  actions = [
    {
      label: 'view User',
      icon: 'pi pi-eye',
      command: this.show.bind(this),
      class: 'green',
    },
  ];

  ngOnInit(): void {}

  show(user: { id: number }) {
    this.router.navigate([user.id]);
  }
}
