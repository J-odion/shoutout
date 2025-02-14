'use client';
import { useState } from 'react';
import { sendShoutOut } from '../utils/api';
import ShoutoutForm from './Shoutout';

export default function ShoutoutSubmission({ onCheckShoutouts }: { onCheckShoutouts: () => void }) {
  const [step, setStep] = useState<number>(1);
  const [selectedStaff, setSelectedStaff] = useState<string>('');
  const [senderName, setSenderName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleStaffSelect = (staff: string) => {
    setSelectedStaff(staff);
    setStep(2);
  };

  const handleShoutoutSubmit = async (message: string) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      await sendShoutOut({ sender: senderName || 'Anonymous', recipient: selectedStaff, message });
      setSenderName(senderName)
      setSuccessMessage('Shoutout submitted successfully!');
      setStep(3);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Error submitting shoutout.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shoutout-submission md:w-2/4 w-3/4 mx-auto items-center justify-center flex flex-col bg-blue-950/20 backdrop-blur-md p-6 rounded-lg shadow-lg">
      <h2 className='text-3xl text-center text-red-500 font-bold ' > Send a shoutout</h2>
      <p className="text-blue-950 mb-6 text-xs text-center w-full">Select any staff name to send a shout out</p>
      {errorMessage && <p className="text-red-500 text-center w-full">{errorMessage}</p>}
      {successMessage && <p className="text-green-500  text-center w-full">{successMessage}</p>}
      {step === 1 && <ShoutoutForm type="select" onSubmit={handleStaffSelect} />}
      {step === 2 && <ShoutoutForm type="message" onSubmit={handleShoutoutSubmit} recipient={selectedStaff} />}
      {step === 3 && <button disabled={loading} onClick={onCheckShoutouts} className="btn text-red-500 border p-2 rounded-md  border-red-500 mt-5 text-xs">Check Your Shoutouts</button>}
    </div>
  );
}