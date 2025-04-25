import React, { useEffect, useRef } from "react"

type InfinityScrollProps = {
    children: React.ReactNode;
    fetchMore: () => void;
    hasMore: boolean;
    loader: React.ReactNode;
    className?: string;
    endMessage?: React.ReactNode;
}

const InfinityScroll = ({ children, fetchMore, hasMore, loader, className, endMessage }: InfinityScrollProps) => {
    const pageEndRef = useRef(null);

    useEffect(() => {
        if (hasMore) {
            const observer = new IntersectionObserver((entries) => {
                {
                    if (entries[0].isIntersecting) {
                        fetchMore();
                    }
                }
            })

            const currentRef = pageEndRef.current;
            if (currentRef) {
                observer.observe(currentRef);
            }
            return () => {
                if (currentRef) {
                    observer.unobserve(currentRef);
                }
            }
        }
    }, [hasMore]);


    return (
        <div className={className}>
            {children}

            {hasMore ? <div ref={pageEndRef}>{loader}</div> : endMessage}
        </div>
    )
}

export default InfinityScroll