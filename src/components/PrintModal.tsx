import React from 'react';
import { X, Printer, Files, FileText, CheckCircle2 } from 'lucide-react';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrintDoc: (target: 'all' | 'perencanaan' | 'sp' | 'bast' | 'spmu') => void;
  currentActiveDoc: 'perencanaan' | 'sp' | 'bast' | 'spmu' | 'all';
}

export const PrintModal: React.FC<PrintModalProps> = ({
  isOpen,
  onClose,
  onSelectPrintDoc,
  currentActiveDoc,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Pilih Dokumen Yang Ingin Dicetak / Disimpan ke PDF
              </h3>
              <p className="text-[11px] text-slate-500">
                Format resmi presisi A4 / F4 siap cetak atau simpan ke PDF
              </p>
            </div>
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
          {/* Opsi Bundel Lengkap (Paling Direkomendasikan) */}
          <button
            type="button"
            onClick={() => {
              onSelectPrintDoc('all');
              onClose();
            }}
            className="w-full text-left p-4 rounded-xl border-2 border-indigo-500 bg-indigo-50/50 hover:bg-indigo-50 transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Files className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-950 text-xs">
                    Cetak Bundel Lengkap (Semua 4 Dokumen)
                  </span>
                  <span className="text-[10px] bg-indigo-600 text-white font-semibold px-2 py-0.5 rounded-full">
                    Rekomendasi
                  </span>
                </div>
                <p className="text-xs text-indigo-900/80 mt-0.5">
                  Surat Perencanaan + Surat Pesanan + BAST + SPMU dalam 1 file PDF berurutan rapi.
                </p>
              </div>
            </div>
            <Printer className="w-5 h-5 text-indigo-600 shrink-0" />
          </button>

          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1 pt-1">
            Atau Cetak Satuan Dokumen:
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                onSelectPrintDoc('perencanaan');
                onClose();
              }}
              className="p-3 text-left rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-slate-50 transition-all flex items-center justify-between cursor-pointer"
            >
              <div>
                <p className="text-xs font-bold text-slate-900">1. Surat Perencanaan</p>
                <p className="text-[11px] text-slate-500">Rencana Kebutuhan / RAB</p>
              </div>
              <Printer className="w-4 h-4 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => {
                onSelectPrintDoc('sp');
                onClose();
              }}
              className="p-3 text-left rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-slate-50 transition-all flex items-center justify-between cursor-pointer"
            >
              <div>
                <p className="text-xs font-bold text-slate-900">2. Surat Pesanan (SP)</p>
                <p className="text-[11px] text-slate-500">Order Letter / Rekanan</p>
              </div>
              <Printer className="w-4 h-4 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => {
                onSelectPrintDoc('bast');
                onClose();
              }}
              className="p-3 text-left rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-slate-50 transition-all flex items-center justify-between cursor-pointer"
            >
              <div>
                <p className="text-xs font-bold text-slate-900">3. BAST</p>
                <p className="text-[11px] text-slate-500">Serah Terima & Pemeriksaan</p>
              </div>
              <Printer className="w-4 h-4 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => {
                onSelectPrintDoc('spmu');
                onClose();
              }}
              className="p-3 text-left rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-slate-50 transition-all flex items-center justify-between cursor-pointer"
            >
              <div>
                <p className="text-xs font-bold text-slate-900">4. SPMU</p>
                <p className="text-[11px] text-slate-500">Perintah Bayar Bendahara</p>
              </div>
              <Printer className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <p className="font-semibold text-slate-800">Petunjuk:</p>
            <p>
              Di jendela cetak browser yang muncul, pilih <strong>Destination: Save as PDF</strong> jika ingin mendownload berkas PDF jernih ke komputer Anda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
