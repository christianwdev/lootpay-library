import LootPayCryptoSuccessResponse from "./LootPayCryptoSuccessResponse";

export type LootPayLooklinkMetadata = {
  linkID: string,
  email: string,
  amountCents: number,
}

export type LootPayCryptoMetadata = LootPayCryptoSuccessResponse['metadata']

export type LootPayBalanceMetadata = {
  correspondingTransactionID: string,
}

type LootPayTransaction<T = LootPayBalanceMetadata | LootPayCryptoMetadata | LootPayLooklinkMetadata> = {
  transactionID: string,
  appID: string,
  amount: number,
  status: 'pending' | 'queued' | 'confirmed' | 'rejected' | 'failed',
  
  createdAt: Date,
  updatedAt: Date,

  metadata?: T,
}

export default LootPayTransaction;
