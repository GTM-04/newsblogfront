interface HeroFeatureProps {
  image: string;
  category: string;
  headline: string;
  summary: string;
  userNeed: 'KNOW' | 'LEARN' | 'FEEL' | 'ACT';
}

export function HeroFeature({ image, category, headline, summary, userNeed }: HeroFeatureProps) {
  const userNeedColors = {
    KNOW: 'bg-[#B8336A] text-white',
    LEARN: 'bg-[#2E5D8E] text-white',
    FEEL: 'bg-[#8B5A8B] text-white',
    ACT: 'bg-[#D97F4B] text-white'
  };

  return (
    <article className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {/* Image */}
        <div className="relative aspect-[16/10] bg-muted overflow-hidden">
          <img 
            src={image} 
            alt={headline}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs uppercase tracking-wider text-[#B8336A] font-semibold">
              {category}
            </span>
            <span className={`text-xs px-2 py-1 rounded ${userNeedColors[userNeed]}`}>
              {userNeed}
            </span>
          </div>
          
          <h1 
            className="text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {headline}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            {summary}
          </p>

          <a 
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[#B8336A] transition-colors"
          >
            Read the full story
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}
