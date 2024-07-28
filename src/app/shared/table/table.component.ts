import { CommonModule } from '@angular/common';
import {
  Component,
  Directive,
  Host,
  Injectable,
  Input,
  OnInit,
  Pipe,
  PipeTransform,
  TemplateRef,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { TooltipModule } from 'primeng/tooltip';
import { BehaviorSubject } from 'rxjs';

export type action = {
  label: string;
  icon: string;
  command: (data: any) => void;
};
export type column = {
  header: string;
  key: string;
  sort: boolean;
  type: 'default' | 'image';
  colspan?: string;
};
@Pipe({
  name: 'templateRef',
  standalone: true,
})
export class TemplateRefPipe implements PipeTransform {
  constructor(@Host() private registry: TemplateRegistry) {}

  transform(name: string): TemplateRef<any> | null {
    return this.registry.templates[name];
  }
}
@Directive({
  selector: '[templateRef]',
  standalone: true,
})
export class TemplateRefDirective {
  @Input('templateRef')
  templateRef?: string;
  private name?: string;

  constructor(
    @Host() private registry: TemplateRegistry,
    private template: TemplateRef<any>
  ) {}

  ngOnInit(): void {
    this.name = this.templateRef;
    if (this.name) this.registry.templates[this.name] = this.template;
  }

  ngOnDestroy() {
    if (this.name) delete this.registry.templates[this.name];
  }
}
@Injectable()
export class TemplateRegistry {
  templates: { [name: string]: TemplateRef<any> } = Object.create(null);
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    MultiSelectModule,
    FormsModule,
    TooltipModule,
    OverlayPanelModule,
    TemplateRefPipe,
    TemplateRefDirective,
  ],
  viewProviders: [TemplateRegistry],
  styles: [
    `
      .p-sortable-column-icon {
        color: #545ae8;
      }
    `,
  ],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
  _cols: column[] = [];
  _data: any[] = [];
  _actions: action[] = [];
  _lazy = false;
  _config = { total: 0, per_page: 0 };

  @Input() page: BehaviorSubject<any> = new BehaviorSubject<any>({});

  @Input() set lazy(lazy: boolean) {
    this._lazy = lazy;
  }
  get lazy() {
    return this._lazy;
  }
  @Input() set config(config: { total: number; per_page: number }) {
    this._config = config;
  }
  get config() {
    return this._config;
  }

  @Input() set cols(cols: column[]) {
    this._cols = cols;
  }
  get cols() {
    return this._cols;
  }

  @Input() set data(data: any[]) {
    if (data) this._data = [...data];
  }
  get data() {
    return this._data;
  }
  @Input() set actions(actions: action[]) {
    this._actions = [...actions];
  }
  get actions() {
    return this._actions;
  }

  ngOnInit(): void {}
  exac(item: action, data: any) {
    item.command(data);
  }

  dd(v: any) {
    console.log(v);
  }
}
