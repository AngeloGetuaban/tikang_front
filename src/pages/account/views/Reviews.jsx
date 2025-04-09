import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { FaStar } from 'react-icons/fa';
import Modal from '../../../components/Modal';
import { format } from 'date-fns';

export default function Reviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('tikangToken');
      const res = await fetch(`${process.env.REACT_APP_API_URL_GUEST}/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>;

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <img src="/assets/noreviews.png" alt="No reviews" className="w-40 mb-4" />
        <h2 className="text-lg font-semibold">Nothing to review yet. Let’s change that!</h2>
        <p className="text-sm text-gray-500 mb-4">The world awaits. Book a trip now.</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md">
          Get Started
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">My Reviews</h1>

      <div className="space-y-6">
        {reviews.map((review, index) => {
          const bg = review.thumbnail_url || '/assets/hotel_default.webp';
          return (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-md border border-gray-200"
              style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="backdrop-blur-sm bg-white/80 p-5 relative z-10">
                <h2 className="text-lg font-semibold text-gray-800">{review.property_name}</h2>
                <p className="text-sm text-gray-600 mb-1">
                  {format(new Date(review.check_in_date), 'MMMM dd, yyyy')} -{' '}
                  {format(new Date(review.check_out_date), 'MMMM dd, yyyy')}
                </p>
                <p className="text-sm text-gray-700 italic mb-2">"{review.comment}"</p>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Images Preview */}
                {review.review_images && review.review_images.length > 0 ? (
                  <div className="flex gap-2 flex-wrap mt-2">
                    {review.review_images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Review image ${i + 1}`}
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 italic mt-2">No images provided</p>
                )}

                <button
                  onClick={() => setSelectedReview(review)}
                  className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
                >
                  View Info
                </button>
              </div>
              <div className="absolute inset-0 bg-black opacity-10" />
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedReview && (
        <Modal onClose={() => setSelectedReview(null)}>
            <div
            className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-300"
            style={{
                backgroundImage: `url(${selectedReview.thumbnail_url || '/assets/hotel_default.webp'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />

            <div className="relative z-10 p-6 md:p-8 text-white space-y-6">
                {/* Property Title */}
                <h2 className="text-2xl font-bold">{selectedReview.property_name}</h2>

                {/* Stay Details */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-white/90">
                <p><span className="font-semibold text-white">Check-in:</span> {format(new Date(selectedReview.check_in_date), 'MMMM dd, yyyy')}</p>
                <p><span className="font-semibold text-white">Check-out:</span> {format(new Date(selectedReview.check_out_date), 'MMMM dd, yyyy')}</p>
                <p><span className="font-semibold text-white">Adults:</span> {selectedReview.num_adults}</p>
                <p><span className="font-semibold text-white">Children:</span> {selectedReview.num_children}</p>
                <p><span className="font-semibold text-white">Rooms:</span> {selectedReview.num_rooms}</p>
                <p><span className="font-semibold text-white">Stay Type:</span> {selectedReview.stay_type}</p>
                </div>

                {/* Comment */}
                <div>
                <h3 className="text-lg font-semibold mb-1">Comment</h3>
                <p className="text-sm italic text-white/90">{selectedReview.comment}</p>
                </div>

                {/* Rating */}
                <div>
                <h3 className="text-lg font-semibold mb-1">Rating</h3>
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                    <FaStar
                        key={i}
                        className={`h-5 w-5 ${
                        i < selectedReview.rating ? 'text-yellow-400' : 'text-gray-400'
                        }`}
                    />
                    ))}
                </div>
                </div>

                {/* Room Details */}
                <div>
                <h3 className="text-lg font-semibold mb-1">Room Details</h3>
                {selectedReview.rooms?.length > 0 ? (
                    <ul className="list-disc list-inside text-sm">
                    {selectedReview.rooms.map((room, i) => (
                        <li key={i}>{room.room_name} – {room.room_type}</li>
                    ))}
                    </ul>
                ) : (
                    <p className="text-sm italic text-white/80">No room details available.</p>
                )}
                </div>

                {/* Review Images */}
                <div>
                <h3 className="text-lg font-semibold mb-1">Review Images</h3>
                {selectedReview.review_images && selectedReview.review_images.length > 0 ? (
                    <div className="flex flex-wrap gap-3 mt-2">
                    {selectedReview.review_images.map((img, i) => (
                        <img
                        key={i}
                        src={img}
                        alt={`Review image ${i + 1}`}
                        className="w-24 h-24 rounded-lg object-cover border border-white/40 shadow-sm"
                        />
                    ))}
                    </div>
                ) : (
                    <p className="text-sm italic text-white/80">No images provided.</p>
                )}
                </div>
            </div>
            </div>
        </Modal>
        )}
    </div>
  );
}
