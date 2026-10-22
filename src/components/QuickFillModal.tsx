import React from 'react';
import { ProcurementProject } from '../types/procurement';
import { TEMPLATE_BOS_SEKOLAH, TEMPLATE_DINAS_IT, TEMPLATE_DESA } from '../utils/sampleData';
import { X, GraduationCap, Building2, Landmark, RefreshCw, Upload } from 'lucide-react';

interface QuickFillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (proj: ProcurementProject) => void;
  onFileImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const QuickFillModal: React.FC<QuickFillModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onFileImport,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Pilih Contoh Template Dokumen Siap Pakai
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Isi formulir secara instan dalam 1 klik dengan format standar Indonesia
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          {/* Opsi 1: BOS Sekolah */}
          <button
            type="button"
            onClick={() => {
              onSelectProject(TEMPLATE_BOS_SEKOLAH);
              onClose();
            }}
            className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/40 transition-all flex items-start gap-4 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-xs">
                  1. Template BOS Sekolah (SD / SMP / SMA)
                </span>
                <span className="text-[10px] bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">
                  Paling Populer
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Pengadaan Alat Tulis Kantor (ATK) & Kertas Ujian Asesmen Semester. Dilengkapi kop sekolah, kepala sekolah, tim BOS, bendahara, dan penyedia toko buku.
              </p>
            </div>
          </button>

          {/* Opsi 2: Dinas SKPD */}
          <button
            type="button"
            onClick={() => {
              onSelectProject(TEMPLATE_DINAS_IT);
              onClose();
            }}
            className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/40 transition-all flex items-start gap-4 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-xs">
                2. Template Dinas / SKPD Pemerintah Daerah
              </span>
              <p className="text-xs text-slate-600 mt-1">
                Pengadaan PC Workstation, Printer dan UPS Layanan Publik. Dilengkapi PPK, Pejabat Pengadaan, PPHP, bendahara SKPD, potongan PPN 11% & PPh 22.
              </p>
            </div>
          </button>

          {/* Opsi 3: APBDes */}
          <button
            type="button"
            onClick={() => {
              onSelectProject(TEMPLATE_DESA);
              onClose();
            }}
            className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/40 transition-all flex items-start gap-4 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-xs">
                3. Template Pemerintah Desa / Kalurahan (APBDes)
              </span>
              <p className="text-xs text-slate-600 mt-1">
                Pengadaan Meubelair & Sarana Posyandu / Balai Desa. Dilengkapi format Lurah/Kades, Kaur Keuangan Desa, TPK Desa, dan rekanan meubel lokal.
              </p>
            </div>
          </button>

          {/* Import JSON File */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 cursor-pointer">
              <Upload className="w-4 h-4 text-indigo-600" />
              <span>Import File Proyek (.JSON) dari Komputer</span>
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => {
                  onFileImport(e);
                  onClose();
                }}
              />
            </label>
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
