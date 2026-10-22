/**
 * Mengubah angka nominal rupiah menjadi kata-kata (Terbilang) dalam Bahasa Indonesia.
 * Contoh: 2500000 -> "Dua Juta Lima Ratus Ribu Rupiah"
 */

const KATA = [
  '',
  'Satu',
  'Dua',
  'Tiga',
  'Empat',
  'Lima',
  'Enam',
  'Tujuh',
  'Delapan',
  'Sembilan',
  'Sepuluh',
  'Sebelas',
];

function angkaKeKata(nilai: number): string {
  nilai = Math.floor(Math.abs(nilai));

  if (nilai < 12) {
    return KATA[nilai];
  } else if (nilai < 20) {
    return angkaKeKata(nilai - 10) + ' Belas';
  } else if (nilai < 100) {
    return angkaKeKata(Math.floor(nilai / 10)) + ' Puluh ' + angkaKeKata(nilai % 10);
  } else if (nilai < 200) {
    return 'Seratus ' + angkaKeKata(nilai - 100);
  } else if (nilai < 1000) {
    return angkaKeKata(Math.floor(nilai / 100)) + ' Ratus ' + angkaKeKata(nilai % 100);
  } else if (nilai < 2000) {
    return 'Seribu ' + angkaKeKata(nilai - 1000);
  } else if (nilai < 1000000) {
    return angkaKeKata(Math.floor(nilai / 1000)) + ' Ribu ' + angkaKeKata(nilai % 1000);
  } else if (nilai < 1000000000) {
    return (
      angkaKeKata(Math.floor(nilai / 1000000)) +
      ' Juta ' +
      angkaKeKata(nilai % 1000000)
    );
  } else if (nilai < 1000000000000) {
    return (
      angkaKeKata(Math.floor(nilai / 1000000000)) +
      ' Miliar ' +
      angkaKeKata(nilai % 1000000000)
    );
  } else if (nilai < 1000000000000000) {
    return (
      angkaKeKata(Math.floor(nilai / 1000000000000)) +
      ' Triliun ' +
      angkaKeKata(nilai % 1000000000000)
    );
  }

  return 'Jumlah Terlalu Besar';
}

export function terbilang(nominal: number): string {
  if (nominal === 0) return 'Nol Rupiah';
  if (!nominal || isNaN(nominal)) return 'Nol Rupiah';

  const hasil = angkaKeKata(nominal).replace(/\s+/g, ' ').trim();
  return hasil + ' Rupiah';
}

/**
 * Terbilang untuk jumlah unit / volume (tanpa akhiran Rupiah)
 * Contoh: 15 -> "Lima Belas"
 */
export function terbilangJumlah(jumlah: number): string {
  if (jumlah === 0) return 'Nol';
  if (!jumlah || isNaN(jumlah)) return 'Nol';
  return angkaKeKata(jumlah).replace(/\s+/g, ' ').trim();
}
