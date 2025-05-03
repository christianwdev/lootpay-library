type SanitizedBalanceTransaction = {
  transactionID: string,
  appID: string,
  amount: number,
  type: 'cryptoRedemption' | 'adminAdjustment' | 'internalTransfer' | 'deposit' | 'lootLinkRedemption' | (string & {}),
  status: 'confirmed',
  reason: string,
  newBalance: number,

  metadata: {
    correspondingTransactionID: string,
  },
}

export default SanitizedBalanceTransaction;