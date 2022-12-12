export interface ICommonDto<T> {
    IsSuccess: boolean;
    Message: string;
    Response: T;
}