import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ItemsService } from '../../services/items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.scss',
})
export class AddFormComponent {
  itemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private itemsService: ItemsService,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      nome: ['', Validators.required],
      id: [-1, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      this.itemsService.addItem(this.itemForm.value);
      this.itemForm.reset();
    }
  }

  onClickBackToList() {
    this.router.navigate(['/']);
  }
}
