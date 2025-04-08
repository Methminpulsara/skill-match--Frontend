export default class Company {

    companyId: number;
    name: string;
    industry: string;
    location: string;
    size: string;
    profileImage: string;
    userId: number;

    constructor(
        companyId: number,
        name: string,
        industry: string,
        location: string,
        size: string,
        profileImage: string,
        userId: number
    ){
        this.companyId = companyId;
        this.name = name;
        this.industry = industry;
        this.location = location;
        this.size = size;
        this.profileImage = profileImage;
        this.userId = userId;
    }
}
