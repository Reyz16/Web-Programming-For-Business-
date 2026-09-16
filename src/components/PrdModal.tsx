import React, { useState } from 'react';
import { PRD_DATA } from '../data/prdDocument';
import { 
  X, FileText, Copy, Download, Check, Database, Server, 
  Users, Target, Layers, Code, Clock, ShieldCheck, Printer, BookOpen
} from 'lucide-react';

interface PrdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrdModal: React.FC<PrdModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'personas' | 'tech' | 'database' | 'features' | 'api' | 'roadmap'>('summary');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate full Markdown representation for export/copy
  const generateMarkdownPRD = () => {
    return `# ${PRD_DATA.projectTitle}
**Versi**: ${PRD_DATA.version}  
**Penyusun**: ${PRD_DATA.author} (${PRD_DATA.role})  
**Mata Kuliah**: ${PRD_DATA.course}  
**Status**: ${PRD_DATA.status}  
**Tanggal Update**: ${PRD_DATA.lastUpdated}  

---

## 1. Executive Summary & Latar Belakang Bisnis
${PRD_DATA.executiveSummary}

### 1.1 Problem Statement
${PRD_DATA.problemStatement}

### 1.2 Proposed Solution
${PRD_DATA.proposedSolution}

---

## 2. Model Bisnis & Monetisasi
${PRD_DATA.businessModel.map(bm => `### ${bm.title}\n${bm.description}\n${bm.points.map(p => `- ${p}`).join('\n')}`).join('\n\n')}

---

## 3. User Personas & Kebutuhan Pengguna
${PRD_DATA.userPersonas.map(up => `### ${up.personaName} (${up.role})\n> "${up.quote}"\n\n**Pain Points:**\n${up.painPoints.map(p => `- ${p}`).join('\n')}\n\n**Kebutuhan Solusi:**\n${up.needs.map(n => `- ${n}`).join('\n')}`).join('\n\n')}

---

## 4. System Architecture & Tech Stack
${PRD_DATA.techStack.map(ts => `### ${ts.layer}: ${ts.technologies}\n*Alasan Teknis:* ${ts.rationale}`).join('\n\n')}

---

## 5. Database Schema & Entity Relationship (ERD)
${PRD_DATA.databaseSchema.map(t => `### Tabel: \`${t.table}\` (${t.description})
| Kolom | Tipe Data | Key | Keterangan |
|---|---|---|---|
${t.columns.map(c => `| \`${c.name}\` | \`${c.type}\` | ${c.key} | ${c.description} |`).join('\n')}
`).join('\n\n')}

---

## 6. Functional Requirements (FR)
| Kode | Modul | Fitur | Prioritas | Kriteria Penerimaan (Acceptance Criteria) |
|---|---|---|---|---|
${PRD_DATA.functionalRequirements.map(f => `| **${f.code}** | ${f.module} | ${f.feature} | ${f.priority} | ${f.acceptanceCriteria} |`).join('\n')}

---

## 7. API Specifications
${PRD_DATA.apiSpecifications.map(api => `### \`${api.method} ${api.endpoint}\`
${api.description}
${api.requestBody ? `**Request Body:**\n\`\`\`json\n${api.requestBody}\n\`\`\`\n` : ''}
**Response Body:**
\`\`\`json
${api.responseBody}
\`\`\`
`).join('\n\n')}

---

## 8. Development Roadmap & Sprints
${PRD_DATA.developmentRoadmap.map(r => `### ${r.sprint} (${r.timeline})
**Fokus:** ${r.focus}  
**Deliverables:**
${r.deliverables.map(d => `- ${d}`).join('\n')}
`).join('\n\n')}

---

