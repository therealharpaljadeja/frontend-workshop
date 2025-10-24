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
        {/* Message Count Badge */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-black">Current Message</h2>
          <div className="bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold">
            Message #{messageCount}
          </div>
        </div>

        {/* Message Content */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <p className="text-gray-900 text-lg leading-relaxed break-words">
            {message || 'No message yet...'}
          </p>
        </div>

        {/* Author Info */}
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

