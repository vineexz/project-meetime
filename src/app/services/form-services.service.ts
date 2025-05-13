import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DayEntities } from '../app.interface';

@Injectable()
export class FormServices {
  readonly formGroupService = new FormGroup({
    entities: new FormControl<number>(DayEntities.monday),
  });
}
