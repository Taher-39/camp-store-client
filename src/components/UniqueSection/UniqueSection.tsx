import { useEffect, useRef } from "react";
import wildness from "@/assets/Videos/campingTent.mp4";
import Destinations from "@/assets/Videos/10 Best Camping Sites in Washington State to Explore.mp4";

function useVideoVisibility(videoRef: React.RefObject<HTMLVideoElement>) {
  useEffect(() => {
    const videoElement = videoRef.current;

    const handleScroll = () => {
      if (!videoElement) return;
      const rect = videoElement.getBoundingClientRect();
      const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (isInView) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [videoRef]);
}

export default function UniqueSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured <span style={{ color: "#4952b2" }}>Content</span>
        </h2>

        {/* First Video Section */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <VideoContent videoUrl={wildness} />
          <div className="flex flex-col justify-center">
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: "#4952b2" }}
            >
              Exploring the Wilderness
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Join our recent tour group as they explore the uncharted
              wilderness.
            </p>
          </div>
        </div>

        {/* Second Video Section */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:flex-row-reverse">
          <div className="flex flex-col justify-center">
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: "#4952b2" }}
            >
              Top Destinations of 2024
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Check out the top destinations our tour groups visited this year.
            </p>
          </div>
          <VideoContent videoUrl={Destinations} />
        </div>
      </div>
    </section>
  );
}

function VideoContent({ videoUrl }: { videoUrl: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useVideoVisibility(videoRef);

  return (
    <div className="relative rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-auto"
        controls={false}
        muted
        loop
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25"></div>
    </div>
  );
}
