import React, { useState } from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext.tsx';
import { FileText, Upload, Bot, FileUp, Sparkles, Camera, CheckCircle2, ArrowRight } from 'lucide-react';

export const DocumentLocker: React.FC = () => {
  const { patient, uploadDocument } = useHealthRecord();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState<'prescription' | 'lab_report' | 'scan' | 'discharge'>('prescription');
  const [isScanning, setIsScanning] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<'handwritten' | 'printed' | 'hybrid'>('handwritten');

  const handleSimulatedUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle) return;

    setIsScanning(true);
    setTimeout(() => {
      if (selectedPreset === 'handwritten') {
        uploadDocument(docTitle, docCategory, {
          detectedDocumentType: 'handwritten_prescription',
          printedText: 'DISTRICT GOVERNMENT HOSPITAL OPD • GOV-IND-2026-88412',
          handwrittenNotesText: 'Rx: Tab. Metformin 500mg BD after food. Avoid high sugar. - Dr. R. K. Sharma',
          medication: 'Metformin 500mg (BD)',
          dosage: 'Twice daily after meals',
          doctor: 'Dr. R. K. Sharma (MD)',
          diagnosis: 'Type-2 Diabetes Management',
          handwritingConfidence: 95,
          printedConfidence: 99
        });
      } else if (selectedPreset === 'printed') {
        uploadDocument(docTitle, docCategory, {
          detectedDocumentType: 'printed_lab_report',
          printedText: 'CITY CENTRAL DIAGNOSTIC LAB • HbA1c: 7.2% • Fasting Glucose: 138 mg/dL',
          handwrittenNotesText: 'Lab Tech Cursive Note: Repeat HbA1c in 90 days.',
          medication: 'Glycemic Control Adjustment Suggested',
          dosage: 'Consult Doctor for Dosage Adjustment',
          doctor: 'Pathology Lab Chief',
          diagnosis: 'Elevated Fasting Glucose & HbA1c',
          handwritingConfidence: 92,
          printedConfidence: 100
        });
      } else {
        uploadDocument(docTitle, docCategory, {
          detectedDocumentType: 'hybrid_clinical_note',
          printedText: 'PHC TRIAGE SLIP • Patient: Praneet Kumar',
          handwrittenNotesText: 'Rx: Inj. Diclofenac 75mg IM stat. Tab. Pantoprazole 40mg 1x daily.',
          medication: 'Diclofenac 75mg IM, Pantoprazole 40mg',
          dosage: 'Diclofenac IM single dose stat; Pantoprazole 40mg OD',
          doctor: 'Dr. Priya Nair (PHC Triage)',
          diagnosis: 'Acute Right Flank Pain / Suspected Renal Colic',
          handwritingConfidence: 96,
          printedConfidence: 98
        });
      }

      setIsScanning(false);
      setShowUploadModal(false);
      setDocTitle('');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-[#C8E6C9] shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-[#1B5E20] font-display flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#1B5E20]" /> Permanent Digital Document Locker
          </h2>
          <p className="text-xs text-[#38523C] mt-1">
            Store prescriptions, lab reports, and MRI scans. Integrated AI Vision Engine extracts both <strong>printed text</strong> and <strong>doctor handwritten notes</strong> automatically.
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="btn btn-primary text-xs flex items-center gap-2"
        >
          <Upload className="w-4 h-4 text-[#66BB6A]" /> Upload / Vision AI Scan Document
        </button>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {patient.documents.map((doc) => (
          <div key={doc.id} className="card hover:border-[#66BB6A] transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold bg-[#E8F5E9] text-[#1B5E20] px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#A5D6A7]">
                  {doc.category.replace('_', ' ')}
                </span>
                {doc.clinicalStatus === 'verified' ? (
                  <span className="badge badge-verified text-[10px]">🟢 Verified</span>
                ) : (
                  <span className="badge badge-imported text-[10px]">📸 AI Vision Extracted</span>
                )}
              </div>

              <h4 className="font-bold text-base text-[#122415] mb-1">{doc.title}</h4>
              <p className="text-xs text-[#38523C] mb-3">{doc.facility} • {doc.uploadDate}</p>

              {/* Neural OCR Confidence Badges */}
              {doc.handwritingConfidence && (
                <div className="flex gap-1.5 mb-3">
                  <span className="text-[9.5px] font-extrabold bg-[#F5F3FF] text-[#7E22CE] px-2 py-0.5 rounded border border-[#DDD6FE]">
                    ✍️ Handwriting: {doc.handwritingConfidence}%
                  </span>
                  <span className="text-[9.5px] font-extrabold bg-[#F0FDF4] text-[#15803D] px-2 py-0.5 rounded border border-[#BBF7D0]">
                    🖨️ Printed OCR: {doc.printedConfidence || 99}%
                  </span>
                </div>
              )}

              {doc.handwrittenNotesText && (
                <div className="p-2.5 bg-[#FAF5FF] border border-[#F3E8FF] rounded-lg text-xs mb-3">
                  <span className="text-[10px] font-bold text-[#6B21A8] block">✍️ Recognized Doctor Cursive Note:</span>
                  <p className="text-[11px] text-[#7E22CE] italic mt-0.5">"{doc.handwrittenNotesText}"</p>
                </div>
              )}

              {doc.extractedData && (
                <div className="p-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg text-xs space-y-1 mb-4">
                  <div className="flex items-center gap-1 text-[#1D4ED8] font-bold text-[11px]">
                    <Bot className="w-3.5 h-3.5" /> AI Extracted Entities:
                  </div>
                  {doc.extractedData.medication && (
                    <p className="text-[11px] text-[#1E40AF]"><strong>Meds:</strong> {doc.extractedData.medication}</p>
                  )}
                  {doc.extractedData.diagnosis && (
                    <p className="text-[11px] text-[#1E40AF]"><strong>Results:</strong> {doc.extractedData.diagnosis}</p>
                  )}
                  {doc.extractedData.doctor && (
                    <p className="text-[11px] text-[#1E40AF]"><strong>Prescribed By:</strong> {doc.extractedData.doctor}</p>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center text-xs text-gray-500 pt-3 border-t border-[#E0F2E1]">
              <span>Size: {doc.fileSize}</span>
              <button className="text-[#1B5E20] font-bold hover:underline">View Document 📄</button>
            </div>
          </div>
        ))}
      </div>

      {/* Document Upload & AI Vision OCR Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-[#66BB6A] animate-fade-in space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-[#1B5E20] font-display flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#66BB6A]" /> Upload & AI Vision Document OCR
                </h3>
                <p className="text-xs text-[#38523C] mt-0.5">
                  Parses both printed typography & handwritten doctor notes into structured clinical data.
                </p>
              </div>
              <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-black font-bold">✕</button>
            </div>

            {/* Quick Sample Document Selector */}
            <div className="bg-[#E8F5E9] p-3 rounded-xl border border-[#A5D6A7] space-y-2">
              <span className="text-[10px] font-extrabold text-[#1B5E20] uppercase block">Select Document Type Preset to Test:</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => { setSelectedPreset('handwritten'); setDocTitle('Doctor OPD Handwritten Prescription'); }}
                  className={`p-2 rounded-lg text-[11px] font-bold text-center border transition-all ${
                    selectedPreset === 'handwritten' ? 'bg-[#1B5E20] text-white border-[#1B5E20]' : 'bg-white text-[#122415] border-[#C8E6C9]'
                  }`}
                >
                  ✍️ Handwritten OPD
                </button>
                <button
                  type="button"
                  onClick={() => { setSelectedPreset('printed'); setDocTitle('Pathology Lab Report'); }}
                  className={`p-2 rounded-lg text-[11px] font-bold text-center border transition-all ${
                    selectedPreset === 'printed' ? 'bg-[#1B5E20] text-white border-[#1B5E20]' : 'bg-white text-[#122415] border-[#C8E6C9]'
                  }`}
                >
                  🖨️ Printed Lab
                </button>
                <button
                  type="button"
                  onClick={() => { setSelectedPreset('hybrid'); setDocTitle('PHC Triage Slip (Hybrid)'); }}
                  className={`p-2 rounded-lg text-[11px] font-bold text-center border transition-all ${
                    selectedPreset === 'hybrid' ? 'bg-[#1B5E20] text-white border-[#1B5E20]' : 'bg-white text-[#122415] border-[#C8E6C9]'
                  }`}
                >
                  📋 Hybrid Note
                </button>
              </div>
            </div>

            <form onSubmit={handleSimulatedUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#122415] mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. OPD Prescription - District Hospital"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm focus:outline-none focus:border-[#1B5E20]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#122415] mb-1">Category</label>
                <select
                  value={docCategory}
                  onChange={(e: any) => setDocCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm focus:outline-none focus:border-[#1B5E20]"
                >
                  <option value="prescription">Prescription</option>
                  <option value="lab_report">Lab Pathology Report</option>
                  <option value="scan">X-Ray / MRI Scan</option>
                  <option value="discharge">Discharge Summary</option>
                </select>
              </div>

              {/* Upload Drop Zone Simulation */}
              <div className="border-2 border-dashed border-[#A5D6A7] bg-[#E8F5E9] p-5 rounded-xl text-center">
                <FileUp className="w-7 h-7 text-[#1B5E20] mx-auto mb-1.5" />
                <p className="text-xs font-bold text-[#1B5E20]">Click or Drag & Drop Medical Document File</p>
                <p className="text-[10px] text-[#38523C] mt-0.5">Supports PNG, JPG, PDF (Handwriting Neural Net Active)</p>
              </div>

              <div className="bg-[#EFF6FF] p-3 rounded-lg border border-[#BFDBFE] text-xs text-[#1D4ED8]">
                <p className="font-bold flex items-center gap-1"><Bot className="w-4 h-4" /> Medical Safety Rule:</p>
                <p className="text-[11px] text-[#1E40AF]">
                  AI Vision extraction will create 🔵 <strong>Imported</strong> clinical records for doctor verification. It will not create automatic verified medical facts until approved by physician.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isScanning}
                  className="btn btn-primary text-xs flex items-center gap-2"
                >
                  {isScanning ? (
                    <>Processing Vision Neural OCR...</>
                  ) : (
                    <>Scan & Process Document <Sparkles className="w-3.5 h-3.5 text-[#66BB6A]" /></>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
