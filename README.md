# MessageBoard Frontend

Next.js frontend for the MessageBoard smart contract, built for workshop demonstrations.

## 📁 Project Structure

```
messageboard-frontend/
├── app/
│   ├── page.tsx          # Main page component
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── Header.tsx        # Header with wallet connection
│   ├── MessageDisplay.tsx # Display current message and author
│   └── MessageForm.tsx   # Form to update messages
└── lib/
    └── contract.ts       # Smart contract integration (placeholder)
```

## 🚀 Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Smart Contract Functions

The MessageBoard contract has the following functions:

```solidity
// Read functions
function getMessage() public view returns (string memory)
function getAuthor() public view returns (address)
uint256 public messageCount

// Write function
function updateMessage(string memory _newMessage) public

// Event
event MessageUpdated(address indexed author, string message, uint256 timestamp)
```

## 📦 Libraries You'll Need

For smart contract integration, you'll want to install:

```bash
# Option 2: viem + wagmi (recommended for modern apps)
npm install viem wagmi
```
