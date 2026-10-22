import React from 'react';
import { ProcurementProject } from '../../types/procurement';
import { DocPerencanaan } from './DocPerencanaan';
import { DocSuratPesanan } from './DocSuratPesanan';
import { DocBAST } from './DocBAST';
import { DocSPMU } from './DocSPMU';

interface DocBundleProps {
  project: ProcurementProject;
}

export const DocBundle: React.FC<DocBundleProps> = ({ project }) => {
  return (
    <div className="space-y-8 print:space-y-0">
      {/* Dokumen 1: Surat Perencanaan */}
      <div className="print:page-break-after">
        <DocPerencanaan project={project} />
      </div>

      <div className="hidden print:block print:break-after-page h-0" style={{ pageBreakAfter: 'always' }} />

      {/* Dokumen 2: Surat Pesanan (SP) */}
      <div className="print:page-break-after">
        <DocSuratPesanan project={project} />
      </div>

      <div className="hidden print:block print:break-after-page h-0" style={{ pageBreakAfter: 'always' }} />

      {/* Dokumen 3: Berita Acara Serah Terima (BAST) */}
      <div className="print:page-break-after">
        <DocBAST project={project} />
      </div>

      <div className="hidden print:block print:break-after-page h-0" style={{ pageBreakAfter: 'always' }} />

      {/* Dokumen 4: Surat Perintah Membayar Uang (SPMU) */}
      <div className="print:page-break-after">
        <DocSPMU project={project} />
      </div>
    </div>
  );
};
