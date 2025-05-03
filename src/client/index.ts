// Types
import LootPayCryptoSuccessResponse from "../../types/LootPayCryptoSuccessResponse";
import LootPaySupportedCryptos from "../../types/LootPaySupportedCryptos";
import SanitizedBalanceTransaction from "../../types/LootPayBalanceHistory";

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
      const response = await fetch(`https://api.lootpay.com/v1/crypto/${network}/send`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
        },
        body: JSON.stringify({
          recipientAddress: address,
          amount,
        }),
      });

      type SuccessfulResponse = {
        success: true,
        message: string,
        data: LootPayCryptoSuccessResponse,
        requestID: string,
      };

      type FailedResponse = {
        success: false,
        message: string,
        requestID: string,
      };

      const unsantizedData = await response.json();

      if (typeof unsantizedData !== 'object' || !unsantizedData) {
        return {
          err: 'Invalid response',
        };
      }

      const data = unsantizedData as SuccessfulResponse | FailedResponse;

      if (!data.success) {
        return {
          err: data.message,
        };
      }

      return {
        err: undefined,
        data: data.data,
      };
    } catch (error) {
      console.error(error);

      return { err: 'Request failed' };
    }
  }

  async getCryptoPrices() {
    try {
      const response = await fetch(`https://api.lootpay.com/v1/crypto/prices/get`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
        },
      });

      type CryptoPriceData = {
        name: string,
        price: number,
        avgFee: number,
      };

      type CryptoPrices = {
        [key in LootPaySupportedCryptos]: CryptoPriceData;
      } & {
        [key: string]: CryptoPriceData | undefined;
      };

      type SuccessfulResponse = {
        success: true,
        message: string,
        data: CryptoPrices,
        requestID: string,
      };

      type FailedResponse = {
        success: false,
        message: string,
        requestID: string,
      };

      const unsantizedData = await response.json();

      if (typeof unsantizedData !== 'object' || !unsantizedData) {
        return {
          err: 'Invalid response',
        };
      }

      const data = unsantizedData as SuccessfulResponse | FailedResponse;

      if (!data.success) {
        return {
          err: data.message,
        };
      }
      
      return {
        err: undefined,
        data: data.data,
      };
    } catch (error) {
      console.error(error);

      return { err: 'Request failed' };
    }
  } 

  async getBalance() {
    try {
      const response = await fetch(`https://api.lootpay.com/v1/balance/get`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
        },
      });

      type SuccessfulResponse = {
        success: true,
        message: string,
        data: {
          balance: number,
        },
        requestID: string,
      };  

      type FailedResponse = {
        success: false,
        message: string,
        requestID: string,
      };

      const unsantizedData = await response.json();

      if (typeof unsantizedData !== 'object' || !unsantizedData) {
        return {
          err: 'Invalid response',
        };  
      }

      const data = unsantizedData as SuccessfulResponse | FailedResponse;

      if (!data.success) {
        return {  
          err: data.message,
        };
      }

      return {
        err: undefined,
        data: data.data,
      };
    } catch (error) {
      console.error(error);

      return { err: 'Request failed' };
    }
  }

  async getBalanceHistory() {
    try {
      const response = await fetch(`https://api.lootpay.com/v1/balance/history`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
        },
      });

      type SuccessfulResponse = {
        success: true,
        message: string,
        data: SanitizedBalanceTransaction[],
        requestID: string,
      };

      type FailedResponse = {
        success: false,
        message: string,
        requestID: string,
      };

      const unsantizedData = await response.json();

      if (typeof unsantizedData !== 'object' || !unsantizedData) {
        return {
          err: 'Invalid response',
        };
      }

      const data = unsantizedData as SuccessfulResponse | FailedResponse;

      if (!data.success) {
        return {  
          err: data.message,
        };
      }

      return {
        err: undefined,
        data: data.data,  
      };
    } catch (error) {
      console.error(error);

      return { err: 'Request failed' };
    }
  }
}
