import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0xYourContractAddressHere'; // Replace with your deployed contract
const CONTRACT_ABI = [
  {
    "inputs": [{"internalType": "uint256", "name": "_candidateId", "type": "uint256"}],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_candidateId", "type": "uint256"}],
    "name": "getCandidate",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"},
      {"internalType": "string", "name": "", "type": "string"},
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "candidatesCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}],
    "name": "hasVoted",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  }
];

export default function UserVotingPage() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [txHash, setTxHash] = useState('');

  // Connect Wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setError('MetaMask is not installed. Please install it to vote.');
        return;
      }

      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      setWalletAddress(accounts[0]);
      setError('');
      await checkIfVoted(accounts[0]);
    } catch (err) {
      setError('Failed to connect wallet: ' + err.message);
    }
  };

  // Load Candidates from Blockchain
  const loadCandidates = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      
      const count = await contract.candidatesCount();
      const candidatesList = [];
      
      for (let i = 1; i <= count; i++) {
        const candidate = await contract.getCandidate(i);
        candidatesList.push({
          id: Number(candidate[0]),
          name: candidate[1],
          voteCount: Number(candidate[2])
        });
      }
      
      setCandidates(candidatesList);
    } catch (err) {
      setError('Failed to load candidates: ' + err.message);
    }
  };

  // Check if User Already Voted
  const checkIfVoted = async (address) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      
      const voted = await contract.hasVoted(address);
      setHasVoted(voted);
    } catch (err) {
      console.error('Error checking vote status:', err);
    }
  };

  // Submit Vote
  const submitVote = async () => {
    if (!selectedCandidate) {
      setError('Please select a candidate');
      return;
    }

    if (!walletAddress) {
      setError('Please connect your wallet first');
      return;
    }

    if (hasVoted) {
      setError('You have already voted!');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Send transaction
      const tx = await contract.vote(selectedCandidate);
      setSuccess('Transaction submitted! Waiting for confirmation...');
      
      // Wait for confirmation
      const receipt = await tx.wait();
      
      setTxHash(receipt.hash);
      setSuccess('Vote submitted successfully!');
      setHasVoted(true);
      
      // Reload candidates to show updated counts
      await loadCandidates();
      
    } catch (err) {
      if (err.code === 'ACTION_REJECTED') {
        setError('Transaction was rejected by user');
      } else {
        setError('Failed to submit vote: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Load candidates on mount
  useEffect(() => {
    loadCandidates();
    
    // Auto-refresh every 10 seconds
    const interval = setInterval(loadCandidates, 10000);
    return () => clearInterval(interval);
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          checkIfVoted(accounts[0]);
          setSelectedCandidate(null);
          setError('');
          setSuccess('');
        } else {
          setWalletAddress('');
          setHasVoted(false);
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Blockchain Voting System
          </h1>
          
          {!walletAddress ? (
            <button
              onClick={connectWallet}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Connect MetaMask Wallet
            </button>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Connected:</span>
                <span className="font-mono text-sm bg-gray-100 px-3 py-1 rounded">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
              </div>
              {hasVoted && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
                  <p className="text-yellow-700 font-semibold">
                    ✓ You have already voted
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6 rounded">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6 rounded">
            <p className="text-green-700">{success}</p>
            {txHash && (
              <a
                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm mt-2 block"
              >
                View on Etherscan →
              </a>
            )}
          </div>
        )}

        {/* Candidates */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Select Your Candidate
          </h2>

          {candidates.length === 0 ? (
            <p className="text-gray-500">Loading candidates...</p>
          ) : (
            <div className="space-y-4">
              {candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  onClick={() => !hasVoted && setSelectedCandidate(candidate.id)}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                    selectedCandidate === candidate.id
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  } ${hasVoted ? 'cursor-not-allowed opacity-60' : ''}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedCandidate === candidate.id 
                          ? 'border-indigo-600 bg-indigo-600' 
                          : 'border-gray-300'
                      }`}>
                        {selectedCandidate === candidate.id && (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {candidate.name}
                        </h3>
                        <p className="text-sm text-gray-500">ID: {candidate.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-indigo-600">
                        {candidate.voteCount}
                      </p>
                      <p className="text-sm text-gray-500">votes</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Vote Button */}
          {walletAddress && (
            <button
              onClick={submitVote}
              disabled={loading || hasVoted || !selectedCandidate}
              className={`w-full mt-6 py-4 rounded-lg font-bold text-lg transition ${
                loading || hasVoted || !selectedCandidate
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting Vote...
                </span>
              ) : hasVoted ? (
                'Already Voted'
              ) : (
                'Submit Vote'
              )}
            </button>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-blue-900 mb-2">ℹ️ How it works:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Connect your MetaMask wallet (Sepolia testnet)</li>
            <li>• Select a candidate from the list</li>
            <li>• Click "Submit Vote" and confirm the transaction</li>
            <li>• Your vote is stored permanently on the blockchain</li>
            <li>• You can only vote once per wallet address</li>
          </ul>
        </div>
      </div>
    </div>
  );
}