import { ItemPengadaan, PajakConfig } from '../types/procurement';

export const NAMA_BULAN = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export const NAMA_HARI = [
  'Minggu',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
];

export const BULAN_ROMAWI = [
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX',
  'X',
  'XI',
  'XII',
];

export function formatRupiah(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return 'Rp 0';
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatAngka(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '0';
  }
  return new Intl.NumberFormat('id-ID').format(amount);
}

/**
 * Format string tanggal YYYY-MM-DD ke "21 Oktober 2026"
 */
export function formatTanggalIndonesia(dateStr: string): string {
  if (!dateStr) return '-';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const year = parts[0];
  const monthIdx = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  if (monthIdx < 0 || monthIdx > 11) return dateStr;
  return `${day} ${NAMA_BULAN[monthIdx]} ${year}`;
}

/**
 * Format formal untuk pembukaan Berita Acara Serah Terima (BAST):
 * Contoh: "Pada hari ini Rabu tanggal Dua Puluh Satu bulan Oktober tahun Dua Ribu Dua Puluh Enam"
 */
export function formatTeksHariTanggalBAST(dateStr: string): {
  hari: string;
  tanggalAngka: number;
  bulan: string;
  tahun: string;
} {
  if (!dateStr) {
    return { hari: 'Senin', tanggalAngka: 1, bulan: 'Januari', tahun: '2026' };
  }
  const date = new Date(dateStr + 'T00:00:00');
  const dayIdx = date.getDay();
  const parts = dateStr.split('-');
  const year = parts[0] || '2026';
  const monthIdx = (parseInt(parts[1], 10) || 1) - 1;
  const day = parseInt(parts[2], 10) || 1;

  return {
    hari: NAMA_HARI[dayIdx] || 'Senin',
    tanggalAngka: day,
    bulan: NAMA_BULAN[monthIdx] || 'Januari',
    tahun: year,
  };
}

export function hitungFinansial(items: ItemPengadaan[], pajak: PajakConfig) {
  const subtotal = items.reduce((acc, it) => acc + (it.volume * it.hargaSatuan || 0), 0);
  const ppn = pajak.kenaPPN ? Math.round((subtotal * (pajak.ppnPersen || 0)) / 100) : 0;
  const totalKotor = subtotal + ppn;
  const pph = pajak.pphType !== 'none' ? Math.round((subtotal * (pajak.pphPersen || 0)) / 100) : 0;
  const potonganLain = pajak.potonganLain || 0;
  const totalPotongan = pph + potonganLain;
  const totalBersih = totalKotor - totalPotongan;

  return {
    subtotal,
    ppn,
    totalKotor,
    pph,
    potonganLain,
    totalPotongan,
    totalBersih,
  };
}
