export interface NavLink {
  label: string;
  href: string;
}

export const mainNavLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'NOVELLEYX AI', href: '/ai' },
  { label: 'Bundles', href: '/bundles' },
  { label: 'Contact', href: '/contact' },
];

export const allNavLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/services' },
  { label: 'NOVELLEYX AI', href: '/ai' },
  { label: 'How We Work', href: '/#how-we-work' },
  { label: 'Why NOVELLEYX', href: '/why-novelleyx' },
  { label: 'Our Pillars', href: '/pillars' },
  { label: 'Bundles', href: '/bundles' },
  { label: 'Contact', href: '/contact' },
];

export const footerLinks = {
  company: [
    { label: 'About', href: '/#about' },
    { label: 'Our Story', href: '/#about' },
    { label: 'Our Vision', href: '/#vision' },
    { label: 'Our Pillars', href: '/pillars' },
    { label: 'Why NOVELLEYX', href: '/why-novelleyx' },
  ],
  services: [
    { label: 'Media', href: '/services' },
    { label: 'IT', href: '/services' },
    { label: 'AI', href: '/services' },
    { label: 'Education & Career', href: '/services' },
    { label: 'Bundles', href: '/bundles' },
  ],
  experience: [
    { label: 'NOVELLEYX AI', href: '/ai' },
    { label: 'Get Appraisal', href: '/appraisal' },
    { label: 'How We Work', href: '/#how-we-work' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Service Terms', href: '/terms' },
  ],
};

export const contactInfo = {
  phones: ['+91 7075853225', '+91 7396713850', '+91 9390620273'],
  email: 'novelleyx@gmail.com',
  instagram: '@novelleyx',
  instagramUrl: 'https://instagram.com/novelleyx',
  youtube: '@NOVELLEYX',
  youtubeUrl: 'https://youtube.com/@NOVELLEYX',
};
