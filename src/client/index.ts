// Utils
import { makev1LootpayRequest } from "../utils/request";

// Types
import LootPayCryptoSuccessResponse from "../../types/LootPayCryptoSuccessResponse";
import LootPaySupportedCryptos from "../../types/LootPaySupportedCryptos";
import SanitizedBalanceTransaction from "../../types/LootPayBalanceHistory";
import LootPayCryptoData from "../../types/LootPayCryptoData";
import LootPayTransaction from "../../types/LootPayTransaction";
import LootPayMethod from "../../types/LootPayMethod";

export default class LootPayClient {
  constructor(private readonly apiKey: string) {}

  /**
   * Send a crypto payment
   * @param amount - The amount to send in USD
   * @param address - The address to send the payment to
   * @param network - The crypto network to send the payment to
   */
  async sendCryptoPayment(
    {
      amount,
      address,
      network,
    }: {
      amount: number,
      address: string,
      network: 'litecoin' | 'bitcoin' | 'ethereum',
    }
  ): Promise<{ err?: string, data?: LootPayCryptoSuccessResponse }> {
    try {
      const { err, data } = await makev1LootpayRequest<LootPayCryptoSuccessResponse>({
        url: `crypto/${network}/send`,
        method: "POST",
        body: {
          recipientAddress: address,
          amount,
        },
        apiKey: this.apiKey,
      });

      if (err) return { err };

      return {
        err: undefined,
        data: data,
      };
    } catch (error) {
      console.error(error);

      return { err: 'Request failed' };
    }
  }

  /**
   * Get the prices of all supported cryptocurrencies
   */
  async getCryptoPrices() {
    try {
      type CryptoPrices = {
        [key in LootPaySupportedCryptos]: LootPayCryptoData;
      } & {
        [key: string]: LootPayCryptoData | undefined;
      };

      const { err, data } = await makev1LootpayRequest<CryptoPrices>({
        url: `crypto/prices/get`,
        method: "GET",
        apiKey: this.apiKey,
      });

      if (err) return { err };

      return {
        err: undefined,
        data: data,
      };
    } catch (error) {
      console.error(error);

      return { err: 'Request failed' };
    }
  }

  /**
   * Get your applications balance
   */
  async getBalance() {
    try {
      const { err, data } = await makev1LootpayRequest<{ balance: number }>({
        url: `balance/get`,
        method: "GET",
        apiKey: this.apiKey,
      });

      if (err) return { err };

      return {
        err: undefined,
        data: data,
      };
    } catch (error) {
      console.error(error);

      return { err: 'Request failed' };
    }
  }

  /**
   * Get the balance history
   * @param limit - The number of transactions to return
   * @param offset - The number of transactions to skip
   */
  async getBalanceHistory(
    {
      limit,
      offset,
    }: {
      limit?: number,
      offset?: number,
    }
  ) {
    const query = new URLSearchParams();

    if (limit) query.append('limit', limit.toString());
    if (offset) query.append('offset', offset.toString());

    const queryString = query.toString();
    try {
      const { err, data } = await makev1LootpayRequest<SanitizedBalanceTransaction[]>({
        url: `balance/history${queryString ? `?${queryString}` : ''}`,
        method: "GET",
        apiKey: this.apiKey,
      });

      if (err) return { err };

      return {
        err: undefined,
        data: data,
      };
    } catch (error) {
      console.error(error);

      return { err: 'Request failed' };
    }
  }

  /**
   * Get all transactions
   * @param limit - The number of transactions to return
   * @param offset - The number of transactions to skip
   * @param type - The type of transactions to return
   */
  async getTransactionHistory(
    {
      limit,
      offset,
      type,
    }: {
      limit?: number,
      offset?: number,
      type?: 'cryptoRedemption' | 'balanceAdjustment' | 'giftcardRedemption',
    }
  ) {
    const query = new URLSearchParams();

    if (limit) query.append('limit', limit.toString());
    if (offset) query.append('offset', offset.toString());
    if (type) query.append('type', type);

    const queryString = query.toString();

    try {
      const { err, data } = await makev1LootpayRequest<LootPayTransaction[]>({
        url: `transactions/list${queryString ? `?${queryString}` : ''}`,
        method: "GET",
        apiKey: this.apiKey,
      });

      if (err) return { err };

      return {
        err: undefined,
        data: data,
      };
    } catch (error) {
      console.error(error);

      return { err: 'Request failed' };
    }
  }

  /**
   * Get a transaction by ID
   * @param transactionID - The ID of the transaction to get
   */
  async getTransaction(transactionID: string) {
    try {
      const { err, data } = await makev1LootpayRequest<LootPayTransaction>({
        url: `transactions/get`,
        method: 'POST',
        apiKey: this.apiKey,
        body: {
          transactionID,
        },
      });

      if (err) return { err };

      return {
        err: undefined,
        data: data,
      };
    } catch (error) {
      console.error(error);

      return { err: 'Request failed' };
    }
  }

  /**
   * Get all available redemption methods
   */
  async getMethods() {
    try {
      const { err, data } = await makev1LootpayRequest<LootPayMethod[]>({
        url: `methods/list`,
        method: "GET",
        apiKey: this.apiKey,
      });

      if (err) return { err };

      return {
        err: undefined,
        data: data,
      };
    } catch (error) {
      console.error(error);

      return { err: 'Request failed' };
    }
  }

  /**
   * Send a loot link
   * @param amount - The amount to send in USD
   * @param email - The email to send the loot link to
   * @param username - The username of the user you're sending the loot link to
   */
  async sendLootLink(
    {
      amount,
      email,
      username,
    }: {
      amount: number,
      email: string,
      username: string,
    }
  ) {
    try {
      const { err, data } = await makev1LootpayRequest<{ link: string }>({
        url: `looklink/send`,
        method: "POST",
        apiKey: this.apiKey,
        body: {
          amount,
          email,
          username,
        },
      });

      if (err) return { err };

      return {
        err: undefined,
        data: data,
      };
    } catch (error) {
      console.error(error);

      return { err: 'Request failed' };
    }
  }
}
