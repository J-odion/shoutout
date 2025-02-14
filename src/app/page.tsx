"use client"
import { useState } from 'react';
import AnimatedBackground from './component/AnimatedBackground';
import ShoutoutSubmission from './component/ShoutoutSubmission';
import ShoutoutViewer from './component/ShoutoutViewer';
// import { staffList } from './api/data' 


export default function Home() {
  const [viewingShoutouts, setViewingShoutouts] = useState(false);

  // const data = {staff : staffList}

  return (
    <main className="min-h-screen flex items-center justify-center">
      <AnimatedBackground />
      <div className="container">
        {!viewingShoutouts ? (
          <ShoutoutSubmission onCheckShoutouts={() => setViewingShoutouts(true)} />
        ) : (
          <ShoutoutViewer />
        )}
      </div>
    </main>
  );
}
