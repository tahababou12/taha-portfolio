import React, { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { fetchAwards, getAwardImageUrl, Award as AwardType } from '../lib/awards'

interface AwardItemProps {
  title: string
  organization: string
  description: string
  image?: string
  year?: string
  onClick?: () => void
}

const AwardItem: React.FC<AwardItemProps> = ({ title, organization, description, image, year, onClick }) => {
  return (
    <div className="mb-12 sm:mb-16">
      <div className="flex flex-col md:flex-row items-start gap-8">
        {image && (
          <div className="w-full md:w-2/5 mb-4 md:mb-0">
            <div 
              className="aspect-video bg-gray-900 rounded-lg overflow-hidden cursor-pointer"
              onClick={onClick}
            >
              <div className="relative w-full h-full group">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <div className="bg-black/70 text-white text-sm px-3 py-1 rounded-full">View Gallery</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className={`${image ? 'md:w-3/5' : 'w-full'}`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-medium">{title}</h3>
            {year && <span className="text-gray-400 text-sm">{year}</span>}
          </div>
          <h4 className="text-gray-300 font-medium mb-3">{organization}</h4>
          <p className="text-gray-400 leading-relaxed">{description}</p>
          <button
            onClick={onClick}
            className="mt-4 inline-flex items-center text-sm text-gray-300 hover:text-white transition-colors focus:outline-none"
          >
            View details <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  )
}

const AwardGallery: React.FC<{
  award: AwardType | null
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
  totalAwards: number
  currentIndex: number
  awards: AwardType[]
}> = ({ award, onClose, onPrevious, onNext, totalAwards, currentIndex, awards }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setCurrentImageIndex(0); // Reset image index when award changes
    setIsLoading(true);
  }, [award]);
  
  if (!award) return null;
  
  // Prepare all images for the gallery
  // First the main image, then additional images from the gallery
  const mainImage = award.image ? getAwardImageUrl(award.image) : undefined;
  const galleryImages = award.gallery?.map(img => getAwardImageUrl(img.image_url)) || [];
  const allImages = [mainImage, ...galleryImages].filter(Boolean) as string[];
  
  const handlePrevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + allImages.length) % allImages.length);
    setIsLoading(true);
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % allImages.length);
    setIsLoading(true);
  };
  
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Close the modal only if the click is directly on the backdrop
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Get previous and next award info
  const prevAward = currentIndex > 0 ? awards[currentIndex - 1] : null;
  const nextAward = currentIndex < totalAwards - 1 ? awards[currentIndex + 1] : null;
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-2 md:p-10 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-zinc-900 rounded-xl overflow-hidden w-full max-w-5xl shadow-2xl relative flex flex-col max-h-[95vh] md:max-h-[90vh]"
        style={{ maxHeight: 'calc(100vh - 40px)' }}
      >
        {/* Close button - top right corner */}
        <button 
          onClick={onClose}
          className="absolute right-3 top-3 md:right-4 md:top-4 z-20 w-8 h-8 rounded-full bg-black/30 text-white/80 hover:text-white flex items-center justify-center transition-all hover:bg-black/50 focus:outline-none"
          aria-label="Close gallery"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col md:flex-row h-full overflow-hidden">
          {/* Image section */}
          <div className="w-full md:w-3/5 relative bg-black flex-shrink-0 overflow-hidden">
            <div className="aspect-[4/3] md:aspect-auto md:h-full relative flex items-center justify-center overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                </div>
              )}
              <img 
                src={allImages[currentImageIndex]} 
                alt={award.title} 
                className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={handleImageLoad}
              />
              
              {/* Image indicator - show when multiple images exist */}
              {allImages.length > 1 && (
                <div className="absolute bottom-3 left-3 text-xs bg-black/50 text-white px-2 py-1 rounded-full">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              )}
              
              {/* Image navigation for the same award - make sure it's always visible */}
              {allImages.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all focus:outline-none"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button 
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all focus:outline-none"
                    aria-label="Next image"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>
          </div>
          
          <div className="w-full md:w-2/5 p-4 md:p-8 overflow-y-auto flex flex-col">
            <div className="flex flex-col h-full">
              <div className="mb-1 text-sm text-zinc-400">{award.year}</div>
              <h2 className="text-lg md:text-xl font-medium text-white mb-1">{award.title}</h2>
              <h3 className="text-sm md:text-md text-zinc-300 mb-4 md:mb-6">{award.organization}</h3>
              
              <div className="prose prose-invert prose-sm max-w-none text-zinc-300 flex-grow text-sm md:text-base">
                <p className="whitespace-pre-line leading-relaxed text-zinc-300">
                  {award.full_description || award.description}
                </p>
              </div>
              
              {award.link && (
                <a 
                  href={award.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-4 md:mt-6 bg-zinc-800/70 hover:bg-zinc-700/70 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors text-xs md:text-sm self-start"
                >
                  <ExternalLink size={12} className="mr-1.5 md:mr-2 md:w-4 md:h-4" />
                  Learn More
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Award navigation with award names */}
        <div className="border-t border-gray-800/50 mt-auto py-4 px-5 flex justify-between items-center">
          {prevAward ? (
            <button 
              onClick={onPrevious}
              className="flex items-center text-sm text-gray-300 hover:text-white transition-colors focus:outline-none group"
              aria-label={`Previous award: ${prevAward.title}`}
            >
              <ChevronLeft size={16} className="mr-2 text-gray-500 group-hover:text-white transition-colors" />
              <div className="text-left">
                <div className="text-xs text-gray-500">Previous Award</div>
                <div className="truncate max-w-[120px] md:max-w-[180px]">{prevAward.title}</div>
              </div>
            </button>
          ) : (
            <div className="w-[120px] md:w-[180px]"></div>
          )}
          
          <div className="text-xs text-zinc-500 bg-black/30 px-3 py-1 rounded-full hidden md:block">
            {currentIndex + 1} / {totalAwards}
          </div>
          
          {nextAward ? (
            <button 
              onClick={onNext}
              className="flex items-center text-sm text-gray-300 hover:text-white transition-colors focus:outline-none group"
              aria-label={`Next award: ${nextAward.title}`}
            >
              <div className="text-right">
                <div className="text-xs text-gray-500">Next Award</div>
                <div className="truncate max-w-[120px] md:max-w-[180px]">{nextAward.title}</div>
              </div>
              <ChevronRight size={16} className="ml-2 text-gray-500 group-hover:text-white transition-colors" />
            </button>
          ) : (
            <div className="w-[120px] md:w-[180px]"></div>
          )}
        </div>
      </div>
    </div>
  );
};

const AwardsPage: React.FC = () => {
  const [awards, setAwards] = useState<AwardType[]>([]);
  const [selectedAward, setSelectedAward] = useState<AwardType | null>(null);
  const [currentAwardIndex, setCurrentAwardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch awards from Supabase
  useEffect(() => {
    async function loadAwards() {
      setIsLoading(true);
      try {
        const awardsData = await fetchAwards();
        setAwards(awardsData);
      } catch (error) {
        console.error('Error loading awards:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadAwards();
  }, []);
  
  const handleOpenGallery = (index: number) => {
    setSelectedAward(awards[index]);
    setCurrentAwardIndex(index);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };
  
  const handleCloseGallery = () => {
    setSelectedAward(null);
    // Re-enable scrolling when modal is closed
    document.body.style.overflow = '';
  };
  
  const handlePreviousAward = () => {
    if (currentAwardIndex > 0) {
      const prevIndex = currentAwardIndex - 1;
      setSelectedAward(awards[prevIndex]);
      setCurrentAwardIndex(prevIndex);
    }
  };
  
  const handleNextAward = () => {
    if (currentAwardIndex < awards.length - 1) {
      const nextIndex = currentAwardIndex + 1;
      setSelectedAward(awards[nextIndex]);
      setCurrentAwardIndex(nextIndex);
    }
  };
  
  // Cleanup effect for body overflow
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  
  return (
    <div className="px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-normal">Awards & Recognitions</h1>
        </div>
        
        <p className="text-lg text-gray-300 mb-12 leading-relaxed max-w-3xl">
          Selected awards, honors, and recognitions I've received throughout my career in technology, 
          innovation, and open-source contributions.
        </p>

        {isLoading ? (
          <div className="flex items-center justify-center h-60">
            <div className="w-8 h-8 border-4 border-zinc-700 border-t-zinc-300 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-12 mt-8 border-t border-gray-800 pt-8">
            {awards.map((award, index) => (
              <AwardItem 
                key={award.id}
                title={award.title}
                organization={award.organization}
                description={award.description}
                image={award.image ? getAwardImageUrl(award.image) : undefined}
                year={award.year}
                onClick={() => handleOpenGallery(index)}
              />
            ))}
          </div>
        )}
      </div>
      
      {selectedAward && (
        <AwardGallery 
          award={selectedAward}
          onClose={handleCloseGallery}
          onPrevious={handlePreviousAward}
          onNext={handleNextAward}
          totalAwards={awards.length}
          currentIndex={currentAwardIndex}
          awards={awards}
        />
      )}
    </div>
  )
}

export default AwardsPage 