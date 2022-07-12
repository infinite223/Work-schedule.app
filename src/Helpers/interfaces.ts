export interface IPerson {
    name: string;
    startWork: string;
    endWork: string;
}

export interface IUser {
    id:number,
    email:string,
    nickname:string
}

export interface IShedule {
    id:number,
    persons: [{
        name:string,
        startWork:string,
        endWork:string
    }]
}

export interface IGroupType {
    admin?: {email:string, nickname:string},
    nameGroup?:string,
    workers?:Array<{email:string, nickname:string, id:number, UID?:string}>
}