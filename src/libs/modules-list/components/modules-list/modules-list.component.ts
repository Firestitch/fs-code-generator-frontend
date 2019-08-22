import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { of } from 'rxjs';

import { ModuleInterface } from '../../interfaces/';
import { CreateModuleDialogComponent } from './create-module-dialog/';
import { ModulesService } from '../../services/modules.service';


@Component({
  selector: 'app-modules-list',
  templateUrl: './modules-list.component.html',
  styleUrls: ['./modules-list.component.scss'],
  providers: [
    ModulesService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ModulesListComponent),
      multi: true
    }
  ]
})
export class ModulesListComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() public modules: ModuleInterface[];

  @Input() public module: ModuleInterface;
  @Output() public moduleChange = new EventEmitter();

  public onChange: any = () => {};
  public onTouch: any = () => {};

  public loading = true;

  constructor(
    private _modulesService: ModulesService,
    private _dialog: MatDialog
  ) {}

  public ngOnInit() {
    this._loadModules();
  }

  public ngOnChanges(changes) {
    if (changes.modules && changes.modules.currentValue !== void 0) {
      this.loading = false;
    }
  }

  public fetch = (kw) => {
    if (this.modules) {
      if (!!kw) {
        const kwParts = kw.split(' ');

        const matchedModules = this.modules.filter((module) => {
          return kwParts.every((part) => module.moduleFullPath.indexOf(part) > -1);
        });
        return of(matchedModules);
      } else {
        return of(this.modules);
      }
    }
  }

  public displayWith = (data) => {
    if (data && data.moduleFullPath) {
      return data.moduleFullPath
        .replace('/src', '')
        .replace('.ts', '');
    }

    return '-';
  }

  public selectModule(event) {
    this.writeValue(event);

    if (event) {
      this.moduleChange.emit(this.module);
    }
  }

  public openDialog() {
    const rootModule = this.modules.find((m) => m.moduleName === 'app.module.ts');
    const dialogRef = this._dialog.open(CreateModuleDialogComponent, {
      width: '400px',
      data: { rootModule }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        this.moduleChange.emit('');
        return;
      }

      this.modules.push(result);
      this.moduleChange.emit(result);
    });
  }

  public writeValue(value) {
    this.module = value;
    this.onChange(value);
    this.onTouch(value);
  }

  public registerOnChange(fn) { this.onChange = fn;  }
  public registerOnTouched(fn) { this.onTouch = fn; }

  private _loadModules() {
    this._modulesService.listOfModules()
      .subscribe((response: any) => {
        this.loading = false;
        this.modules = response.modules;
      });
  }
}
