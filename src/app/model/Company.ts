import User from "./User";

export default class Company {

    companyId: number;
    name: string;
    industry: string;
    size: string;
    status: string;
    profileImage: string;
    userId: number;
    location:string;
    about:string;
    contact:string


    constructor(
        companyId: number,
        name: string,
        industry: string,
        size: string,
        status:string,
        profileImage: string,
        userId: number,
        location:string,
        about:string,
        contact:string
    
    ){
        this.companyId = companyId;
        this.name = name;
        this.industry = industry;
        this.size = size;
        this.status = status;
        this.profileImage = profileImage;
        this.userId = userId;
        this.location=location
        this.contact=contact
        this.about=about
    }
}
