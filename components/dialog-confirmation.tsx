import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';

type DialogConfirmationProps = {
    title: string;
    description?: string;
}

export const useDialogConfirm = ({
    title,
    description
} : DialogConfirmationProps): [() => Promise<unknown>, ()=>JSX.Element] => {
  const [promise, setPromise] = useState<{resolve: (value: boolean) => void } | null>();

  const confirm = () => new Promise((resolve, reject) => {
    setPromise({resolve});
  });


  const handleClose = () => {
    setPromise(null);
  }

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  }

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  }

  const DialogConfirmComponent = () => {
    return (
        <>
            <Dialog open={promise != null}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            { title }
                        </DialogTitle>
                        <DialogDescription>
                            { description }
                        </DialogDescription>
                    </DialogHeader>
                    {/* render buttons for confirm and delete */}
                    <div className='flex justify-center gap-4 items-center'>
                        <Button
                            onClick={handleConfirm}
                            size={"lg"}
                            >
                            Confirm
                        </Button>
                        <Button
                            onClick={handleCancel}
                            variant={"destructive"}
                            size={"lg"}
                            >
                            Cancel
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
  };

  return [confirm, DialogConfirmComponent];
};
 
