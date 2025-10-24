'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MessageDisplay from '@/components/MessageDisplay';
import MessageForm from '@/components/MessageForm';
import {
  connectWallet,
  getMessageBoardData,
  updateMessage,
  isWalletConnected,
  getConnectedAddress,
  type MessageBoardData,
} from '@/lib/contract';

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string>('');
  const [messageData, setMessageData] = useState<MessageBoardData>({
    message: 'Loading...',
    author: '0x0000000000000000000000000000000000000000',
    messageCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Check if wallet is already connected
      const connected = await isWalletConnected();
      setIsConnected(connected);

      if (connected) {
        const addr = await getConnectedAddress();
        if (addr) setAddress(addr);
      }

      // Load message board data
      const data = await getMessageBoardData();
      setMessageData(data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleConnect = async () => {
    try {
      const addr = await connectWallet();
      setAddress(addr);
      setIsConnected(true);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Make sure you have MetaMask installed!');
    }
  };

  const handleUpdateMessage = async (newMessage: string) => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }

    setIsLoading(true);
    try {
      await updateMessage(newMessage);
      // Reload data after successful update
      await loadData();
      alert('Message updated successfully!');
    } catch (error) {
      console.error('Error updating message:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isConnected={isConnected}
        address={address}
        onConnect={handleConnect}
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <MessageDisplay
            message={messageData.message}
            author={messageData.author}
            messageCount={messageData.messageCount}
          />
        </div>

        <div>
          <MessageForm onSubmit={handleUpdateMessage} isLoading={isLoading} />
        </div>

       
      </main>

      <footer className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-600 text-sm">
          Built with Next.js, TypeScript, and Tailwind CSS
        </p>
      </footer>
    </div>
  );
}
