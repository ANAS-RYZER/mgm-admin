import React from 'react'
import { Button } from '../ui/button'
import { Trash2, X } from 'lucide-react'

function DeleteProduct() {
  return (
    <div>
       <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Delete Product
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                //   onClick={() => setIsDeleteModalOpen(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="text-center py-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100/20 mb-4">
                    <Trash2 className="h-6 w-6 text-red-400" />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">
                    Delete ?
                  </h4>
                  <p className="text-sm text-white/60">
                    This action cannot be undone. This product will be
                    permanently removed from your inventory.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    // onClick={() => setIsDeleteModalOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    // onClick={handleConfirmDelete}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    Delete Product
                  </Button>
                </div>
              </div>
    </div>
  )
}

export default DeleteProduct
