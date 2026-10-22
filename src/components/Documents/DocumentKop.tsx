import React from 'react';
import { InstansiData } from '../../types/procurement';
import { OfficialLogo } from './Logos';

interface DocumentKopProps {
  instansi: InstansiData;
  showKop?: boolean;
}

export const DocumentKop: React.FC<DocumentKopProps> = ({ instansi, showKop = true }) => {
  if (!showKop) {
    // Blank spacer for pre-printed letterhead paper
    return <div className="h-28 print:h-28" />;
  }

  return (
    <div className="w-full mb-4">
      <div className="flex items-center justify-between gap-4 pb-2">
        {/* Logo Kiri */}
        <div className="shrink-0 w-20 flex justify-center">
          <OfficialLogo
            type={instansi.logoType}
            customUrl={instansi.customLogoUrl}
            className="w-18 h-18"
          />
        </div>

        {/* Teks Kop Tengah */}
        <div className="flex-1 text-center font-serif text-slate-900 leading-tight">
          {instansi.namaInstansi && (
            <h2 className="text-sm font-bold tracking-wider uppercase">
              {instansi.namaInstansi}
            </h2>
          )}
          {instansi.subInstansi && (
            <h3 className="text-base font-bold tracking-wide uppercase">
              {instansi.subInstansi}
            </h3>
          )}
          {instansi.namaUnit && (
            <h1 className="text-lg font-extrabold tracking-wider uppercase text-slate-950 mt-0.5">
              {instansi.namaUnit}
            </h1>
          )}
          <p className="text-xs text-slate-700 mt-1">
            {instansi.alamat}
            {instansi.kodePos ? ` Kodepos ${instansi.kodePos}` : ''}
          </p>
          <div className="text-[11px] text-slate-600 flex flex-wrap justify-center items-center gap-x-2 gap-y-0 mt-0.5">
            {instansi.telepon && <span>Telp: {instansi.telepon}</span>}
            {instansi.email && <span>| Email: {instansi.email}</span>}
            {instansi.website && <span>| Laman: {instansi.website}</span>}
          </div>
        </div>

        {/* Placeholder Kanan agar teks tepat di tengah */}
        <div className="shrink-0 w-20" />
      </div>

      {/* Garis Ganda Kop Standar Surat Dinas Indonesia */}
      <div className="border-t-[2.5px] border-slate-950 w-full" />
      <div className="border-t-[0.8px] border-slate-900 w-full mt-[1.5px]" />
    </div>
  );
};
