import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  form : FormGroup

  errMsg: string | undefined

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]
      ),
      password: new FormControl('', [Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]
      ),
      keepConnected: new FormControl(false)
    })
  }

    async onLoginSubmit (): Promise<void> {
    if (this.form.valid) {
      const {email, password, keepConnected} = this.form.value
      try { 
        await this.authService.login(email, password, keepConnected)
        this.router.navigateByUrl('/')
      }catch(e: any){
        /* this.errMsg = e.error */
        this.errMsg = "Invalide credentials"
        
        
      }
    }
  }
}