import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

interface DeleteDialogProps {
  productId?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleDelete: (id: string) => void;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

const DeleteDialog = ({
  productId = "",
  open,
  setOpen,
  handleDelete,
  isLoading = false,
  isError = false,
  errorMessage = "Something went wrong. Please try again.",
}: DeleteDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] text-center">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this product?
          </DialogTitle>

          <DialogDescription className="mt-2">
            This action cannot be undone. This will permanently delete the
            product from our database.
          </DialogDescription>
        </DialogHeader>

        {/* 🚨 Error Message */}
        {isError && (
          <div className="mt-2 rounded-md bg-red-100 text-red-600 px-3 py-2 text-sm">
            {errorMessage}
          </div>
        )}

        <DialogFooter className="flex justify-center gap-3 mt-3">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button
            onClick={() => handleDelete(productId)}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
