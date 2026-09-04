import React, { useState } from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext';
import { PlusCircle, ShieldAlert } from 'lucide-react';

interface ReportChangeModalProps {
  onClose: () => void;
}

export const ReportChangeModal: React.FC<ReportChangeModalProps> = ({ onClose }) => {
  const { reportChange } = useHealthRecord();
  const [itemType, setItemType] = useState<'allergy' | 'medication' | 'operation' | 'condition'>('allergy');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    reportChange(itemType, title, details);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-[#66BB6A] animate-fade-in">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-[#1B5E20] font-display flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-[#66BB6A]" /> Report Medical Information / Change
            </h3>
            <p className="text-xs text-[#38523C] mt-0.5">
              Self-reported records are submitted for clinical review by an authorized physician.
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-black font-bold">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#122415] mb-1">Information Category</label>
            <select
              value={itemType}
              onChange={(e: any) => setItemType(e.target.value)}
              className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm focus:outline-none focus:border-[#1B5E20]"
            >
              <option value="allergy">New Drug / Food Allergy</option>
              <option value="medication">Currently Taking Medication</option>
              <option value="operation">Previous Operation / Surgery</option>
              <option value="condition">Existing Medical Condition</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#122415] mb-1">Title / Name of Item</label>
            <input
              type="text"
              required
              placeholder="e.g. Ciprofloxacin (Allergy) or Paracetamol 500mg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm focus:outline-none focus:border-[#1B5E20]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#122415] mb-1">Details & Reaction Symptoms</label>
            <textarea
              rows={3}
              required
              placeholder="Describe symptoms, dosage, or details..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm focus:outline-none focus:border-[#1B5E20]"
            ></textarea>
          </div>

          <div className="bg-[#FEF3C7] p-3 rounded-lg border border-[#FDE68A] text-xs text-[#78350F]">
            <p className="font-bold flex items-center gap-1"><ShieldAlert className="w-4 h-4 text-[#B45309]" /> Safety Safeguard:</p>
            <p className="text-[11px] mt-0.5">
              This item will be saved with status 🟡 <strong>Pending Verification</strong>. A government doctor will verify it during your OPD consultation before it becomes verified clinical data.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary text-xs"
            >
              Submit for Verification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
