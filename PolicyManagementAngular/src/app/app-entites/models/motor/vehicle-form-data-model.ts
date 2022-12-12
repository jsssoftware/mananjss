import { IDateDto } from "src/app/app-entites/dtos/common/date-dto";

export interface IVehicleFormDataModel {
    Manufacturer: number;
    Model: number;
    Varient: number;
    FuelType: string;
    Cc: number;
    Seating: number;
    Gvw: number;
    Kw: number;
    ExShowRoomValue: number;
    RegistrationNumber: string;
    EngineNumber: string;
    ChassisNumber: string;
    VehicleSegment: number;
    RtoZone: number;
    RiskZone: string;
    MakeYear: number;
    RegistrationDateString: string;
    RegistrationDateDto: IDateDto | null;
    Usage: number;
    IsSpecialRegistrationNumber: boolean;
}