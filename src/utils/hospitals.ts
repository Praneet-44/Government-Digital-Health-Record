export type HospitalType = 'PHC' | 'CHC' | 'District Hospital' | 'Medical College';

export interface HospitalInfo {
  id: string;
  name: string;
  code: string;
  type: HospitalType;
  district: string;
  address: string;
  phone: string;
  kiosks: number;
  opdTokenCounter: string;
}

export const HOSPITALS: HospitalInfo[] = [
  {
    id: 'dh-opd',
    name: 'District Hospital OPD',
    code: 'DH-041',
    type: 'District Hospital',
    district: 'Central District',
    address: 'Ward 4, Govt Hospital Road',
    phone: '041-2500-100',
    kiosks: 4,
    opdTokenCounter: 'OPD-2026-44112'
  },
  {
    id: 'phc-urban',
    name: 'Primary Health Centre (PHC) Urban',
    code: 'PHC-092',
    type: 'PHC',
    district: 'Central District',
    address: 'Sector 3, Main Road',
    phone: '041-2540-0000',
    kiosks: 1,
    opdTokenCounter: 'OPD-2026-11245'
  },
  {
    id: 'chc-east',
    name: 'Community Health Centre (CHC) East',
    code: 'CHC-118',
    type: 'CHC',
    district: 'East Suburb',
    address: 'Block C, East Link Road',
    phone: '041-2680-0450',
    kiosks: 2,
    opdTokenCounter: 'OPD-2026-2901'
  },
  {
    id: 'gmc-medical',
    name: 'Government Medical College & Hospital',
    code: 'GMC-004',
    type: 'Medical College',
    district: 'Capital City',
    address: 'Medical College Road',
    phone: '041-2330-8800',
    kiosks: 6,
    opdTokenCounter: 'OPD-2026-77110'
  }
];

export function getHospitalById(id?: string): HospitalInfo | undefined {
  return id ? HOSPITALS.find(h => h.id === id) : undefined;
}

export function getHospitalByFacility(facility?: string): HospitalInfo | undefined {
  if (!facility) return undefined;
  return HOSPITALS.find(h => h.name === facility || h.code === facility);
}