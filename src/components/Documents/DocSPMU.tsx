import React from 'react';
import { ProcurementProject } from '../../types/procurement';
import { DocumentKop } from './DocumentKop';
import { formatRupiah, formatAngka, formatTanggalIndonesia, hitungFinansial } from '../../utils/formatters';
import { terbilang } from '../../utils/terbilang';

interface DocProps {
  project: ProcurementProject;
}

export const DocSPMU: React.FC<DocProps> = ({ project }) => {
  const { instansi, penggunaAnggaran, bendahara, penyedia, dokumen, items, pajak, printSettings } = project;
  const { subtotal, ppn, totalKotor, pph, potonganLain, totalPotongan, totalBersih } = hitungFinansial(items, pajak);

  return (
    <div
      className={`bg-white text-slate-900 mx-auto p-8 shadow-sm print:shadow-none print:p-0 print:m-0 w-full max-w-[210mm] min-h-[297mm] font-serif leading-relaxed text-[13px] border border-slate-200 print:border-none box-border flex flex-col justify-between`}
    >
      <div>
        <DocumentKop instansi={instansi} showKop={printSettings.showKop} />

        {/* Judul SPMU */}
        <div className="text-center my-2">
          <h2 className="text-base font-bold underline tracking-wider uppercase">
            SURAT PERINTAH MEMBAYAR UANG (SPMU)
          </h2>
          <p className="text-xs font-semibold text-slate-700 mt-0.5">
            Nomor: {dokumen.noSPMU || '.../.../SPMU/.../2026'}
          </p>
        </div>

        {/* Ditujukan Kepada Bendahara */}
        <div className="text-xs my-2.5 bg-slate-50 print:bg-transparent p-2.5 rounded border border-slate-300">
          <p><span className="font-semibold">Kepada Yth :</span> {bendahara.jabatan}</p>
          <p><span className="font-semibold">Unit Organisasi :</span> {instansi.namaUnit}</p>
          <p className="mt-1 text-justify">
            Harap dibayarkan sejumlah uang untuk keperluan dan rincian sebagaimana di bawah ini kepada pihak yang berhak menerima:
          </p>
        </div>

        {/* Data Penerima Pembayaran */}
        <div className="space-y-1 text-xs my-2">
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-4 font-semibold">1. Nama Penerima</span>
            <span className="col-span-8">: {penyedia.namaPimpinan}</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-4 font-semibold">2. Nama Perusahaan / Rekanan</span>
            <span className="col-span-8 font-semibold uppercase">: {penyedia.namaPerusahaan}</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-4">3. Alamat Lengkap</span>
            <span className="col-span-8">: {penyedia.alamat}</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-4">4. NPWP Perusahaan</span>
            <span className="col-span-8 font-mono">: {penyedia.npwp || '-'}</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-4 font-semibold">5. Bank & Nomor Rekening</span>
            <span className="col-span-8 font-semibold">
              : {penyedia.namaBank} - No. Rek: <span className="font-mono">{penyedia.nomorRekening}</span> (a.n {penyedia.namaRekening})
            </span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-4">6. Keperluan Pembayaran</span>
            <span className="col-span-8 font-semibold">: {dokumen.keperluanPembayaran || dokumen.namaPaket}</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-4">7. Pembebanan Anggaran</span>
            <span className="col-span-8">: Kode Rekening {dokumen.kodeRekening}</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-4">8. Sumber Dana & Tahun</span>
            <span className="col-span-8">: {dokumen.sumberDana} (TA {dokumen.tahunAnggaran})</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-4">9. Dasar Pembayaran</span>
            <span className="col-span-8">: BAST No. {dokumen.noBAST} tgl {formatTanggalIndonesia(dokumen.tglBAST)}</span>
          </div>
        </div>

        {/* Tabel Rincian Keuangan & Pajak */}
        <table className="w-full border-collapse border border-slate-900 text-xs my-3">
          <thead>
            <tr className="bg-slate-100 print:bg-slate-50 font-bold text-center">
              <th className="border border-slate-900 py-1.5 px-2 w-10">No</th>
              <th className="border border-slate-900 py-1.5 px-3 text-left">Uraian Pembayaran & Potongan Pajak</th>
              <th className="border border-slate-900 py-1.5 px-3 w-40 text-right">Jumlah Nominal (Rp)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-900 py-1 px-2 text-center font-mono">1</td>
              <td className="border border-slate-900 py-1 px-3 font-semibold">
                Nilai Tagihan Bruto (Sebelum Pajak):
              </td>
              <td className="border border-slate-900 py-1 px-3 text-right font-mono tabular-nums">
                {formatAngka(subtotal)}
              </td>
            </tr>
            {pajak.kenaPPN && (
              <tr>
                <td className="border border-slate-900 py-1 px-2 text-center font-mono">2</td>
                <td className="border border-slate-900 py-1 px-3">
                  Pajak Pertambahan Nilai (PPN {pajak.ppnPersen}%):
                </td>
                <td className="border border-slate-900 py-1 px-3 text-right font-mono tabular-nums">
                  {formatAngka(ppn)}
                </td>
              </tr>
            )}
            <tr className="bg-slate-50 font-semibold">
              <td className="border border-slate-900 py-1 px-2 text-center"></td>
              <td className="border border-slate-900 py-1 px-3 text-right">
                Jumlah Total Bruto:
              </td>
              <td className="border border-slate-900 py-1 px-3 text-right font-mono tabular-nums font-bold">
                {formatAngka(totalKotor)}
              </td>
            </tr>
            {/* Rincian Potongan */}
            {pajak.pphType !== 'none' && (
              <tr>
                <td className="border border-slate-900 py-1 px-2 text-center font-mono">3</td>
                <td className="border border-slate-900 py-1 px-3 text-rose-800 print:text-black">
                  Potongan Pajak Penghasilan ({pajak.pphType.toUpperCase()} {pajak.pphPersen}%):
                </td>
                <td className="border border-slate-900 py-1 px-3 text-right font-mono tabular-nums text-rose-800 print:text-black">
                  - {formatAngka(pph)}
                </td>
              </tr>
            )}
            {potonganLain > 0 && (
              <tr>
                <td className="border border-slate-900 py-1 px-2 text-center font-mono">4</td>
                <td className="border border-slate-900 py-1 px-3 text-rose-800 print:text-black">
                  Potongan Lainnya ({pajak.ketPotonganLain || 'Lain-lain'}):
                </td>
                <td className="border border-slate-900 py-1 px-3 text-right font-mono tabular-nums text-rose-800 print:text-black">
                  - {formatAngka(potonganLain)}
                </td>
              </tr>
            )}
            {totalPotongan > 0 && (
              <tr className="bg-slate-50">
                <td className="border border-slate-900 py-1 px-2 text-center"></td>
                <td className="border border-slate-900 py-1 px-3 text-right font-semibold">
                  Total Potongan Pajak & Biaya:
                </td>
                <td className="border border-slate-900 py-1 px-3 text-right font-mono tabular-nums font-semibold text-rose-800 print:text-black">
                  {formatAngka(totalPotongan)}
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="bg-slate-200 print:bg-slate-100 font-bold text-sm">
              <td colSpan={2} className="border border-slate-900 py-2 px-3 text-right uppercase">
                Jumlah Bersih Yang Dibayarkan (Netto):
              </td>
              <td className="border border-slate-900 py-2 px-3 text-right font-mono tabular-nums text-base">
                {formatRupiah(totalBersih)}
              </td>
            </tr>
          </tfoot>
        </table>

        {/* Terbilang Bersih */}
        <div className="border border-slate-800 p-2 text-xs italic bg-slate-50 print:bg-transparent mb-3">
          <span className="font-bold not-italic">Terbilang (Jumlah Netto) : </span>
          {terbilang(totalBersih)}
        </div>
      </div>

      {/* Bagian Tanda Tangan */}
      <div className="mt-4 pt-2">
        <div className="flex justify-between items-start text-xs">
          {/* Kolom Kiri: Catatan Bendahara & Bukti Pembayaran */}
          <div className="border border-slate-400 p-2.5 rounded w-72 text-left bg-slate-50/50 print:bg-transparent">
            <p className="font-bold underline text-[11px] mb-1">Catatan Bendahara Pengeluaran:</p>
            <p className="text-[11px]">Telah dibayarkan tunai/transfer pada:</p>
            <p className="text-[11px]">Tanggal : ..............................................</p>
            <p className="text-[11px]">No. BKU : ..............................................</p>
            <div className="h-12" />
            <div className="text-center">
              <p className="font-bold underline uppercase">{bendahara.nama}</p>
              {bendahara.nip && bendahara.nip !== '-' && (
                <p className="font-mono text-[10px]">NIP. {bendahara.nip}</p>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Pengguna Anggaran */}
          <div className="text-center w-64">
            <p>{instansi.kotaKabupaten}, {formatTanggalIndonesia(dokumen.tglSPMU)}</p>
            <p className="font-bold">Yang Memerintahkan Pembayaran,</p>
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
        </div>
      </div>
    </div>
  );
};
