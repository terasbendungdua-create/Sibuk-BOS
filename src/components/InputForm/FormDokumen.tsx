import React from 'react';
import { DokumenInfo, InstansiData } from '../../types/procurement';
import { FileText, Calendar, Sparkles, Hash } from 'lucide-react';
import { BULAN_ROMAWI } from '../../utils/formatters';

interface FormDokumenProps {
  dokumen: DokumenInfo;
  onChangeDokumen: (dok: DokumenInfo) => void;
  instansi: InstansiData;
}

export const FormDokumen: React.FC<FormDokumenProps> = ({
  dokumen,
  onChangeDokumen,
  instansi,
}) => {
  const update = (field: keyof DokumenInfo, val: string) => {
    onChangeDokumen({ ...dokumen, [field]: val });
  };

  /**
   * Mengisi alur tanggal administrasi otomatis:
   * Tanggal Perencanaan (T) -> SP (T + 4 hari) -> BAST (T + 9 hari) -> SPMU (T + 11 hari)
   */
  const autoUrutkanTanggal = () => {
    const base = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const toYMD = (d: Date) =>
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

    const tglPerenc = new Date(base);
    tglPerenc.setDate(tglPerenc.getDate() - 10);

    const tglSP = new Date(tglPerenc);
    tglSP.setDate(tglSP.getDate() + 4);

    const tglBatas = new Date(tglSP);
    tglBatas.setDate(tglBatas.getDate() + 5);

    const tglBAST = new Date(tglBatas);

    const tglSPMU = new Date(tglBAST);
    tglSPMU.setDate(tglSPMU.getDate() + 2);

    onChangeDokumen({
      ...dokumen,
      tglPerencanaan: toYMD(tglPerenc),
      tglSuratPesanan: toYMD(tglSP),
      batasPengiriman: toYMD(tglBatas),
      tglBAST: toYMD(tglBAST),
      tglSPMU: toYMD(tglSPMU),
    });
  };

  /**
   * Menghasilkan format nomor surat dinas standar secara otomatis
   */
  const autoGenerateNomor = () => {
    const d = new Date();
    const bln = BULAN_ROMAWI[d.getMonth()] || 'X';
    const thn = dokumen.tahunAnggaran || String(d.getFullYear());

    // Buat akronim singkat dari nama unit kerja
    const cleanUnit = (instansi.namaUnit || 'INSTANSI')
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .split(' ')
      .filter((w) => w.length > 2)
      .slice(0, 3)
      .map((w) => w.substring(0, 4).toUpperCase())
      .join('.');

    onChangeDokumen({
      ...dokumen,
      noPerencanaan: `020/${cleanUnit}/PERENC/${bln}/${thn}`,
      noSuratPesanan: `027/${cleanUnit}/SP/${bln}/${thn}`,
      noBAST: `028/${cleanUnit}/BAST/${bln}/${thn}`,
      noSPMU: `900/${cleanUnit}/SPMU/${bln}/${thn}`,
    });
  };

  return (
    <div className="space-y-6 text-sm">
      {/* Informasi Umum Paket Pekerjaan */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-4 text-slate-800 font-semibold border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <span>Informasi Paket Pekerjaan & Anggaran</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Nama Paket Pekerjaan Pengadaan *
            </label>
            <input
              type="text"
              placeholder="Contoh: Pengadaan Alat Tulis Kantor (ATK) dan Kertas Ujian Semester Ganjil"
              value={dokumen.namaPaket}
              onChange={(e) => update('namaPaket', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Sumber Dana *
            </label>
            <input
              type="text"
              placeholder="Contoh: Dana BOS Reguler Tahap I / APBD / APBDes"
              value={dokumen.sumberDana}
              onChange={(e) => update('sumberDana', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Tahun Anggaran *
            </label>
            <input
              type="text"
              placeholder="Contoh: 2026"
              value={dokumen.tahunAnggaran}
              onChange={(e) => update('tahunAnggaran', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Kode Rekening / Kode MAK
            </label>
            <input
              type="text"
              placeholder="Contoh: 5.1.02.01.01.0024 (Belanja ATK)"
              value={dokumen.kodeRekening}
              onChange={(e) => update('kodeRekening', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Jangka Waktu Pelaksanaan
            </label>
            <input
              type="text"
              placeholder="Contoh: 5 (lima) hari kalender"
              value={dokumen.waktuPelaksanaan}
              onChange={(e) => update('waktuPelaksanaan', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Tempat Penyerahan / Pemeriksaan Barang
            </label>
            <input
              type="text"
              placeholder="Contoh: Ruang Tata Usaha / Gudang Inventaris SMP Negeri 1 Banyumas"
              value={dokumen.tempatPenyerahan}
              onChange={(e) => update('tempatPenyerahan', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs"
            />
          </div>
        </div>
      </div>

      {/* Generator Otomatis Cepat */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Otomasi Penomoran & Rangkaian Tanggal</span>
          </h4>
          <p className="text-[11px] text-indigo-800 mt-0.5">
            Hemat waktu dengan mengisi nomor dokumen dan urutan tanggal administrasi secara otomatis.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={autoUrutkanTanggal}
            className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-50 text-indigo-700 font-medium text-xs rounded-lg border border-indigo-300 shadow-2xs transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Urutkan Tanggal Logis</span>
          </button>
          <button
            type="button"
            onClick={autoGenerateNomor}
            className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Hash className="w-3.5 h-3.5" />
            <span>Format Nomor Standar</span>
          </button>
        </div>
      </div>

      {/* Pengaturan 4 Dokumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dokumen 1: Surat Perencanaan */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-slate-800 font-semibold border-b border-slate-100 pb-2">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">1</span>
            <span className="text-xs">Surat Perencanaan Pengadaan</span>
          </div>
          <div className="space-y-2.5">
            <div>
              <label className="block text-[11px] text-slate-500">Nomor Surat Perencanaan</label>
              <input
                type="text"
                value={dokumen.noPerencanaan}
                onChange={(e) => update('noPerencanaan', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
                placeholder="020/SMP.01/PERENC/IV/2026"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500">Tanggal Perencanaan</label>
              <input
                type="date"
                value={dokumen.tglPerencanaan}
                onChange={(e) => update('tglPerencanaan', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500">Dasar Pelaksanaan</label>
              <input
                type="text"
                value={dokumen.dasarPerencanaan}
                onChange={(e) => update('dasarPerencanaan', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                placeholder="RKAS BOS Reguler Tahun Anggaran 2026"
              />
            </div>
          </div>
        </div>

        {/* Dokumen 2: Surat Pesanan */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-slate-800 font-semibold border-b border-slate-100 pb-2">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">2</span>
            <span className="text-xs">Surat Pesanan (SP)</span>
          </div>
          <div className="space-y-2.5">
            <div>
              <label className="block text-[11px] text-slate-500">Nomor Surat Pesanan</label>
              <input
                type="text"
                value={dokumen.noSuratPesanan}
                onChange={(e) => update('noSuratPesanan', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
                placeholder="027/SP/SMP.01/IV/2026"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500">Tanggal Surat Pesanan</label>
              <input
                type="date"
                value={dokumen.tglSuratPesanan}
                onChange={(e) => update('tglSuratPesanan', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500">Batas Akhir Penyerahan Barang</label>
              <input
                type="date"
                value={dokumen.batasPengiriman}
                onChange={(e) => update('batasPengiriman', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>
        </div>

        {/* Dokumen 3: BAST */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-slate-800 font-semibold border-b border-slate-100 pb-2">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">3</span>
            <span className="text-xs">Berita Acara Serah Terima (BAST)</span>
          </div>
          <div className="space-y-2.5">
            <div>
              <label className="block text-[11px] text-slate-500">Nomor BAST</label>
              <input
                type="text"
                value={dokumen.noBAST}
                onChange={(e) => update('noBAST', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
                placeholder="028/BAST/SMP.01/IV/2026"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500">Tanggal BAST (Serah Terima Fisik)</label>
              <input
                type="date"
                value={dokumen.tglBAST}
                onChange={(e) => update('tglBAST', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500">Nomor Berita Acara Pemeriksaan (Opsional)</label>
              <input
                type="text"
                value={dokumen.noPemeriksaan || ''}
                onChange={(e) => update('noPemeriksaan', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
                placeholder="028.A/BA-PEMERIKSAAN/2026"
              />
            </div>
          </div>
        </div>

        {/* Dokumen 4: SPMU */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-slate-800 font-semibold border-b border-slate-100 pb-2">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">4</span>
            <span className="text-xs">Surat Perintah Membayar Uang (SPMU)</span>
          </div>
          <div className="space-y-2.5">
            <div>
              <label className="block text-[11px] text-slate-500">Nomor SPMU</label>
              <input
                type="text"
                value={dokumen.noSPMU}
                onChange={(e) => update('noSPMU', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
                placeholder="030/SPMU/SMP.01/IV/2026"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500">Tanggal SPMU</label>
              <input
                type="date"
                value={dokumen.tglSPMU}
                onChange={(e) => update('tglSPMU', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500">Uraian / Keperluan Pembayaran</label>
              <input
                type="text"
                value={dokumen.keperluanPembayaran}
                onChange={(e) => update('keperluanPembayaran', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                placeholder="Pembayaran Pengadaan ATK dan Kertas Ujian Asesmen Tahap I"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
