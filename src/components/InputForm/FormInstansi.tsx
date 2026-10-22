import React from 'react';
import { InstansiData, PejabatData } from '../../types/procurement';
import { Building2, UserCheck, ShieldCheck, CreditCard, PackageCheck } from 'lucide-react';

interface FormInstansiProps {
  instansi: InstansiData;
  onChangeInstansi: (val: InstansiData) => void;
  penggunaAnggaran: PejabatData;
  onChangePA: (val: PejabatData) => void;
  pejabatPengadaan: PejabatData;
  onChangePP: (val: PejabatData) => void;
  bendahara: PejabatData;
  onChangeBendahara: (val: PejabatData) => void;
  pemeriksaBarang: PejabatData;
  onChangePemeriksa: (val: PejabatData) => void;
}

export const FormInstansi: React.FC<FormInstansiProps> = ({
  instansi,
  onChangeInstansi,
  penggunaAnggaran,
  onChangePA,
  pejabatPengadaan,
  onChangePP,
  bendahara,
  onChangeBendahara,
  pemeriksaBarang,
  onChangePemeriksa,
}) => {
  const updateInstansi = (field: keyof InstansiData, val: string) => {
    onChangeInstansi({ ...instansi, [field]: val });
  };

  return (
    <div className="space-y-6 text-sm">
      {/* Profil Instansi / Lembaga */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-4 text-slate-800 font-semibold border-b border-slate-100 pb-2">
          <Building2 className="w-5 h-5 text-indigo-600" />
          <span>Profil Instansi / Sekolah / Kantor</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Instansi Induk (Tingkat 1)
            </label>
            <input
              type="text"
              placeholder="Contoh: PEMERINTAH KABUPATEN BANYUMAS"
              value={instansi.namaInstansi}
              onChange={(e) => updateInstansi('namaInstansi', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Dinas / Satuan Kerja (Tingkat 2)
            </label>
            <input
              type="text"
              placeholder="Contoh: DINAS PENDIDIKAN"
              value={instansi.subInstansi}
              onChange={(e) => updateInstansi('subInstansi', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Nama Unit Kerja / Sekolah / Desa (Tampil Paling Menonjol di Kop) *
            </label>
            <input
              type="text"
              placeholder="Contoh: SMP NEGERI 1 BANYUMAS / PEMERINTAH DESA SUKAMAJU"
              value={instansi.namaUnit}
              onChange={(e) => updateInstansi('namaUnit', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs font-medium text-slate-900"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Alamat Lengkap Kantor / Sekolah
            </label>
            <input
              type="text"
              placeholder="Contoh: Jl. Merdeka No. 45, Kec. Banyumas"
              value={instansi.alamat}
              onChange={(e) => updateInstansi('alamat', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Kota / Kabupaten Surat *
            </label>
            <input
              type="text"
              placeholder="Contoh: Banyumas"
              value={instansi.kotaKabupaten}
              onChange={(e) => updateInstansi('kotaKabupaten', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Kode Pos
            </label>
            <input
              type="text"
              placeholder="Contoh: 53192"
              value={instansi.kodePos}
              onChange={(e) => updateInstansi('kodePos', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              No. Telepon
            </label>
            <input
              type="text"
              placeholder="Contoh: (0281) 796123"
              value={instansi.telepon}
              onChange={(e) => updateInstansi('telepon', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Email Resmi
            </label>
            <input
              type="email"
              placeholder="Contoh: smpn1banyumas@sch.id"
              value={instansi.email}
              onChange={(e) => updateInstansi('email', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Website / Laman Resmi
            </label>
            <input
              type="text"
              placeholder="Contoh: www.smpn1banyumas.sch.id"
              value={instansi.website}
              onChange={(e) => updateInstansi('website', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Pilihan Lambang / Logo Kop Surat
            </label>
            <select
              value={instansi.logoType}
              onChange={(e) =>
                updateInstansi(
                  'logoType',
                  e.target.value as InstansiData['logoType']
                )
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs bg-white"
            >
              <option value="kemdikbud">Kemdikbud (Tut Wuri Handayani - Sekolah)</option>
              <option value="pemda">Pemerintah Daerah (Pemprov / Pemkab / Dinas)</option>
              <option value="garuda">Garuda Pancasila (Kementerian / Lembaga)</option>
              <option value="kemenag">Kemenag (Ikhlas Beramal / Madrasah)</option>
              <option value="desa">Pemerintah Desa / Kalurahan</option>
              <option value="custom">URL Logo Kustom / External</option>
            </select>
          </div>

          {instansi.logoType === 'custom' && (
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                URL Logo Kustom (PNG / SVG Transparan)
              </label>
              <input
                type="text"
                placeholder="https://..."
                value={instansi.customLogoUrl || ''}
                onChange={(e) => updateInstansi('customLogoUrl', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs"
              />
            </div>
          )}
        </div>
      </div>

      {/* 4 Pejabat Berwenang */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Pengguna Anggaran */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-slate-800 font-semibold border-b border-slate-100 pb-2">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs">1. Pengguna Anggaran (PA / KPA / Kepala)</span>
          </div>
          <div className="space-y-2.5">
            <div>
              <label className="block text-[11px] text-slate-500">Nama Lengkap & Gelar</label>
              <input
                type="text"
                value={penggunaAnggaran.nama}
                onChange={(e) => onChangePA({ ...penggunaAnggaran, nama: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                placeholder="Contoh: Drs. H. Ahmad Sudrajat, M.Pd."
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500">NIP (Isi '-' jika bukan PNS/Desa)</label>
              <input
                type="text"
                value={penggunaAnggaran.nip}
                onChange={(e) => onChangePA({ ...penggunaAnggaran, nip: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
                placeholder="19680512 199303 1 005"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500">Jabatan Resmi</label>
              <input
                type="text"
                value={penggunaAnggaran.jabatan}
                onChange={(e) => onChangePA({ ...penggunaAnggaran, jabatan: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                placeholder="Kepala Sekolah / Kuasa Pengguna Anggaran"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500">Pangkat / Golongan (Opsional)</label>
              <input
                type="text"
                value={penggunaAnggaran.pangkatGol || ''}
                onChange={(e) => onChangePA({ ...penggunaAnggaran, pangkatGol: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                placeholder="Pembina Tk. I, IV/b"
              />
            </div>
          </div>
        </div>

        {/* 2. Pejabat Pengadaan */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-slate-800 font-semibold border-b border-slate-100 pb-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span className="text-xs">2. Pejabat Pengadaan / PPK (Pemesan)</span>
          </div>
          <div className="space-y-2.5">
            <div>
              <label className="block text-[11px] text-slate-500">Nama Lengkap & Gelar</label>
              <input
                type="text"
                value={pejabatPengadaan.nama}
                onChange={(e) => onChangePP({ ...pejabatPengadaan, nama: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                placeholder="Sri Wahyuni, S.Pd."
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500">NIP</label>
              <input
                type="text"
                value={pejabatPengadaan.nip}
                onChange={(e) => onChangePP({ ...pejabatPengadaan, nip: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
                placeholder="19790815 200501 2 008"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500">Jabatan</label>
              <input
                type="text"
                value={pejabatPengadaan.jabatan}
                onChange={(e) => onChangePP({ ...pejabatPengadaan, jabatan: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                placeholder="Pejabat Pengadaan / Tim Pelaksana BOS"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500">Pangkat / Golongan (Opsional)</label>
              <input
                type="text"
                value={pejabatPengadaan.pangkatGol || ''}
                onChange={(e) => onChangePP({ ...pejabatPengadaan, pangkatGol: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                placeholder="Penata, III/c"
              />
            </div>
          </div>
        </div>

        {/* 3. Bendahara Pengeluaran */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-slate-800 font-semibold border-b border-slate-100 pb-2">
            <CreditCard className="w-4 h-4 text-purple-600" />
            <span className="text-xs">3. Bendahara Pengeluaran / Bendahara BOS</span>
          </div>
          <div className="space-y-2.5">
            <div>
              <label className="block text-[11px] text-slate-500">Nama Lengkap & Gelar</label>
              <input
                type="text"
                value={bendahara.nama}
                onChange={(e) => onChangeBendahara({ ...bendahara, nama: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                placeholder="Agus Triyono, S.E."
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500">NIP</label>
              <input
                type="text"
                value={bendahara.nip}
                onChange={(e) => onChangeBendahara({ ...bendahara, nip: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
                placeholder="19840320 200801 1 012"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500">Jabatan</label>
              <input
                type="text"
                value={bendahara.jabatan}
                onChange={(e) => onChangeBendahara({ ...bendahara, jabatan: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                placeholder="Bendahara BOS / Bendahara Pengeluaran"
              />
            </div>
          </div>
        </div>

        {/* 4. Pemeriksa Barang */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-slate-800 font-semibold border-b border-slate-100 pb-2">
            <PackageCheck className="w-4 h-4 text-amber-600" />
            <span className="text-xs">4. Panitia / Petugas Penerima Hasil Pekerjaan (PPHP)</span>
          </div>
          <div className="space-y-2.5">
            <div>
              <label className="block text-[11px] text-slate-500">Nama Lengkap & Gelar</label>
              <input
                type="text"
                value={pemeriksaBarang.nama}
                onChange={(e) => onChangePemeriksa({ ...pemeriksaBarang, nama: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                placeholder="Bambang Irawan, S.Kom."
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500">NIP</label>
              <input
                type="text"
                value={pemeriksaBarang.nip}
                onChange={(e) => onChangePemeriksa({ ...pemeriksaBarang, nip: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
                placeholder="19871110 201101 1 007"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500">Jabatan</label>
              <input
                type="text"
                value={pemeriksaBarang.jabatan}
                onChange={(e) => onChangePemeriksa({ ...pemeriksaBarang, jabatan: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                placeholder="Petugas Pemeriksa & Penerima Barang"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
