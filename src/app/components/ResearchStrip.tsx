import { FileText, Users, TrendingUp } from 'lucide-react';

interface ResearchItem {
  title: string;
  studyCount: number;
  participants: number;
  confidence: 'High' | 'Medium' | 'Low';
  summary: string;
}

interface ResearchStripProps {
  items: ResearchItem[];
}

export function ResearchStrip({ items }: ResearchStripProps) {
  const confidenceColors = {
    High: 'bg-green-100 text-green-800 border-green-300',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    Low: 'bg-orange-100 text-orange-800 border-orange-300'
  };

  return (
    <section className="bg-[#f9f9f9] border-t border-b border-border py-8">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 
            className="text-2xl"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Latest Research
          </h2>
          <a href="#" className="text-sm text-[#B8336A] hover:underline">
            View all research →
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <article 
              key={index}
              className="bg-white border border-border p-5 hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Meta info */}
              <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <FileText className="size-3" />
                  <span>{item.studyCount} studies</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="size-3" />
                  <span>{item.participants.toLocaleString()}</span>
                </div>
              </div>

              {/* Confidence badge */}
              <div className="mb-3">
                <span className={`text-xs px-2 py-1 rounded border ${confidenceColors[item.confidence]}`}>
                  {item.confidence} Confidence
                </span>
              </div>

              {/* Title */}
              <h3 
                className="text-lg mb-2 leading-tight"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {item.title}
              </h3>

              {/* Summary */}
              <p className="text-sm text-muted-foreground line-clamp-3">
                {item.summary}
              </p>

              {/* Read link */}
              <div className="mt-3 pt-3 border-t border-border">
                <a href="#" className="text-sm text-[#B8336A] hover:underline flex items-center gap-1">
                  <TrendingUp className="size-3" />
                  <span>Read findings</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
