# MessageBoard Frontend

Next.js frontend for the MessageBoard smart contract, built for workshop demonstrations.

## 🚀 Quick Setup

```bash
# Create Next.js app
npx create-next-app@latest messageboard-frontend --typescript --tailwind --app --no-src-dir

# Install dependencies
cd messageboard-frontend
npm install viem wagmi @rainbow-me/rainbowkit @tanstack/react-query
```

## 📦 Dependencies

```json
"dependencies": {
  "@rainbow-me/rainbowkit": "^2.2.9",
  "@tanstack/react-query": "^5.90.5",
  "next": "16.0.0",
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "viem": "^2.38.4",
  "wagmi": "^2.18.2"
}
```

## 🛠️ Implementation Steps

### 1. Configure Wagmi + RainbowKit

Create `lib/wagmi.ts`:

```typescript
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { monadTestnet } from 'wagmi/chains'
import { http } from 'wagmi'

export const config = getDefaultConfig({
  appName: 'MessageBoard DApp',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
  chains: [monadTestnet],
  transports: {
    [monadTestnet.id]: http('https://testnet-rpc.monad.xyz'),
  },
  ssr: true,
})

export const CONTRACT_ADDRESS = '0x709fe13caaa6f3051dcb390ff12ba444f465aa98' as const

export const MESSAGE_BOARD_ABI = [
  {
    inputs: [],
    name: 'getMessage',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'author',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'messageCount',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'newMessage', type: 'string' }],
    name: 'updateMessage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const
```

### 2. Setup Providers

Create `app/providers.tsx`:

```typescript
'use client'

import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@/lib/wagmi'
import { ReactNode } from 'react'

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

Update `app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MessageBoard DApp",
  description: "A decentralized message board built with Next.js and Ethereum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

### 3. Create Components

Create `components/MessageDisplay.tsx`:

```typescript
'use client';

interface MessageDisplayProps {
  message: string;
  author: string;
  messageCount: number;
}

export default function MessageDisplay({ message, author, messageCount }: MessageDisplayProps) {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-8 mb-8 hover:border-black transition-colors">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-black">Current Message</h2>
          <div className="bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold">
            Message #{messageCount}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <p className="text-gray-900 text-lg leading-relaxed break-words">
            {message || 'No message yet...'}
          </p>
        </div>

        <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center w-10 h-10 bg-black rounded-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Author</p>
            <p className="text-sm font-mono text-gray-700 truncate">
              {author || '0x0000000000000000000000000000000000000000'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Create `components/MessageForm.tsx`:

```typescript
'use client';

import { useState } from 'react';

interface MessageFormProps {
  onSubmit: (message: string) => Promise<void>;
  isLoading?: boolean;
}

export default function MessageForm({ onSubmit, isLoading = false }: MessageFormProps) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setError('Message cannot be empty');
      return;
    }

    setError('');
    try {
      await onSubmit(message);
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update message');
    }
  };

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-8 hover:border-black transition-colors">
      <h2 className="text-2xl font-bold text-black mb-6">Update Message</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            New Message
          </label>
          <textarea
            id="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here..."
            disabled={isLoading}
            className="w-full text-black px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          {error && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating...
            </span>
          ) : (
            'Update Message'
          )}
        </button>
      </form>
    </div>
  );
}
```

### 4. Main Page with Read/Write Functions

Update `app/page.tsx`:

```typescript
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
  const { data: author } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: MESSAGE_BOARD_ABI,
    functionName: 'author',
    query: {
      refetchInterval: 2000,
    },
  });

  // Read message count from contract
  const { data: messageCount } = useReadContract({
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

  useEffect(() => {
    setMessageData({
      message: (message as string) || 'No message yet',
      author: (author as string) || '0x0000000000000000000000000000000000000000',
      messageCount: Number(messageCount) || 0,
    });
  }, [message, author, messageCount]);

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
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">MessageBoard DApp</h1>
            <ConnectButton />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <MessageDisplay
          message={messageData.message}
          author={messageData.author}
          messageCount={messageData.messageCount}
        />
        <MessageForm onSubmit={handleUpdateMessage} isLoading={isLoading || isConfirming} />
      </main>

      <footer className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-600 text-sm">
          Built with Next.js, TypeScript, Tailwind CSS, Wagmi, and RainbowKit
        </p>
      </footer>
    </div>
  );
}
```

## 🎯 Key Features Implemented

- **RainbowKit** wallet connection with beautiful UI
- **useReadContract** for reading blockchain data (getMessage, author, messageCount)
- **useWriteContract** for updating messages on-chain
- **useWaitForTransactionReceipt** for transaction confirmation
- **Auto-refresh** every 2 seconds to keep data in sync
- **Modern UI** with Tailwind CSS

## 🏃 Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
