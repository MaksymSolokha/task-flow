import { Trash2 } from 'lucide-react';
import Modal from '@/components/ui/modal.tsx';
import { Button } from '@/components/ui/button.tsx';

const DeleteTaskModal = ({
  isOpen,
  onClose,
  taskTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  taskTitle: string;
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Delete task" size="sm">
    <div className="px-6 py-5">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
          <Trash2 size={18} className="text-red-500" />
        </div>
        <div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-slate-900">&ldquo;{taskTitle}&rdquo;</span>?
          </p>
          <p className="text-xs text-slate-400 mt-1">
            This action cannot be undone. Comments and attachments will be lost.
          </p>
        </div>
      </div>
    </div>

    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
      <Button variant="ghost" onClick={onClose}>
        Cancel
      </Button>
      <Button
        className="bg-red-600 hover:bg-red-700 text-white"
        onClick={onClose}
      >
        Delete task
      </Button>
    </div>
  </Modal>
);

export default DeleteTaskModal;
