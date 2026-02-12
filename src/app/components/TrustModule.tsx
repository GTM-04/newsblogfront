import { ThumbsUp, ThumbsDown, AlertCircle, CheckCircle2, Info } from 'lucide-react';

interface TrustModuleProps {
  studyCount: number;
  expertInterviews: string[];
  confidence: 'High' | 'Medium' | 'Low';
  sources: string[];
  whatWeDontKnow?: string;
}

export function TrustModule({ 
  studyCount, 
  expertInterviews, 
  confidence, 
  sources,
  whatWeDontKnow 
}: TrustModuleProps) {
  const confidenceConfig = {
    High: {
      color: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: CheckCircle2
    },
    Medium: {
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      icon: Info
    },
    Low: {
      color: 'text-orange-700',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      icon: AlertCircle
    }
  };

  const config = confidenceConfig[confidence];
  const ConfidenceIcon = config.icon;

  return (
    <div className="border border-border bg-[#f9f9f9] p-6 my-8">
      {/* Header */}
      <div className="flex items-start gap-3 mb-6 pb-4 border-b border-border">
        <Shield className="size-5 text-[#2E5D8E] flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold mb-1">Source Transparency</h3>
          <p className="text-sm text-muted-foreground">
            How we know what we know
          </p>
        </div>
      </div>

      {/* Confidence Rating */}
      <div className={`flex items-start gap-3 p-4 rounded border ${config.borderColor} ${config.bgColor} mb-6`}>
        <ConfidenceIcon className={`size-5 ${config.color} flex-shrink-0 mt-0.5`} />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`font-semibold ${config.color}`}>
              {confidence} Confidence Rating
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {confidence === 'High' && 'Based on multiple peer-reviewed studies with large sample sizes and consistent findings.'}
            {confidence === 'Medium' && 'Based on limited studies or emerging research. More investigation needed.'}
            {confidence === 'Low' && 'Based on preliminary research or expert opinion. Findings should be interpreted with caution.'}
          </p>
        </div>
      </div>

      {/* Sources */}
      <div className="space-y-4 mb-6">
        {/* Study Count */}
        <div className="flex items-start gap-3">
          <FileText className="size-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Studies Referenced</p>
            <p className="text-sm text-muted-foreground">{studyCount} peer-reviewed studies</p>
          </div>
        </div>

        {/* Expert Interviews */}
        {expertInterviews.length > 0 && (
          <div className="flex items-start gap-3">
            <Users className="size-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Expert Interviews</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                {expertInterviews.map((expert, index) => (
                  <li key={index}>• {expert}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Sources list */}
        <div className="flex items-start gap-3">
          <Link className="size-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Primary Sources</p>
            <ul className="text-sm text-muted-foreground mt-1 space-y-1">
              {sources.map((source, index) => (
                <li key={index} className="truncate">
                  <a href="#" className="text-[#2E5D8E] hover:underline">
                    {source}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* What We Don't Know */}
      {whatWeDontKnow && (
        <div className="bg-white border border-border p-4 rounded mb-6">
          <div className="flex items-start gap-2 mb-2">
            <AlertCircle className="size-4 text-[#D97F4B] flex-shrink-0 mt-0.5" />
            <p className="text-sm font-semibold">What We Don't Know</p>
          </div>
          <p className="text-sm text-muted-foreground pl-6">
            {whatWeDontKnow}
          </p>
        </div>
      )}

      {/* Fairness Meter */}
      <div className="pt-4 border-t border-border">
        <p className="text-sm font-medium mb-3">Was this article fair and accurate?</p>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-border bg-white hover:bg-green-50 hover:border-green-300 transition-colors text-sm">
            <ThumbsUp className="size-4" />
            <span>Yes</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-border bg-white hover:bg-red-50 hover:border-red-300 transition-colors text-sm">
            <ThumbsDown className="size-4" />
            <span>No</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Missing imports
import { Shield, FileText, Users, Link } from 'lucide-react';
