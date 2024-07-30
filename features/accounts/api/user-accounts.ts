import { client } from "@/lib/hono";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { InferResponseType } from "hono";
import { InferRequestType } from 'hono/client';
import { toast } from "sonner";


const $post = client.api.accounts.$post;

export const useGetAccounts = () => {

  const query = useQuery({
    queryKey: ["accounts"],
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
export const usePostAccoutInput = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
  InferResponseType<typeof $post>,
  Error, 
  InferRequestType<typeof $post>["json"]
  >({
    mutationKey: ["postAccountInput"],
    mutationFn: async (json) => {

      // console.log("inside usePostAccount function")
      const response = await client.api.accounts.$post({ json });

      return await response.json();
    },
    onSuccess: () =>{
      queryClient.invalidateQueries({ queryKey: ["accounts"]});
      toast("Account created successfully");
    },
    onError: () => {
      toast("Something went wrong");
    }
  })

  return mutation;
}


export const usePostBulkDelete = () => {

  const query = useQueryClient();
  
  const mutation = useMutation<
  InferResponseType< typeof client.api.accounts["bulk-delete"]["$post"]>,
  Error,
  InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>["json"]
  >({
    mutationKey: ["postBulkDeleteAccount"],
    mutationFn: async (json) => {
      const response = await client.api.accounts["bulk-delete"]["$post"]({json});

      if( !response.ok ) {
        throw new Error("Failed to deleted Account");
      }

      
      return await response.json();
    },
    onSuccess : () => {
      query.invalidateQueries({ queryKey: ["accounts"]});
      toast(`Accounts successfully deleted `);
    },
    onError: () => {
      toast('Failed while deleting accounts')
    }
  });

  return mutation;
}


export const useGetAccountByID = (id?: string) => {
  const query = useQuery({
    // enabled: !!id,
    queryKey: [`acoountByID - ${id}`],
    queryFn: async () => {
        const response = await client.api.accounts[":id"]["$get"]({
          param : {
            id
          }
        });

        if( !response.ok) {
          throw new Error("Failed to fetch the data");
        }
        const { data } = await response.json();

        return data;
    }
  });

  return query;
};


export const useUpdateAccountByID = () => {
  const query = useQueryClient();

  const mutation = useMutation<
  InferResponseType<typeof  client.api.accounts["update"]["$post"]>,
  Error,
  InferRequestType<typeof client.api.accounts["update"]["$post"]>["json"]
  >({
    mutationKey: [`updateAccountByID`],
    mutationFn: async (json) => {
      const response = await client.api.accounts["update"]["$post"]({json});

      if( !response.ok ) {
        throw new Error("Failed to uadte the Account");
      }

      return await response.json();
    },
    onSuccess: () => {
      query.invalidateQueries({queryKey: [`accounts`]});
      query.invalidateQueries({ queryKey: ["transactions"]});
      toast("Account Updated")
    },
    onError: () => {
      toast("Failed to Update the Account");
    }
  });

  return mutation;
}