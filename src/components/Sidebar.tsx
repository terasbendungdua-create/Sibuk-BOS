import React from 'react';
import { ProcurementProject } from '../types/procurement';
import { formatRupiah, hitungFinansial } from '../utils/formatters';
import {
  FileText,
  Files,
  ClipboardList,
  CheckSquare,
  Receipt,
  ShoppingBag,
  Building2,
  Store,
  Sliders,
  Sparkles,
  Printer,
  ChevronRight,
  Download,
  Upload,
  Calendar,
} from 'lucide-react';

interface SidebarProps {
  project: ProcurementProject;
  activeDoc: 'all' | 'perencanaan' | 'sp' | 'bast' | 'spmu';
  onSelectDoc: (doc: 'all' | 'perencanaan' | 'sp' | 'bast' | 'spmu') => void;
  activeTab: 'items' | 'dokumen' | 'instansi' | 'penyedia' | 'settings';
  onSelectTab: (tab: 'items' | 'dokumen' | 'instansi' | 'penyedia' | 'settings') => void;
  onQuickPrint: (doc: 'all' | 'perencanaan' | 'sp' | 'bast' | 'spmu') => void;
  onOpenQuickFill: () => void;
  onExportJson: () => void;
  onImportJson: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  project,
  activeDoc,
  onSelectDoc,
  activeTab,
  onSelectTab,
  onQuickPrint,
  onOpenQuickFill,
  onExportJson,
  onImportJson,
}) => {
  const financial = hitungFinansial(project.items, project.pajak);

  const documentItems = [
    {
      id: 'all' as const,
      title: 'Bundel 4 Dokumen',
      subtitle: 'Cetak semua dokumen sekaligus',
      icon: Files,
      code: 'SEMUA',
      badge: 'Lengkap',
    },
    {
      id: 'perencanaan' as const,
      title: '1. Surat Perencanaan',
      subtitle: project.dokumen.noPerencanaan ? `No. ${project.dokumen.noPerencanaan}` : 'Rencana Kebutuhan & RAB',
      icon: ClipboardList,
      code: 'PERENC',
    },
    {
      id: 'sp' as const,
      title: '2. Surat Pesanan (SP)',
      subtitle: project.dokumen.noSuratPesanan ? `No. ${project.dokumen.noSuratPesanan}` : 'Pemesanan ke Rekanan',
      icon: FileText,
      code: 'SP',
    },
    {
      id: 'bast' as const,
      title: '3. Berita Acara (BAST)',
      subtitle: project.dokumen.noBAST ? `No. ${project.dokumen.noBAST}` : 'Serah Terima & Pemeriksaan',
      icon: CheckSquare,
      code: 'BAST',
    },
    {
      id: 'spmu' as const,
      title: '4. SPMU (Perintah Bayar)',
      subtitle: project.dokumen.noSPMU ? `No. ${project.dokumen.noSPMU}` : 'Pencairan Dana Bendahara',
      icon: Receipt,
      code: 'SPMU',
    },
  ];

  const formTabs = [
    {
      id: 'items' as const,
      title: 'Daftar Barang & Pajak',
      badge: `${project.items.length} item`,
      icon: ShoppingBag,
    },
    {
      id: 'dokumen' as const,
      title: 'Paket & Nomor Surat',
      badge: project.dokumen.tahunAnggaran || '2026',
      icon: Calendar,
    },
    {
      id: 'instansi' as const,
      title: 'Instansi & Pejabat',
      badge: '4 TTD',
      icon: Building2,
    },
    {
      id: 'penyedia' as const,
      title: 'Penyedia & Rekening',
      badge: project.penyedia.namaPerusahaan ? 'Terisi' : 'Belum',
      icon: Store,
    },
    {
      id: 'settings' as const,
      title: 'Kertas & Kop Surat',
      badge: project.printSettings.paperSize,
      icon: Sliders,
    },
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col h-full shrink-0 select-none shadow-xs">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            AP
          </div>
          <div>
            <h1 className="text-xs font-bold text-slate-900 leading-tight">
              Autodok Pengadaan
            </h1>
            <p className="text-[10px] text-slate-500 font-medium">
              SPMU · BAST · SP · Perencanaan
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Navigation Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-5">
        {/* SECTION 1: DOKUMEN SIAP CETAK (PDF) */}
        <div>
          <div className="px-2 mb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">
              Dokumen Pengadaan (PDF)
            </span>
            <span className="text-[10px] text-indigo-600 font-semibold bg-indigo-50 px-1.5 py-0.5 rounded">
              Siap Cetak
            </span>
          </div>

          <div className="space-y-1">
            {documentItems.map((doc) => {
              const Icon = doc.icon;
              const isActive = activeDoc === doc.id;

              return (
                <div
                  key={doc.id}
                  className={`group relative flex items-center justify-between p-2 rounded-xl text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  onClick={() => onSelectDoc(doc.id)}
                >
                  <div className="flex items-start gap-2.5 min-w-0 pr-1">
                    <div
                      className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                        isActive
                          ? 'bg-indigo-700/80 text-white'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-white group-hover:text-indigo-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate block font-semibold leading-tight">
                          {doc.title}
                        </span>
                        {doc.badge && (
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                              isActive
                                ? 'bg-amber-400 text-slate-950'
                                : 'bg-indigo-100 text-indigo-700'
                            }`}
                          >
                            {doc.badge}
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-[10px] truncate mt-0.5 ${
                          isActive ? 'text-indigo-100' : 'text-slate-500'
                        }`}
                      >
                        {doc.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Tombol Cetak Langsung saat hover atau aktif */}
                  <button
                    type="button"
                    title={`Cetak ${doc.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickPrint(doc.id);
                    }}
                    className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                      isActive
                        ? 'text-white hover:bg-indigo-700'
                        : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-200 opacity-60 group-hover:opacity-100'
                    }`}
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: FORMULIR INPUT DATA TERINTEGRASI */}
        <div>
          <div className="px-2 mb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">
              Formulir Input Data
            </span>
            <span className="text-[10px] text-slate-400 font-normal">
              1x Input
            </span>
          </div>

          <div className="space-y-1">
            {formTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onSelectTab(tab.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span className="truncate">{tab.title}</span>
                  </div>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                      isActive
                        ? 'bg-slate-800 text-slate-300'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: RINGKASAN FINANSIAL & SPMU */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700">
            <span>Ringkasan Nilai</span>
            <span className="text-[10px] font-mono text-slate-500">
              {project.pajak.kenaPPN ? `PPN ${project.pajak.ppnPersen}%` : 'Non-PPN'}
            </span>
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex justify-between items-center text-slate-600">
              <span className="text-[11px]">Total Bruto (SP):</span>
              <span className="font-mono tabular-nums font-medium text-slate-800">
                {formatRupiah(financial.totalKotor)}
              </span>
            </div>

            <div className="flex justify-between items-center text-slate-600">
              <span className="text-[11px]">Netto SPMU (Cair):</span>
              <span className="font-mono tabular-nums font-bold text-emerald-700">
                {formatRupiah(financial.totalBersih)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Area */}
      <div className="p-3 border-t border-slate-200 bg-white space-y-2">
        {/* Tombol Cetak Semua Dokumen Utama */}
        <button
          type="button"
          onClick={() => onQuickPrint('all')}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Bundel 4 Dokumen PDF</span>
        </button>

        {/* Action Row */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onOpenQuickFill}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-[11px] font-medium border border-slate-200 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Pilih Template</span>
          </button>

          <button
            type="button"
            onClick={onExportJson}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-[11px] font-medium border border-slate-200 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Simpan JSON</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
