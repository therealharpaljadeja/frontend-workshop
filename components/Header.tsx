'use client';

interface HeaderProps {
  isConnected: boolean;
  address?: string;
  onConnect: () => void;
}

export default function Header({ isConnected, address, onConnect }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-black p-3 rounded-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-black">
                MessageBoard
              </h1>
              <p className="text-sm text-gray-600">Decentralized Message Board</p>
            </div>
          </div>

          <button
            onClick={onConnect}
            className={`
              px-6 py-3 rounded-lg font-semibold transition-all duration-200 border-2
              ${isConnected 
                ? 'bg-black text-white border-black hover:bg-gray-800' 
                : 'bg-black text-white border-black hover:bg-gray-800'
              }
            `}
          >
            {isConnected ? (
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="font-mono text-sm">
                  {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected'}
                </span>
              </span>
            ) : (
              'Connect Wallet'
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

