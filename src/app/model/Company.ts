import User from "./User";

export default class Company {

    companyId: number;
    name: string;
    industry: string;
    size: string;
    profileImage: string;
    user: User;

    constructor(
        companyId: number,
        name: string,
        industry: string,
        size: string,
        profileImage: string,
        user: User
    ){
        this.companyId = companyId;
        this.name = name;
        this.industry = industry;
        this.size = size;
        this.profileImage = profileImage;
        this.user = user;
    }
}
