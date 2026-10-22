import React from 'react';
import { ProcurementProject } from '../../types/procurement';
import { DocumentKop } from './DocumentKop';
import { formatRupiah, formatAngka, formatTanggalIndonesia, hitungFinansial } from '../../utils/formatters';
import { terbilang } from '../../utils/terbilang';

interface DocProps {
  project: ProcurementProject;
}

export const DocSuratPesanan: React.FC<DocProps> = ({ project }) => {
  const { instansi, pejabatPengadaan, penyedia, dokumen, items, pajak, printSettings } = project;
  const { subtotal, ppn, totalKotor } = hitungFinansial(items, pajak);

  return (
    <div
      className={`bg-white text-slate-900 mx-auto p-8 shadow-sm print:shadow-none print:p-0 print:m-0 w-full max-w-[210mm] min-h-[297mm] font-serif leading-relaxed text-[13px] border border-slate-200 print:border-none box-border flex flex-col justify-between`}
    >
      <div>
        <DocumentKop instansi={instansi} showKop={printSettings.showKop} />

        {/* Header Surat Pesanan */}
        <div className="text-center my-2">
          <h2 className="text-base font-bold underline tracking-wider uppercase">
            SURAT PESANAN (SP)
          </h2>
          <p className="text-xs font-semibold text-slate-700 mt-0.5">
            Nomor: {dokumen.noSuratPesanan || '.../.../SP/.../2026'}
          </p>
        </div>

        {/* Tujuan / Kepada */}
        <div className="flex justify-between items-start text-xs my-3">
          <div className="space-y-0.5">
            <p><span className="font-semibold">Paket Pekerjaan :</span> {dokumen.namaPaket}</p>
            <p><span className="font-semibold">Sumber Dana :</span> {dokumen.sumberDana}</p>
            <p><span className="font-semibold">Tahun Anggaran :</span> {dokumen.tahunAnggaran}</p>
          </div>
          <div className="text-left border border-slate-300 p-2 rounded bg-slate-50 print:bg-transparent min-w-[220px]">
            <p className="font-semibold text-slate-800">Kepada Yth :</p>
            <p className="font-bold uppercase text-slate-950">{penyedia.namaPerusahaan}</p>
            <p>d/a. {penyedia.alamat}</p>
            {penyedia.telepon && <p>Telp/HP: {penyedia.telepon}</p>}
          </div>
        </div>

        <p className="text-xs text-justify mb-2">
          Dengan ini diperintahkan kepada Penyedia untuk melaksanakan dan mengirimkan pesanan pengadaan barang sesuai dengan rincian dan ketentuan berikut ini:
        </p>

        {/* Tabel Rincian Pesanan */}
        <table className="w-full border-collapse border border-slate-900 text-xs mb-3">
          <thead>
            <tr className="bg-slate-100 print:bg-slate-50 text-center font-bold">
              <th className="border border-slate-900 py-1.5 px-1 w-8">No</th>
              <th className="border border-slate-900 py-1.5 px-2 text-left">Nama Barang & Spesifikasi</th>
              <th className="border border-slate-900 py-1.5 px-1 w-14">Jumlah</th>
              <th className="border border-slate-900 py-1.5 px-1 w-14">Satuan</th>
              <th className="border border-slate-900 py-1.5 px-2 w-28 text-right">Harga Satuan (Rp)</th>
              <th className="border border-slate-900 py-1.5 px-2 w-32 text-right">Total Harga (Rp)</th>
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
                Jumlah Nilai Barang:
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
                Total Nilai Surat Pesanan:
              </td>
              <td className="border border-slate-900 py-1.5 px-2 text-right font-mono tabular-nums text-sm">
                {formatRupiah(totalKotor)}
              </td>
            </tr>
          </tfoot>
        </table>

        {/* Terbilang */}
        <div className="border border-slate-800 p-2 text-xs italic bg-slate-50 print:bg-transparent mb-3">
          <span className="font-bold not-italic">Terbilang : </span>
          {terbilang(totalKotor)}
        </div>

        {/* Syarat & Ketentuan Pengadaan */}
        <div className="border border-slate-300 p-2.5 rounded text-[11.5px] space-y-1 mb-2 bg-slate-50/50 print:bg-transparent">
          <p className="font-bold underline text-xs">Syarat & Ketentuan Pemesanan:</p>
          <ol className="list-decimal list-inside space-y-0.5 text-justify">
            <li>
              <strong>Jangka Waktu Pengiriman:</strong> Barang harus diserahkan selambat-lambatnya <strong>{dokumen.waktuPelaksanaan || '7 hari kerja'}</strong> atau pada tanggal <strong>{formatTanggalIndonesia(dokumen.batasPengiriman)}</strong>.
            </li>
            <li>
              <strong>Tempat Penyerahan:</strong> Ditujukan langsung ke <strong>{dokumen.tempatPenyerahan || instansi.namaUnit}</strong>.
            </li>
            <li>
              <strong>Kualitas Barang:</strong> Barang yang dikirim harus 100% baru, orisinal, bebas cacat, dan sesuai dengan spesifikasi teknis.
            </li>
            <li>
              <strong>Tata Cara Pembayaran:</strong> Pembayaran dilakukan secara non-tunai (transfer bank) setelah seluruh barang diterima dengan baik dan diterbitkan Berita Acara Serah Terima (BAST).
            </li>
          </ol>
        </div>
      </div>

      {/* Bagian Tanda Tangan */}
      <div className="mt-4 pt-1">
        <div className="flex justify-between items-end text-xs">
          {/* Tanda Tangan Penyedia */}
          <div className="text-center w-64">
            <p className="font-bold">Menerima dan Menyetujui,</p>
            <p className="font-semibold uppercase">{penyedia.namaPerusahaan}</p>
            <div className="h-20 flex items-center justify-center">
              {printSettings.showMaterai ? (
                <div className="border border-dashed border-slate-400 text-[10px] text-slate-500 py-1 px-2 rounded">
                  [ Materai Rp10.000 ]
                </div>
              ) : null}
            </div>
            <p className="font-bold underline uppercase">{penyedia.namaPimpinan}</p>
            <p className="text-[11px] text-slate-700">{penyedia.jabatanPimpinan}</p>
          </div>

          {/* Tanda Tangan Pejabat Pengadaan */}
          <div className="text-center w-64">
            <p>{instansi.kotaKabupaten}, {formatTanggalIndonesia(dokumen.tglSuratPesanan)}</p>
            <p className="font-bold">Yang Memesan,</p>
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
