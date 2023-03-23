export interface IPolicyDocumentDto {
    Id: number;
    DocumentTypeName: string;
    FileName: string;
    Remarks: string;
    UniqueId: string;
    FileData?:any;
    DocumentTypeId?: number;
    DocumentBase64?: string;

}