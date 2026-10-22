import React from 'react';

interface LogoProps {
  type: 'kemdikbud' | 'pemda' | 'garuda' | 'kemenag' | 'desa' | 'custom';
  customUrl?: string;
  className?: string;
}

export const OfficialLogo: React.FC<LogoProps> = ({ type, customUrl, className = 'w-20 h-20' }) => {
  if (type === 'custom' && customUrl) {
    return (
      <img
        src={customUrl}
        alt="Logo Instansi"
        className={`${className} object-contain`}
        referrerPolicy="no-referrer"
      />
    );
  }

  if (type === 'garuda') {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#D97706" fillOpacity="0.1" stroke="#B45309" strokeWidth="2" />
        {/* Garuda silhouette stylized */}
        <path
          d="M50 15 L56 30 L72 32 L60 42 L64 58 L50 49 L36 58 L40 42 L28 32 L44 30 Z"
          fill="#B45309"
        />
        <path
          d="M32 50 C32 68 40 82 50 85 C60 82 68 68 68 50 Z"
          fill="#F59E0B"
          stroke="#92400E"
          strokeWidth="1.5"
        />
        <rect x="42" y="60" width="16" height="12" rx="2" fill="#DC2626" />
        <path d="M42 66 H58" stroke="#FFFFFF" strokeWidth="2" />
        <text x="50" y="93" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#78350F">
          BHINNEKA TUNGGAL IKA
        </text>
      </svg>
    );
  }

  if (type === 'kemdikbud') {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Tut Wuri Handayani stylization */}
        <polygon points="50,6 92,30 92,70 50,94 8,70 8,30" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
        <circle cx="50" cy="46" r="24" fill="#F8FAFC" />
        {/* Belencong flame & wings */}
        <path d="M50 28 C45 35 44 42 50 48 C56 42 55 35 50 28 Z" fill="#DC2626" />
        <path d="M50 42 C40 45 32 52 30 62 C38 60 45 56 50 50 Z" fill="#EAB308" />
        <path d="M50 42 C60 45 68 52 70 62 C62 60 55 56 50 50 Z" fill="#EAB308" />
        <path d="M36 68 Q50 62 64 68" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        <text x="50" y="86" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#FFFFFF">
          TUT WURI HANDAYANI
        </text>
      </svg>
    );
  }

  if (type === 'kemenag') {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,8 90,32 90,68 50,92 10,68 10,32" fill="#15803D" stroke="#166534" strokeWidth="2" />
        <circle cx="50" cy="50" r="28" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
        {/* Kitab & Timbangan */}
        <path d="M34 52 L50 42 L66 52 L50 60 Z" fill="#15803D" />
        <path d="M50 36 V66 M40 46 H60" stroke="#854D0E" strokeWidth="2" strokeLinecap="round" />
        <text x="50" y="85" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#FFFFFF">
          IKHLAS BERAMAL
        </text>
      </svg>
    );
  }

  if (type === 'desa') {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 20 H88 V60 C88 80 50 94 50 94 C50 94 12 80 12 60 Z" fill="#047857" stroke="#065F46" strokeWidth="2" />
        <path d="M50 26 L76 45 H24 Z" fill="#FBBF24" />
        <rect x="36" y="45" width="28" height="24" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
        <rect x="45" y="55" width="10" height="14" fill="#92400E" />
        <circle cx="50" cy="38" r="4" fill="#DC2626" />
        <text x="50" y="85" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#FFFFFF">
          PRAJA DESA
        </text>
      </svg>
    );
  }

  // Default: Pemda (Pemerintah Daerah Lambang Perisai Segi Lima)
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,6 94,34 82,92 18,92 6,34" fill="#0369A1" stroke="#075985" strokeWidth="2" />
      <polygon points="50,14 86,38 76,84 24,84 14,38" fill="#F8FAFC" />
      {/* Bintang Kuning Emas */}
      <polygon points="50,22 53,28 60,29 55,34 56,41 50,37 44,41 45,34 40,29 47,28" fill="#EAB308" />
      {/* Padi & Kapas & Rantai */}
      <circle cx="50" cy="56" r="16" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
      <path d="M38 56 Q50 48 62 56 Q50 64 38 56 Z" fill="#FEF08A" />
      <text x="50" y="78" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#0369A1">
        PEMERINTAH DAERAH
      </text>
    </svg>
  );
};
