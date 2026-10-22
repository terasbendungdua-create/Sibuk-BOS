import React from 'react';
import { Printer, Sparkles, FileText, Download } from 'lucide-react';

interface TopBarProps {
  onTriggerPrint: () => void;
  onOpenQuickFill: () => void;
  onExportJson: () => void;
  activeDocName: string;
  packageName: string;
  unitName: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  onTriggerPrint,
  onOpenQuickFill,
  onExportJson,
  activeDocName,
  packageName,
  unitName,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3 bg-white border-b border-slate-200 sticky top-0 z-40 shadow-2xs">
      {/* Zone 1: Contextual Breadcrumb Trail */}
      <div className="flex items-center gap-2 text-xs text-slate-500 whitespace-nowrap shrink-0 min-w-0">
        <span className="font-semibold text-slate-800">{unitName || 'Pengadaan Instansi'}</span>
        <span className="text-slate-300">/</span>
        <span className="truncate max-w-[240px] text-slate-600 hidden sm:inline" title={packageName}>
          {packageName || 'Paket Pekerjaan'}
        </span>
        <span className="text-slate-300 hidden sm:inline">/</span>
        <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
          {activeDocName}
        </span>
      </div>

      {/* Zone 2: Concise Navigation Links */}
      <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-600">
        <button
          type="button"
          onClick={onOpenQuickFill}
          className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Template Siap Pakai
        </button>
        <button
          type="button"
          onClick={onExportJson}
          className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Ekspor Cadangan Proyek
        </button>
        <span className="text-slate-300">·</span>
        <span className="text-slate-400 font-mono text-[11px] whitespace-nowrap shrink-0">
          Format Standar A4/F4 Siap Cetak
        </span>
      </nav>

      {/* Zone 3: 1 Primary Action */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onTriggerPrint}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:scale-98 transition-all shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak / Simpan PDF</span>
        </button>
      </div>
    </header>
  );
};
