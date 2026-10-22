export interface InstansiData {
  namaInstansi: string; // e.g. PEMERINTAH KABUPATEN BANYUMAS
  subInstansi: string; // e.g. DINAS PENDIDIKAN
  namaUnit: string; // e.g. SMP NEGERI 1 BANYUMAS
  alamat: string;
  telepon: string;
  email: string;
  website: string;
  kodePos: string;
  kotaKabupaten: string;
  logoType: 'kemdikbud' | 'pemda' | 'garuda' | 'kemenag' | 'desa' | 'custom';
  customLogoUrl?: string;
}

export interface PejabatData {
  nama: string;
  nip: string;
  jabatan: string;
  pangkatGol?: string;
}

export interface PenyediaData {
  namaPerusahaan: string;
  namaPimpinan: string;
  jabatanPimpinan: string;
  alamat: string;
  telepon: string;
  npwp: string;
  namaBank: string;
  nomorRekening: string;
  namaRekening: string;
}

export interface ItemPengadaan {
  id: string;
  namaBarang: string;
  spesifikasi: string;
  volume: number;
  satuan: string;
  hargaSatuan: number;
}

export interface DokumenInfo {
  namaPaket: string;
  tahunAnggaran: string;
  sumberDana: string;
  kodeRekening: string; // Kode MAK / Sub Kegiatan
  waktuPelaksanaan: string; // e.g. "7 (tujuh) hari kalender"
  tempatPenyerahan: string;

  // Dokumen 1: Surat Perencanaan
  noPerencanaan: string;
  tglPerencanaan: string;
  dasarPerencanaan: string;

  // Dokumen 2: Surat Pesanan (SP)
  noSuratPesanan: string;
  tglSuratPesanan: string;
  batasPengiriman: string;

  // Dokumen 3: BAST
  noBAST: string;
  tglBAST: string;
  noPemeriksaan?: string;

  // Dokumen 4: SPMU
  noSPMU: string;
  tglSPMU: string;
  keperluanPembayaran: string;
}

export interface PajakConfig {
  kenaPPN: boolean;
  ppnPersen: number; // 11% standard
  pphType: 'none' | 'pph22' | 'pph23';
  pphPersen: number; // 1.5% atau 2%
  potonganLain: number;
  ketPotonganLain: string;
}

export interface PrintSettings {
  paperSize: 'A4' | 'F4';
  showKop: boolean;
  showMaterai: boolean;
  showStempelBox: boolean;
  fontSize: 'compact' | 'standard' | 'large';
}

export interface ProcurementProject {
  id: string;
  updatedAt: string;
  title: string;
  instansi: InstansiData;
  penggunaAnggaran: PejabatData;
  pejabatPengadaan: PejabatData;
  bendahara: PejabatData;
  pemeriksaBarang: PejabatData;
  penyedia: PenyediaData;
  dokumen: DokumenInfo;
  items: ItemPengadaan[];
  pajak: PajakConfig;
  printSettings: PrintSettings;
}
