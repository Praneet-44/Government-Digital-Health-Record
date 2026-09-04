import React, { useState } from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext.tsx';
import { UserPlus, Search, ShieldCheck, CheckCircle2, User, Phone, MapPin, Calendar, HeartPulse } from 'lucide-react';

export const OperatorPortal: React.FC = () => {
  const { patient, allPatients, registerNewCitizen, setRole } = useHealthRecord();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // New Citizen Form State
  const [newFullName, setNewFullName] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [newDob, setNewDob] = useState('');
  const [newGender, setNewGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [newBloodGroup, setNewBloodGroup] = useState('B+');
  const [createdProfile, setCreatedProfile] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const found = allPatients.find(p =>
      p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.mobile.includes(searchQuery) ||
      p.permanentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.abhaId.includes(searchQuery)
    );

    if (found) {
      setSearchResult(found);
    } else {
      setSearchResult('not_found');
    }
  };

  const handleCreateCitizen = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newMobile) return;

    const profile = registerNewCitizen(newFullName, newMobile, newDob || '01 Jan 1996', newGender, newBloodGroup);
    setCreatedProfile(profile);
    setShowCreateForm(false);
    setNewFullName('');
    setNewMobile('');
  };

  return (
    <div className="min-h-screen bg-[#E8F5E9] py-8">
      <div className="container mx-auto px-4 max-w-5xl space-y-6">
        {/* Header */}
        <div className="bg-[#1B5E20] text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#A5D6A7] uppercase tracking-wider mb-1">
              <UserPlus className="w-4 h-4 text-[#66BB6A]" /> Hospital OPD Registration Counter
            </div>
            <h2 className="text-2xl font-bold font-display">Citizen Onboarding & ID Counter</h2>
            <p className="text-xs text-[#D0EBD2] mt-0.5">Search existing ABHA records or create permanent government health profile</p>
          </div>

          <button
            onClick={() => { setShowCreateForm(true); setSearchResult(null); setCreatedProfile(null); }}
            className="btn btn-primary bg-[#66BB6A] text-[#1B5E20] hover:bg-[#54ab58] font-bold text-xs shadow"
          >
            + Create New Permanent Profile
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-6 border border-[#C8E6C9] shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#1B5E20] flex items-center gap-2">
            <Search className="w-5 h-5 text-[#66BB6A]" /> Search Citizen Permanent Record
          </h3>

          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Name (e.g. Praneet), Mobile (+91...), ABHA ID, or Permanent ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-[#C8E6C9] rounded-xl text-sm focus:outline-none focus:border-[#1B5E20]"
            />
            <button type="submit" className="btn btn-primary text-xs px-6">
              Search Profile
            </button>
          </form>

          {/* Search Result */}
          {searchResult && searchResult !== 'not_found' && (
            <div className="p-5 rounded-xl bg-[#E8F5E9] border-2 border-[#1B5E20] mt-4 space-y-3 animate-fade-in">
              <div className="flex justify-between items-start">
                <div>
                  <span className="badge badge-verified text-[10px] mb-1">🟢 Profile Located</span>
                  <h4 className="text-xl font-bold text-[#122415]">{searchResult.fullName}</h4>
                  <p className="text-xs text-[#38523C]">
                    Permanent Health ID: <strong className="font-mono text-[#1B5E20]">{searchResult.permanentId}</strong> • ABHA: <strong className="font-mono">{searchResult.abhaId}</strong>
                  </p>
                </div>
                <button
                  onClick={() => setRole('citizen')}
                  className="btn btn-primary text-xs"
                >
                  Open Record Workspace ➔
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-2 border-t border-[#C8E6C9]">
                <div><span className="text-[#38523C] block font-semibold">Blood Group:</span> <strong className="text-[#1B5E20]">{searchResult.bloodGroup}</strong></div>
                <div><span className="text-[#38523C] block font-semibold">Gender / DOB:</span> <strong>{searchResult.gender}, {searchResult.dob}</strong></div>
                <div><span className="text-[#38523C] block font-semibold">Mobile:</span> <strong>{searchResult.mobile}</strong></div>
                <div><span className="text-[#38523C] block font-semibold">Status:</span> <strong className="text-[#1B5E20]">Active Profile</strong></div>
              </div>
            </div>
          )}

          {searchResult === 'not_found' && (
            <div className="p-4 rounded-xl bg-[#FFF5F5] border border-[#FCA5A5] text-xs text-[#B91C1C] flex justify-between items-center mt-4">
              <span>No existing record found for "{searchQuery}". Create a new profile for this citizen.</span>
              <button
                onClick={() => setShowCreateForm(true)}
                className="btn btn-primary text-xs bg-[#B91C1C] hover:bg-[#991B1B]"
              >
                Create New Citizen Profile
              </button>
            </div>
          )}
        </div>

        {/* Created Profile Success Card */}
        {createdProfile && (
          <div className="p-6 rounded-2xl bg-white border-2 border-[#66BB6A] shadow-xl text-center space-y-3 animate-fade-in">
            <CheckCircle2 className="w-12 h-12 text-[#1B5E20] mx-auto" />
            <h3 className="text-2xl font-bold text-[#1B5E20] font-display">Permanent Health Profile Issued!</h3>
            <p className="text-xs text-[#38523C]">Citizen registered in Government Health Network database.</p>
            <div className="p-4 bg-[#E8F5E9] rounded-xl border border-[#A5D6A7] inline-block text-left text-xs space-y-1">
              <p><strong>Name:</strong> {createdProfile.fullName}</p>
              <p><strong>Permanent Health ID:</strong> <span className="font-mono font-bold text-[#1B5E20]">{createdProfile.permanentId}</span></p>
              <p><strong>ABHA Linked ID:</strong> <span className="font-mono font-bold">{createdProfile.abhaId}</span></p>
            </div>
          </div>
        )}

        {/* Create Citizen Profile Form Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-[#66BB6A] animate-fade-in">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#1B5E20] font-display flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-[#66BB6A]" /> New Citizen Registration
                  </h3>
                  <p className="text-xs text-[#38523C] mt-0.5">Demographics & Permanent Health ID issuance</p>
                </div>
                <button onClick={() => setShowCreateForm(false)} className="text-gray-400 hover:text-black font-bold">✕</button>
              </div>

              <form onSubmit={handleCreateCitizen} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#122415] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Citizen Full Name..."
                    value={newFullName}
                    onChange={(e) => setNewFullName(e.target.value)}
                    className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#122415] mb-1">Mobile Number</label>
                    <input
                      type="text"
                      required
                      placeholder="+91 98765..."
                      value={newMobile}
                      onChange={(e) => setNewMobile(e.target.value)}
                      className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#122415] mb-1">Date of Birth</label>
                    <input
                      type="text"
                      required
                      placeholder="12 Jan 1998"
                      value={newDob}
                      onChange={(e) => setNewDob(e.target.value)}
                      className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#122415] mb-1">Gender</label>
                    <select
                      value={newGender}
                      onChange={(e: any) => setNewGender(e.target.value)}
                      className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#122415] mb-1">Blood Group</label>
                    <select
                      value={newBloodGroup}
                      onChange={(e) => setNewBloodGroup(e.target.value)}
                      className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm"
                    >
                      <option value="O+">O+</option>
                      <option value="A+">A+</option>
                      <option value="B+">B+</option>
                      <option value="AB+">AB+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary text-xs">
                    Issue Permanent Health ID
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
