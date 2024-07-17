import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query"


export const useGetAccounts = () => {

  const query = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      const response = await client.api.accounts.$get();

      if( !response.ok ) {
        throw new Error("Failed to fecth accounts");
      }

      const { message } = await response.json();

      return message;
    }
  });

  return query;
}

// Get user name from frontend
export const usePostAccoutInput = (name: string) => {

  const query = useQuery({
    queryKey: ["accountPostInput"],
    queryFn: async () => {

      const response = await client.api.accounts.$post({json: { name: name}});

      if( ! response.ok ) {
        throw new Error("Failed to fecth accounts");
      }

      const { message } = await response.json();

      return message;

    }
  });

  return query;
}
