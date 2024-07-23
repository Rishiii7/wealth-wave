"use client";
import React from 'react';

import { columns } from '@/components/category/category-table-columns';
import { CategoryDataTable } from '@/components/category/category-table';

import { useGetCategories } from '@/features/category/api/user-categories';
import { CategoryInputDialog } from '@/components/category/category-input';
import { CategoryEditDialogComponent } from '@/components/category/category-edit-dialog';

const CategoryPage = () => {
  const data = useGetCategories();
  const categories = data.data || []

  return (
    <div className='-mt-16 flex flex-col items-center p-2 bg-slate-50 shadow-xl rounded-lg mx-4 '>
      <div className=' pt-6 w-full lg:flex lg:justify-center lg:gap-x-6 lg:items-center space-y-2 lg:space-y-0'>
        <div className='w-full text-2xl font-bold text-center'>
          Category Page
        </div>
        <div className='w-full lg:flex lg:justify-end mr-10'>
          <CategoryInputDialog 
            title='Create New Category'
            data={null}  
          />
        </div>
        <div className='w-full lg:flex lg:justify-end mr-10'>
          <CategoryEditDialogComponent 
            title='Edit category'
          />
        </div>
        
      </div>

      <div className='container mx-auto py-10 text-center'>
          <CategoryDataTable
              columns={columns}
              data={categories}
          />
      </div>
      
    </div>
  )
}

export default CategoryPage;