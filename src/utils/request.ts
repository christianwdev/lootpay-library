export async function makev1LootpayRequest<T = any>(
  {
    url,
    method,
    body,
    apiKey,
  }: {
    url: string,
    method: 'GET' | 'POST',
    body?: any,
    apiKey: string,
  }
): Promise<{ err?: string, data?: T }> {
  try {
    const response = await fetch(`https://api.lootpay.com/v1/${url}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
    });

    type SuccessfulResponse = {
      success: true,
      message: string,
      data: T,
      requestID: string,
    };

    type FailedResponse = {
      success: false,
      message: string,
      requestID: string,
    };
    
    const unsanitizedData = await response.json();

    if (typeof unsanitizedData !== 'object' || unsanitizedData === null) {
      return { err: `An error occurred when making a request to ${url}` };
    }

    const data = unsanitizedData as SuccessfulResponse | FailedResponse;

    if (!data.success) {
      return { err: data.message };
    }

    return { data: data.data };
  } catch (err) {
    console.error(err);

    if (err instanceof Error) {
      return { err: `An error occurred when making a request to ${url}, ${err.message}` };
    }

    return { err: `An error occurred when making a request to ${url}` };
  }
 
}

