export interface IMenuItemDto {
    Id: number;
    Name: string;
    DisplayName: string;
    Icon: string;
    ParentNode: number;
    Link: string;
    IsActive: boolean;
    OrderNo: number;
    tblMenuItem1?:IMenuItemDto[];
}