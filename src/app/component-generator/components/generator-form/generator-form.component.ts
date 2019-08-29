import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import { NgForm } from '@angular/forms';
import { ServicesService } from '../../services';
import * as pluralize from 'pluralize';


@Component({
  selector: 'app-component-generator-form',
  templateUrl: './generator-form.component.html',
})
export class GeneratorFormComponent implements OnInit, AfterViewInit {

  @Output()
  public formChanged = new EventEmitter<any>();

  @Output()
  public generate = new EventEmitter<void>();


  @ViewChild('moduleForm')
  public form: NgForm;

  public model = {
    module: null,
    service: null,
    componentName: null,
    relatedParentType: null,
    createEditComponentName: null,
    interfacePattern: null,
    createEditInterfacePattern: null,
    singularComponentName: null,
    pluralComponentName: null,
    singularModelName: null,
    pluralModelName: null,
    routableComponent: false,
    routableCreateComponent: false,
  };

  public services = [];

  public hasListInterface = false;
  public hasCreateEditInterface = false;
  public hasModel = false;

  constructor(
    private _servicesService: ServicesService,
  ) {}

  public ngOnInit() {
   this._servicesService.listOfServices()
     .subscribe((response: any) => {
       this.services = response.services;
     });
  }

  public ngAfterViewInit() {
    this.form.valueChanges.subscribe((values) => {
      this.formChanged.emit({...values});
    });
  }


  public interfacePatterChanged() {
    this.hasListInterface = false;
    this.hasCreateEditInterface = false;
    this.hasModel = false;

    switch (this.model.interfacePattern) {
      case 'list': {
        this.hasListInterface = true;
        this.hasModel = true;
      } break;

      case 'list-create-edit': {
        this.hasListInterface = true;
        this.hasCreateEditInterface = true;
        this.hasModel = true;
      } break;

      case 'create-edit': {
        this.hasCreateEditInterface = true;
        this.hasModel = true;
      } break;
    }
  }

  public submit() {
    this.generate.emit();
  }

  public serviceChanged(service) {
    if (service) {
      const name = service.singularName.replace(/(-(data))?\.(data|service)\.ts$/i, '');

      this.model.singularModelName = name;
      this.model.pluralModelName = pluralize(name);
    }
  }

  // private _clearModel() {
  //   this.model.relatedParentType = null;
  //   this.model.createEditComponentName = null;
  //   this.model.createEditInterfacePattern = null;
  //   this.model.c
  //   return {
  //     module: null,
  //     service: null,
  //     componentName: null,
  //     relatedParentType: null,
  //     createEditComponentName: null,
  //     interfacePattern: null,
  //     createEditInterfacePattern: null,
  //     singularComponentName: null,
  //     pluralComponentName: null,
  //     singularModelName: null,
  //     pluralModelName: null,
  //     componentType: null,
  //   };
  // }

}
