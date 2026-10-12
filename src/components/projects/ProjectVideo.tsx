"use client";

interface ProjectVideoProps {
  src: string;
}

export function ProjectVideo({ src }: ProjectVideoProps) {
  if (!src) return null;

  const isLoom = src.includes("loom.com");

  if (isLoom) {
    const embedUrl = src
      .replace(
        "https://www.loom.com/share/",
        "https://www.loom.com/embed/",
      )
      .split("?")[0];

    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-ink/10 bg-black shadow-2xl">
        <iframe
          src={embedUrl}
          title="Project walkthrough video"
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-ink/10 bg-black">
      <video
        className="block w-full"
        controls
        playsInline
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video element.
      </video>
    </div>
  );
}