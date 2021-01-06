import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  providers: [AuthService],
})
export class NewAdminComponent {
  error: string;

  constructor(private authService: AuthService) {}

  submit(user) {
    this.authService.newAdmin(user).subscribe(
      () => {
        this.error = '';
        // TODO: success message
      },
      (err) => {
        this.error = err.error;
      }
    );
  }
}
