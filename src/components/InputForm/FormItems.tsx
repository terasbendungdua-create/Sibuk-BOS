import React from 'react';
import { ItemPengadaan, PajakConfig } from '../../types/procurement';
import { Plus, Trash2, Copy, ShoppingBag, Receipt, Calculator, Percent } from 'lucide-react';
import { formatRupiah, formatAngka, hitungFinansial } from '../../utils/formatters';
import { terbilang } from '../../utils/terbilang';

interface FormItemsProps {
  items: ItemPengadaan[];
  onChangeItems: (items: ItemPengadaan[]) => void;
  pajak: PajakConfig;
  onChangePajak: (pajak: PajakConfig) => void;
}

const SATUAN_POPULER = [
  'Rim',
  'Buah',
  'Unit',
  'Pcs',
  'Dus',
  'Kotak',
  'Paket',
  'Botol',
  'Lembar',
  'Buku',
  'Set',
  'Meter',
  'Kg',
  'Roll',
];

export const FormItems: React.FC<FormItemsProps> = ({
  items,
  onChangeItems,
  pajak,
  onChangePajak,
}) => {
  const financial = hitungFinansial(items, pajak);

  const addItem = () => {
    const newItem: ItemPengadaan = {
      id: `it-${Date.now()}`,
      namaBarang: '',
      spesifikasi: '',
      volume: 1,
      satuan: 'Buah',
      hargaSatuan: 0,
    };
    onChangeItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) {
      alert('Minimal harus ada 1 barang dalam daftar pengadaan.');
      return;
    }
    onChangeItems(items.filter((it) => it.id !== id));
  };

  const duplicateItem = (index: number) => {
    const target = items[index];
    const clone: ItemPengadaan = {
      ...target,
      id: `it-${Date.now()}`,
      namaBarang: `${target.namaBarang} (Salinan)`,
    };
    const next = [...items];
    next.splice(index + 1, 0, clone);
    onChangeItems(next);
  };

  const updateItem = (index: number, field: keyof ItemPengadaan, val: any) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: val };
    onChangeItems(next);
  };

  return (
    <div className="space-y-6 text-sm">
      {/* Daftar Barang */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-800 font-semibold">
            <ShoppingBag className="w-5 h-5 text-indigo-600" />
            <span>Daftar Barang / Jasa Yang Dipesan ({items.length} Item)</span>
          </div>
          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Baris Barang</span>
          </button>
        </div>

        {/* Tabel Input Barang */}
        <div className="space-y-4">
          {items.map((item, idx) => {
            const lineTotal = (item.volume || 0) * (item.hargaSatuan || 0);

            return (
              <div
                key={item.id}
                className="p-3.5 border border-slate-200 rounded-xl bg-slate-50/60 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded">
                    Barang #{idx + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      title="Duplikat baris ini"
                      onClick={() => duplicateItem(idx)}
                      className="p-1 text-slate-500 hover:text-indigo-600 hover:bg-white rounded transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      title="Hapus baris"
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-slate-500 hover:text-rose-600 hover:bg-white rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  {/* Nama Barang */}
                  <div className="md:col-span-5">
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Nama Barang *
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Kertas HVS A4 75 Gram"
                      value={item.namaBarang}
                      onChange={(e) => updateItem(idx, 'namaBarang', e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  {/* Spesifikasi Teknis */}
                  <div className="md:col-span-7">
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Spesifikasi Teknis / Merek / Keterangan
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Merek Sinar Dunia, 1 Dus isi 5 Rim"
                      value={item.spesifikasi}
                      onChange={(e) => updateItem(idx, 'spesifikasi', e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  {/* Volume Qty */}
                  <div className="md:col-span-3">
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Volume (Qty)
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="any"
                      value={item.volume === 0 ? '' : item.volume}
                      onChange={(e) =>
                        updateItem(idx, 'volume', parseFloat(e.target.value) || 0)
                      }
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  {/* Satuan */}
                  <div className="md:col-span-3">
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Satuan
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        list={`satuan-list-${item.id}`}
                        value={item.satuan}
                        onChange={(e) => updateItem(idx, 'satuan', e.target.value)}
                        placeholder="Rim / Unit / Pcs"
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                      <datalist id={`satuan-list-${item.id}`}>
                        {SATUAN_POPULER.map((sat) => (
                          <option key={sat} value={sat} />
                        ))}
                      </datalist>
                    </div>
                  </div>

                  {/* Harga Satuan */}
                  <div className="md:col-span-3">
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Harga Satuan (Rp)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="500"
                      value={item.hargaSatuan === 0 ? '' : item.hargaSatuan}
                      onChange={(e) =>
                        updateItem(
                          idx,
                          'hargaSatuan',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  {/* Subtotal Baris */}
                  <div className="md:col-span-3 flex flex-col justify-end">
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">
                      Subtotal Item
                    </label>
                    <div className="px-2.5 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono font-semibold text-slate-800 text-right">
                      {formatRupiah(lineTotal)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pengaturan Pajak & Potongan Keuangan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kolom Kiri: Konfigurasi Pajak */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-semibold border-b border-slate-100 pb-2">
            <Percent className="w-5 h-5 text-indigo-600" />
            <span>Pengaturan Pajak & Potongan (PPN & PPh)</span>
          </div>

          {/* PPN */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={pajak.kenaPPN}
                onChange={(e) =>
                  onChangePajak({ ...pajak, kenaPPN: e.target.checked })
                }
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <span className="font-semibold text-xs text-slate-800">
                Kena Pajak Pertambahan Nilai (PPN)
              </span>
            </label>

            {pajak.kenaPPN && (
              <div className="flex items-center gap-2 pt-1 pl-6">
                <span className="text-xs text-slate-600">Tarif PPN:</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  value={pajak.ppnPersen}
                  onChange={(e) =>
                    onChangePajak({
                      ...pajak,
                      ppnPersen: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-20 px-2 py-1 border border-slate-300 rounded text-xs font-mono bg-white text-center"
                />
                <span className="text-xs text-slate-600">% (Standar RI 11%)</span>
              </div>
            )}
          </div>

          {/* PPh */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <label className="block font-semibold text-xs text-slate-800 mb-1">
              Potongan Pajak Penghasilan (PPh) pada SPMU
            </label>
            <select
              value={pajak.pphType}
              onChange={(e) => {
                const val = e.target.value as PajakConfig['pphType'];
                let defaultPct = 0;
                if (val === 'pph22') defaultPct = 1.5;
                if (val === 'pph23') defaultPct = 2.0;
                onChangePajak({ ...pajak, pphType: val, pphPersen: defaultPct });
              }}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
            >
              <option value="none">Tidak Ada Potongan PPh (Bebas PPh / Nilai Kecil)</option>
              <option value="pph22">PPh Pasal 22 (1.5% - Pembelian Barang Instansi Pemerintah)</option>
              <option value="pph23">PPh Pasal 23 (2.0% - Jasa / Sewa / Perbaikan)</option>
            </select>

            {pajak.pphType !== 'none' && (
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-slate-600">Persentase PPh:</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={pajak.pphPersen}
                  onChange={(e) =>
                    onChangePajak({
                      ...pajak,
                      pphPersen: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-20 px-2 py-1 border border-slate-300 rounded text-xs font-mono bg-white text-center"
                />
                <span className="text-xs text-slate-600">%</span>
              </div>
            )}
          </div>

          {/* Potongan Lainnya */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <label className="block font-semibold text-xs text-slate-800 mb-1">
              Potongan Biaya Lainnya (Opsional)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Keterangan (misal: Biaya Materai)"
                value={pajak.ketPotonganLain || ''}
                onChange={(e) =>
                  onChangePajak({ ...pajak, ketPotonganLain: e.target.value })
                }
                className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="number"
                min="0"
                step="1000"
                placeholder="Nominal (Rp)"
                value={pajak.potonganLain === 0 ? '' : pajak.potonganLain}
                onChange={(e) =>
                  onChangePajak({
                    ...pajak,
                    potonganLain: parseFloat(e.target.value) || 0,
                  })
                }
                className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Ringkasan Nilai & Terbilang */}
        <div className="bg-slate-900 text-white rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800 text-slate-200 font-semibold">
              <Receipt className="w-5 h-5 text-amber-400" />
              <span>Ringkasan Nilai Pengadaan & SPMU</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>Subtotal Barang ({items.length} Item):</span>
                <span className="font-mono tabular-nums">{formatRupiah(financial.subtotal)}</span>
              </div>

              {pajak.kenaPPN && (
                <div className="flex justify-between items-center text-slate-300">
                  <span>PPN ({pajak.ppnPersen}%):</span>
                  <span className="font-mono tabular-nums">{formatRupiah(financial.ppn)}</span>
                </div>
              )}

              <div className="flex justify-between items-center font-bold text-white pt-2 border-t border-slate-800 text-sm">
                <span>Total Bruto (Nilai Pesanan):</span>
                <span className="font-mono tabular-nums text-amber-300">{formatRupiah(financial.totalKotor)}</span>
              </div>

              {pajak.pphType !== 'none' && (
                <div className="flex justify-between items-center text-rose-300 pt-1">
                  <span>Potongan {pajak.pphType.toUpperCase()} ({pajak.pphPersen}%):</span>
                  <span className="font-mono tabular-nums">- {formatRupiah(financial.pph)}</span>
                </div>
              )}

              {financial.potonganLain > 0 && (
                <div className="flex justify-between items-center text-rose-300">
                  <span>Potongan Lainnya:</span>
                  <span className="font-mono tabular-nums">- {formatRupiah(financial.potonganLain)}</span>
                </div>
              )}

              <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 mt-3">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-medium">
                  Jumlah Bersih Yang Dibayarkan (Netto SPMU):
                </span>
                <span className="text-xl font-bold font-mono tabular-nums text-emerald-400 mt-0.5 block">
                  {formatRupiah(financial.totalBersih)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium mb-1">
              Terbilang Otomatis (Rupiah):
            </span>
            <p className="text-xs italic text-amber-200/90 leading-relaxed bg-slate-800/50 p-2.5 rounded border border-slate-700/60">
              "{terbilang(financial.totalBersih)}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
