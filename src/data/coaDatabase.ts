import { BatchCOA } from '../types';

export const VERIFIED_COA_DATABASE: Record<string, BatchCOA> = {
  '#OJ-2025-08': {
    batchNumber: '#OJ-2025-08',
    productName: 'Sea Buckthorn Gummies (Batch 08-2025)',
    mfgDate: '15 August 2025',
    expDate: '14 August 2027',
    sampleId: 'EUR-DEL-2025-98442',
    laboratory: 'Eurofins Analytical Services India Pvt. Ltd.',
    accreditation: 'NABL ISO/IEC 17025:2017 Certified (Cert #TC-5431)',
    testedPotency: 'Omega-7 Palmitoleic Acid: 32.4% (Specification: ≥ 30.0%)',
    heavyMetals: {
      lead: '< 0.010 mg/kg (Limit: 3.0)',
      arsenic: '< 0.005 mg/kg (Limit: 1.0)',
      cadmium: '< 0.005 mg/kg (Limit: 0.5)',
      mercury: '< 0.002 mg/kg (Limit: 0.1)',
      status: 'Passed'
    },
    microbiological: {
      totalAerobic: '< 10 CFU/g (Limit: 10,000)',
      yeastAndMold: '< 10 CFU/g (Limit: 1,000)',
      eColi: 'Absent in 10g',
      salmonella: 'Absent in 25g',
      status: 'Passed'
    },
    purityScore: 99.4,
    verifiedAt: '2025-08-22'
  },
  '#OJ-2025-09': {
    batchNumber: '#OJ-2025-09',
    productName: 'Liposomal Glutathione Gummies (Batch 09-2025)',
    mfgDate: '02 September 2025',
    expDate: '01 September 2027',
    sampleId: 'EUR-BLR-2025-10492',
    laboratory: 'Eurofins Analytical Services India Pvt. Ltd.',
    accreditation: 'NABL ISO/IEC 17025:2017 Certified (Cert #TC-5431)',
    testedPotency: 'Reduced L-Glutathione: 254.2 mg / gummy (Specification: ≥ 250.0 mg)',
    heavyMetals: {
      lead: '< 0.008 mg/kg (Limit: 3.0)',
      arsenic: '< 0.004 mg/kg (Limit: 1.0)',
      cadmium: '< 0.002 mg/kg (Limit: 0.5)',
      mercury: '< 0.001 mg/kg (Limit: 0.1)',
      status: 'Passed'
    },
    microbiological: {
      totalAerobic: '< 10 CFU/g (Limit: 10,000)',
      yeastAndMold: '< 10 CFU/g (Limit: 1,000)',
      eColi: 'Absent in 10g',
      salmonella: 'Absent in 25g',
      status: 'Passed'
    },
    purityScore: 99.7,
    verifiedAt: '2025-09-08'
  },
  '#OJ-2025-10': {
    batchNumber: '#OJ-2025-10',
    productName: 'Eye Care Gummies (Batch 10-2025)',
    mfgDate: '10 September 2025',
    expDate: '09 September 2027',
    sampleId: 'SGS-IN-2025-78321',
    laboratory: 'SGS India Testing Laboratories',
    accreditation: 'NABL ISO/IEC 17025:2017 Certified (Cert #TC-6129)',
    testedPotency: 'Free Lutein: 10.4 mg | Zeaxanthin: 2.1 mg (5:1 Golden Ratio Verified)',
    heavyMetals: {
      lead: '< 0.006 mg/kg (Limit: 3.0)',
      arsenic: '< 0.005 mg/kg (Limit: 1.0)',
      cadmium: '< 0.003 mg/kg (Limit: 0.5)',
      mercury: '< 0.001 mg/kg (Limit: 0.1)',
      status: 'Passed'
    },
    microbiological: {
      totalAerobic: '< 10 CFU/g (Limit: 10,000)',
      yeastAndMold: '< 10 CFU/g (Limit: 1,000)',
      eColi: 'Absent in 10g',
      salmonella: 'Absent in 25g',
      status: 'Passed'
    },
    purityScore: 99.2,
    verifiedAt: '2025-09-18'
  },
  '#OJ-2025-11': {
    batchNumber: '#OJ-2025-11',
    productName: 'Apple Cider Vinegar Gummies (Batch 11-2025)',
    mfgDate: '22 September 2025',
    expDate: '21 September 2027',
    sampleId: 'TUV-IN-2025-45129',
    laboratory: 'TÜV SÜD South Asia Private Limited',
    accreditation: 'NABL ISO/IEC 17025:2017 Certified (Cert #TC-7201)',
    testedPotency: 'Acetic Acid Content: 5.24% w/w with active Mother probiotic bio-markers',
    heavyMetals: {
      lead: '< 0.009 mg/kg (Limit: 3.0)',
      arsenic: '< 0.005 mg/kg (Limit: 1.0)',
      cadmium: '< 0.004 mg/kg (Limit: 0.5)',
      mercury: '< 0.001 mg/kg (Limit: 0.1)',
      status: 'Passed'
    },
    microbiological: {
      totalAerobic: '40 CFU/g (Limit: 10,000)',
      yeastAndMold: '20 CFU/g (Limit: 1,000)',
      eColi: 'Absent in 10g',
      salmonella: 'Absent in 25g',
      status: 'Passed'
    },
    purityScore: 98.9,
    verifiedAt: '2025-09-29'
  }
};

export function lookupBatchCOA(batchCode: string): BatchCOA | null {
  const normalized = batchCode.trim().toUpperCase();
  // Support with or without #
  const keyWithHash = normalized.startsWith('#') ? normalized : `#${normalized}`;
  return VERIFIED_COA_DATABASE[keyWithHash] || null;
}
