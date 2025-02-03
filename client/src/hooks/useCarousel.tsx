import { useState, useEffect } from "react";

interface UseCarouselProps {
  totalImages: number; // Total number of images in the carousel
  interval?: number;   // Time interval for the carousel (default: 5000ms)
}

export const useCarousel = ({ totalImages, interval = 5000 }: UseCarouselProps) => {
  const [currentImage, setCurrentImage] = useState(0); 

  useEffect(() => {

    const timer = setInterval(() => {
      setCurrentImage((prev) => {
        const nextImage = (prev + 1) % totalImages;
        return nextImage;
      });
    }, interval);


    return () => {
      clearInterval(timer);
    };
  }, [totalImages, interval]);

  return currentImage;
};
