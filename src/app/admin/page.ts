'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [shoutouts, setShoutouts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if admin is authenticated
    const checkAuth = async () => {
      // TODO: Implement actual authentication check
      setIsAuthenticated(true);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchShoutouts();
    }
  }, [isAuthenticated]);

  const fetchShoutouts = async () => {
    const response = await fetch('/api/shoutouts');
    const data = await response.json();
    if (data.success) {
      setShoutouts(data.data);
    }
  };

  const handleEdit = async (id, updatedMessage) => {
    // TODO: Implement edit functionality
  };

  const handleDelete = async (id) => {
    // TODO: Implement delete functionality
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="space-y-4">
        {shoutouts.map((shoutout) => (
          <div key={shoutout._id} className="border p-4 rounded">
            <p>From: {shoutout.sender}</p>
            <p>To: {shoutout.recipient}</p>
            <p>Message: {shoutout.message}</p>
            <div className="mt-2">
              <button
                onClick={() => handleEdit(shoutout._id, prompt('Edit message:', shoutout.message))}
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(shoutout._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}