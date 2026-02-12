import { MessageCircle, Shield, Lock } from 'lucide-react';

export function YourQuestionsSection() {
  return (
    <section className="bg-gradient-to-br from-[#8B5A8B]/5 to-[#B8336A]/5 border-t border-b border-border py-12">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#B8336A]/10 mb-6">
            <MessageCircle className="size-8 text-[#B8336A]" />
          </div>

          {/* Heading */}
          <h2 
            className="text-3xl mb-4"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Your Questions, Answered
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            No question is too personal. Our team of experts and researchers provide evidence-based answers to real questions from our community.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="size-4 text-[#2E5D8E]" />
              <span>100% Anonymous</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="size-4 text-[#2E5D8E]" />
              <span>Privacy Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="size-4 text-[#2E5D8E]" />
              <span>Expert-Reviewed</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-[#B8336A] text-white hover:bg-[#9a2a58] transition-colors">
              Submit Your Question
            </button>
            <button className="px-6 py-3 border border-border bg-white hover:bg-gray-50 transition-colors">
              Browse Answered Questions
            </button>
          </div>

          {/* Anonymous community highlight */}
          <div className="mt-12 p-6 bg-white border border-border text-left">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Recent Anonymous Question
            </p>
            <blockquote 
              className="text-lg mb-4 italic"
              style={{ fontFamily: "'Lora', serif" }}
            >
              "How do I start conversations about intimacy with my partner when we've been together for years but never really talked about it?"
            </blockquote>
            <a href="#" className="text-sm text-[#B8336A] hover:underline">
              Read the expert response →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
