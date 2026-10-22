/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ProcurementProject } from './types/procurement';
import { TEMPLATE_BOS_SEKOLAH } from './utils/sampleData';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { FormInstansi } from './components/InputForm/FormInstansi';
import { FormPenyedia } from './components/InputForm/FormPenyedia';
import { FormItems } from './components/InputForm/FormItems';
import { FormDokumen } from './components/InputForm/FormDokumen';
import { FormPrintSettings } from './components/InputForm/FormPrintSettings';
import { DocPerencanaan } from './components/Documents/DocPerencanaan';
import { DocSuratPesanan } from './components/Documents/DocSuratPesanan';
import { DocBAST } from './components/Documents/DocBAST';
import { DocSPMU } from './components/Documents/DocSPMU';
import { DocBundle } from './components/Documents/DocBundle';
import { QuickFillModal } from './components/QuickFillModal';
import { PrintModal } from './components/PrintModal';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Eye,
  Edit3,
  Printer,
  Columns,
  CheckCircle2,
  FileCheck,
  ChevronRight,
} from 'lucide-react';

const STORAGE_KEY = 'autodok_procurement_state_v1';

export default function App() {
  // 1. Initial State
  const [project, setProject] = useState<ProcurementProject>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Gagal memuat dari storage:', e);
    }
    return TEMPLATE_BOS_SEKOLAH;
  });

  // 2. Active Tab & Active Document
  const [activeDoc, setActiveDoc] = useState<'all' | 'perencanaan' | 'sp' | 'bast' | 'spmu'>('all');
  const [activeTab, setActiveTab] = useState<'items' | 'dokumen' | 'instansi' | 'penyedia' | 'settings'>('items');
  const [viewMode, setViewMode] = useState<'split' | 'formOnly' | 'previewOnly'>('split');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreenPreview, setIsFullscreenPreview] = useState<boolean>(false);

  // 3. Modals & Notifications
  const [isQuickFillOpen, setIsQuickFillOpen] = useState<boolean>(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [printingTarget, setPrintingTarget] = useState<'all' | 'perencanaan' | 'sp' | 'bast' | 'spmu'>('all');
  const [saveToast, setSaveToast] = useState<boolean>(false);

  // Auto-save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
      setSaveToast(true);
      const timer = setTimeout(() => setSaveToast(false), 2000);
      return () => clearTimeout(timer);
    } catch (e) {
      console.error(e);
    }
  }, [project]);

  // Execute Print
  const handlePrint = (target: 'all' | 'perencanaan' | 'sp' | 'bast' | 'spmu') => {
    setPrintingTarget(target);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  // Export JSON file
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(project, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    const filename = `Dokumen_Pengadaan_${(project.dokumen.namaPaket || 'Proyek').replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    downloadAnchor.setAttribute('download', filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON file
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.instansi && parsed.items && parsed.dokumen) {
          setProject(parsed);
          alert('Data proyek pengadaan berhasil dimuat!');
        } else {
          alert('Format file JSON tidak sesuai.');
        }
      } catch (err) {
        alert('Gagal membaca berkas JSON.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const getDocTitle = (id: typeof activeDoc) => {
    switch (id) {
      case 'perencanaan':
        return 'Surat Perencanaan Pengadaan';
      case 'sp':
        return 'Surat Pesanan (SP)';
      case 'bast':
        return 'Berita Acara Serah Terima (BAST)';
      case 'spmu':
        return 'Surat Perintah Membayar Uang (SPMU)';
      case 'all':
      default:
        return 'Bundel 4 Dokumen Sekaligus';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-100 font-sans overflow-hidden">
      {/* 1. Header Navigation Bar */}
      <div className="no-print shrink-0">
        <TopBar
          onTriggerPrint={() => setIsPrintModalOpen(true)}
          onOpenQuickFill={() => setIsQuickFillOpen(true)}
          onExportJson={handleExportJson}
          activeDocName={getDocTitle(activeDoc)}
          packageName={project.dokumen.namaPaket}
          unitName={project.instansi.namaUnit}
        />
      </div>

      {/* 2. Workspace Body (Sidebar + Content Viewport) */}
      <div className="no-print flex-1 flex overflow-hidden">
        {/* SIDEBAR DOKUMEN & FORMULIR */}
        <Sidebar
          project={project}
          activeDoc={activeDoc}
          onSelectDoc={(doc) => {
            setActiveDoc(doc);
            // If in formOnly mode, switch to split so user can immediately see the document
            if (viewMode === 'formOnly') {
              setViewMode('split');
            }
          }}
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            // If in previewOnly, switch to split so user can see the form
            if (viewMode === 'previewOnly') {
              setViewMode('split');
            }
          }}
          onQuickPrint={(doc) => handlePrint(doc)}
          onOpenQuickFill={() => setIsQuickFillOpen(true)}
          onExportJson={handleExportJson}
          onImportJson={() => setIsQuickFillOpen(true)}
        />

        {/* MAIN VIEWPORT: EDIT FORM + LIVE DOCUMENT PREVIEW */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-100">
          {/* Subheader Toolbar: View Mode Selector & Zoom Controls */}
          <div className="bg-white border-b border-slate-200 px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-2xs">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-indigo-600" />
                <span>{getDocTitle(activeDoc)}</span>
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-xs text-slate-500 hidden sm:inline">
                Ukuran Kertas: <strong>{project.printSettings.paperSize}</strong>
              </span>
              {saveToast && (
                <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Tersimpan
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Tampilan View Mode: Split / Form Saja / Dokumen Saja */}
              <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('split')}
                  title="Tampilan Bersisian (Form + Dokumen)"
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                    viewMode === 'split'
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Bersisian</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('formOnly')}
                  title="Hanya Tampilkan Formulir Input"
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                    viewMode === 'formOnly'
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Form Saja</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('previewOnly')}
                  title="Hanya Tampilkan Dokumen Siap Cetak"
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                    viewMode === 'previewOnly'
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Dokumen Saja</span>
                </button>
              </div>

              {/* Zoom Controls (Hanya saat preview terlihat) */}
              {viewMode !== 'formOnly' && (
                <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    title="Perkecil Zoom"
                    onClick={() => setZoomLevel((z) => Math.max(60, z - 10))}
                    className="p-1 text-slate-600 hover:text-slate-900 rounded"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono font-semibold px-1 text-slate-700 min-w-[38px] text-center">
                    {zoomLevel}%
                  </span>
                  <button
                    type="button"
                    title="Perbesar Zoom"
                    onClick={() => setZoomLevel((z) => Math.min(140, z + 10))}
                    className="p-1 text-slate-600 hover:text-slate-900 rounded"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Tombol Cetak Dokumen Aktif */}
              <button
                type="button"
                onClick={() => handlePrint(activeDoc)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Dokumen Ini</span>
              </button>
            </div>
          </div>

          {/* Dual Panel Split Workspace */}
          <div className="flex-1 flex overflow-hidden">
            {/* Panel Kiri: Form Input Data */}
            {(viewMode === 'split' || viewMode === 'formOnly') && (
              <div
                className={`${
                  viewMode === 'split' ? 'w-full lg:w-[48%] xl:w-[46%]' : 'w-full'
                } flex flex-col border-r border-slate-200 bg-white overflow-y-auto`}
              >
                {/* Secondary Tab Bar inside Form */}
                <div className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <span>Edit Data:</span>
                    <span className="text-indigo-600 capitalize">
                      {activeTab === 'items' && 'Daftar Barang & Pajak'}
                      {activeTab === 'dokumen' && 'Paket Pekerjaan & Nomor Dokumen'}
                      {activeTab === 'instansi' && 'Data Instansi & Pejabat Penandatangan'}
                      {activeTab === 'penyedia' && 'Data Rekanan & Rekening Bank'}
                      {activeTab === 'settings' && 'Pengaturan Kertas & Kop'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Otomatis sinkron ke 4 dokumen
                  </span>
                </div>

                <div className="p-5 flex-1">
                  {activeTab === 'items' && (
                    <FormItems
                      items={project.items}
                      onChangeItems={(items) => setProject({ ...project, items })}
                      pajak={project.pajak}
                      onChangePajak={(pajak) => setProject({ ...project, pajak })}
                    />
                  )}

                  {activeTab === 'dokumen' && (
                    <FormDokumen
                      dokumen={project.dokumen}
                      onChangeDokumen={(dokumen) => setProject({ ...project, dokumen })}
                      instansi={project.instansi}
                    />
                  )}

                  {activeTab === 'instansi' && (
                    <FormInstansi
                      instansi={project.instansi}
                      onChangeInstansi={(instansi) =>
                        setProject({ ...project, instansi })
                      }
                      penggunaAnggaran={project.penggunaAnggaran}
                      onChangePA={(penggunaAnggaran) =>
                        setProject({ ...project, penggunaAnggaran })
                      }
                      pejabatPengadaan={project.pejabatPengadaan}
                      onChangePP={(pejabatPengadaan) =>
                        setProject({ ...project, pejabatPengadaan })
                      }
                      bendahara={project.bendahara}
                      onChangeBendahara={(bendahara) =>
                        setProject({ ...project, bendahara })
                      }
                      pemeriksaBarang={project.pemeriksaBarang}
                      onChangePemeriksa={(pemeriksaBarang) =>
                        setProject({ ...project, pemeriksaBarang })
                      }
                    />
                  )}

                  {activeTab === 'penyedia' && (
                    <FormPenyedia
                      penyedia={project.penyedia}
                      onChangePenyedia={(penyedia) =>
                        setProject({ ...project, penyedia })
                      }
                    />
                  )}

                  {activeTab === 'settings' && (
                    <FormPrintSettings
                      settings={project.printSettings}
                      onChangeSettings={(printSettings) =>
                        setProject({ ...project, printSettings })
                      }
                    />
                  )}
                </div>
              </div>
            )}

            {/* Panel Kanan: Live Document Sheet Preview */}
            {(viewMode === 'split' || viewMode === 'previewOnly') && (
              <div
                className={`${
                  viewMode === 'split' ? 'w-full lg:w-[52%] xl:w-[54%]' : 'w-full'
                } flex-1 overflow-auto bg-slate-200/90 p-4 sm:p-6 lg:p-8 flex justify-center items-start`}
              >
                <div
                  style={{
                    transform: `scale(${zoomLevel / 100})`,
                    transformOrigin: 'top center',
                    transition: 'transform 0.15s ease-out',
                  }}
                  className="w-full max-w-[210mm] shadow-xl rounded-xs transition-all"
                >
                  {activeDoc === 'all' && <DocBundle project={project} />}
                  {activeDoc === 'perencanaan' && <DocPerencanaan project={project} />}
                  {activeDoc === 'sp' && <DocSuratPesanan project={project} />}
                  {activeDoc === 'bast' && <DocBAST project={project} />}
                  {activeDoc === 'spmu' && <DocSPMU project={project} />}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 3. Dedicated Clean Print Container for window.print() */}
      <div className="hidden print:block printable-document-container">
        {printingTarget === 'all' && <DocBundle project={project} />}
        {printingTarget === 'perencanaan' && <DocPerencanaan project={project} />}
        {printingTarget === 'sp' && <DocSuratPesanan project={project} />}
        {printingTarget === 'bast' && <DocBAST project={project} />}
        {printingTarget === 'spmu' && <DocSPMU project={project} />}
      </div>

      {/* 4. Modals */}
      <QuickFillModal
        isOpen={isQuickFillOpen}
        onClose={() => setIsQuickFillOpen(false)}
        onSelectProject={(selected) => setProject(selected)}
        onFileImport={handleImportJson}
      />

      <PrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        onSelectPrintDoc={(target) => handlePrint(target)}
        currentActiveDoc={activeDoc}
      />
    </div>
  );
}
