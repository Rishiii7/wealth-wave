import React, { useRef, useState } from 'react'
import { Button } from './ui/button';
import { CSVTable } from './csv-table';
import { useGetAccounts } from '@/features/accounts/api/user-accounts';
import { useTransactionImportConfirm } from './hooks/use-confirm-transaction';
import { useGetCategories } from '@/features/category/api/user-categories';

type ImportCSVCardProps = {
    onCancel: () => void;
    data: string[][];
    onSubmit: (data: any) => void;
}

const requiredFileds = [
    "amount",
    "date",
    "payee",
]

export const ImportCSVCard = ({
    onCancel,
    data,
    onSubmit,
}: ImportCSVCardProps) => {
    const headers = data[0];
    const tableBody = data.slice(1);

    const [selectedColumns, setSelectedColumns] = useState<string[]>(Array(headers.length).fill(''));

    const progress = selectedColumns.filter( (val) => {
        return val !== ""
    });

    const accountQuery = useGetAccounts();
    const categoryQuery = useGetCategories(); 

    // console.log('[PROGRESS] : ' + progress);
    const [accountConfirm, AccountConfirmDialog] = useTransactionImportConfirm({
        title: "Select an Account",
        data: accountQuery.data
    });
    const [categoryConfirm, CategoryConfirmDialog] = useTransactionImportConfirm({
        title: "Select an Category",
        data: categoryQuery.data
    });
    const selectAccount = useRef<string>();
    const selectCategory = useRef<string>();

    const onTableSelectChange = (index: number, value: string) => {
        setSelectedColumns(prev => {
            let columns = [...prev];
            columns[index] =  value;
            return columns
        });
        console.log(selectedColumns)
    };

    const onSelectAccount = ( data: string ) => {
        console.log('[Account DATA] : ' + data);
        selectAccount.current = data
    }
    const onSelectCategory = ( data: string ) => {
        console.log('[Category DATA] : ' + data);
        selectCategory.current = data
    }

    const onHandleContinue = async () => {
        // console.log('[INSIDE HANDLE CONTINUE] : ' + tableBody);
        const mappedData = {
            header: selectedColumns.map( (val) => {
                return val ? val : null
            }),
            body: tableBody.map((rows, ind) => {
                const row = rows.map( (cell, ind) => {
                    return selectedColumns[ind] ? cell : null
                });
                return row; 
            })
        }

        // console.log(mappedData)

        const arrayOfData = mappedData.body.map( (rows, ind) => {
            return rows.reduce( (acc: any, cell, ind) => {
                const header = mappedData.header[ind];
                if( header != null ) {
                    acc[header] = cell
                }

                return acc
            }, {});
        });

        const okAccount = await accountConfirm();
        if( !okAccount ) {
            return;
        }
        const okCategory = await categoryConfirm();
        if(!okCategory) {
            return;
        }

        console.log('[ACCOUNT SELECTED IS] : ' + selectAccount.current);
            const newArrayOfData = arrayOfData.map((val) =>  {
                return {
                    ...val,
                    accountId: selectAccount.current,
                    categoryId: selectCategory.current,
                    
                }
            });
            onSubmit(newArrayOfData);
    }

  return (
        <>
        <div className='-mt-16 flex flex-col items-center p-2 bg-slate-50 shadow-xl rounded-lg mx-4 xl:mx-auto lg:max-w-7xl'>
            <AccountConfirmDialog 
                onSelectChange={onSelectAccount}
            />
            <CategoryConfirmDialog 
                onSelectChange={onSelectCategory}
            />
            <div className=' pt-6 w-full lg:flex lg:justify-between lg:gap-x-6 lg:items-center space-y-2 lg:space-y-0 px-10'>
            <div className='w-full text-2xl font-bold flex flex-1 justify-center lg:justify-start'>
            Import CSV File
            </div>
            <div className='flex gap-x-4'>
                <Button
                className='w-full lg:max-w-56'
                onClick={onCancel}
                >
                Cancel
                </Button>
                <Button
                    onClick={onHandleContinue}
                    className='w-full lg:max-w-56'
                    disabled={progress.length < requiredFileds.length}
                >
                    Continue {" "}
                    { progress.length } / {requiredFileds.length}
                </Button>
            </div>
            </div>
            <CSVTable 
                header={headers}
                data={tableBody}
                onTableSelectChange={onTableSelectChange}
                selectedColumns={selectedColumns}
            />
        </div>
        </>
  )
}
