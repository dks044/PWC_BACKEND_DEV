import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class LeaseResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  refNo: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  counterpartyA: string;

  @IsString()
  counterpartyB: string;

  @IsString()
  assetType: string;

  @IsString()
  costType: string;

  @IsBoolean()
  isInternalTransaction: boolean;

  @IsString()
  noteType: string;

  @IsDateString()
  leaseStartDate: string;

  @IsOptional()
  @IsDateString()
  contractEndDate?: string;

  @IsDateString()
  leaseEndDate: string;

  @IsDateString()
  modificationDate: string | null;

  @IsNumber()
  periodMonths: number;

  @IsNumber()
  monthlyFixedPayment: number;

  @IsOptional()
  @IsString()
  paymentType?: '미선택' | '균등' | '비균등';

  @IsOptional()
  @IsNumber()
  increaseRate: number | null;

  @IsOptional()
  @IsNumber()
  increaseCycle: number | null;

  @IsOptional()
  @IsString()
  paymentTiming?: '선급' | '후급';

  @IsOptional()
  @IsString()
  leaseStartStandard?: '월초' | '월말';

  @IsOptional()
  @IsNumber()
  purchaseOptionPrice: number | null;

  @IsNumber()
  depreciationPeriodMonths: number;

  @IsNumber()
  deposit: number;

  @IsNumber()
  capitalExpenditure: number;

  @IsNumber()
  recoveryCost: number;

  @IsOptional()
  @IsDateString()
  impairmentDate: string | null;

  @IsNumber()
  annualDiscountRate: number;

  @IsNumber()
  depositDiscountRate: number;

  @IsNumber()
  recoveryDiscountRate: number;

  @IsOptional()
  @IsString()
  rangeChange: string | null;

  constructor(partial: Partial<LeaseResponseDto>) {
    Object.assign(this, partial);
  }
}
