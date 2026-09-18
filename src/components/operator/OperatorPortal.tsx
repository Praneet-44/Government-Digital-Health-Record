import React, { useState } from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext.tsx';
import { UserPlus, Search, ShieldCheck, CheckCircle2, KeyRound, Info } from 'lucide-react';

export const OperatorPortal: React.FC = () => {
  const { allPatients, registerNewCitizen, setRole } = useHealthRecord();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Registration Form State
  const [newFullName, setNewFullName] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [newDob, setNewDob] = useState('');
  const [newGender, setNewGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [newBloodGroup, setNewBloodGroup] = useState('B+');
  const [newAadhaar, setNewAadhaar] = useState('');
  
  // OTP Verification Flow State
  const [regStep, setRegStep] = useState<'details' | 'otp'>('details');
  const [otpCode, setOtpCode] = useState('123456');
  const [otpError, setOtpError] = useState('');
  const [createdProfileResult, setCreatedProfileResult] = useState<{ profile: any; isExisting: boolean } | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const found = allPatients.find(p =>
      p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.mobile.includes(searchQuery) ||
      (p.aadhaarNumber && p.aadhaarNumber.includes(searchQuery)) ||
      p.permanentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.abhaId.includes(searchQuery)
    );

    if (found) {
      setSearchResult(found);
    } else {
      setSearchResult('not_found');
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newMobile || !newAadhaar) return;
    setOtpError('');
    setRegStep('otp');
  };

  const handleVerifyOtpAndRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 4) {
      setOtpError('Please enter valid 6-digit Aadhaar OTP');
      return;
    }

    const result = registerNewCitizen(
      newFullName,
      newMobile,
      newDob || '01 Jan 1996',
      newGender,
      newBloodGroup,
      newAadhaar
    );

    setCreatedProfileResult(result);
    setShowCreateForm(false);
    setRegStep('details');
    setNewFullName('');
    setNewMobile('');
    setNewAadhaar('');
  };

  const handleOpenCreateModal = () => {
    setShowCreateForm(true);
    setRegStep('details');
    setSearchResult(null);
    setCreatedProfileResult(null);
    setNewFullName('');
    setNewMobile('');
    setNewAadhaar('');
    setNewDob('15 Aug 1995');
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
            <p className="text-xs text-[#D0EBD2] mt-0.5">Search existing ABHA / Aadhaar records or issue permanent government health profile</p>
          </div>

          <button
            onClick={handleOpenCreateModal}
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
              placeholder="Enter Name, Mobile (+91...), Aadhaar Number, ABHA ID, or Permanent ID..."
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
                  {searchResult.aadhaarNumber && (
                    <p className="text-xs text-[#1B5E20] font-semibold mt-0.5">
                      Verified Aadhaar: <span className="font-mono">{searchResult.aadhaarNumber}</span>
                    </p>
                  )}
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
                onClick={handleOpenCreateModal}
                className="btn btn-primary text-xs bg-[#B91C1C] hover:bg-[#991B1B]"
              >
                Create New Citizen Profile
              </button>
            </div>
          )}
        </div>

        {/* Created Profile or Existing Profile Retrived Banner */}
        {createdProfileResult && (
          <div className={`p-6 rounded-2xl border-2 shadow-xl space-y-3 animate-fade-in ${
            createdProfileResult.isExisting
              ? 'bg-[#FEF3C7] border-[#FDE68A]'
              : 'bg-white border-[#66BB6A]'
          }`}>
            {createdProfileResult.isExisting ? (
              <div className="text-center space-y-2">
                <Info className="w-12 h-12 text-[#B45309] mx-auto" />
                <h3 className="text-xl font-extrabold text-[#78350F] font-display">
                  Existing Permanent Health Profile Located!
                </h3>
                <p className="text-xs text-[#92400E] max-w-lg mx-auto font-medium">
                  Single Permanent Health ID Policy Enforced: A Permanent Health ID already exists for this Aadhaar Number / Mobile. Automatically loaded citizen profile!
                </p>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-[#1B5E20] mx-auto" />
                <h3 className="text-2xl font-bold text-[#1B5E20] font-display">Permanent Health Profile Issued!</h3>
                <p className="text-xs text-[#38523C]">Citizen registered in Government Digital Health Network database via Aadhaar OTP.</p>
              </div>
            )}

            <div className="p-4 bg-white/80 rounded-xl border border-[#C8E6C9] max-w-md mx-auto text-left text-xs space-y-1 shadow-sm">
              <p><strong>Citizen Name:</strong> {createdProfileResult.profile.fullName}</p>
              <p><strong>Permanent Health ID:</strong> <span className="font-mono font-bold text-[#1B5E20]">{createdProfileResult.profile.permanentId}</span></p>
              <p><strong>ABHA Number:</strong> <span className="font-mono font-bold">{createdProfileResult.profile.abhaId}</span></p>
              <p><strong>Verified Aadhaar:</strong> <span className="font-mono font-bold text-[#1B5E20]">{createdProfileResult.profile.aadhaarNumber}</span></p>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setRole('citizen')}
                className="btn btn-primary text-xs px-6"
              >
                Access Citizen Record Workspace ➔
              </button>
            </div>
          </div>
        )}

        {/* Create Citizen Profile Form Modal (Step 1: Details & Aadhaar, Step 2: OTP) */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-[#66BB6A] animate-fade-in">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#1B5E20] font-display flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-[#66BB6A]" /> New Citizen Registration
                  </h3>
                  <p className="text-xs text-[#38523C] mt-0.5">
                    {regStep === 'details' ? 'Step 1 of 2: Demographics & Aadhaar Verification' : 'Step 2 of 2: Enter Aadhaar OTP'}
                  </p>
                </div>
                <button onClick={() => setShowCreateForm(false)} className="text-gray-400 hover:text-black font-bold">✕</button>
              </div>

              {regStep === 'details' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
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

                  <div>
                    <label className="block text-xs font-bold text-[#122415] mb-1 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-[#1B5E20]" /> Aadhaar Number (Mandatory 12-Digit UIDAI)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 5894 1029 4410"
                      value={newAadhaar}
                      onChange={(e) => setNewAadhaar(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-[#1B5E20] rounded-lg text-sm font-mono font-bold bg-[#F4F9F5]"
                    />
                    <span className="text-[10px] text-[#2E7D32] font-semibold block mt-0.5">
                      🔒 Verified against UIDAI National Registry. Single Permanent Health ID policy enforced.
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#122415] mb-1">Mobile Number</label>
                      <input
                        type="text"
                        required
                        placeholder="+91 98765 43210"
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
                    <button type="submit" className="btn btn-primary text-xs flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4" /> Send Aadhaar OTP ➔
                    </button>
                  </div>
                </form>
              ) : (
                /* Step 2: Aadhaar OTP Form */
                <form onSubmit={handleVerifyOtpAndRegister} className="space-y-4 text-center py-2">
                  <div className="w-14 h-14 rounded-2xl bg-[#E8F5E9] border-2 border-[#1B5E20] text-[#1B5E20] flex items-center justify-center mx-auto shadow-md">
                    <KeyRound className="w-7 h-7" />
                  </div>

                  <div>
                    <h4 className="text-lg font-extrabold text-[#1B5E20]">Verify Aadhaar OTP</h4>
                    <p className="text-xs text-[#38523C] mt-1">
                      OTP dispatched to Aadhaar linked mobile <strong className="text-[#122415]">+91 ******{newMobile.slice(-4) || '3210'}</strong>
                    </p>
                  </div>

                  <div className="max-w-xs mx-auto space-y-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className="w-full text-center px-4 py-3 border-2 border-[#1B5E20] rounded-xl text-lg font-mono font-extrabold tracking-widest focus:outline-none bg-[#F4F9F5]"
                    />
                    <span className="text-[10px] text-[#2E7D32] font-semibold block">
                      Default Demo OTP: 123456
                    </span>
                  </div>

                  {otpError && (
                    <p className="text-xs text-[#B91C1C] font-bold">{otpError}</p>
                  )}

                  <div className="flex justify-center gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setRegStep('details')}
                      className="btn btn-secondary text-xs"
                    >
                      Back
                    </button>
                    <button type="submit" className="btn btn-primary text-xs px-6 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#66BB6A]" /> Verify OTP & Complete ➔
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
