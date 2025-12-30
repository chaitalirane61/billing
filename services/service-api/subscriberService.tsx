import { localApi } from "@/api-client/localApiClient";

export interface SubscriberResponse {
  Id: number;
  Email: string;
  SubscribedAt: string;
}

export const getsubscriberService = async () => {
  try {
    const response = await localApi().get<{ success: boolean; data: SubscriberResponse[] }>(
      '/api/subscribers'
    );
    return response.data.data || [];
  } catch (error) {
    console.log("Error", error);
    return [];
  }
}
