"use client";
import React from 'react';

import { columns } from '@/components/category/category-table-columns';
import { CategoryDataTable } from '@/components/category/category-table';

import { useGetCategories } from '@/features/category/api/user-categories';
import { CategoryInputDialog } from '@/components/category/category-input';
import { CategoryEditDialogComponent } from '@/components/category/category-edit-dialog';
import { Button } from '@/components/ui/button';
import { useOpenNewCategoryButton } from '@/components/hooks/open-edit-category';
import { Plus } from 'lucide-react';

const CategoryPage = () => {
  const data = useGetCategories();
  const {onOpen} = useOpenNewCategoryButton();
  const categories = data.data || []

  return (
    <div className='-mt-16 flex flex-col items-center p-2 bg-slate-50 shadow-xl rounded-lg mx-auto max-w-7xl'>
      <div className='  pt-6 w-full lg:flex lg:justify-between lg:gap-x-6 lg:items-center space-y-2 lg:space-y-0 px-10'>
        <div className='w-full text-2xl font-bold flex flex-1 justify-center lg:justify-start'>
          Category Page
        </div>
        <div>
        <Button
          className='w-full lg:max-w-56'
          onClick={onOpen}
          >
            <Plus 
              className='w-5 h-5 mr-2'
              
                />
          Add new
        </Button>
        </div>
        
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