import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setShowFooter } from "../../store/showFooterSlice";

type InfinityScrollProps = {
  children: React.ReactNode;
  fetchMore: () => void;
  hasMore: boolean;
  loader: React.ReactNode;
  className?: string;
  endMessage?: React.ReactNode;
};

const InfinityScroll = ({
  children,
  fetchMore,
  hasMore,
  loader,
  className,
  endMessage,
}: InfinityScrollProps) => {
  const pageEndRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (hasMore) {
      const observer = new IntersectionObserver((entries) => {
        {
          if (entries[0].isIntersecting) {
            fetchMore();
          }
        }
      });

      const currentRef = pageEndRef.current;
      if (currentRef) {
        observer.observe(currentRef);
      }
      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    } else {
      dispatch(setShowFooter(true));
    }
  }, [hasMore]);

  return (
    <div className={className}>
      {children}

      {hasMore ? <div ref={pageEndRef}>{loader}</div> : endMessage}
    </div>
  );
};

export default InfinityScroll;
