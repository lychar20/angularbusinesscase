import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterInput } from '../../entities/register.entity';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  form : FormGroup

  errMsg: string | undefined

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required, Validators.pattern('^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19[0-9]{2}|20[0-9]{2})$')]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')] )
    })
  }

  async onSubmitForm(): Promise <void> {
    if(this.form.valid) {
      const registerInput: RegisterInput = {
        email: this.form.value.email,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        phone: this.form.value.phone,
        birthDate: RegisterInput.formatBirthDate(this.form.value.birthDate),
        password: this.form.value.password,
      }
      console.log(registerInput)
      try {
        await this.authService.register(registerInput)
        this.router.navigateByUrl('/login')
      } catch (e: any) {

      }
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    return (
      this.form.get(fieldName)!.invalid &&
      (this.form.get(fieldName)!.dirty || this.form.get(fieldName)!.touched)
    )
  }

  onKeyUp(evt: any): void {
    if (evt.keyCode === 8 || evt.keyCode === 37 || evt.keyCode === 39) return
    const firstSlashPosition = new RegExp(/^\d{2}$/)
    const secondSlashPosition = new RegExp(/^\d{2}\/\d{2}$/)

    const currentValue = evt.target.value
    if (
      ((evt.keyCode >= 48 && evt.keyCode <= 57) || (evt.keyCode >= 96 && evt.keyCode <= 105)) &&
      (firstSlashPosition.test(currentValue) || secondSlashPosition.test(currentValue))
    ) {
      evt.target.value = currentValue + '/'
    }
  }

  onKeyDown(evt: any): void {
    if (evt.keyCode === 8 || evt.keyCode === 37 || evt.keyCode === 39) return
    if (evt.keyCode < 48 || (evt.keyCode > 57 && evt.keyCode < 96) || evt.keyCode > 105)
      evt.preventDefault()
  }

}
