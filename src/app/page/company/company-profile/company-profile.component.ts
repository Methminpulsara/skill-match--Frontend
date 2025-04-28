import { Component, OnInit } from '@angular/core';
import UserService from '../../../../service/UserService';
import { CompanyService } from '../../../../service/CompanyService';
import Company from '../../../model/Company';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css'
})
export class CompanyProfileComponent implements OnInit {

  constructor(
    private companyService: CompanyService
  ) {}

  isImageModalOpen: boolean = false;
  isUpdateModalOpen: boolean = false;

  companyEmail = "";
  imageUrl = "";

  public company: Company = {
    companyId: 0,
    name: "",
    industry: "",
    size: "",
    status: "active",
    profileImage: "",
    userId: 0,
    location: "",
    about: "",
    contact: ""
  };

  // This will hold the update form data temporarily
  public updatedCompany = {
    name: '',
    size: '',
    contact: '',
    about: '',
    location:'  '
  };

  ngOnInit(): void {
    const company = this.companyService.getCompany();
    if (company) {
      this.company = company;
    }
  }

  openImageModal() {
    this.isImageModalOpen = true;
  }

  closeImageModal() {
    this.isImageModalOpen = false;
  }

  openUpdateModal() {
    // pre-fill update form with existing data
    this.updatedCompany = {
      name: this.company.name,
      size: this.company.size,
      contact: this.company.contact,
      about: this.company.about,
      location : this.company.location
    };
    this.isUpdateModalOpen = true;
  }

  closeUpdateModal() {
    this.isUpdateModalOpen = false;
  }

  updateProfile() {
    // Build updated company object with null/undefined checks
    const updatedCompany: Company = {
      ...this.company,
      name: this.updatedCompany.name ? this.updatedCompany.name.trim() : '', // Default to empty string if name is null/undefined
      size: this.updatedCompany.size ? this.updatedCompany.size.trim() : '', // Default to empty string if size is null/undefined
      contact: this.updatedCompany.contact ? this.updatedCompany.contact.trim() : '', // Default to empty string if contact is null/undefined
      about: this.updatedCompany.about ? this.updatedCompany.about.trim() : '', // Default to empty string if about is null/undefined
      location:this.updatedCompany.location ? this.updatedCompany.location.trim():''
    };
  
    // Call the service to update the company details
    this.companyService.update(this.company.companyId, updatedCompany).subscribe(
      res => {
        console.log('Company updated successfully:', res);
        this.company = res;
        this.companyService.setCompany(this.company);
        localStorage.setItem('company', JSON.stringify(this.company));
        this.closeUpdateModal();
      },
      error => {
        console.error('Failed to update company profile:', error);
      }
    );
  }
  

  updateProfileImage() {
    if (this.imageUrl) {
      this.companyService.updateImage(this.company.companyId, this.imageUrl).subscribe(res => {
        console.log(res.profileImage);
        this.company.profileImage = res.profileImage;
        console.log('Updated profile image:', this.company.profileImage);

        this.companyService.setCompany(this.company);
        localStorage.setItem('company', JSON.stringify(this.company));
      },
      error => {
        console.error('Failed to update profile image:', error);
      });

      this.closeImageModal();
    } else {
      console.error('Image URL is empty!');
    }
  }
}
