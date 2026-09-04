import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import './TiltedCard.css';

const springValues = {
  damping: 20,
  stiffness: 220,
  mass: 0.8,
};

export interface TiltedCardProps {
  children?: React.ReactNode;
  imageSrc?: string;
  altText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const TiltedCard: React.FC<TiltedCardProps> = ({
  children,
  imageSrc,
  altText = 'Tilted card image',
  containerHeight = '100%',
  containerWidth = '100%',
  imageHeight = '100%',
  imageWidth = '100%',
  scaleOnHover = 1.03,
  rotateAmplitude = 15,
  showMobileWarning = false,
  overlayContent = null,
  displayOverlayContent = false,
  className = '',
  style,
  onClick,
}) => {
  const ref = useRef<HTMLElement | null>(null);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawScale = useMotionValue(1);

  const rotateX = useSpring(rawRotateX, springValues);
  const rotateY = useSpring(rawRotateY, springValues);
  const scale = useSpring(rawScale, springValues);

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rawRotateX.set(rotationX);
    rawRotateY.set(rotationY);
  }

  function handleMouseEnter() {
    rawScale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    rawScale.set(1);
    rawRotateX.set(0);
    rawRotateY.set(0);
  }

  return (
    <figure
      ref={ref}
      className={`tilted-card-figure ${className}`}
      style={{
        height: containerHeight,
        width: containerWidth,
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className="tilted-card-inner"
        style={{
          width: '100%',
          height: '100%',
          rotateX,
          rotateY,
          scale,
          transformPerspective: 1200,
          transformStyle: 'preserve-3d',
        }}
      >
        {children ? (
          children
        ) : (
          <>
            {imageSrc && (
              <motion.img
                src={imageSrc}
                alt={altText}
                className="tilted-card-img"
                style={{
                  width: imageWidth,
                  height: imageHeight,
                }}
                loading="lazy"
              />
            )}

            {displayOverlayContent && overlayContent && (
              <motion.div className="tilted-card-overlay">
                {overlayContent}
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </figure>
  );
};

export default TiltedCard;
