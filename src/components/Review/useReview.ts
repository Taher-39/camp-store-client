import { useCreateReviewMutation, useDeleteReviewMutation, useUpdateReviewMutation, useUploadReviewImagesMutation } from "@/redux/features/review/reviewApi";
import { IReview, IReviewInput } from "@/types";
import { toast } from 'sonner';

export const useReview = () => {
  const [createReview] = useCreateReviewMutation();
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const [uploadImages] = useUploadReviewImagesMutation();

  const handleCreateReview = async (reviewData: IReviewInput) => {
    try {
      const result = await createReview(reviewData).unwrap();
      toast.success('Review submitted successfully!');
      return result;
    } catch (error: any) {
      toast.error(error?.data?.message);
      throw error;
    }
  };

  const handleUpdateReview = async (reviewId: string, updatedData: Partial<IReview>) => {
    try {
      const result = await updateReview({ reviewId, updatedData }).unwrap();
      toast.success('Review updated successfully!');
      return result;
    } catch (error: any) {
      toast.error(error?.data?.message);
      throw error;
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      await deleteReview(reviewId).unwrap();
      toast.success('Review deleted successfully!');
    } catch (error: any) {
      toast.error(error?.data?.message);
      throw error;
    }
  };

  const handleImageUpload = async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    
    try {
      const result = await uploadImages(formData).unwrap();
      return result.urls;
    } catch (error) {
      toast.error('Failed to upload images');
      throw error;
    }
  };

  return {
    createReview: handleCreateReview,
    updateReview: handleUpdateReview,
    deleteReview: handleDeleteReview,
    uploadImages: handleImageUpload,
  };
};