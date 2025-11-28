"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  dockSnapped?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    // At top (0): smaller scale, at bottom (1): zoomed but with room to scroll out
    return isMobile ? [0.7, 1.1] : [1.05, 1.3];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[120vh] md:h-[180vh] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  // Calculate width and height based on scale - leave room to scroll out when zoomed
  const width = useTransform(scale, (s) => {
    if (s >= 1.25) return '90vw';
    if (s >= 1.15) return '88vw';
    return '95vw';
  });
  
  const height = useTransform(scale, (s) => {
    if (s >= 1.25) return '85vh';
    if (s >= 1.15) return '82vh';
    return '85vh';
  });
  
  const borderRadius = useTransform(scale, (s) => {
    if (s >= 1.25) return 10;
    if (s >= 1.15) return 20;
    return 30;
  });
  
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        width,
        height,
        borderRadius,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="-mt-12 mx-auto border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4 relative">
        {children}
      </div>
    </motion.div>
  );
};
