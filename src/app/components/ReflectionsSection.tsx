interface Reflection {
  image: string;
  title: string;
  author: string;
  excerpt: string;
  readTime: string;
}

interface ReflectionsSectionProps {
  reflections: Reflection[];
}

export function ReflectionsSection({ reflections }: ReflectionsSectionProps) {
  return (
    <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8 border-t border-border">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs uppercase tracking-wider text-[#8B5A8B] font-semibold">
            Reflections
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-[#8B5A8B] text-white">
            FEEL
          </span>
        </div>
        <h2 
          className="text-2xl"
          style={{ fontFamily: "'Lora', serif" }}
        >
          Personal Perspectives
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Essays and lived experiences from our community
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {reflections.map((reflection, index) => (
          <article key={index} className="group cursor-pointer">
            <div className="flex gap-4">
              {/* Image */}
              <div className="relative w-24 h-24 flex-shrink-0 bg-muted overflow-hidden rounded">
                <img 
                  src={reflection.image} 
                  alt={reflection.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 
                  className="text-lg mb-1 leading-tight group-hover:text-[#8B5A8B] transition-colors"
                  style={{ fontFamily: "'Lora', serif", fontStyle: 'italic' }}
                >
                  {reflection.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  By {reflection.author}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {reflection.excerpt}
                </p>
                <span className="text-xs text-muted-foreground mt-1 inline-block">
                  {reflection.readTime} read
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
