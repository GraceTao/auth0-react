import { useState, useEffect } from "react";
import ImageCarousel from "./ImageCarousel";

export default function Demo() {
   const [images, setImages] = useState({});
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchImages = async () => {
         try {
            const response = await fetch(
               "http://localhost:5000/api/images/base_hotspots"
            );
            const res = await response.json();
            setImages(res);
            setLoading(false);
         } catch (error) {
            console.error("Error fetching images:", error);
            setLoading(false);
         }
      };

      fetchImages();
   }, []);

   if (loading) return <div>Loading images...</div>;

   return (
      <ImageCarousel images={images} />
   );
}
