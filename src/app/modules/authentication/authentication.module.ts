import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { InputComponent } from './components/input/input.component';

@NgModule({
  declarations: [LoginComponent, InputComponent],
  imports: [CommonModule, FormsModule, AuthenticationRoutingModule],
})
export class AuthenticationModule {}
