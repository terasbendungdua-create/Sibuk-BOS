import React from 'react';
import { ProcurementProject } from '../../types/procurement';
import { DocumentKop } from './DocumentKop';
import { formatAngka, formatTanggalIndonesia, formatTeksHariTanggalBAST } from '../../utils/formatters';
import { terbilangJumlah } from '../../utils/terbilang';

interface DocProps {
  project: ProcurementProject;
}

export const DocBAST: React.FC<DocProps> = ({ project }) => {
  const { instansi, penggunaAnggaran, pemeriksaBarang, penyedia, dokumen, items, printSettings } = project;
  const tglBastInfo = formatTeksHariTanggalBAST(dokumen.tglBAST);

  return (
    <div
      className={`bg-white text-slate-900 mx-auto p-8 shadow-sm print:shadow-none print:p-0 print:m-0 w-full max-w-[210mm] min-h-[297mm] font-serif leading-relaxed text-[13px] border border-slate-200 print:border-none box-border flex flex-col justify-between`}
    >
      <div>
        <DocumentKop instansi={instansi} showKop={printSettings.showKop} />

        {/* Judul BAST */}
        <div className="text-center my-2">
          <h2 className="text-base font-bold underline tracking-wider uppercase">
            BERITA ACARA SERAH TERIMA BARANG / JASA (BAST)
          </h2>
          <p className="text-xs font-semibold text-slate-700 mt-0.5">
            Nomor: {dokumen.noBAST || '.../.../BAST/.../2026'}
          </p>
        </div>

        {/* Paragraf Pembuka Formal */}
        <p className="text-xs text-justify my-2">
          Pada hari ini <strong>{tglBastInfo.hari}</strong>, tanggal <strong>{tglBastInfo.tanggalAngka} ({terbilangJumlah(tglBastInfo.tanggalAngka)})</strong> bulan <strong>{tglBastInfo.bulan}</strong> tahun <strong>{tglBastInfo.tahun}</strong>, bertempat di {dokumen.tempatPenyerahan || instansi.namaUnit}, kami yang bertanda tangan di bawah ini:
        </p>

        {/* Identitas Para Pihak */}
        <div className="space-y-2 text-xs my-2">
          {/* Pihak Pertama */}
          <div className="border-l-2 border-slate-700 pl-3">
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-3 font-semibold">1. Nama</span>
              <span className="col-span-9 font-semibold">: {penyedia.namaPimpinan}</span>
            </div>
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-3">Jabatan</span>
              <span className="col-span-9">: {penyedia.jabatanPimpinan} {penyedia.namaPerusahaan}</span>
            </div>
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-3">Alamat</span>
              <span className="col-span-9">: {penyedia.alamat}</span>
            </div>
            <p className="mt-0.5 text-slate-700 italic">
              Selanjutnya disebut sebagai <strong>PIHAK PERTAMA (Yang Menyerahkan)</strong>.
            </p>
          </div>

          {/* Pihak Kedua */}
          <div className="border-l-2 border-slate-700 pl-3">
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-3 font-semibold">2. Nama</span>
              <span className="col-span-9 font-semibold">: {pemeriksaBarang.nama}</span>
            </div>
            {pemeriksaBarang.nip && pemeriksaBarang.nip !== '-' && (
              <div className="grid grid-cols-12 gap-1">
                <span className="col-span-3">NIP</span>
                <span className="col-span-9 font-mono">: {pemeriksaBarang.nip}</span>
              </div>
            )}
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-3">Jabatan</span>
              <span className="col-span-9">: {pemeriksaBarang.jabatan}</span>
            </div>
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-3">Unit Kerja</span>
              <span className="col-span-9">: {instansi.namaUnit}</span>
            </div>
            <p className="mt-0.5 text-slate-700 italic">
              Selanjutnya disebut sebagai <strong>PIHAK KEDUA (Yang Menerima)</strong>.
            </p>
          </div>
        </div>

        {/* Klausul BAST */}
        <p className="text-xs text-justify mb-2">
          Menyatakan bahwa PIHAK PERTAMA telah menyerahkan barang pengadaan <strong>{dokumen.namaPaket}</strong> berdasarkan Surat Pesanan Nomor: <strong>{dokumen.noSuratPesanan}</strong> tanggal <strong>{formatTanggalIndonesia(dokumen.tglSuratPesanan)}</strong>, dan PIHAK KEDUA telah memeriksa, menguji, dan menerima seluruh barang tersebut dengan rincian sebagai berikut:
        </p>

        {/* Tabel Pemeriksaan Barang */}
        <table className="w-full border-collapse border border-slate-900 text-xs mb-3">
          <thead>
            <tr className="bg-slate-100 print:bg-slate-50 text-center font-bold">
              <th className="border border-slate-900 py-1.5 px-1 w-8">No</th>
              <th className="border border-slate-900 py-1.5 px-2 text-left">Nama Barang / Deskripsi</th>
              <th className="border border-slate-900 py-1.5 px-2 text-left">Spesifikasi Teknis</th>
              <th className="border border-slate-900 py-1.5 px-1 w-14">Volume</th>
              <th className="border border-slate-900 py-1.5 px-1 w-14">Satuan</th>
              <th className="border border-slate-900 py-1.5 px-2 w-28 text-center">Hasil Pemeriksaan</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={item.id} className="align-middle">
                <td className="border border-slate-900 py-1 px-1 text-center font-mono">{idx + 1}</td>
                <td className="border border-slate-900 py-1 px-2 font-semibold">{item.namaBarang}</td>
                <td className="border border-slate-900 py-1 px-2 text-[11px] text-slate-700">
                  {item.spesifikasi || '-'}
                </td>
                <td className="border border-slate-900 py-1 px-1 text-center font-mono tabular-nums">
                  {formatAngka(item.volume)}
                </td>
                <td className="border border-slate-900 py-1 px-1 text-center">{item.satuan}</td>
                <td className="border border-slate-900 py-1 px-2 text-center font-semibold text-emerald-800 print:text-black">
                  Baik & Lengkap (100%)
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="text-xs text-justify">
          Demikian Berita Acara Serah Terima Barang ini dibuat dengan sebenarnya dalam rangkap secukupnya untuk dapat dipergunakan sebagaimana mestinya dan sebagai dasar proses pembayaran.
        </p>
      </div>

      {/* Bagian Tanda Tangan 3 Pihak */}
      <div className="mt-4 pt-2">
        <div className="grid grid-cols-2 gap-4 text-xs">
          {/* Pihak Pertama */}
          <div className="text-center">
            <p className="font-bold">PIHAK PERTAMA</p>
            <p className="font-semibold">{penyedia.namaPerusahaan}</p>
            <div className="h-16 flex items-center justify-center">
              {printSettings.showMaterai ? (
                <div className="border border-dashed border-slate-400 text-[10px] text-slate-500 py-0.5 px-2 rounded">
                  [ Materai ]
                </div>
              ) : null}
            </div>
            <p className="font-bold underline uppercase">{penyedia.namaPimpinan}</p>
            <p className="text-[11px] text-slate-700">{penyedia.jabatanPimpinan}</p>
          </div>

          {/* Pihak Kedua */}
          <div className="text-center">
            <p className="font-bold">PIHAK KEDUA</p>
            <p className="font-semibold">{pemeriksaBarang.jabatan}</p>
            <div className="h-16" />
            <p className="font-bold underline uppercase">{pemeriksaBarang.nama}</p>
            {pemeriksaBarang.nip && pemeriksaBarang.nip !== '-' && (
              <p className="font-mono text-[11px]">NIP. {pemeriksaBarang.nip}</p>
            )}
          </div>
        </div>

        {/* Mengetahui Pengguna Anggaran */}
        <div className="text-center text-xs mt-3">
          <p>{instansi.kotaKabupaten}, {formatTanggalIndonesia(dokumen.tglBAST)}</p>
          <p className="font-bold">Mengetahui / Menyetujui,</p>
          <p className="font-semibold">{penggunaAnggaran.jabatan}</p>
          <div className="h-16" />
          <p className="font-bold underline uppercase">{penggunaAnggaran.nama}</p>
          {penggunaAnggaran.nip && penggunaAnggaran.nip !== '-' && (
            <p className="font-mono text-[11px]">NIP. {penggunaAnggaran.nip}</p>
          )}
          {penggunaAnggaran.pangkatGol && (
            <p className="text-[11px] text-slate-700">{penggunaAnggaran.pangkatGol}</p>
          )}
        </div>
      </div>
    </div>
  );
};
