import { IVarientDto } from "./varient-dto";

export interface IVehicleDto extends IVarientDto {
    ManufacturerId: number;
    ModelId: number;
}