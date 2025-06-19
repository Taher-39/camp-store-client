import { useState } from "react";
import { useGetProductReviewsQuery } from "@/redux/features/review/reviewApi";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { IReviewInput } from "@/types";
import { useReview } from "./useReview";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { CloudinaryUploadWidget } from "./CloudinaryUploadWidget";

const ReviewSection = ({ productId }: { productId: string }) => {
  const [images, setImages] = useState<string[]>([]);
  const { data, isLoading, refetch } = useGetProductReviewsQuery(productId);
  const reviews = (data?.data ?? []) as any[];
  const { createReview } = useReview();
  const [newReview, setNewReview] = useState<IReviewInput>({
    productId,
    rating: 0,
    comment: "",
    images: [],
  });

  const handleImageUpload = (url: string) => {
    setImages((prev) => {
      const updated = [...prev, url];
      setNewReview((prevReview) => ({
        ...prevReview,
        images: updated,
      }));
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createReview({ ...newReview, images });
      setNewReview({
        productId,
        rating: 0,
        comment: "",
        images: [],
      });
      setImages([]);
      refetch();
    } catch (error) {
      console.error("Review submission failed:", error);
    }
  };

  if (isLoading) return <div className="my-4">Loading reviews...</div>;

  return (
    <div className="space-y-8">
      {/* Review Form */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Rating</label>
            <Rating
              style={{ maxWidth: 160 }}
              value={newReview.rating}
              onChange={(value: number) =>
                setNewReview({ ...newReview, rating: value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Review</label>
            <Textarea
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              placeholder="Share your experience with this product..."
              rows={4}
              required
            />
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Add Photos (Optional)</p>
            <CloudinaryUploadWidget
              onUpload={handleImageUpload}
              folder="halal-zone/reviews"
            />
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Review ${index + 1}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="bg-[#9EA647] text-white hover:bg-[#818a27]"
          >
            Submit Review
          </Button>
        </form>
      </div>

      {/* Reviews List */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">
            No reviews yet. Be the first to review!
          </p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => {
              const user =
                typeof review.userId === "string"
                  ? { name: "Anonymous" }
                  : review.userId;
              const date = new Date(review.createdAt);

              return (
                <div key={review._id} className="border-b pb-4">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      {user.avatar && <AvatarImage src={user.avatar} />}
                      <AvatarFallback>
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{user.name}</h4>
                        <span className="text-sm text-gray-500">
                          {format(date, "MMM d, yyyy")}
                        </span>
                      </div>

                      <Rating
                        style={{ maxWidth: 120 }}
                        value={review.rating}
                        readOnly
                      />

                      <p className="mt-1 text-gray-700">{review.comment}</p>

                      {review.images?.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {review.images.map((img: string, index: number) => (
                            <img
                              key={index}
                              src={img}
                              alt={`Review ${index + 1}`}
                              className="w-16 h-16 object-cover rounded"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
