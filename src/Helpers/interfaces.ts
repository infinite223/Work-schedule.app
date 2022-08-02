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
    admin?: {email:string, name:string},
    workplace?:string,
    groups?:Array<string>,
    workers?:Array<{email:string, name:string, group:string, theme:Array<number>}>,
    queue?:Array<{email:string, name:string, id:number}>,
}