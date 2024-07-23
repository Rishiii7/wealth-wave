import { client } from "@/lib/hono";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { InferResponseType } from "hono";
import { InferRequestType } from 'hono/client';
import { toast } from "sonner";


const $post = client.api.category.$post;

export const useGetCategories = () => {

  const query = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await client.api.category.$get();

      if( !response.ok ) {
        throw new Error("Failed to fecth category");
      }

      const { message } = await response.json();

      return message;
    }
  });

  return query;
}

// Get user name from frontend
export const usePostCategoryInput = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
  InferResponseType<typeof $post>,
  Error, 
  InferRequestType<typeof $post>["json"]
  >({
    mutationKey: ["postCategoryInput"],
    mutationFn: async (json) => {

      const response = await client.api.category.$post({ json });

      return await response.json();
    },
    onSuccess: () =>{
      queryClient.invalidateQueries({ queryKey: ["postCategoryInput"]});
      toast("Category created successfully");
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
  InferResponseType< typeof client.api.category["bulk-delete"]["$post"]>,
  Error,
  InferRequestType<typeof client.api.category["bulk-delete"]["$post"]>["json"]
  >({
    mutationKey: ["postBulkDeleteCategory"],
    mutationFn: async (json) => {
      const response = await client.api.category["bulk-delete"]["$post"]({json});

      if( !response.ok ) {
        throw new Error("Failed to deleted Category");
      }

      
      return await response.json();
    },
    onSuccess : () => {
      query.invalidateQueries({ queryKey: ["postBulkDeleteCategory"]});
      toast(`Categories successfully deleted `);
    },
    onError: () => {
      toast('Failed while deleting Categories')
    }
  });

  return mutation;
}


export const useGetCategoryByID = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: [`acoountByID - ${id}`],
    queryFn: async () => {
        const response = await client.api.category[":id"]["$get"]({
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


export const useUpdateCategoryByID = () => {
  const query = useQueryClient();

  const mutation = useMutation<
  InferResponseType<typeof  client.api.category["update"]["$post"]>,
  Error,
  InferRequestType<typeof client.api.category["update"]["$post"]>["json"]
  >({
    mutationKey: [`updateCategoryByID`],
    mutationFn: async (json) => {
      const response = await client.api.category["update"]["$post"]({json});

      if( !response.ok ) {
        throw new Error("Failed to update the Category");
      }

      return await response.json();
    },
    onSuccess: () => {
      query.invalidateQueries({queryKey: [`updateCategoryByID`]});
      toast("Category Updated")
    },
    onError: () => {
      toast("Failed to Update the Category");
    }
  });

  return mutation;
}