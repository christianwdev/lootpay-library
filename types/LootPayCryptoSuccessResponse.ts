type LootPayCryptoSuccessResponse = {
  appID: string,
  transactionID: string,
  status: string,
  type: string,
  amount: number,
  createdAt: Date,
  
  metadata: {
    currency: 'BTC' | 'LTC' | 'ETH' | 'SOL',
    recipientAddress: string,
    cryptoAmount?: number,
    transactionID?: string,
    status?: 'pending' | 'confirmed',
  } | {
    currency: 'BTC' | 'LTC' | 'ETH' | 'SOL',
    cryptoAmount: number,
    blockID: string,
    transactionID: string,
    status: 'pending' | 'confirmed',
  },
};

export default LootPayCryptoSuccessResponse;