import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimationDialogComponent } from '../../shared/components/animation-dialog/animation-dialog.component';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { Course } from '../../courses/models/course';
import { ContentDialogComponent } from '../../shared/components/content-dialog/content-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {
  constructor(public dialog: MatDialog) {}

  validateAllFormsFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (
        control instanceof UntypedFormGroup ||
        control instanceof UntypedFormArray
      ) {
        control.markAsTouched({ onlySelf: true });
        this.validateAllFormsFields(control);
      }
    });
  }

  getErrorMessage(formGroup: UntypedFormGroup, fieldName: string) {
    const field = formGroup.get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  getFormArrayFieldErrorMessage(
    formGroup: UntypedFormGroup,
    formArrayName: string,
    fieldName: string,
    index: number
  ) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    const field = formArray.controls[index].get(
      fieldName
    ) as UntypedFormControl;

    return this.getErrorMessageFromField(field);
  }

  getErrorMessageFromField(field: UntypedFormControl) {
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('maxlength')) {
      return 'Limite de caracteres excedido';
    }
    return 'Campo inválido';
  }

  isFormArrayRequired(formGroup: UntypedFormGroup, formArrayName: string) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    return (
      !formArray.valid && formArray.hasError('required') && formArray.touched
    );
  }

  openDialog(title: string, content: string): Observable<any> {
    const dialogRef = this.dialog.open(AnimationDialogComponent, {
      data: {
        title: title,
        content: content,
      },
    });
    return dialogRef.afterClosed();
  }

  openContent(element: Course) {
    const dialogRef = this.dialog.open(ContentDialogComponent, {
      data: {
        _id: element._id,
        name: element.name,
        category: element.category,
        lesson: element.lesson,
      },
    });
    return dialogRef.afterClosed();
  }
}
