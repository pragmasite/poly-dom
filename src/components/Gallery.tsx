import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const Gallery = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    { src: "/images/img-1.jpg", alt: t.galleryImages[0]?.title || "Image 1" },
    { src: "/images/img-2.jpg", alt: t.galleryImages[1]?.title || "Image 2" },
    { src: "/images/img-3.jpg", alt: t.galleryImages[2]?.title || "Image 3" },
    { src: "/images/img-4.jpg", alt: t.galleryImages[3]?.title || "Image 4" },
    { src: "/images/img-5.jpg", alt: t.galleryImages[4]?.title || "Image 5" },
    { src: "/images/img-6.jpg", alt: t.galleryImages[5]?.title || "Image 6" },
    { src: "/images/img-7.jpg", alt: t.galleryImages[6]?.title || "Image 7" },
  ];

  const hasMoreThan6 = images.length > 6;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="galerie" className="py-24 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm uppercase tracking-widest text-primary">
            {t.gallery.label}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl mt-2">
            {t.gallery.title}
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t.gallery.description}
          </p>
        </motion.div>

        {hasMoreThan6 ? (
          // Slider for more than 6 images
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-[16/9] overflow-hidden rounded-2xl"
            >
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={
                    index === currentSlide ? { opacity: 1 } : { opacity: 0 }
                  }
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              ))}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />

              {/* Image description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                }
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute bottom-6 left-6"
              >
                <p className="text-xl font-serif text-white">
                  {images[currentSlide].alt}
                </p>
              </motion.div>

              {/* Navigation buttons */}
              <div className="absolute inset-0 flex items-center justify-between p-6 pointer-events-none">
                <Button
                  onClick={prevSlide}
                  size="icon"
                  variant="ghost"
                  className="pointer-events-auto rounded-full bg-white/20 hover:bg-white/40 text-white"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  onClick={nextSlide}
                  size="icon"
                  variant="ghost"
                  className="pointer-events-auto rounded-full bg-white/20 hover:bg-white/40 text-white"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              {/* Slide indicators */}
              <div className="absolute bottom-6 right-6 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? "w-8 bg-white"
                        : "w-2 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Thumbnail strip */}
            <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  className={`h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentSlide
                      ? "border-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          // Grid for 6 or fewer images
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-sm font-medium text-white">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
