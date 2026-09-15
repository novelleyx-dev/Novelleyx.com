export type BundleAudience = 'Students' | 'Graduates' | 'Creators' | 'Startups' | 'Businesses' | 'Companies' | 'Individuals' | 'Influencers' | 'Small brands' | 'Personal brands' | 'Local businesses' | 'Early professionals' | 'Small businesses' | 'Founders' | 'CEOs' | 'Hackathon Teams';

export interface Bundle {
  id: string;
  name: string;
  slug: string;
  targetAudience: BundleAudience[];
  filterCategory: ('Students' | 'Creators' | 'Startups' | 'Businesses' | 'Companies')[];
  includes: string[];
  whyItWorks: string;
  pricingLabel: string;
  turnaround?: string;
  icon: string;
}

export const bundles: Bundle[] = [
  {
    id: 'starter-digital',
    name: 'Starter Digital',
    slug: 'starter-digital',
    targetAudience: ['Students', 'Graduates', 'Individuals', 'Early professionals'],
    filterCategory: ['Students'],
    includes: [
      'Resume',
      'ATS Optimization',
      'LinkedIn Optimization',
      'Professional Profile Guidance'
    ],
    whyItWorks: 'One coordinated professional identity package instead of managing multiple services separately.',
    pricingLabel: 'Get Bundle Appraisal',
    icon: 'UserPlus',
  },
  {
    id: 'creator-boost',
    name: 'Creator Boost',
    slug: 'creator-boost',
    targetAudience: ['Creators', 'Influencers', 'Small brands', 'Personal brands'],
    filterCategory: ['Creators'],
    includes: [
      'Social Media Content',
      'Thumbnail Design',
      'Short Video Editing',
      'Promotional Creative',
      'Content Strategy'
    ],
    whyItWorks: 'Creates a consistent content system rather than isolated pieces of content.',
    pricingLabel: 'Custom Bundle Pricing',
    icon: 'Sparkles',
  },
  {
    id: 'business-digital-launch',
    name: 'Business Digital Launch',
    slug: 'business-digital-launch',
    targetAudience: ['Small businesses', 'Local businesses', 'Startups'],
    filterCategory: ['Businesses', 'Startups'],
    includes: [
      'Business Website',
      'UI/UX',
      'SEO Setup',
      'Deployment',
      'Basic Analytics'
    ],
    whyItWorks: 'A coordinated digital foundation from one team.',
    pricingLabel: 'Get Custom Appraisal',
    icon: 'Rocket',
  },
  {
    id: 'ai-starter',
    name: 'AI Starter',
    slug: 'ai-starter',
    targetAudience: ['Small businesses', 'Startups', 'Businesses'],
    filterCategory: ['Startups', 'Businesses'],
    includes: [
      'Requirement Analysis',
      'AI Architecture',
      'AI Assistant / Chatbot',
      'Automation',
      'API Integration',
      'Deployment Guidance'
    ],
    whyItWorks: 'Helps a business identify where AI can actually create value before investing in a large system.',
    pricingLabel: 'Get Custom Appraisal',
    icon: 'Bot',
  },
  {
    id: 'startup-launch',
    name: 'Startup Launch',
    slug: 'startup-launch',
    targetAudience: ['Startups'],
    filterCategory: ['Startups'],
    includes: [
      'Brand Guidance',
      'Landing Website',
      'UI/UX',
      'SEO',
      'Starter Content',
      'AI Consultation',
      'Technical Consultation'
    ],
    whyItWorks: 'A startup gets multiple foundational capabilities through one coordinated ecosystem.',
    pricingLabel: 'Custom Bundle Pricing',
    icon: 'Briefcase',
  },
  {
    id: 'novelleyx-business-growth',
    name: 'NOVELLEYX Business Growth',
    slug: 'novelleyx-business-growth',
    targetAudience: ['Companies', 'Businesses'],
    filterCategory: ['Businesses', 'Companies'],
    includes: [
      'Website',
      'UI/UX',
      'SEO',
      'Digital Marketing',
      'AI Consultation',
      'Automation Planning',
      'Cloud Guidance',
      'Technical Support'
    ],
    whyItWorks: 'Multiple capabilities work together instead of becoming disconnected projects.',
    pricingLabel: 'CUSTOM APPRAISAL',
    icon: 'TrendingUp',
  }
];
