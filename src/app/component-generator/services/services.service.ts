import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from '@env/environment';


@Injectable()
export class ServicesService {
  constructor(private _http: HttpClient) {
  }

  public listOfServices() {
    if (environment.production) {
      return this._http.get('/services');
    } else {
      return of({"services":[{"module":"messages.module.ts","services":[{"servicePath":"src/app/admin/modules/messages/data","singularName":"message-data.service.ts"},{"servicePath":"src/app/admin/modules/messages/data","singularName":"message-queue-data.service.ts"},{"servicePath":"src/app/admin/modules/messages/data","singularName":"message-template-data.service.ts"}]},{"module":"core.module.ts","services":[{"servicePath":"src/app/core/services","singularName":"acl-query.service.ts"},{"servicePath":"src/app/core/services","singularName":"acl-role.service.ts"},{"servicePath":"src/app/core/services","singularName":"attribute.service.ts"},{"servicePath":"src/app/core/services","singularName":"auth.service.ts"},{"servicePath":"src/app/core/services","singularName":"invite.service.ts"},{"servicePath":"src/app/core/services","singularName":"message.service.ts"},{"servicePath":"src/app/core/services","singularName":"nav.service.ts"},{"servicePath":"src/app/core/services","singularName":"object-filter.service.ts"},{"servicePath":"src/app/core/services","singularName":"object.service.ts"},{"servicePath":"src/app/core/services","singularName":"session.service.ts"},{"servicePath":"src/app/core/services","singularName":"signin.service.ts"},{"servicePath":"src/app/core/services","singularName":"signup.service.ts"},{"servicePath":"src/app/core/services","singularName":"social-auth.service.ts"},{"servicePath":"src/app/core/services","singularName":"timer.service.ts"},{"servicePath":"src/app/core/data","singularName":"account-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"acl-entry-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"acl-role-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"activation-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"asset-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"attribute-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"audit-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"category-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"comment-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"content-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"doc-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"environment-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"field-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"image-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"invite-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"object-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"project-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"role-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"status-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"task-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"time-entry-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"timezone-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"type-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"workflow-data.service.ts"},{"servicePath":"src/app/core/data","singularName":"workspace-data.service.ts"}]},{"module":"password.module.ts","services":[{"servicePath":"src/app/password/services","singularName":"password.service.ts"}]},{"module":"system.module.ts","services":[{"servicePath":"src/app/system/data","singularName":"cron-data.service.ts"},{"servicePath":"src/app/system/data","singularName":"system-data.service.ts"}]},{"module":"doc-drawer.module.ts","services":[{"servicePath":"src/libs/drawers/doc-drawer/services","singularName":"doc-drawer.service.ts"}]},{"module":"drawer.module.ts","services":[{"servicePath":"src/libs/drawers/drawer/services","singularName":"object-drawer.service.ts"}]},{"module":"image-drawer.module.ts","services":[{"servicePath":"src/libs/drawers/image-drawer/services","singularName":"image-drawer.service.ts"}]},{"module":"task-drawer.module.ts","services":[{"servicePath":"src/libs/drawers/task-drawer/services","singularName":"task-drawer.service.ts"}]},{"module":"side-nav.module.ts","services":[{"servicePath":"src/libs/side-nav/services","singularName":"sidenav.service.ts"}]}]});
    }
  }

  public generateService(params) {
    return this._http.post('/generate/service', params);
  }
}
