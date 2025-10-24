# MessageBoard Frontend

A beautiful Next.js frontend for the MessageBoard smart contract, built for workshop demonstrations.

## 🎨 Features

- **Modern UI**: Clean, aesthetic interface with gradient designs
- **Component-Based**: Well-organized component structure
- **TypeScript**: Full type safety throughout
- **Tailwind CSS**: Responsive and beautiful styling
- **Workshop Ready**: Placeholder functions ready for smart contract integration

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

## 🔧 Smart Contract Integration (To Do in Workshop)

The following functions in `lib/contract.ts` need to be implemented:

### 1. `connectWallet()`
Connect to the user's MetaMask wallet and return the address.

**Hints:**
- Use `window.ethereum.request({ method: 'eth_requestAccounts' })`
- Return the first account address

### 2. `getMessageBoardData()`
Read data from the MessageBoard smart contract.

**Hints:**
- Call `getMessage()`, `getAuthor()`, and `messageCount()` from the contract
- Return as `MessageBoardData` object

### 3. `updateMessage(newMessage: string)`
Update the message on the smart contract.

**Hints:**
- Call the `updateMessage()` function on the contract
- Wait for transaction confirmation

### 4. `isWalletConnected()`
Check if a wallet is currently connected.

**Hints:**
- Check `window.ethereum.selectedAddress`
- Return boolean

### 5. `getConnectedAddress()`
Get the currently connected wallet address.

**Hints:**
- Return `window.ethereum.selectedAddress`
- Return `null` if not connected

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

## 🎯 Workshop Steps

1. **Deploy the Smart Contract** (Foundry/Hardhat)
2. **Install Web3 Library** (ethers.js or viem)
3. **Implement Wallet Connection**
4. **Create Contract Instance**
5. **Implement Read Functions**
6. **Implement Write Functions**
7. **Handle Events** (optional)

## 📦 Libraries You'll Need

For smart contract integration, you'll want to install:

```bash
# Option 1: ethers.js
npm install ethers

# Option 2: viem + wagmi (recommended for modern apps)
npm install viem wagmi
```

## 🎨 UI Components

### Header
- Displays app title and branding
- Wallet connection button
- Shows connected address

### MessageDisplay
- Shows current message with beautiful card design
- Displays message count badge
- Shows author address with icon

### MessageForm
- Textarea for new message input
- Validation (no empty messages)
- Loading states
- Error handling

## 🔍 Testing the UI

Before integration:
- The UI loads with mock data
- Wallet connection shows error (expected)
- Message updates show error (expected)

After integration:
- Connect wallet should open MetaMask
- Message display should show real contract data
- Form should update the message on-chain

## 🎓 Workshop Tips

1. **Start Simple**: Implement wallet connection first
2. **Test Incrementally**: Test each function as you implement it
3. **Use Console Logs**: Add logs to debug contract calls
4. **Check MetaMask**: Make sure you're on the right network
5. **Handle Errors**: Add proper error handling for better UX

## 📝 Notes

- The UI is fully functional and responsive
- All components use TypeScript for type safety
- Tailwind CSS classes provide consistent styling
- The code is organized for easy understanding
- Comments mark where integration code should go

Good luck with your workshop! 🚀
