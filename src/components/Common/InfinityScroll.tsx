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
    console.log(hasMore);

    useEffect(() => {
        if (hasMore) {
            const observer = new IntersectionObserver((entries) => {
                {
                    if (entries[0].isIntersecting) {
                        fetchMore();
                    }
                }
            })

            if (pageEndRef.current) {
                observer.observe(pageEndRef.current);
            }
            return () => {
                if (pageEndRef.current) {
                    observer.unobserve(pageEndRef.current);
                }
            }
        }
    }, [hasMore]);


    return (
        <div className={className}>
            {children}
            {loader}
            {hasMore ? <div ref={pageEndRef}></div> : endMessage}
        </div>
    )
}

export default InfinityScroll