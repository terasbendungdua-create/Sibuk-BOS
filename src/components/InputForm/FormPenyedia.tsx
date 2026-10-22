import React from 'react';
import { PenyediaData } from '../../types/procurement';
import { Store, Landmark, CreditCard, MapPin, Phone } from 'lucide-react';

interface FormPenyediaProps {
  penyedia: PenyediaData;
  onChangePenyedia: (val: PenyediaData) => void;
}

export const FormPenyedia: React.FC<FormPenyediaProps> = ({
  penyedia,
  onChangePenyedia,
}) => {
  const update = (field: keyof PenyediaData, val: string) => {
    onChangePenyedia({ ...penyedia, [field]: val });
  };

  return (
    <div className="space-y-6 text-sm">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-4 text-slate-800 font-semibold border-b border-slate-100 pb-2">
          <Store className="w-5 h-5 text-indigo-600" />
          <span>Data Penyedia / Toko / Rekanan (Pihak Kedua)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Nama Perusahaan / Toko / CV / PT *
            </label>
            <input
              type="text"
              placeholder="Contoh: CV. GRAFIKA SARANA INDAH / TOKO BUKU MAKMUR"
              value={penyedia.namaPerusahaan}
              onChange={(e) => update('namaPerusahaan', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Nama Pimpinan / Direktur / Pemilik *
            </label>
            <input
              type="text"
              placeholder="Contoh: Ir. Muhammad Arifin"
              value={penyedia.namaPimpinan}
              onChange={(e) => update('namaPimpinan', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Jabatan Pimpinan
            </label>
            <input
              type="text"
              placeholder="Contoh: Direktur / Pemilik Usaha / Penanggung Jawab"
              value={penyedia.jabatanPimpinan}
              onChange={(e) => update('jabatanPimpinan', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Alamat Lengkap Penyedia *
            </label>
            <input
              type="text"
              placeholder="Contoh: Jl. Ahmad Yani No. 108, Purwokerto"
              value={penyedia.alamat}
              onChange={(e) => update('alamat', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Nomor Telepon / WhatsApp
            </label>
            <input
              type="text"
              placeholder="Contoh: 0812-3456-7890"
              value={penyedia.telepon}
              onChange={(e) => update('telepon', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Nomor Pokok Wajib Pajak (NPWP)
            </label>
            <input
              type="text"
              placeholder="Contoh: 02.456.789.1-521.000"
              value={penyedia.npwp}
              onChange={(e) => update('npwp', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs font-mono"
            />
          </div>
        </div>
      </div>

      {/* Data Bank Penerima (Penting untuk SPMU) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-4 text-slate-800 font-semibold border-b border-slate-100 pb-2">
          <Landmark className="w-5 h-5 text-emerald-600" />
          <span>Rekening Bank Penyedia (Untuk Transfer SPMU)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Nama Bank
            </label>
            <input
              type="text"
              placeholder="Contoh: Bank Jateng / Bank BRI / BJB"
              value={penyedia.namaBank}
              onChange={(e) => update('namaBank', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Nomor Rekening
            </label>
            <input
              type="text"
              placeholder="Contoh: 1-002-887766-5"
              value={penyedia.nomorRekening}
              onChange={(e) => update('nomorRekening', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs font-mono font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Atas Nama Rekening
            </label>
            <input
              type="text"
              placeholder="Contoh: CV. GRAFIKA SARANA INDAH"
              value={penyedia.namaRekening}
              onChange={(e) => update('namaRekening', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs font-medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
