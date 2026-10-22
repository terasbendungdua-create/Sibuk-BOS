import React from 'react';
import { PrintSettings } from '../../types/procurement';
import { Printer, FileCheck, HelpCircle } from 'lucide-react';

interface FormPrintSettingsProps {
  settings: PrintSettings;
  onChangeSettings: (settings: PrintSettings) => void;
}

export const FormPrintSettings: React.FC<FormPrintSettingsProps> = ({
  settings,
  onChangeSettings,
}) => {
  return (
    <div className="space-y-6 text-sm">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-4 text-slate-800 font-semibold border-b border-slate-100 pb-2">
          <Printer className="w-5 h-5 text-indigo-600" />
          <span>Pengaturan Kertas & Format Cetak Dokumen</span>
        </div>

        <div className="space-y-4">
          {/* Ukuran Kertas */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Ukuran Kertas Dokumen
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  settings.paperSize === 'A4'
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 font-semibold shadow-2xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paperSize"
                    value="A4"
                    checked={settings.paperSize === 'A4'}
                    onChange={() =>
                      onChangeSettings({ ...settings, paperSize: 'A4' })
                    }
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <p className="text-xs font-bold">Kertas A4 (Standar)</p>
                    <p className="text-[11px] text-slate-500">210 mm x 297 mm</p>
                  </div>
                </div>
                <FileCheck className="w-4 h-4 text-indigo-600" />
              </label>

              <label
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  settings.paperSize === 'F4'
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 font-semibold shadow-2xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paperSize"
                    value="F4"
                    checked={settings.paperSize === 'F4'}
                    onChange={() =>
                      onChangeSettings({ ...settings, paperSize: 'F4' })
                    }
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <p className="text-xs font-bold">Kertas F4 / Folio</p>
                    <p className="text-[11px] text-slate-500">215 mm x 330 mm</p>
                  </div>
                </div>
                <FileCheck className="w-4 h-4 text-indigo-600" />
              </label>
            </div>
          </div>

          {/* Opsi Tampilan Kop Surat */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showKop}
                onChange={(e) =>
                  onChangeSettings({ ...settings, showKop: e.target.checked })
                }
                className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <div>
                <p className="text-xs font-semibold text-slate-900">
                  Cetak Kop Surat Lengkap (Termasuk Logo & Garis Ganda)
                </p>
                <p className="text-[11px] text-slate-500">
                  Nonaktifkan opsi ini jika Anda ingin mencetak dokumen pada kertas yang sudah memiliki kop resmi dari percetakan.
                </p>
              </div>
            </label>
          </div>

          {/* Opsi Kotak Materai */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showMaterai}
                onChange={(e) =>
                  onChangeSettings({ ...settings, showMaterai: e.target.checked })
                }
                className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <div>
                <p className="text-xs font-semibold text-slate-900">
                  Tampilkan Kotak Panduan Tempel Materai Rp10.000
                </p>
                <p className="text-[11px] text-slate-500">
                  Memberikan tanda kotak putus-putus pada kolom tanda tangan penyedia di Surat Pesanan & BAST.
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Petunjuk Cetak PDF Sempurna */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-900">
          <HelpCircle className="w-4 h-4 text-amber-600" />
          <span>Tips Mencetak & Menyimpan PDF Jernih Siap Cetak</span>
        </div>
        <ul className="list-disc list-inside space-y-1 text-slate-800 text-[11.5px] pl-1">
          <li>
            Saat jendela cetak terbuka (Ctrl + P / Cmd + P), pilih <strong>Destination: Save as PDF (Simpan sebagai PDF)</strong>.
          </li>
          <li>
            Pada bagian <strong>Margin</strong>, pilih <strong>Default</strong> atau <strong>None</strong> agar batas tabel rapi.
          </li>
          <li>
            Pastikan opsi <strong>Background graphics (Grafik latar belakang)</strong> dicentang agar warna latar tabel resmi tercetak sempurna.
          </li>
          <li>
            Gunakan tombol <strong>"Cetak Bundel Dokumen"</strong> untuk mengekspor Surat Perencanaan, Surat Pesanan, BAST, dan SPMU sekaligus dalam 1 berkas PDF rapi!
          </li>
        </ul>
      </div>
    </div>
  );
};
