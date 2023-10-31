import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserProfile } from '../../models/user-profile';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'ac-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  public userProfileForm!: FormGroup;

  private destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private userProfileService: UserProfileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userProfileService.getUserProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe(x =>
        this.initUserProfileForm(x),
        (error: HttpErrorResponse) => console.log(error.status + ' ' + error.message));
  }

  get firstName() { return this.userProfileForm.get("firstName") as AbstractControl; }
  get lastName() { return this.userProfileForm.get("lastName") as AbstractControl; }
  get email() { return this.userProfileForm.get("email") as AbstractControl; }

  public save() {
    this.userProfileForm.markAllAsTouched();

    if (this.userProfileForm.valid) {
      let userProfile: UserProfile = {
        firstName: this.userProfileForm.get("firstName")!.value,
        lastName: this.userProfileForm.get("lastName")!.value,
        email: this.userProfileForm.get("email")!.value
      };

      this.userProfileService.updateUserProfile(userProfile);

      this.router.navigateByUrl("");
    }
  }

  public close() {
    this.router.navigateByUrl("");
  }

  public ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private initUserProfileForm(userProfile: UserProfile) {
    this.userProfileForm = this.fb.group({
      firstName: this.fb.control(userProfile?.firstName, [Validators.required, Validators.maxLength(100)]),
      lastName: this.fb.control(userProfile?.lastName, [Validators.required, Validators.maxLength(100)]),
      email: this.fb.control(userProfile?.email, [Validators.required, Validators.maxLength(500), Validators.email])
    });
  }
}
