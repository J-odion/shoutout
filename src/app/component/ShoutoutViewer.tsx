// ShoutoutViewer.tsx
'use client';

import { useState } from 'react';
import WordCloud from './WordCloud';
import { getShoutout } from '../utils/api';
import ShoutoutForm from './Shoutout';

type ShoutoutProps = {
    sender: string;
    recipient: string;
    message: string;
    createdAt: string;
    name: string;
  __v: number;
  _id: string;
  };

export default function ShoutoutViewer() {
  const [senderName, setSenderName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shoutouts, setShoutouts] = useState<ShoutoutProps[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showWordCloud, setShowWordCloud] = useState<boolean>(false);

  const handleNameSubmit = async (name: string) => {
    setSenderName(name);
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      const shoutoutsData = await getShoutout(name);
      if (!shoutoutsData.length) {
        setErrorMessage('No shoutouts found.');
        return;
      }
      setShoutouts(shoutoutsData);
      setShowWordCloud(true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Error fetching shoutouts.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="shoutout-viewer">
      {!showWordCloud && (
        <div className=' bg-blue-950/20 md:w-2/4 w-3/4 mx-auto backdrop-blur-md p-6 rounded-lg shadow-lg'>
        <h2 className='text-3xl text-center text-red-500 font-bold ' > View your shoutout</h2>
        <h2 className='hidden'>{senderName}</h2>
        <p className="text-blue-950 mb-6 text-xs text-center w-full">Select your name to view your shoutout</p>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && !showWordCloud && <ShoutoutForm type="sender" onSubmit={handleNameSubmit} />}
        </div>)
      }

      {showWordCloud && <WordCloud  shoutouts={shoutouts} />}
    </div>
  );
}