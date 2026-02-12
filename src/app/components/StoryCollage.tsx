interface Story {
  image: string;
  category: string;
  headline: string;
  summary: string;
  userNeed: 'KNOW' | 'LEARN' | 'FEEL' | 'ACT';
}

interface StoryCollageProps {
  stories: Story[];
}

export function StoryCollage({ stories }: StoryCollageProps) {
  const userNeedColors = {
    KNOW: 'bg-[#B8336A] text-white',
    LEARN: 'bg-[#2E5D8E] text-white',
    FEEL: 'bg-[#8B5A8B] text-white',
    ACT: 'bg-[#D97F4B] text-white'
  };

  return (
    <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8 border-t border-border">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story, index) => (
          <article key={index} className="group cursor-pointer">
            {/* Image */}
            <div className="relative aspect-[16/10] bg-muted overflow-hidden mb-3">
              <img 
                src={story.image} 
                alt={story.headline}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider text-[#B8336A] font-semibold">
                {story.category}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded ${userNeedColors[story.userNeed]}`}>
                {story.userNeed}
              </span>
            </div>

            <h3 
              className="text-xl mb-2 leading-tight group-hover:text-[#B8336A] transition-colors"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {story.headline}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {story.summary}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
