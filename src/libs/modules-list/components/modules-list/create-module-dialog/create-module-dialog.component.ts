import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ModuleInterface } from '../../../interfaces/';
import { ModulesService } from '../../../services/modules.service';


@Component({
  selector: 'app-create-module-dialog',
  templateUrl: './create-module-dialog.component.html',
  styleUrls: ['./create-module-dialog.component.scss'],
  providers: [
    ModulesService,
  ]
})

export class CreateModuleDialogComponent implements OnInit {
  public model = {
    module: null,
    name: null,
    routing: true
  };

  constructor(public dialogRef: MatDialogRef<CreateModuleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { rootModule: ModuleInterface },
              private _generatorService: ModulesService) {
  }

  public ngOnInit() {
    this.model.module = this.data.rootModule;
  }

  public generate() {
    this._generatorService.generateModule(this.model).subscribe((res) => {
      const modulePath = this.model.module.modulePath + '/' + this.model.name;
      const moduleName = this.model.name + '.module.ts';

      const module = {
        moduleName: moduleName,
        modulePath: modulePath,
        moduleFullPath: modulePath + '/' + moduleName
      };

      this.dialogRef.close(module);
    });
  }

}
