import { AlertTriangle, Trash2 } from "lucide-react";

type DeleteConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
};

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "আপনি কি নিশ্চিত?",
  message = "আপনি কি এই আইটেমটি মুছে ফেলতে চান?",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <div className="flex flex-col items-center text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-yellow-500" />
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-600 px-4">{message}</p>
          <div className="flex gap-4 w-full mt-4">
            <button
              onClick={onClose}
              className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              বাতিল করুন
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              হ্যাঁ, বাদ দিন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
