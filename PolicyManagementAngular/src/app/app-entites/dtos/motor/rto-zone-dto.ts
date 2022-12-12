import { IDropDownDto } from "../common/drop-down-dto";

export interface IRtoZoneDto extends IDropDownDto<number> {
    RtoZoneCode: string;
    RiskZone: string;
}