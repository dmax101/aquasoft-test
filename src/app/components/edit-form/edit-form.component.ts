import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss',
})
export class EditFormComponent implements OnInit {
  id = new BehaviorSubject<number>(-1);
  itemForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private itemsService: ItemsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      nome: ['', Validators.required],
      id: [-1, Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = Number(params['id']);

      this.id.next(id);

      const editItem = this.itemsService.getItemById(id);

      this.itemForm.patchValue({ nome: editItem?.nome, id: editItem?.id });
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      this.itemsService.updateItem(this.itemForm.value);
      this.itemForm.reset();
      this.onClickBackToList();
    }
  }

  onClickBackToList() {
    this.router.navigate(['/']);
  }
}
