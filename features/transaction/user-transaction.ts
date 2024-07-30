import { client } from "@/lib/hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

export const useGetTransactionByAccountId = ({
    from,
    to,
    accountId
}: {
    from?: string,
    to?: string,
    accountId?: string,
}) => {
    const query = useQuery({
        queryKey: ["transactions"],
        queryFn: async () => {
            const response = await client.api.transaction.$get({
                query: {
                    from,
                    to,
                    accountId
                }
            });

            if( !response.ok ) {
                throw new Error("Failed to fetch the transactions");
            }
            const data = await response.json();
            const newData = {
                data: data.data.map((field) => {
                    return {
                        ...field,
                        account: field.account.name,
                        category: field.category.name
                    }
                })
            };
            // console.log("[Resposne in Transaction Mutattion] : " + JSON.stringify(newData))
            return newData;
        }
    });

    return query;
};

// export const useGetTransactionByCategoryId = ({
//     id
// }: {
//     id: string
// }) => {
//     const query = useQuery({
//         queryKey: ['transaction'],
//         queryFn: async () => {
//             const response = await client.api.transaction[":categoryId"]["$get"]({
//                 param: {
//                     id
//                 }
//             });

//             if( !response.ok  ){
//                 throw new Error("Failed to fetch the transaction");
//             }

//             return await response.json();
//         }
//     });

//     return query;
// };

export const useGetTransactionByID = (id?: string) => {
    console.log(id)
    const query = useQuery({
        enabled: !!id,
        queryKey: [`transaction-${id}`],
        queryFn: async () => {
            const response = await client.api.transaction[":id"]["$get"]({
                param : {
                    id
                }
            });

            if( !response.ok ) {
                throw new Error("Failed to fetch the transaction");
            }
            const { data } = await response.json();
            console.log('[DATA FROM useGetTransactionByID]: ' + JSON.stringify(data))
            return data[0];
        }
    });

    return query;
}

export const useCreateTransaction = () => {
    const query = useQueryClient();

    const mutation = useMutation<
    InferResponseType<typeof client.api.transaction.$post>,
    Error,
    InferRequestType<typeof client.api.transaction.$post>["json"]
    >({
        mutationKey: ['transaction'],
        mutationFn: async (json) => {
            console.log("INSIDE THE TRANSACTION CREATE MUSTATION");
            console.log("[DATE IN MUTATION]" + JSON.stringify(json))

            const response = await client.api.transaction.$post({json});

            if( !response.ok ){
                throw new Error("Failed to create the transaction");
            }

            return await response.json();
        },
        onSuccess: () => {
            query.invalidateQueries({queryKey : ['transactions']});
            toast("Transaction created successfully");
        },
        onError: () => {
            toast("Failed to create a transaction account");
        }
    });

    return mutation;
};

export const useBulkDeleteTransaction = () => {
    const query = useQueryClient();
    console.log("[INSIDE THE BULK DELETE TRAANSACTION]")

    const mutation = useMutation<
    InferResponseType<typeof client.api.transaction["bulk-delete"]["$post"]>,
    Error,
    InferRequestType<typeof client.api.transaction["bulk-delete"]["$post"]>["json"]
    >({
        mutationKey: ["transaction-bulk"],
        mutationFn: async (json) => {
            console.log('[JSON IN BULK DELETE TRANSACTION]: ' + JSON.stringify(json))
            const response = await client.api.transaction["bulk-delete"]["$post"]({json});

            if(!response.ok){
                throw new Error("Failed to delete the transactions");
            }

            return await response.json();
        },
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['transactions']});
            toast("Transactions deleted succesfully");
        },
        onError: () => {
            toast("Failed to delete the transactions");
        }
    });

    return mutation;
};

export const useUpdateTransactionById = (id?: string) => {
    const query = useQueryClient();

    const mutation = useMutation<
    InferResponseType<typeof client.api.transaction[":id"]["$patch"]>,
    Error,
    InferRequestType<typeof client.api.transaction[":id"]["$patch"]>["json"]
    >({
        mutationKey: [`transaction-${id}`],
        mutationFn: async (json) => {
            const response = await client.api.transaction[":id"]["$patch"]({
                param: {
                    id
                },
                json 
            });

            if(!response.ok) {
                throw new Error("Failed to update the Transaction");
            }

            return await response.json();
        },
        onSuccess:  () => {
            query.invalidateQueries({queryKey: [`transaction-${id}`]});
            toast("Successfully Update Transaction");
        },
        onError: () => {
            toast("Failed to update Transactions");
        }
    });

    return mutation;
};