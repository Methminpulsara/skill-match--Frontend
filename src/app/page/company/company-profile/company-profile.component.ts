import { Component, OnInit } from '@angular/core';
import UserService from '../../../../service/UserService';
import { CompanyService } from '../../../../service/CompanyService';
import Company from '../../../model/Company';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css'
})
export class CompanyProfileComponent implements OnInit {

  constructor(private companyService: CompanyService) {
    this.notyf = new Notyf({
      types: [
        {
          type: 'success',
          background: '#4CAF50',
          duration: 3000,
          icon: { className: 'material-icons', tagName: 'i', text: 'check_circle' }
        },
        {
          type: 'error',
          background: '#F44336',
          duration: 3000,
          icon: { className: 'material-icons', tagName: 'i', text: 'error' }
        },
        {
          type: 'info',
          background: '#2196F3',
          duration: 3000,
          icon: { className: 'material-icons', tagName: 'i', text: 'info' }
        }
      ]
    });
  }

  private notyf: Notyf;

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

  public updatedCompany = {
    name: '',
    size: '',
    contact: '',
    about: '',
    location: ''
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
    this.updatedCompany = {
      name: this.company.name,
      size: this.company.size,
      contact: this.company.contact,
      about: this.company.about,
      location: this.company.location
    };
    this.isUpdateModalOpen = true;
  }

  closeUpdateModal() {
    this.isUpdateModalOpen = false;
  }

  updateProfile() {
    const updatedCompany: Company = {
      ...this.company,
      name: this.updatedCompany.name?.trim() || '',
      size: this.updatedCompany.size?.trim() || '',
      contact: this.updatedCompany.contact?.trim() || '',
      about: this.updatedCompany.about?.trim() || '',
  location: this.updatedCompany.location?.trim() || ''
    };

    this.companyService.update(this.company.companyId, updatedCompany).subscribe(
      res => {
        this.company = res;
        this.companyService.setCompany(this.company);
        this.notyf.success('Company profile updated successfully.');
        this.closeUpdateModal();
      },
      error => {
        console.error('Failed to update company profile:', error);
        this.notyf.error('Failed to update company profile.');
      }
    )
  }

  updateProfileImage() {
    if (this.imageUrl) {
      this.companyService.updateImage(this.company.companyId, this.imageUrl).subscribe(
        res => {
          this.company.profileImage = res.profileImage;
          this.companyService.setCompany(this.company);
          localStorage.setItem('company', JSON.stringify(this.company));
          this.notyf.success('Profile image updated successfully.');
          this.closeImageModal();
        },
        error => {
          console.error('Failed to update profile image:', error);
          this.notyf.error('Failed to update profile image.');
        }
      );
    } else {
      this.notyf.open({ type: 'info', message: 'Image URL is empty!' });
    }
  }
}
