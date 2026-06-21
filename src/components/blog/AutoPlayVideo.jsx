'use client'

import { useEffect, useRef } from 'react'

export default function AutoPlayVideo({ src, style, ...props }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video is in viewport, play it
            video.play().catch((error) => {
              // Auto-play was prevented, this is normal in some browsers
              console.log('Auto-play was prevented:', error)
            })
          } else {
            // Video is out of viewport, pause it
            video.pause()
          }
        })
      },
      {
        threshold: 0.5, // Trigger when 50% of the video is visible
        rootMargin: '0px'
      }
    )

    observer.observe(video)

    return () => {
      observer.unobserve(video)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      controls
      muted // Required for auto-play in most browsers
      loop // Optional: loop the video
      style={style}
      {...props}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}