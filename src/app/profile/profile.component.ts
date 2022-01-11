import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataLayerService } from '../data-layer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm;
  designation = ['student', 'professional'];
  interests = ['designer', 'developer', 'manager','sales'];
  experience = ['0-5', '5-10', '10 & above'];
  expertise = ['java', 'react', 'backend'];
  dataLayerService : DataLayerService;
  disableProfCard = false;
  profile;

  constructor(dataLayerService : DataLayerService) {
    this.dataLayerService = dataLayerService;
    this.profile = this.getProfile();
   }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      'DisplayName': new FormControl(null, [Validators.required]),
      'FirstName': new FormControl(null, [Validators.required]),
      'LastName': new FormControl(),
      'AboutYourself': new FormControl(null, [Validators.maxLength(100)]),
      'AreaOfInterest': new FormArray([]),
      'Designation': new FormControl('professional'),
      'ProfessionalQuestionnaire': new FormGroup({
        'Experience': new FormControl('0-5'),
        'Expertise': new FormControl('java'),
        'Role': new FormControl(null, [Validators.maxLength(200)])
      })
    })
  }

  onDesRadio(){
    const formValues = this.profileForm.value;
    if(formValues.Designation === 'student'){
      this.disableProfCard = true;
    }
  }

    onSubmit() {
      console.log(this.profileForm);
      const formValues = this.profileForm.value;
      this.dataLayerService.updateProfile(formValues);
    }

    getProfile(){
      return this.dataLayerService.getProfile();
    }

}
