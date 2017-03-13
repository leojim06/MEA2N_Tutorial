import { create } from 'domain';
import { Injectable } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class ToastsService {

  constructor(private notificationsService: NotificationsService) { }

  public success(title: string, body: string): any {
    this.notificationsService.success(title, body);
  }

  public error(title: string, body: string): any {
    this.notificationsService.error(title, body);
  }

  public info(title: string, body: string):any {
    this.notificationsService.info(title, body);
  }

  public warn(title: string, body: string): any {
    this.notificationsService.alert(title, body);
  }

  public create(title: string, body: string): any {
    this.notificationsService.create(title, body, '');
  }

}
