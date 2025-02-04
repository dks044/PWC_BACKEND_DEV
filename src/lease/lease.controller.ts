import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LeaseResponseDto } from './dto/LeaseResponseDto';
import { UploadLeaseDTO } from './dto/UploadLease.DTO';
import * as fs from 'fs';
import * as path from 'path';

@Controller('roboticLeaseApp')
export class LeaseController {
  @Post('process_pdf')
  @UseInterceptors(FileInterceptor('pdf'))
  leaseAnalysis(@UploadedFile() pdf: Express.Multer.File) {
    console.log('파일 받음 => ' + pdf.originalname);
    console.log('파일 용량 => ' + pdf.size);

    const res1 = new LeaseResponseDto({
      refNo: '임시22',
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

    const res2 = {
      계약체결일: '2023.05.11',
      계약기간: '2023.08.01 ~ 2027.12.31 (최종일자)',
      '임대료 및 기타 비용': {
        '1차년도': '108,000,000원/5개월 (2023.08.01 ~ 2023.12.31)',
        '2차년도': '22,572,000원/월 (2024.01.01 ~ 2024.12.31)',
        '3차년도': '23,587,740원/월 (2025.01.01 ~ 2026.12.31)',
        '4차년도': '24,649,188원/월 (2026.01.01 ~ 2026.12.31)',
        '5차년도': '25,758,402원/월 (2027.01.01 ~ 2027.12.31)',
      },
      '전기료 및 냉난방비': '2023.08.01 ~ 2027.12.31',
      '임대목적물 사용': '임차인의 요청에 따라 임대인의 사전 허락 필요',
      수선비: '임차인의 귀책사유가 아닌 경우에 한해',
      '권리양도 금지': '임대방의 사전 서면 동의 없이 제3자에게 양도 불가',
      손해배상: '임대인의 귀책사유로 인한 손해 발생 시 배상 의무',
      '법령 및 기타의 적용': '관련 법령 및 기타 규정의 적용',
      합의관할: '모든 분쟁 및 소송에 대해 합의관할을 규정',
      리스해당여부_분석: {
        자산: '임대목적물',
        사용통제권: '임대인의 동의 없이 임대목적물을 제3자에게 양도 불가',
        대가: '정해진 임대료 및 기타 비용 지불 의무',
        기간: '계약기간 동안 임대목적물 사용 가능, 이후 계약 종료 후 인도 및 반환 의무',
      },
    };

    const response = {
      lease_info: res1, //계약서
      contact_info: res2, //ai분석
    };

    return response;
  }

  @Post('save_contract')
  leaseUpload(@Body() uploadLeaseDTO: UploadLeaseDTO) {
    // contracts 폴더 경로 설정
    const contractsDir = path.join(__dirname, '..', '..', 'contracts'); // src/ 또는 dist/ 경로에 따라 조정

    // contracts 폴더가 없으면 생성
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir, { recursive: true }); // recursive: true로 중첩된 디렉토리도 생성
    }

    // JSON 데이터를 문자열로 변환
    const jsonData = JSON.stringify(uploadLeaseDTO, null, 2); // pretty print

    // 파일 경로 설정
    const filePath = path.join(contractsDir, `contract_${Date.now()}.txt`);

    // 파일 생성
    fs.writeFile(filePath, jsonData, (err) => {
      if (err) {
        console.error('파일 생성 오류:', err);
        throw new Error('파일 생성에 실패했습니다.');
      }
      console.log('파일이 성공적으로 생성되었습니다:', filePath);
    });

    return { message: '계약서가 성공적으로 저장되었습니다.', filePath };
  }
}
