'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MessageDisplay from '@/components/MessageDisplay';
import MessageForm from '@/components/MessageForm';
import { CONTRACT_ADDRESS, MESSAGE_BOARD_ABI } from '@/lib/wagmi';

interface MessageBoardData {
  message: string;
  author: string;
  messageCount: number;
}

export default function Home() {
  const { isConnected } = useAccount();
  const [messageData, setMessageData] = useState<MessageBoardData>({
    message: 'Loading...',
    author: '0x0000000000000000000000000000000000000000',
    messageCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Read message from contract - refetch every 2 seconds
  const { data: message } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: MESSAGE_BOARD_ABI,
    functionName: 'getMessage',
    query: {
      refetchInterval: 2000,
    },
  });

  // Read author from contract
  const { data: author, refetch: refetchAuthor } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: MESSAGE_BOARD_ABI,
    functionName: 'author',
    query: {
      refetchInterval: 2000,
    },
  });

  // Read message count from contract
  const { data: messageCount, refetch: refetchMessageCount } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: MESSAGE_BOARD_ABI,
    functionName: 'messageCount',
    query: {
      refetchInterval: 2000,
    },
  });

  const { writeContractAsync, data: hash } = useWriteContract();
  
  const { isLoading: isConfirming } = 
    useWaitForTransactionReceipt({ 
      hash,
    });

  // Load initial data
  useEffect(() => {
    loadData();
  }, [message, author, messageCount]);

  const loadData = async () => {
    try {
      setMessageData({
        message: (message as string) || 'No message yet',
        author: (author as string) || '0x0000000000000000000000000000000000000000',
        messageCount: Number(messageCount) || 0,
      });
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleUpdateMessage = async (newMessage: string) => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }

    setIsLoading(true);
    try {
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: MESSAGE_BOARD_ABI,
        functionName: 'updateMessage',
        args: [newMessage],
      });
    } catch (error) {
      console.error('Error updating message:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with RainbowKit Connect Button */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">MessageBoard DApp</h1>
            </div>
            <ConnectButton />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <MessageDisplay
            message={messageData.message}
            author={messageData.author}
            messageCount={messageData.messageCount}
          />
        </div>

        <div>
          <MessageForm onSubmit={handleUpdateMessage} isLoading={isLoading || isConfirming} />
        </div>

       
      </main>

      <footer className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-600 text-sm">
          Built with Next.js, TypeScript, Tailwind CSS, Wagmi, and RainbowKit
        </p>
      </footer>
    </div>
  );
}