## 9. Key Performance Indicators (KPIs)
| Metrik | Target Evaluasi | Kategori |
|---|---|---|
${PRD_DATA.kpis.map(k => `| ${k.metric} | **${k.target}** | ${k.category} |`).join('\n')}
`;
  };

  const handleCopyMarkdown = () => {
    const text = generateMarkdownPRD();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    const text = generateMarkdownPRD();
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'PRD_pickuplaundry_Rey_WebProgrammingForBusiness.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-md p-2 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-5xl w-full h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* Modal Topbar */}
        <div className="p-5 sm:px-8 border-b border-stone-200 bg-stone-50 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                  PRD DOKUMEN RESMI
                </span>
                <span className="text-xs text-stone-500 font-medium">Mata Kuliah: Web Programming for Business</span>
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                Product Requirement Document (PRD) — pickuplaundry
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-stone-100 border border-stone-300 text-stone-700 transition-colors cursor-pointer shadow-2xs"
              title="Salin isi PRD dalam format Markdown"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Salin Markdown'}</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-2xs"
              title="Unduh file PRD .md ke komputer Anda"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Unduh .md</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors ml-2 cursor-pointer"
              aria-label="Tutup PRD"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 px-4 sm:px-8 border-b border-stone-200 bg-white overflow-x-auto shrink-0 py-2.5 text-xs font-medium">
          {[
            { id: 'summary', label: '1. Executive Summary', icon: BookOpen },
            { id: 'personas', label: '2. User Personas', icon: Users },
            { id: 'tech', label: '3. System Architecture', icon: Server },
            { id: 'database', label: '4. Database ERD', icon: Database },
            { id: 'features', label: '5. Kebutuhan Fungsional (FR)', icon: Target },
            { id: 'api', label: '6. Spesifikasi API', icon: Code },
            { id: 'roadmap', label: '7. Roadmap & KPIs', icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 bg-[#FAF9F6]">
          
          {/* TAB 1: EXECUTIVE SUMMARY */}
          {activeTab === 'summary' && (
            <div className="space-y-6 max-w-4xl">
              {/* Meta Card */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-stone-400 block">Lead Architect / CEO:</span>
                  <strong className="text-slate-900">{PRD_DATA.author}</strong>
                </div>
                <div>
                  <span className="text-stone-400 block">Mata Kuliah:</span>
                  <strong className="text-slate-900">{PRD_DATA.course}</strong>
                </div>
                <div>
                  <span className="text-stone-400 block">Versi Dokumen:</span>
                  <strong className="text-blue-600">{PRD_DATA.version}</strong>
                </div>
                <div>
                  <span className="text-stone-400 block">Status:</span>
                  <strong className="text-emerald-600">{PRD_DATA.status}</strong>
                </div>
              </div>

              {/* Summary Text */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Ringkasan Eksekutif (Executive Summary)
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                  {PRD_DATA.executiveSummary}
                </p>
              </div>

              {/* Problem & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-rose-200/80 space-y-3">
                  <h4 className="font-serif text-base font-bold text-rose-950 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    Problem Statement (Masalah Pasar)
                  </h4>
                  <div className="text-xs text-stone-700 whitespace-pre-line leading-relaxed">
                    {PRD_DATA.problemStatement}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-emerald-200/80 space-y-3">
                  <h4 className="font-serif text-base font-bold text-emerald-950 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Proposed Solution (Solusi Nilai)
                  </h4>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {PRD_DATA.proposedSolution}
                  </p>
                </div>
              </div>

              {/* Business Model Canvas Highlights */}
              <div className="space-y-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Model Bisnis & Arus Pendapatan (Monetization Engine)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {PRD_DATA.businessModel.map((bm, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2">
                      <h4 className="text-xs font-bold text-slate-900">{bm.title}</h4>
                      <p className="text-[11px] text-stone-600 leading-relaxed">{bm.description}</p>
                      <ul className="pt-2 border-t border-stone-100 space-y-1">
                        {bm.points.map((p, j) => (
                          <li key={j} className="text-[10px] text-stone-500 flex items-start gap-1">
                            <span className="text-blue-500">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PERSONAS */}
          {activeTab === 'personas' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">Target Pengguna & Analisis Kebutuhan</h3>
                <p className="text-xs text-stone-500 mt-1">Pemetaan aktor kunci dalam ekosistem pickuplaundry untuk desain fungsional.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PRD_DATA.userPersonas.map((persona, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {persona.role}
                      </span>
                      <h4 className="font-serif text-base font-bold text-slate-900 mt-2">
                        {persona.personaName}
                      </h4>
                      <p className="text-xs italic text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-100 my-3">
                        "{persona.quote}"
                      </p>

                      <div className="space-y-3 text-xs">
                        <div>
                          <strong className="text-rose-700 block text-[11px] mb-1">Pain Points:</strong>
                          <ul className="space-y-1 text-stone-600">
                            {persona.painPoints.map((pt, j) => (
                              <li key={j} className="flex items-start gap-1.5 text-[11px]">
                                <span className="text-rose-500">✕</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <strong className="text-emerald-700 block text-[11px] mb-1">Kebutuhan Solusi:</strong>
                          <ul className="space-y-1 text-stone-600">
                            {persona.needs.map((nd, j) => (
                              <li key={j} className="flex items-start gap-1.5 text-[11px]">
                                <span className="text-emerald-500">✓</span>
                                <span>{nd}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SYSTEM ARCHITECTURE */}
          {activeTab === 'tech' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">Arsitektur Sistem & Tech Stack</h3>
                <p className="text-xs text-stone-500 mt-1">Pemilihan teknologi berdasarkan scalability, speed, and reliability.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PRD_DATA.techStack.map((tech, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Layer {i + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{tech.layer}</h4>
                    <div className="font-mono text-xs font-semibold text-blue-700 bg-blue-50/70 p-2.5 rounded-lg border border-blue-100">
                      {tech.technologies}
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed pt-1">
                      {tech.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DATABASE SCHEMA (ERD) */}
          {activeTab === 'database' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">Desain Skema Database Relasional (PostgreSQL)</h3>
                <p className="text-xs text-stone-500 mt-1">Entitas data terstandarisasi untuk integritas transaksi pesanan, tracking, dan kemitraan.</p>
              </div>

              <div className="space-y-6">
                {PRD_DATA.databaseSchema.map((table, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
                    <div className="bg-stone-50 p-4 border-b border-stone-200 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Database className="w-4 h-4 text-blue-600" />
                        <h4 className="font-mono text-sm font-bold text-slate-900">Tabel: {table.table}</h4>
                      </div>
                      <span className="text-xs text-stone-500">{table.description}</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-stone-100/60 text-stone-500 font-semibold border-b border-stone-200">
                          <tr>
                            <th className="p-3">Nama Kolom</th>
                            <th className="p-3">Tipe Data</th>
                            <th className="p-3">Key / Index</th>
                            <th className="p-3">Keterangan</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {table.columns.map((col, j) => (
                            <tr key={j} className="hover:bg-stone-50/50 font-mono text-[11px]">
                              <td className="p-3 font-bold text-slate-900">{col.name}</td>
                              <td className="p-3 text-blue-700">{col.type}</td>
                              <td className="p-3 text-stone-500">{col.key}</td>
                              <td className="p-3 font-sans text-stone-600">{col.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: FUNCTIONAL REQUIREMENTS */}
          {activeTab === 'features' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">Spesifikasi Kebutuhan Fungsional (FR)</h3>
                <p className="text-xs text-stone-500 mt-1">Daftar fitur inti beserta Acceptance Criteria untuk evaluasi teknis.</p>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
                    <tr>
                      <th className="p-3.5">Kode</th>
                      <th className="p-3.5">Modul</th>
                      <th className="p-3.5">Nama Fitur</th>
                      <th className="p-3.5">Prioritas</th>
                      <th className="p-3.5">Kriteria Penerimaan (Acceptance Criteria)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {PRD_DATA.functionalRequirements.map((fr, i) => (
                      <tr key={i} className="hover:bg-stone-50/50">
                        <td className="p-3.5 font-bold font-mono text-blue-700">{fr.code}</td>
                        <td className="p-3.5 text-stone-500 font-medium">{fr.module}</td>
                        <td className="p-3.5 font-semibold text-slate-900">{fr.feature}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                            {fr.priority}
                          </span>
                        </td>
                        <td className="p-3.5 text-stone-600 leading-relaxed max-w-xs">{fr.acceptanceCriteria}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: API SPECIFICATION */}
          {activeTab === 'api' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">Spesifikasi API Endpoint (RESTful)</h3>
                <p className="text-xs text-stone-500 mt-1">Kontrak antarmuka komunikasi antara Client dan Server pickuplaundry.</p>
              </div>

              <div className="space-y-4">
                {PRD_DATA.apiSpecifications.map((api, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className={`px-2 py-0.5 rounded font-bold uppercase ${
                        api.method === 'POST' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {api.method}
                      </span>
                      <span className="font-bold text-slate-900">{api.endpoint}</span>
                    </div>

                    <p className="text-xs text-stone-600">{api.description}</p>

                    {api.requestBody && (
                      <div>
                        <div className="text-[10px] font-mono text-stone-400 uppercase">Request JSON Body:</div>
                        <pre className="mt-1 p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto">
                          {api.requestBody}
                        </pre>
                      </div>
                    )}

                    <div>
                      <div className="text-[10px] font-mono text-stone-400 uppercase">Response JSON (200 OK):</div>
                      <pre className="mt-1 p-3 rounded-xl bg-slate-900 text-cyan-300 font-mono text-[11px] overflow-x-auto">
                        {api.responseBody}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: ROADMAP & KPIS */}
          {activeTab === 'roadmap' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">Roadmap Pengembangan & Metrik Evaluasi (KPI)</h3>
                <p className="text-xs text-stone-500 mt-1">Timeline pengerjaan 6-minggu untuk tugas Web Programming for Business.</p>
              </div>

              {/* Sprints */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PRD_DATA.developmentRoadmap.map((rm, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {rm.timeline}
                    </span>
                    <h4 className="font-serif text-base font-bold text-slate-900">{rm.sprint}</h4>
                    <p className="text-xs font-semibold text-stone-700">Fokus: {rm.focus}</p>
                    <ul className="pt-2 border-t border-stone-100 space-y-1">
                      {rm.deliverables.map((del, j) => (
                        <li key={j} className="text-xs text-stone-600 flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* KPIs Table */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
                <h4 className="font-serif text-base font-bold text-slate-900">
                  Target Keberhasilan Bisnis & Operasional (KPIs)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  {PRD_DATA.kpis.map((kpi, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-stone-400">{kpi.category}</span>
                      <div className="text-xs text-stone-700 font-medium">{kpi.metric}</div>
                      <div className="font-bold text-blue-700 text-sm">{kpi.target}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Note */}
        <div className="p-4 px-8 border-t border-stone-200 bg-stone-50 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2 shrink-0">
          <div>
            Disusun untuk proyek akhir mata kuliah <strong>Web Programming for Business</strong> • CEO Reyhan
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyMarkdown}
              className="text-blue-600 font-semibold hover:underline cursor-pointer"
            >
              Salin Format Markdown
            </button>
            <button
              onClick={handleDownloadMarkdown}
              className="text-stone-800 font-semibold hover:underline cursor-pointer"
            >
              Download Dokumen .md
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
