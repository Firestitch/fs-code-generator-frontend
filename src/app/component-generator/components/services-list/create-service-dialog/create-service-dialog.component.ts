import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ModuleInterface } from '@libs/modules-list';
import { FsProgressService } from '@firestitch/progress';
import { FsMessage } from '@firestitch/message';

import * as pluralize from 'pluralize';
import { ServicesService } from '../../../services';


@Component({
  selector: 'app-create-service-dialog',
  templateUrl: './create-service-dialog.component.html',
  styleUrls: ['./create-service-dialog.component.scss'],
})

export class CreateServiceDialogComponent {
  public model = {
    module: null,
    subdirectory: null,
    singularName: null,
    pluralName: null
  };

  public hidePath = false;

  constructor(
    public dialogRef: MatDialogRef<CreateServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { modules: ModuleInterface[], services: any[] },
    private _servicesService: ServicesService,
    private _progressService: FsProgressService,
    private _message: FsMessage,
  ) {
  }

  public generate() {
    const progressDialog = this._progressService.open();

    this._servicesService.generateService(this.model).subscribe(
      (res) => {
        const type = (this.model.subdirectory === '/data') ? 'data' : 'service';
        const service = {
          servicePath: `${this.model.module.modulePath}${this.model.subdirectory}`,
          singularName: `${this.model.singularName + '.' + type + '.ts'}`,
        };

        progressDialog.complete();

        this.dialogRef.close(service);
      },
      (response) => {
        progressDialog.close();
        this._message.error(response.error.message || response.body.error);
      }
      );
  }

  public changedSingularName() {
    this.model.pluralName = pluralize(this.model.singularName);
  }

  public moduleChanged() {
    this.setDefaultSubDirectory();
  }

  /**
   * Hack for set default path
   * If module has services hide path dropdown and set default path from first elem
   * @todo
   */
  public setDefaultSubDirectory() {
    const moduleServices = this.data.services.find((s) => s.module === this.model.module.moduleName);
    this.hidePath = moduleServices && !!moduleServices.services.length;

    if (this.hidePath) {
      this.model.subdirectory = moduleServices.services[0].servicePath.indexOf('shared/services') !== -1
        ? '/shared/services'
        : '/services';
    } else {
      this.model.subdirectory = null;
    }
  }

}
