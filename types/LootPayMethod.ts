type BaseRedemptionMethod = {
  name: string,
  symbol: string,
  type: 'crypto' | 'giftcard',
}

type CryptoRedemptionMethod = BaseRedemptionMethod & {
  type: 'crypto',
  minAmount: number,
  maxAmount: number,
  avgFee: number,
  price: number,
}

type GiftcardRedemptionMethod = BaseRedemptionMethod & {
  type: 'giftcard',
  minAmount: number,
  maxAmount: number,
}

type LootPayMethod = CryptoRedemptionMethod | GiftcardRedemptionMethod;

export default LootPayMethod;
