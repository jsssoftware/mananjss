export interface ILoginDto {
    access_token: string;
    token_type: string;
    expires_in: string;
    error: string;
    permission?: any[];
}