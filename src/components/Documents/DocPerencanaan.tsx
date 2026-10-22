import React from 'react';
import { ProcurementProject } from '../../types/procurement';
import { DocumentKop } from './DocumentKop';
import { formatRupiah, formatAngka, formatTanggalIndonesia, hitungFinansial } from '../../utils/formatters';
import { terbilang } from '../../utils/terbilang';

interface DocProps {
  project: ProcurementProject;
}

export const DocPerencanaan: React.FC<DocProps> = ({ project }) => {
  const { instansi, penggunaAnggaran, pejabatPengadaan, dokumen, items, pajak, printSettings } = project;
  const { subtotal, ppn, totalKotor } = hitungFinansial(items, pajak);

  return (
    <div
      className={`bg-white text-slate-900 mx-auto p-8 shadow-sm print:shadow-none print:p-0 print:m-0 w-full max-w-[210mm] min-h-[297mm] font-serif leading-relaxed text-[13px] border border-slate-200 print:border-none box-border flex flex-col justify-between`}
    >
      <div>
        <DocumentKop instansi={instansi} showKop={printSettings.showKop} />

        {/* Judul Dokumen */}
        <div className="text-center my-3">
          <h2 className="text-base font-bold underline tracking-wide uppercase">
            SURAT PERENCANAAN PENGADAAN BARANG / JASA
          </h2>
          <p className="text-xs font-semibold text-slate-700 mt-0.5">
            Nomor: {dokumen.noPerencanaan || '.../.../.../2026'}
          </p>
        </div>

        {/* Identitas Paket */}
        <div className="my-3 space-y-1 text-xs">
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-3 font-semibold">Nama Paket</span>
            <span className="col-span-9 font-semibold">: {dokumen.namaPaket}</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-3">Dasar Perencanaan</span>
            <span className="col-span-9">: {dokumen.dasarPerencanaan || '-'}</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-3">Sumber Dana</span>
            <span className="col-span-9">: {dokumen.sumberDana}</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-3">Tahun Anggaran</span>
            <span className="col-span-9">: {dokumen.tahunAnggaran}</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-3">Kode Rekening / MAK</span>
            <span className="col-span-9">: {dokumen.kodeRekening}</span>
          </div>
        </div>

        <p className="text-xs mb-2 text-justify">
          Berdasarkan hasil identifikasi kebutuhan sarana dan prasarana penunjang operasional, bersama ini disusun Rencana Kebutuhan dan Perkiraan Harga (RAB/HPS) Pengadaan sebagai berikut:
        </p>

        {/* Tabel Kebutuhan Barang */}
        <table className="w-full border-collapse border border-slate-900 text-xs mb-3">
          <thead>
            <tr className="bg-slate-100 print:bg-slate-50 text-center font-bold">
              <th className="border border-slate-900 py-1.5 px-1 w-8">No</th>
              <th className="border border-slate-900 py-1.5 px-2 text-left">Nama Barang & Spesifikasi Teknis</th>
              <th className="border border-slate-900 py-1.5 px-1 w-16">Volume</th>
              <th className="border border-slate-900 py-1.5 px-1 w-14">Satuan</th>
              <th className="border border-slate-900 py-1.5 px-2 w-28 text-right">Harga Satuan (Rp)</th>
              <th className="border border-slate-900 py-1.5 px-2 w-32 text-right">Jumlah Total (Rp)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => {
              const lineTotal = (item.volume || 0) * (item.hargaSatuan || 0);
              return (
                <tr key={item.id} className="align-top">
                  <td className="border border-slate-900 py-1 px-1 text-center font-mono">{idx + 1}</td>
                  <td className="border border-slate-900 py-1 px-2">
                    <span className="font-semibold block">{item.namaBarang}</span>
                    {item.spesifikasi && <span className="text-[11px] text-slate-700">{item.spesifikasi}</span>}
                  </td>
                  <td className="border border-slate-900 py-1 px-1 text-center font-mono tabular-nums">
                    {formatAngka(item.volume)}
                  </td>
                  <td className="border border-slate-900 py-1 px-1 text-center">{item.satuan}</td>
                  <td className="border border-slate-900 py-1 px-2 text-right font-mono tabular-nums">
                    {formatAngka(item.hargaSatuan)}
                  </td>
                  <td className="border border-slate-900 py-1 px-2 text-right font-mono tabular-nums">
                    {formatAngka(lineTotal)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="font-semibold">
              <td colSpan={5} className="border border-slate-900 py-1 px-2 text-right">
                Jumlah Estimasi Biaya (Sebelum Pajak):
              </td>
              <td className="border border-slate-900 py-1 px-2 text-right font-mono tabular-nums">
                {formatAngka(subtotal)}
              </td>
            </tr>
            {pajak.kenaPPN && (
              <tr>
                <td colSpan={5} className="border border-slate-900 py-1 px-2 text-right">
                  PPN {pajak.ppnPersen}%:
                </td>
                <td className="border border-slate-900 py-1 px-2 text-right font-mono tabular-nums">
                  {formatAngka(ppn)}
                </td>
              </tr>
            )}
            <tr className="font-bold bg-slate-100 print:bg-slate-50">
              <td colSpan={5} className="border border-slate-900 py-1.5 px-2 text-right">
                Total Perkiraan Biaya Pengadaan (RAB/HPS):
              </td>
              <td className="border border-slate-900 py-1.5 px-2 text-right font-mono tabular-nums text-sm">
                {formatRupiah(totalKotor)}
              </td>
            </tr>
          </tfoot>
        </table>

        {/* Terbilang */}
        <div className="border border-slate-800 p-2 text-xs italic bg-slate-50 print:bg-transparent mb-4">
          <span className="font-bold not-italic">Terbilang : </span>
          {terbilang(totalKotor)}
        </div>

        <p className="text-xs text-justify">
          Rencana kebutuhan ini disusun sebagai dokumen acuan dalam pelaksanaan pengadaan barang/jasa sesuai dengan ketersediaan pagu anggaran tahun berjalan.
        </p>
      </div>

      {/* Bagian Tanda Tangan */}
      <div className="mt-6 pt-2">
        <div className="flex justify-between text-xs">
          <div className="text-center w-64">
            <p className="text-transparent select-none">Kota, Tanggal</p>
            <p className="font-bold">Menyetujui,</p>
            <p className="font-semibold">{penggunaAnggaran.jabatan}</p>
            <div className="h-20" />
            <p className="font-bold underline uppercase">{penggunaAnggaran.nama}</p>
            {penggunaAnggaran.nip && penggunaAnggaran.nip !== '-' && (
              <p className="font-mono text-[11px]">NIP. {penggunaAnggaran.nip}</p>
            )}
            {penggunaAnggaran.pangkatGol && (
              <p className="text-[11px] text-slate-700">{penggunaAnggaran.pangkatGol}</p>
            )}
          </div>

          <div className="text-center w-64">
            <p>{instansi.kotaKabupaten}, {formatTanggalIndonesia(dokumen.tglPerencanaan)}</p>
            <p className="font-bold">Disusun Oleh,</p>
            <p className="font-semibold">{pejabatPengadaan.jabatan}</p>
            <div className="h-20" />
            <p className="font-bold underline uppercase">{pejabatPengadaan.nama}</p>
            {pejabatPengadaan.nip && pejabatPengadaan.nip !== '-' && (
              <p className="font-mono text-[11px]">NIP. {pejabatPengadaan.nip}</p>
            )}
            {pejabatPengadaan.pangkatGol && (
              <p className="text-[11px] text-slate-700">{pejabatPengadaan.pangkatGol}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
