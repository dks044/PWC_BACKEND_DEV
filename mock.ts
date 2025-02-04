import { LeaseResponseDto } from 'src/lease/dto/LeaseResponseDto';

export const mockLeaseUiil = (count: number): LeaseResponseDto[] => {
  const leases: LeaseResponseDto[] = [];
  for (let i = 1; i <= count; i++) {
    const newLeaseData = new LeaseResponseDto({
      refNo: `임시${i}`,
      name: '임시 계약',
      description: '임시 설명',
      counterpartyA: '당사자 A',
      counterpartyB: '당사자 B',
      assetType: '자산 종류',
      costType: '비용 종류',
      isInternalTransaction: false,
      noteType: '노트 종류',
      leaseStartDate: '2023-01-01',
      leaseEndDate: '2024-01-01',
      modificationDate: null,
      periodMonths: 12,
      monthlyFixedPayment: 100000,
      paymentType: '균등',
      increaseRate: null,
      increaseCycle: null,
      paymentTiming: '후급',
      leaseStartStandard: '월초',
      purchaseOptionPrice: null,
      depreciationPeriodMonths: 24,
      deposit: 1000000,
      capitalExpenditure: 500000,
      recoveryCost: 200000,
      impairmentDate: null,
      annualDiscountRate: 5,
      depositDiscountRate: 3,
      recoveryDiscountRate: 4,
      rangeChange: null,
    });
    leases.push(newLeaseData);
  }
  return leases;
};
