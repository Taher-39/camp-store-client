import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: OrderData) => void;
}

interface OrderData {
  name: string;
  phone: string;
  address: string;
  shipping: string;
  coupon: string;
  note: string;
}

const OrderConfirmationModal: React.FC<OrderModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<OrderData>({
    name: '',
    phone: '',
    address: '',
    shipping: 'ঢাকা সিটির ভিতরে',
    coupon: '',
    note: '',
  });

  const shippingCost = formData.shipping === 'ঢাকা এবং চট্টগ্রাম সিটির বাহিরে' ? 130 : 70;
  const subtotal = 3750;
  const total = subtotal + shippingCost;

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Panel className="bg-white p-6 rounded-xl max-w-lg w-full shadow-lg border">
          <Dialog.Title className="text-xl font-semibold mb-4 text-center text-green-600">
            ক্যাশ অন ডেলিভারি - অর্ডার করুন
          </Dialog.Title>

          <div className="space-y-3">
            <input
              className="w-full p-2 border rounded"
              placeholder="আপনার নাম*"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              className="w-full p-2 border rounded"
              placeholder="ফোন নাম্বার*"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <textarea
              className="w-full p-2 border rounded"
              placeholder="এড্রেস*"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />

            <select
              className="w-full p-2 border rounded"
              value={formData.shipping}
              onChange={(e) => setFormData({ ...formData, shipping: e.target.value })}
            >
              <option>ঢাকা সিটির ভিতরে</option>
              <option>চট্টগ্রাম সিটির ভিতরে</option>
              <option>ঢাকা এবং চট্টগ্রাম সিটির বাহিরে</option>
            </select>

            <input
              className="w-full p-2 border rounded"
              placeholder="কুপন কোড"
              value={formData.coupon}
              onChange={(e) => setFormData({ ...formData, coupon: e.target.value })}
            />

            <textarea
              className="w-full p-2 border rounded"
              placeholder="Order note"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            />
          </div>

          <div className="mt-5 space-y-1 text-sm text-gray-700">
            <div>পণ্যের দাম: Tk {subtotal.toFixed(2)}</div>
            <div>ডেলিভারি চার্জ: Tk {shippingCost.toFixed(2)}</div>
            <div className="font-bold">সর্বমোট: Tk {total.toFixed(2)}</div>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white py-2 rounded font-bold"
            >
              ✅ অর্ডার কনফার্ম করুন
            </button>
            <button
              onClick={onClose}
              className="text-red-500 hover:underline text-sm"
            >
              বাতিল করুন
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default OrderConfirmationModal;
