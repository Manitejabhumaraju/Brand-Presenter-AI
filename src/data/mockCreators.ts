import { Creator } from '../types';

export const mockCreators: Creator[] = [
  {
    id: 'c1',
    name: 'Aarav Sharma',
    handle: '@aaravtech',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    creatorType: 'Content Creator',
    location: { city: 'Bengaluru', state: 'Karnataka', country: 'India' },
    languages: ['English', 'Hindi', 'Kannada'],
    categories: ['Technology', 'SaaS', 'B2B'],
    niches: ['Smartphones', 'AI Tools', 'Developer Productivity', 'Tech Reviews'],
    bio: 'B2B SaaS and consumer tech breakdown specialist. Helping engineers & product builders find tools that amplify speed. Ex-product designer.',
    availabilityStatus: 'Available Now',
    responseTime: '< 2 hours',
    profileCompletion: 96,
    identityVerified: true,
    professionalVerified: true,
    platforms: [
      {
        id: 'p1_yt',
        platform: 'youtube',
        username: 'AaravTechExplains',
        profileUrl: 'https://youtube.com',
        accountType: 'Partner',
        followers: 320000,
        subscribers: 320000,
        engagementRate: 5.4,
        avgViews: 84000,
        avgReach: 145000,
        contentCount: 412,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-05T14:30:00Z',
        syncFreshness: 'updated_hours_ago',
        topContentFormat: 'Dedicated Video Reviews'
      },
      {
        id: 'p1_li',
        platform: 'linkedin',
        username: 'aarav-sharma-tech',
        profileUrl: 'https://linkedin.com',
        accountType: 'Creator',
        followers: 98000,
        engagementRate: 4.8,
        avgViews: 32000,
        avgReach: 48000,
        contentCount: 520,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-05T12:00:00Z',
        syncFreshness: 'updated_hours_ago',
        topContentFormat: 'Case Studies & Carousels'
      },
      {
        id: 'p1_x',
        platform: 'twitter',
        username: 'aarav_builds',
        profileUrl: 'https://x.com',
        accountType: 'Creator',
        followers: 65000,
        engagementRate: 3.2,
        avgViews: 28000,
        avgReach: 35000,
        contentCount: 1200,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-04T18:00:00Z',
        syncFreshness: 'updated_today',
        topContentFormat: 'Tech Threads'
      }
    ],
    aiScore: {
      overall: 93,
      audienceQuality: 95,
      engagementQuality: 92,
      contentQuality: 96,
      reliability: 94,
      brandFit: 91,
      commercialValue: 90,
      summary: 'Exceptional reach with enterprise B2B and SaaS software buyers in Tier 1 metros.',
      reasons: [
        'Top 1% engagement in developer and SaaS software categories',
        '86% Indian tech professional audience with high purchasing power',
        '100% on-time campaign turnaround across 18 brand partnerships',
        'Zero metric anomaly flags detected in audit history'
      ]
    },
    audience: {
      primaryGender: 'Male (74%)',
      genderDistribution: [
        { label: 'Male', percentage: 74 },
        { label: 'Female', percentage: 24 },
        { label: 'Non-binary', percentage: 2 }
      ],
      ageDistribution: [
        { label: '18-24', percentage: 22 },
        { label: '25-34', percentage: 58 },
        { label: '35-44', percentage: 16 },
        { label: '45+', percentage: 4 }
      ],
      topCountries: [
        { country: 'India', percentage: 78 },
        { country: 'United States', percentage: 11 },
        { country: 'Singapore', percentage: 5 },
        { country: 'United Kingdom', percentage: 3 }
      ],
      topCities: [
        { city: 'Bengaluru', percentage: 32 },
        { city: 'Hyderabad', percentage: 18 },
        { city: 'Pune', percentage: 14 },
        { city: 'Delhi NCR', percentage: 12 }
      ],
      languages: ['English (85%)', 'Hindi (15%)'],
      topInterests: ['Software Engineering', 'AI & ML Tools', 'Developer Productivity', 'Fintech', 'Cloud Infrastructure'],
      audienceQualityScore: 94,
      suspiciousFollowerPercent: 1.8,
      growth30d: 5.6
    },
    pricing: [
      {
        id: 'pr_1',
        deliverableName: 'YouTube Dedicated Review (8-12 mins)',
        platform: 'youtube',
        priceMin: 75000,
        priceMax: 95000,
        turnaroundDays: 7,
        typicalRevisions: 2,
        negotiable: true,
        description: 'Comprehensive workflow review with real problem-solving walkthrough and pinned promo link.',
        benchmarkMin: 65000,
        benchmarkMax: 110000,
        benchmarkStatus: 'within_market'
      },
      {
        id: 'pr_2',
        deliverableName: 'YouTube 60s Integration + Mid-roll',
        platform: 'youtube',
        priceMin: 35000,
        priceMax: 45000,
        turnaroundDays: 4,
        typicalRevisions: 1,
        negotiable: false,
        description: 'Organic transition into product demo during weekly top productivity tools video.',
        benchmarkMin: 30000,
        benchmarkMax: 50000,
        benchmarkStatus: 'within_market'
      },
      {
        id: 'pr_3',
        deliverableName: 'LinkedIn Deep Dive Carousel + Post',
        platform: 'linkedin',
        priceMin: 28000,
        priceMax: 35000,
        turnaroundDays: 3,
        typicalRevisions: 2,
        negotiable: false,
        description: 'Technical breakdown infographic slide deck read by founders, engineering leads, and CTOs.',
        benchmarkMin: 22000,
        benchmarkMax: 38000,
        benchmarkStatus: 'within_market'
      },
      {
        id: 'pr_4',
        deliverableName: 'Cross-Platform Enterprise B2B Launch Package',
        platform: 'youtube',
        priceMin: 120000,
        priceMax: 150000,
        turnaroundDays: 10,
        typicalRevisions: 3,
        negotiable: true,
        description: '1x Dedicated YouTube breakdown + 1x LinkedIn Carousel + 1x X/Twitter thread with 30-day link in bio.',
        benchmarkMin: 110000,
        benchmarkMax: 175000,
        benchmarkStatus: 'within_market'
      }
    ],
    portfolio: [
      {
        id: 'port_1',
        brandName: 'Postman',
        campaignName: 'API Workflow 2026 Developer Drive',
        category: 'Technology',
        platforms: ['youtube', 'linkedin'],
        contentFormat: 'Hands-on Testing Video + Guide',
        campaignObjective: 'Developer Sign-ups',
        creatorRole: 'Host & Scriptwriter',
        contentUrl: 'https://youtube.com',
        publishedDate: '2026-07-15',
        reach: 245000,
        views: 112000,
        engagementRate: 6.8,
        leads: 3420,
        conversions: 890,
        roi: '4.2x ROAS',
        creatorCommentary: 'Showcased building a mock microservice from scratch. The real-world demo drove 3.4k developer sandbox activations.',
        verifiedByBrand: true
      },
      {
        id: 'port_2',
        brandName: 'Linear App',
        campaignName: 'Productivity Sprint Campaign',
        category: 'SaaS',
        platforms: ['linkedin', 'twitter'],
        contentFormat: 'Carousel + Video Walkthrough',
        campaignObjective: 'Awareness & Team Trials',
        creatorRole: 'Creator & Strategist',
        contentUrl: 'https://linkedin.com',
        publishedDate: '2026-05-20',
        reach: 180000,
        views: 75000,
        engagementRate: 5.9,
        leads: 1850,
        conversions: 410,
        roi: '3.6x ROAS',
        creatorCommentary: 'Analyzed how high-velocity engineering teams avoid Jira bloat.',
        verifiedByBrand: true
      }
    ],
    reviews: [
      {
        id: 'rev_1',
        brandName: 'Postman',
        brandContact: 'VP of Growth',
        rating: 5,
        date: '2026-08-01',
        campaignName: 'Developer Drive',
        comment: 'Aarav is among the rarest creators who actually understands code architecture. The quality of developer leads was unprecedented.',
        verifiedClient: true
      },
      {
        id: 'rev_2',
        brandName: 'Zoho Creator',
        brandContact: 'Product Marketing Lead',
        rating: 5,
        date: '2026-04-12',
        campaignName: 'Low-Code Enterprise Push',
        comment: 'Turnaround was ahead of deadline and communication was crystal clear. Will definitely collaborate again for Q4.',
        verifiedClient: true
      }
    ],
    stats: {
      totalFollowers: 483000,
      avgEngagementRate: 5.1,
      avgMonthlyReach: 620000,
      completedCampaigns: 24,
      brandsWorkedWith: 18,
      repeatClientRate: 62,
      onTimeDeliveryRate: 100
    },
    contactSettings: {
      visibility: 'email_verified_brands',
      publicEmail: 'collab@aaravtech.in',
      phone: '+91 98450 XXXXX'
    }
  },
  {
    id: 'c2',
    name: 'Priya Nambiar',
    handle: '@priyafitness',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    creatorType: 'Influencer',
    location: { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
    languages: ['English', 'Hindi', 'Malayalam'],
    categories: ['Fitness', 'Health and Wellness', 'Lifestyle'],
    niches: ['Strength Training', 'High Protein Diet', 'Home Workouts', 'Athleisure'],
    bio: 'Certified strength & conditioning coach. Helping 500k+ Indian women achieve functional strength without starvation diets. Cult.fit athlete.',
    availabilityStatus: 'Available Now',
    responseTime: '< 4 hours',
    profileCompletion: 98,
    identityVerified: true,
    professionalVerified: true,
    platforms: [
      {
        id: 'p2_ig',
        platform: 'instagram',
        username: 'priya_nambiar_fit',
        profileUrl: 'https://instagram.com',
        accountType: 'Creator',
        followers: 460000,
        engagementRate: 6.2,
        avgViews: 145000,
        avgReach: 280000,
        contentCount: 840,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-05T16:15:00Z',
        syncFreshness: 'updated_hours_ago',
        topContentFormat: 'Reels & Carousel Form Guides'
      },
      {
        id: 'p2_yt',
        platform: 'youtube',
        username: 'PriyaNambiarFit',
        profileUrl: 'https://youtube.com',
        accountType: 'Partner',
        followers: 210000,
        subscribers: 210000,
        engagementRate: 7.1,
        avgViews: 92000,
        avgReach: 160000,
        contentCount: 220,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-05T11:00:00Z',
        syncFreshness: 'updated_hours_ago',
        topContentFormat: 'Full-Length Workout Routines'
      }
    ],
    aiScore: {
      overall: 95,
      audienceQuality: 96,
      engagementQuality: 94,
      contentQuality: 97,
      reliability: 95,
      brandFit: 94,
      commercialValue: 93,
      summary: 'Powerhouse female wellness icon in India with extraordinary reel reach and comments intent.',
      reasons: [
        'Massive 68% female audience demographic actively buying health supplements & apparel',
        'Consistently averages 140k+ reel views on educational lifting breakdowns',
        'High conversion rates on whey protein, creatine, and gym wear campaigns',
        'Verified medical/fitness credentials verified on platform'
      ]
    },
    audience: {
      primaryGender: 'Female (68%)',
      genderDistribution: [
        { label: 'Female', percentage: 68 },
        { label: 'Male', percentage: 31 },
        { label: 'Other', percentage: 1 }
      ],
      ageDistribution: [
        { label: '18-24', percentage: 34 },
        { label: '25-34', percentage: 51 },
        { label: '35-44', percentage: 12 },
        { label: '45+', percentage: 3 }
      ],
      topCountries: [
        { country: 'India', percentage: 86 },
        { country: 'UAE', percentage: 6 },
        { country: 'United States', percentage: 4 },
        { country: 'Canada', percentage: 2 }
      ],
      topCities: [
        { city: 'Mumbai', percentage: 35 },
        { city: 'Delhi NCR', percentage: 22 },
        { city: 'Bengaluru', percentage: 18 },
        { city: 'Kochi', percentage: 8 }
      ],
      languages: ['English', 'Hindi'],
      topInterests: ['Strength Training', 'Healthy Recipes', 'Activewear', 'Vitamins & Supplements', 'Mental Wellness'],
      audienceQualityScore: 96,
      suspiciousFollowerPercent: 1.2,
      growth30d: 6.8
    },
    pricing: [
      {
        id: 'pr_2_1',
        deliverableName: 'Instagram Dedicated 60s Reel + Story Set',
        platform: 'instagram',
        priceMin: 45000,
        priceMax: 65000,
        turnaroundDays: 5,
        typicalRevisions: 2,
        negotiable: true,
        description: 'High-energy workout demonstration featuring your brand with organic fitness narrative and link stickers.',
        benchmarkMin: 40000,
        benchmarkMax: 70000,
        benchmarkStatus: 'within_market'
      },
      {
        id: 'pr_2_2',
        deliverableName: 'Instagram 3x Story Sequence with Link',
        platform: 'instagram',
        priceMin: 18000,
        priceMax: 24000,
        turnaroundDays: 2,
        typicalRevisions: 1,
        negotiable: false,
        description: 'Direct-to-camera review and unboxing with swipe-up discount code.',
        benchmarkMin: 15000,
        benchmarkMax: 28000,
        benchmarkStatus: 'within_market'
      },
      {
        id: 'pr_2_3',
        deliverableName: 'YouTube 15-min Follow Along Workout Sponsorship',
        platform: 'youtube',
        priceMin: 60000,
        priceMax: 85000,
        turnaroundDays: 7,
        typicalRevisions: 2,
        negotiable: true,
        description: 'Complete integrated workout wearing your apparel and introducing the sponsor in warm-up and cool-down.',
        benchmarkMin: 55000,
        benchmarkMax: 90000,
        benchmarkStatus: 'within_market'
      }
    ],
    portfolio: [
      {
        id: 'port_2_1',
        brandName: 'Cult.fit',
        campaignName: 'New Year Revolution 2026',
        category: 'Fitness',
        platforms: ['instagram', 'youtube'],
        contentFormat: '3x Reels + 1 Full Workout',
        campaignObjective: 'Gym Membership & CultPass Sales',
        creatorRole: 'Head Athlete',
        contentUrl: 'https://instagram.com',
        publishedDate: '2026-01-10',
        reach: 890000,
        views: 640000,
        engagementRate: 7.8,
        leads: 8200,
        conversions: 1650,
        roi: '5.4x ROAS',
        creatorCommentary: 'Created realistic 30-minute daily challenge that users could log on Cult app.',
        verifiedByBrand: true
      },
      {
        id: 'port_2_2',
        brandName: 'The Whole Truth Foods',
        campaignName: 'Clean Protein Bar Launch',
        category: 'Food',
        platforms: ['instagram'],
        contentFormat: 'Nutrition Label Deep-Dive Reel',
        campaignObjective: 'Direct-to-Consumer Sales',
        creatorRole: 'Educator',
        contentUrl: 'https://instagram.com',
        publishedDate: '2026-04-18',
        reach: 410000,
        views: 290000,
        engagementRate: 8.2,
        leads: 4100,
        conversions: 980,
        roi: '4.8x ROAS',
        creatorCommentary: 'Broke down hidden sugar alcohols vs real dates. Authentic educational format yielded historic conversions.',
        verifiedByBrand: true
      }
    ],
    reviews: [
      {
        id: 'rev_2_1',
        brandName: 'Cult.fit',
        brandContact: 'Marketing Director',
        rating: 5,
        date: '2026-02-15',
        campaignName: 'New Year Revolution',
        comment: 'Priya generated our highest-converting influencer creative of the quarter. Her authenticity creates direct sales velocity.',
        verifiedClient: true
      }
    ],
    stats: {
      totalFollowers: 670000,
      avgEngagementRate: 6.5,
      avgMonthlyReach: 1200000,
      completedCampaigns: 36,
      brandsWorkedWith: 22,
      repeatClientRate: 74,
      onTimeDeliveryRate: 98
    },
    contactSettings: {
      visibility: 'marketplace_only',
      publicEmail: 'management@priyanambiar.com'
    }
  },
  {
    id: 'c3',
    name: 'Rohan Mehta',
    handle: '@rohancreates',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    creatorType: 'Freelancer',
    location: { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
    languages: ['English', 'Hindi'],
    categories: ['UGC', 'Videography', 'Creative Direction'],
    niches: ['Commercial Directing', 'High-Retention Video Editing', 'Sound Design', 'CGI Motion'],
    bio: 'Commercial video director & UGC engineer. Delivered 140+ ad creatives for D2C brands generating over ₹12Cr in tracked sales.',
    freelanceServices: ['Video Editing', 'Videography', 'Creative Direction', 'UGC Production', 'Motion Graphics'],
    availabilityStatus: 'Limited Availability',
    responseTime: '< 1 hour',
    profileCompletion: 94,
    identityVerified: true,
    professionalVerified: true,
    platforms: [
      {
        id: 'p3_ig',
        platform: 'instagram',
        username: 'rohan.creates.ads',
        profileUrl: 'https://instagram.com',
        accountType: 'Business',
        followers: 42000,
        engagementRate: 8.4,
        avgViews: 58000,
        avgReach: 80000,
        contentCount: 210,
        verifiedOnPlatform: false,
        syncStatus: 'connected',
        lastSynced: '2026-09-05T09:00:00Z',
        syncFreshness: 'updated_today',
        topContentFormat: 'Before/After Creative Deconstructions'
      },
      {
        id: 'p3_yt',
        platform: 'youtube',
        username: 'RohanMehtaFilms',
        profileUrl: 'https://youtube.com',
        accountType: 'Creator',
        followers: 78000,
        subscribers: 78000,
        engagementRate: 6.9,
        avgViews: 42000,
        avgReach: 60000,
        contentCount: 88,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-04T12:00:00Z',
        syncFreshness: 'updated_today',
        topContentFormat: 'Lighting & Direction Breakdowns'
      }
    ],
    aiScore: {
      overall: 91,
      audienceQuality: 88,
      engagementQuality: 92,
      contentQuality: 98,
      reliability: 96,
      brandFit: 94,
      commercialValue: 95,
      summary: 'Top-tier commercial video asset creator for direct-response paid ad campaigns (Meta & TikTok).',
      reasons: [
        'Highest retention rates recorded across D2C performance marketing video assets',
        'Extensive portfolio with validated ₹12Cr+ client revenue generation',
        'Offers raw 4K footage, 5 hook variations, and licensed sound design',
        'Average response time under 1 hour'
      ]
    },
    audience: {
      primaryGender: 'Male (62%)',
      genderDistribution: [
        { label: 'Male', percentage: 62 },
        { label: 'Female', percentage: 38 }
      ],
      ageDistribution: [
        { label: '18-24', percentage: 28 },
        { label: '25-34', percentage: 54 },
        { label: '35-44', percentage: 14 },
        { label: '45+', percentage: 4 }
      ],
      topCountries: [
        { country: 'India', percentage: 72 },
        { country: 'United States', percentage: 14 },
        { country: 'UAE', percentage: 8 }
      ],
      topCities: [
        { city: 'Mumbai', percentage: 38 },
        { city: 'Delhi NCR', percentage: 20 },
        { city: 'Bengaluru', percentage: 16 }
      ],
      languages: ['English', 'Hindi'],
      topInterests: ['Video Production', 'D2C Brands', 'Performance Marketing', 'Filmmaking Gear'],
      audienceQualityScore: 92,
      suspiciousFollowerPercent: 1.1,
      growth30d: 4.2
    },
    pricing: [
      {
        id: 'pr_3_1',
        deliverableName: 'High-Converting Performance UGC Video (3 Hooks + 1 Body)',
        platform: 'instagram',
        priceMin: 22000,
        priceMax: 30000,
        turnaroundDays: 4,
        typicalRevisions: 2,
        negotiable: false,
        description: 'Engineered for Meta/Reels ads with high-energy pattern interrupt hook, voiceover, and motion typography.',
        benchmarkMin: 18000,
        benchmarkMax: 32000,
        benchmarkStatus: 'within_market'
      },
      {
        id: 'pr_3_2',
        deliverableName: '5-Ad Performance Video Pack (D2C Scale)',
        platform: 'tiktok',
        priceMin: 80000,
        priceMax: 110000,
        turnaroundDays: 10,
        typicalRevisions: 3,
        negotiable: true,
        description: 'Full studio lighting, professional talent, 5 distinct creative angles, tested for ROAS scale.',
        benchmarkMin: 75000,
        benchmarkMax: 125000,
        benchmarkStatus: 'within_market'
      },
      {
        id: 'pr_3_3',
        deliverableName: 'Commercial Product 3D Motion Billboard (15s)',
        platform: 'instagram',
        priceMin: 45000,
        priceMax: 60000,
        turnaroundDays: 7,
        typicalRevisions: 2,
        negotiable: true,
        description: 'Photorealistic 3D product render in Blender/After Effects with dynamic physics and lighting.',
        benchmarkMin: 40000,
        benchmarkMax: 70000,
        benchmarkStatus: 'within_market'
      }
    ],
    portfolio: [
      {
        id: 'port_3_1',
        brandName: 'Boat Lifestyle',
        campaignName: 'Nirvana ANC Earbuds Launch',
        category: 'Technology',
        platforms: ['instagram'],
        contentFormat: 'Commercial Video Ad Set',
        campaignObjective: 'E-commerce Purchase Conversions',
        creatorRole: 'Creative Director & Editor',
        contentUrl: 'https://boat-lifestyle.com',
        publishedDate: '2026-03-12',
        reach: 1200000,
        views: 850000,
        engagementRate: 6.2,
        leads: 12400,
        conversions: 3100,
        roi: '6.1x ROAS',
        creatorCommentary: 'Scripted 4 distinct sensory hooks emphasizing total silence in Indian train commutes. Became their highest-ROAS ad asset.',
        verifiedByBrand: true
      }
    ],
    reviews: [
      {
        id: 'rev_3_1',
        brandName: 'Boat Lifestyle',
        brandContact: 'Head of Growth Marketing',
        rating: 5,
        date: '2026-04-02',
        campaignName: 'Nirvana ANC Launch',
        comment: 'Rohan’s ads outperformed our internal agency by 240%. True master of psychological hooks and sound design.',
        verifiedClient: true
      }
    ],
    stats: {
      totalFollowers: 120000,
      avgEngagementRate: 7.6,
      avgMonthlyReach: 320000,
      completedCampaigns: 48,
      brandsWorkedWith: 32,
      repeatClientRate: 81,
      onTimeDeliveryRate: 100
    },
    contactSettings: {
      visibility: 'marketplace_only',
      publicEmail: 'rohan@creativespark.in'
    }
  },
  {
    id: 'c4',
    name: 'Dr. Ananya Ray',
    handle: '@drananyaderm',
    avatar: 'https://images.unsplash.com/photo-1594824813622-421711200234?auto=format&fit=crop&w=300&q=80',
    creatorType: 'Influencer',
    location: { city: 'New Delhi', state: 'Delhi NCR', country: 'India' },
    languages: ['English', 'Hindi', 'Bengali'],
    categories: ['Beauty', 'Health and Wellness', 'Education'],
    niches: ['Dermatology', 'Science-backed Skincare', 'Acne Solutions', 'Sunscreen Audits'],
    bio: 'MD Dermatologist & Aesthetician. Debunking skincare myths with peer-reviewed medical science. Clean beauty advocate without the pseudoscience.',
    availabilityStatus: 'Booking Next Month',
    responseTime: '< 6 hours',
    profileCompletion: 100,
    identityVerified: true,
    professionalVerified: true,
    platforms: [
      {
        id: 'p4_ig',
        platform: 'instagram',
        username: 'drananya_skincare',
        profileUrl: 'https://instagram.com',
        accountType: 'Creator',
        followers: 520000,
        engagementRate: 5.8,
        avgViews: 180000,
        avgReach: 390000,
        contentCount: 650,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-05T15:00:00Z',
        syncFreshness: 'updated_hours_ago',
        topContentFormat: 'Ingredient Breakdown Reels'
      },
      {
        id: 'p4_yt',
        platform: 'youtube',
        username: 'DrAnanyaRaySkincare',
        profileUrl: 'https://youtube.com',
        accountType: 'Partner',
        followers: 310000,
        subscribers: 310000,
        engagementRate: 6.4,
        avgViews: 95000,
        avgReach: 170000,
        contentCount: 160,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-05T10:00:00Z',
        syncFreshness: 'updated_hours_ago',
        topContentFormat: 'Skincare Routine Reviews'
      }
    ],
    aiScore: {
      overall: 96,
      audienceQuality: 98,
      engagementQuality: 94,
      contentQuality: 97,
      reliability: 96,
      brandFit: 95,
      commercialValue: 97,
      summary: 'Highest-credibility medical authority in Indian beauty & derma-cosmetics. Ultra-loyal high-AOV buyers.',
      reasons: [
        'MD credential verified and displayed with medical council verification',
        'Zero promotion of predatory skin-lightening or unregulated products',
        'Average cart value generated on clinical skincare exceeds ₹1,800',
        '98% audience trust index based on comment sentiment analysis'
      ]
    },
    audience: {
      primaryGender: 'Female (76%)',
      genderDistribution: [
        { label: 'Female', percentage: 76 },
        { label: 'Male', percentage: 23 },
        { label: 'Other', percentage: 1 }
      ],
      ageDistribution: [
        { label: '18-24', percentage: 25 },
        { label: '25-34', percentage: 56 },
        { label: '35-44', percentage: 15 },
        { label: '45+', percentage: 4 }
      ],
      topCountries: [
        { country: 'India', percentage: 82 },
        { country: 'United States', percentage: 7 },
        { country: 'UAE', percentage: 5 }
      ],
      topCities: [
        { city: 'Delhi NCR', percentage: 32 },
        { city: 'Mumbai', percentage: 24 },
        { city: 'Bengaluru', percentage: 18 },
        { city: 'Kolkata', percentage: 12 }
      ],
      languages: ['English', 'Hindi'],
      topInterests: ['Clinical Skincare', 'Active Ingredients', 'Sun Protection', 'Clean Dermatology', 'Hair Care'],
      audienceQualityScore: 98,
      suspiciousFollowerPercent: 0.9,
      growth30d: 4.8
    },
    pricing: [
      {
        id: 'pr_4_1',
        deliverableName: 'Instagram In-Depth Clinical Evaluation Reel',
        platform: 'instagram',
        priceMin: 55000,
        priceMax: 75000,
        turnaroundDays: 7,
        typicalRevisions: 2,
        negotiable: false,
        description: 'Microscopic texture analysis, active ingredient explanation, clinical testing study commentary.',
        benchmarkMin: 50000,
        benchmarkMax: 85000,
        benchmarkStatus: 'within_market'
      },
      {
        id: 'pr_4_2',
        deliverableName: 'YouTube 12-min Dedicated Product & Formulation Audit',
        platform: 'youtube',
        priceMin: 90000,
        priceMax: 120000,
        turnaroundDays: 10,
        typicalRevisions: 2,
        negotiable: true,
        description: 'Comprehensive testing on model skin types with UV camera demonstrations and dermatological guidelines.',
        benchmarkMin: 85000,
        benchmarkMax: 140000,
        benchmarkStatus: 'within_market'
      }
    ],
    portfolio: [
      {
        id: 'port_4_1',
        brandName: 'Minimalist (Be Minimalist)',
        campaignName: 'Niacinamide + Salicylic Acid Launch',
        category: 'Beauty',
        platforms: ['instagram', 'youtube'],
        contentFormat: 'Clinical Breakdown Reel + YouTube Feature',
        campaignObjective: 'Brand Authority & Trial',
        creatorRole: 'Doctor Consultant',
        contentUrl: 'https://beminimalist.co',
        publishedDate: '2026-02-18',
        reach: 1450000,
        views: 890000,
        engagementRate: 7.2,
        leads: 9200,
        conversions: 3800,
        roi: '5.8x ROAS',
        creatorCommentary: 'Explained 10% vs 5% concentration thresholds. The scientific transparency sold out their batch in 48 hours.',
        verifiedByBrand: true
      }
    ],
    reviews: [
      {
        id: 'rev_4_1',
        brandName: 'Minimalist',
        brandContact: 'Co-Founder',
        rating: 5,
        date: '2026-03-05',
        campaignName: 'Formulation Campaign',
        comment: 'Dr. Ananya has unparalleled credibility. Her audience trusts her recommendations implicitly.',
        verifiedClient: true
      }
    ],
    stats: {
      totalFollowers: 830000,
      avgEngagementRate: 6.0,
      avgMonthlyReach: 1650000,
      completedCampaigns: 29,
      brandsWorkedWith: 15,
      repeatClientRate: 80,
      onTimeDeliveryRate: 100
    },
    contactSettings: {
      visibility: 'request_only',
      publicEmail: 'press@drananyaray.com'
    }
  },
  {
    id: 'c5',
    name: 'Kabir Varma',
    handle: '@kabirfintech',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    creatorType: 'Creator + Freelancer',
    location: { city: 'Gurugram', state: 'Haryana', country: 'India' },
    languages: ['English', 'Hindi'],
    categories: ['Finance', 'Business', 'Education'],
    niches: ['Personal Finance', 'Tax Optimization', 'Mutual Funds', 'Credit Cards & Points', 'Startup Equity'],
    bio: 'Chartered Accountant (CA) & Angel Investor. Teaching 800k+ millennials how to build resilient wealth without day trading scams.',
    freelanceServices: ['Content Strategy', 'Financial Copywriting', 'Script Writing'],
    availabilityStatus: 'Available Now',
    responseTime: '< 3 hours',
    profileCompletion: 95,
    identityVerified: true,
    professionalVerified: true,
    platforms: [
      {
        id: 'p5_yt',
        platform: 'youtube',
        username: 'KabirVarmaFinance',
        profileUrl: 'https://youtube.com',
        accountType: 'Partner',
        followers: 480000,
        subscribers: 480000,
        engagementRate: 6.8,
        avgViews: 120000,
        avgReach: 210000,
        contentCount: 340,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-05T13:00:00Z',
        syncFreshness: 'updated_hours_ago',
        topContentFormat: 'Spreadsheet Walkthroughs & Deep Dives'
      },
      {
        id: 'p5_ig',
        platform: 'instagram',
        username: 'kabir_finance_tips',
        profileUrl: 'https://instagram.com',
        accountType: 'Creator',
        followers: 350000,
        engagementRate: 5.5,
        avgViews: 98000,
        avgReach: 175000,
        contentCount: 480,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-05T11:45:00Z',
        syncFreshness: 'updated_hours_ago',
        topContentFormat: 'Tax Hack Carousels & Reels'
      },
      {
        id: 'p5_li',
        platform: 'linkedin',
        username: 'kabir-varma-ca',
        profileUrl: 'https://linkedin.com',
        accountType: 'Creator',
        followers: 120000,
        engagementRate: 4.9,
        avgViews: 45000,
        avgReach: 70000,
        contentCount: 380,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-04T15:00:00Z',
        syncFreshness: 'updated_today',
        topContentFormat: 'Wealth Framework Articles'
      }
    ],
    aiScore: {
      overall: 94,
      audienceQuality: 97,
      engagementQuality: 93,
      contentQuality: 95,
      reliability: 94,
      brandFit: 92,
      commercialValue: 96,
      summary: 'Top finance educator in India with strict SEBI compliance adherence and prime salaried professional audience.',
      reasons: [
        'Audience contains high concentration of software engineers and corporate executives',
        'Strong conversion benchmarks for Demat accounts, credit products, and wealth tech',
        'Mandatory clear disclaimers included in every financial integration'
      ]
    },
    audience: {
      primaryGender: 'Male (71%)',
      genderDistribution: [
        { label: 'Male', percentage: 71 },
        { label: 'Female', percentage: 28 },
        { label: 'Other', percentage: 1 }
      ],
      ageDistribution: [
        { label: '18-24', percentage: 19 },
        { label: '25-34', percentage: 61 },
        { label: '35-44', percentage: 16 },
        { label: '45+', percentage: 4 }
      ],
      topCountries: [
        { country: 'India', percentage: 88 },
        { country: 'UAE', percentage: 5 },
        { country: 'Singapore', percentage: 4 }
      ],
      topCities: [
        { city: 'Delhi NCR', percentage: 30 },
        { city: 'Bengaluru', percentage: 26 },
        { city: 'Mumbai', percentage: 20 },
        { city: 'Pune', percentage: 12 }
      ],
      languages: ['English', 'Hindi'],
      topInterests: ['Index Funds', 'Tax Planning', 'Credit Cards & Air Miles', 'Real Estate', 'Angel Investing'],
      audienceQualityScore: 97,
      suspiciousFollowerPercent: 1.0,
      growth30d: 5.1
    },
    pricing: [
      {
        id: 'pr_5_1',
        deliverableName: 'YouTube 90-sec Mid-Roll Integration (SEBI Compliant)',
        platform: 'youtube',
        priceMin: 45000,
        priceMax: 60000,
        turnaroundDays: 5,
        typicalRevisions: 2,
        negotiable: false,
        description: 'Contextual integration inside high-interest tax or investment strategy video with custom tracking link.',
        benchmarkMin: 40000,
        benchmarkMax: 65000,
        benchmarkStatus: 'within_market'
      },
      {
        id: 'pr_5_2',
        deliverableName: 'YouTube Dedicated Deep Dive Case Study',
        platform: 'youtube',
        priceMin: 85000,
        priceMax: 110000,
        turnaroundDays: 8,
        typicalRevisions: 2,
        negotiable: true,
        description: 'Comprehensive 15-minute analysis of financial app or platform features with clear risk disclosure.',
        benchmarkMin: 80000,
        benchmarkMax: 130000,
        benchmarkStatus: 'within_market'
      }
    ],
    portfolio: [
      {
        id: 'port_5_1',
        brandName: 'CRED',
        campaignName: 'CRED Garage Launch',
        category: 'Finance',
        platforms: ['youtube', 'instagram'],
        contentFormat: 'Automobile Expense Breakdown Video',
        campaignObjective: 'App Installs & Vehicle Registration',
        creatorRole: 'Creator & Financial Analyst',
        contentUrl: 'https://cred.club',
        publishedDate: '2026-03-24',
        reach: 650000,
        views: 380000,
        engagementRate: 6.4,
        leads: 7800,
        conversions: 2900,
        roi: '4.9x ROAS',
        creatorCommentary: 'Demonstrated real savings on FASTag recharges and maintenance tracking on camera.',
        verifiedByBrand: true
      }
    ],
    reviews: [
      {
        id: 'rev_5_1',
        brandName: 'CRED',
        brandContact: 'VP Brand & Alliances',
        rating: 5,
        date: '2026-04-10',
        campaignName: 'CRED Garage',
        comment: 'Kabir exceeded our CPA targets by 35%. Exceptional financial communication and regulatory discipline.',
        verifiedClient: true
      }
    ],
    stats: {
      totalFollowers: 950000,
      avgEngagementRate: 5.7,
      avgMonthlyReach: 1450000,
      completedCampaigns: 41,
      brandsWorkedWith: 26,
      repeatClientRate: 78,
      onTimeDeliveryRate: 98
    },
    contactSettings: {
      visibility: 'email_verified_brands',
      publicEmail: 'partners@kabirvarma.in'
    }
  },
  {
    id: 'c6',
    name: 'Tara Sengupta',
    handle: '@tarastravels',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    creatorType: 'Content Creator',
    location: { city: 'Panaji', state: 'Goa', country: 'India' },
    languages: ['English', 'Hindi', 'French'],
    categories: ['Travel', 'Photography', 'Luxury'],
    niches: ['Offbeat Destinations', 'Boutique Stays', 'Slow Travel', 'Cinematic Drone Filmmaking'],
    bio: 'National Geographic contributor & Sony Alpha Ambassador. Exploring untouched corners of Asia and eco-luxury hospitality.',
    availabilityStatus: 'Available Now',
    responseTime: '< 5 hours',
    profileCompletion: 92,
    identityVerified: true,
    professionalVerified: true,
    platforms: [
      {
        id: 'p6_ig',
        platform: 'instagram',
        username: 'tara_wanders',
        profileUrl: 'https://instagram.com',
        accountType: 'Creator',
        followers: 380000,
        engagementRate: 7.4,
        avgViews: 130000,
        avgReach: 260000,
        contentCount: 710,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-05T08:30:00Z',
        syncFreshness: 'updated_today',
        topContentFormat: 'Cinematic Reel Itineraries'
      },
      {
        id: 'p6_yt',
        platform: 'youtube',
        username: 'TaraSenguptaFilms',
        profileUrl: 'https://youtube.com',
        accountType: 'Partner',
        followers: 175000,
        subscribers: 175000,
        engagementRate: 8.1,
        avgViews: 88000,
        avgReach: 140000,
        contentCount: 110,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-03T16:00:00Z',
        syncFreshness: 'stale',
        topContentFormat: '4K Cinematic Travelogues'
      }
    ],
    aiScore: {
      overall: 89,
      audienceQuality: 92,
      engagementQuality: 95,
      contentQuality: 98,
      reliability: 88,
      brandFit: 90,
      commercialValue: 86,
      summary: 'World-class visual aesthetics with high engagement in premium travel, luxury hotels, and camera gear.',
      reasons: [
        'Top 0.5% aesthetic color grading & 4K cinematic sound design',
        'High percentage of affluent travelers with disposable income',
        'Proven track record with luxury hotel chains and tourism boards'
      ]
    },
    audience: {
      primaryGender: 'Female (55%)',
      genderDistribution: [
        { label: 'Female', percentage: 55 },
        { label: 'Male', percentage: 44 },
        { label: 'Other', percentage: 1 }
      ],
      ageDistribution: [
        { label: '18-24', percentage: 20 },
        { label: '25-34', percentage: 62 },
        { label: '35-44', percentage: 14 },
        { label: '45+', percentage: 4 }
      ],
      topCountries: [
        { country: 'India', percentage: 65 },
        { country: 'United Kingdom', percentage: 12 },
        { country: 'United States', percentage: 10 },
        { country: 'Australia', percentage: 6 }
      ],
      topCities: [
        { city: 'Mumbai', percentage: 28 },
        { city: 'Delhi NCR', percentage: 22 },
        { city: 'Bengaluru', percentage: 18 },
        { city: 'Goa', percentage: 10 }
      ],
      languages: ['English'],
      topInterests: ['Luxury Stays', 'Boutique Resorts', 'Photography Gear', 'Eco-Tourism', 'Aviation'],
      audienceQualityScore: 92,
      suspiciousFollowerPercent: 1.4,
      growth30d: 3.9
    },
    pricing: [
      {
        id: 'pr_6_1',
        deliverableName: 'Boutique Stay Cinematic Experience Reel (60s 4K)',
        platform: 'instagram',
        priceMin: 35000,
        priceMax: 50000,
        turnaroundDays: 6,
        typicalRevisions: 2,
        negotiable: true,
        description: 'Drone footage, soundscapes, property walkthrough and booking link in bio.',
        benchmarkMin: 30000,
        benchmarkMax: 55000,
        benchmarkStatus: 'within_market'
      },
      {
        id: 'pr_6_2',
        deliverableName: 'Full YouTube Property Documentary (8-10 mins)',
        platform: 'youtube',
        priceMin: 70000,
        priceMax: 95000,
        turnaroundDays: 10,
        typicalRevisions: 2,
        negotiable: true,
        description: 'Comprehensive travel diary showcasing local culinary culture, excursions, and resort amenities.',
        benchmarkMin: 65000,
        benchmarkMax: 105000,
        benchmarkStatus: 'within_market'
      }
    ],
    portfolio: [
      {
        id: 'port_6_1',
        brandName: 'Taj Hotels (IHCL)',
        campaignName: 'Wilderness Safaris Madhya Pradesh',
        category: 'Travel',
        platforms: ['instagram', 'youtube'],
        contentFormat: '3-Part Cinematic Series',
        campaignObjective: 'Direct Villa Bookings',
        creatorRole: 'Filmmaker & Host',
        contentUrl: 'https://tajhotels.com',
        publishedDate: '2026-02-05',
        reach: 920000,
        views: 610000,
        engagementRate: 8.4,
        leads: 3200,
        conversions: 180,
        roi: '6.5x ROAS',
        creatorCommentary: 'Focused on dawn safaris and conservation biology. Resulted in sold-out lodge weekends for two consecutive months.',
        verifiedByBrand: true
      }
    ],
    reviews: [
      {
        id: 'rev_6_1',
        brandName: 'Taj Hotels',
        brandContact: 'GM Brand Communications',
        rating: 5,
        date: '2026-03-01',
        campaignName: 'Wilderness Safaris',
        comment: 'Tara brought our property to life with exquisite visual mastery. Guests still mention her film at check-in.',
        verifiedClient: true
      }
    ],
    stats: {
      totalFollowers: 555000,
      avgEngagementRate: 7.7,
      avgMonthlyReach: 890000,
      completedCampaigns: 22,
      brandsWorkedWith: 14,
      repeatClientRate: 70,
      onTimeDeliveryRate: 95
    },
    contactSettings: {
      visibility: 'marketplace_only',
      publicEmail: 'tara@filmsengupta.com'
    }
  },
  {
    id: 'c7',
    name: 'Devika Pillai',
    handle: '@devikastyle',
    avatar: 'https://images.unsplash.com/photo-1534751516642-a171ed27c41e?auto=format&fit=crop&w=300&q=80',
    creatorType: 'Influencer',
    location: { city: 'Chennai', state: 'Tamil Nadu', country: 'India' },
    languages: ['English', 'Tamil', 'Hindi'],
    categories: ['Fashion', 'Lifestyle', 'Luxury'],
    niches: ['Sustainable Handlooms', 'Indo-Western Fusion', 'Festive Styling', 'Jewelry Curation'],
    bio: 'Fashion designer turned digital stylist. Championing traditional Indian weaves for contemporary metropolitan wardrobes.',
    availabilityStatus: 'Available Now',
    responseTime: '< 3 hours',
    profileCompletion: 94,
    identityVerified: true,
    professionalVerified: true,
    platforms: [
      {
        id: 'p7_ig',
        platform: 'instagram',
        username: 'devika.pillai.style',
        profileUrl: 'https://instagram.com',
        accountType: 'Creator',
        followers: 290000,
        engagementRate: 6.9,
        avgViews: 85000,
        avgReach: 170000,
        contentCount: 520,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-05T14:10:00Z',
        syncFreshness: 'updated_hours_ago',
        topContentFormat: 'Outfit Transformation Reels'
      }
    ],
    aiScore: {
      overall: 90,
      audienceQuality: 93,
      engagementQuality: 91,
      contentQuality: 92,
      reliability: 91,
      brandFit: 89,
      commercialValue: 88,
      summary: 'High trust fashion authority in South India with proven ethnic and luxury apparel conversion velocity.',
      reasons: [
        '88% female audience in Tier 1 and Tier 2 cities',
        'Exceptional save-to-like ratio (1:4) on styling tutorials',
        'Strong relationships with handloom cooperatives and designer labels'
      ]
    },
    audience: {
      primaryGender: 'Female (88%)',
      genderDistribution: [
        { label: 'Female', percentage: 88 },
        { label: 'Male', percentage: 12 }
      ],
      ageDistribution: [
        { label: '18-24', percentage: 26 },
        { label: '25-34', percentage: 55 },
        { label: '35-44', percentage: 15 },
        { label: '45+', percentage: 4 }
      ],
      topCountries: [
        { country: 'India', percentage: 84 },
        { country: 'Singapore', percentage: 6 },
        { country: 'Malaysia', percentage: 5 }
      ],
      topCities: [
        { city: 'Chennai', percentage: 38 },
        { city: 'Bengaluru', percentage: 22 },
        { city: 'Hyderabad', percentage: 16 },
        { city: 'Coimbatore', percentage: 8 }
      ],
      languages: ['English', 'Tamil'],
      topInterests: ['Ethnic Wear', 'Silk Sarees', 'Fine Jewelry', 'Slow Fashion', 'Bridal Couture'],
      audienceQualityScore: 93,
      suspiciousFollowerPercent: 1.3,
      growth30d: 4.5
    },
    pricing: [
      {
        id: 'pr_7_1',
        deliverableName: 'Instagram Styling Reel (1 Saree, 3 Occasions)',
        platform: 'instagram',
        priceMin: 28000,
        priceMax: 38000,
        turnaroundDays: 4,
        typicalRevisions: 1,
        negotiable: true,
        description: 'High-detail textile draping and jewelry pairing with product tags and affiliate code.',
        benchmarkMin: 25000,
        benchmarkMax: 42000,
        benchmarkStatus: 'within_market'
      }
    ],
    portfolio: [
      {
        id: 'port_7_1',
        brandName: 'Fabindia',
        campaignName: 'Diwali Festive Collection 2025',
        category: 'Fashion',
        platforms: ['instagram'],
        contentFormat: '2x Reels + Story Takeover',
        campaignObjective: 'In-Store & Online Footfall',
        creatorRole: 'Stylist & Model',
        contentUrl: 'https://fabindia.com',
        publishedDate: '2025-10-25',
        reach: 480000,
        views: 290000,
        engagementRate: 7.4,
        leads: 3800,
        conversions: 940,
        roi: '4.7x ROAS',
        creatorCommentary: 'Styled hand-block printed dupattas with contemporary trousers. Generated widespread viral saves.',
        verifiedByBrand: true
      }
    ],
    reviews: [
      {
        id: 'rev_7_1',
        brandName: 'Fabindia',
        brandContact: 'Marketing Head - South',
        rating: 5,
        date: '2025-11-15',
        campaignName: 'Diwali Festive Collection',
        comment: 'Devika’s styling is authentic and graceful. We saw an immediate surge in product code redemptions across Chennai stores.',
        verifiedClient: true
      }
    ],
    stats: {
      totalFollowers: 290000,
      avgEngagementRate: 6.9,
      avgMonthlyReach: 480000,
      completedCampaigns: 26,
      brandsWorkedWith: 17,
      repeatClientRate: 75,
      onTimeDeliveryRate: 100
    },
    contactSettings: {
      visibility: 'marketplace_only',
      publicEmail: 'collabs@devikapillai.in'
    }
  },
  {
    id: 'c8',
    name: 'Vikram Joshi',
    handle: '@vikrammotion',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    creatorType: 'Freelancer',
    location: { city: 'Pune', state: 'Maharashtra', country: 'India' },
    languages: ['English', 'Hindi', 'Marathi'],
    categories: ['Motion Graphics', 'Graphic Design', 'B2B'],
    niches: ['SaaS Explainer Videos', 'Lottie Product Animations', 'Interactive UI Motion', 'Brand Identity'],
    bio: 'Lead Motion Designer. Built animated product walkthroughs for 15+ Y Combinator and Sequoia-funded startups. Motion that explains without jargon.',
    freelanceServices: ['Motion Graphics', 'Graphic Design', 'Animation', 'Thumbnail Design', 'Content Strategy'],
    availabilityStatus: 'Available Now',
    responseTime: '< 2 hours',
    profileCompletion: 96,
    identityVerified: true,
    professionalVerified: true,
    platforms: [
      {
        id: 'p8_li',
        platform: 'linkedin',
        username: 'vikram-joshi-motion',
        profileUrl: 'https://linkedin.com',
        accountType: 'Creator',
        followers: 54000,
        engagementRate: 5.2,
        avgViews: 24000,
        avgReach: 38000,
        contentCount: 180,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-05T10:00:00Z',
        syncFreshness: 'updated_hours_ago',
        topContentFormat: 'Motion Breakdown Videos'
      },
      {
        id: 'p8_x',
        platform: 'twitter',
        username: 'vikram_keyframes',
        profileUrl: 'https://x.com',
        accountType: 'Creator',
        followers: 32000,
        engagementRate: 6.1,
        avgViews: 19000,
        avgReach: 27000,
        contentCount: 420,
        verifiedOnPlatform: false,
        syncStatus: 'connected',
        lastSynced: '2026-09-04T22:00:00Z',
        syncFreshness: 'updated_today',
        topContentFormat: 'UI Micro-Interaction Loops'
      }
    ],
    aiScore: {
      overall: 92,
      audienceQuality: 94,
      engagementQuality: 90,
      contentQuality: 97,
      reliability: 96,
      brandFit: 93,
      commercialValue: 92,
      summary: 'Specialized SaaS animator capable of translating abstract backend tech into visually captivating 60s demo videos.',
      reasons: [
        'Consistently accelerates SaaS landing page demo conversion rates',
        'Works with Figma, After Effects, Cinema 4D, and Rive/Lottie',
        '100% on-time milestone delivery across enterprise accounts'
      ]
    },
    audience: {
      primaryGender: 'Male (65%)',
      genderDistribution: [
        { label: 'Male', percentage: 65 },
        { label: 'Female', percentage: 35 }
      ],
      ageDistribution: [
        { label: '25-34', percentage: 68 },
        { label: '35-44', percentage: 22 },
        { label: '18-24', percentage: 10 }
      ],
      topCountries: [
        { country: 'United States', percentage: 42 },
        { country: 'India', percentage: 36 },
        { country: 'Germany', percentage: 8 }
      ],
      topCities: [
        { city: 'San Francisco', percentage: 24 },
        { city: 'Bengaluru', percentage: 20 },
        { city: 'Pune', percentage: 14 }
      ],
      languages: ['English'],
      topInterests: ['SaaS Growth', 'UI/UX Design', 'Motion Design', 'Tech Startups'],
      audienceQualityScore: 94,
      suspiciousFollowerPercent: 0.8,
      growth30d: 3.8
    },
    pricing: [
      {
        id: 'pr_8_1',
        deliverableName: '60-Sec High-Conversion 2D/3D SaaS Explainer',
        platform: 'linkedin',
        priceMin: 65000,
        priceMax: 90000,
        turnaroundDays: 8,
        typicalRevisions: 3,
        negotiable: true,
        description: 'Complete script breakdown, custom vector illustrations, professional US/UK voiceover, sound mix.',
        benchmarkMin: 60000,
        benchmarkMax: 110000,
        benchmarkStatus: 'within_market'
      },
      {
        id: 'pr_8_2',
        deliverableName: 'Set of 5 Interactive Rive / Lottie Web UI Animations',
        platform: 'linkedin',
        priceMin: 35000,
        priceMax: 48000,
        turnaroundDays: 5,
        typicalRevisions: 2,
        negotiable: false,
        description: 'Ultra-lightweight JSON animations for landing page hero sections and product features.',
        benchmarkMin: 30000,
        benchmarkMax: 55000,
        benchmarkStatus: 'within_market'
      }
    ],
    portfolio: [
      {
        id: 'port_8_1',
        brandName: 'Razorpay',
        campaignName: 'Turbo UPI 2026 Product Video',
        category: 'Fintech',
        platforms: ['linkedin', 'twitter'],
        contentFormat: '3D Vector Motion Explainer',
        campaignObjective: 'Merchant Integration Sign-ups',
        creatorRole: 'Lead Animator',
        contentUrl: 'https://razorpay.com',
        publishedDate: '2026-04-14',
        reach: 340000,
        views: 180000,
        engagementRate: 6.8,
        leads: 2400,
        conversions: 620,
        roi: '5.2x ROAS',
        creatorCommentary: 'Simplified complex payment gateway latency architecture into dynamic fluid shapes. 35% increase in docs downloads.',
        verifiedByBrand: true
      }
    ],
    reviews: [
      {
        id: 'rev_8_1',
        brandName: 'Razorpay',
        brandContact: 'VP Product Design',
        rating: 5,
        date: '2026-05-01',
        campaignName: 'Turbo UPI',
        comment: 'Vikram is the best motion designer we have contracted. He turns abstract fintech flows into visual poetry.',
        verifiedClient: true
      }
    ],
    stats: {
      totalFollowers: 86000,
      avgEngagementRate: 5.6,
      avgMonthlyReach: 140000,
      completedCampaigns: 38,
      brandsWorkedWith: 28,
      repeatClientRate: 84,
      onTimeDeliveryRate: 100
    },
    contactSettings: {
      visibility: 'email_verified_brands',
      publicEmail: 'vikram@framestudios.design'
    }
  },
  {
    id: 'c9',
    name: 'Neha & Arjun (The Foodie Nomads)',
    handle: '@thefoodienomads',
    avatar: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=300&q=80',
    creatorType: 'Creator + Freelancer',
    location: { city: 'Hyderabad', state: 'Telangana', country: 'India' },
    languages: ['English', 'Hindi', 'Telugu'],
    categories: ['Food', 'Travel', 'Lifestyle'],
    niches: ['Heritage Biryanis', 'Hidden Street Stalls', 'Fine Dining Critiques', 'Regional Indian Flavors'],
    bio: 'Couple food chroniclers exploring culinary legends across the Deccan and beyond. 100% unbiased tastings, no paid fake 5-star reviews.',
    availabilityStatus: 'Available Now',
    responseTime: '< 3 hours',
    profileCompletion: 97,
    identityVerified: true,
    professionalVerified: true,
    platforms: [
      {
        id: 'p9_ig',
        platform: 'instagram',
        username: 'foodienomads_hyd',
        profileUrl: 'https://instagram.com',
        accountType: 'Creator',
        followers: 410000,
        engagementRate: 8.2,
        avgViews: 160000,
        avgReach: 320000,
        contentCount: 760,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-05T17:00:00Z',
        syncFreshness: 'updated_hours_ago',
        topContentFormat: 'Sizzling Food Reels & Chef Stories'
      },
      {
        id: 'p9_yt',
        platform: 'youtube',
        username: 'TheFoodieNomadsIndia',
        profileUrl: 'https://youtube.com',
        accountType: 'Partner',
        followers: 240000,
        subscribers: 240000,
        engagementRate: 7.5,
        avgViews: 95000,
        avgReach: 180000,
        contentCount: 190,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-05T12:00:00Z',
        syncFreshness: 'updated_hours_ago',
        topContentFormat: 'Long-form Food Crawl Documentaries'
      }
    ],
    aiScore: {
      overall: 93,
      audienceQuality: 95,
      engagementQuality: 96,
      contentQuality: 94,
      reliability: 93,
      brandFit: 91,
      commercialValue: 92,
      summary: 'Immense local culinary influence with verified footfall generation for restaurants and FMCG food launches.',
      reasons: [
        'Top 1% viral reel velocity in South Indian gastronomy',
        'Direct footfall multiplier demonstrated across 20+ partnered outlets',
        'Transparent ethical guidelines that build sustained audience loyalty'
      ]
    },
    audience: {
      primaryGender: 'Balanced (52% Male / 48% Female)',
      genderDistribution: [
        { label: 'Male', percentage: 52 },
        { label: 'Female', percentage: 48 }
      ],
      ageDistribution: [
        { label: '18-24', percentage: 32 },
        { label: '25-34', percentage: 52 },
        { label: '35-44', percentage: 12 },
        { label: '45+', percentage: 4 }
      ],
      topCountries: [
        { country: 'India', percentage: 89 },
        { country: 'UAE', percentage: 6 },
        { country: 'United States', percentage: 3 }
      ],
      topCities: [
        { city: 'Hyderabad', percentage: 46 },
        { city: 'Bengaluru', percentage: 22 },
        { city: 'Chennai', percentage: 14 },
        { city: 'Mumbai', percentage: 10 }
      ],
      languages: ['English', 'Hindi', 'Telugu'],
      topInterests: ['Street Food', 'Regional Cuisines', 'Cafes & Bars', 'FMCG Condiments', 'Kitchen Appliances'],
      audienceQualityScore: 95,
      suspiciousFollowerPercent: 1.2,
      growth30d: 7.1
    },
    pricing: [
      {
        id: 'pr_9_1',
        deliverableName: 'Instagram Dedicated Tasting & Kitchen Tour Reel',
        platform: 'instagram',
        priceMin: 35000,
        priceMax: 48000,
        turnaroundDays: 4,
        typicalRevisions: 1,
        negotiable: true,
        description: 'Authentic kitchen visit, aroma and taste commentary, location tag, and highlight pin for 3 months.',
        benchmarkMin: 32000,
        benchmarkMax: 52000,
        benchmarkStatus: 'within_market'
      },
      {
        id: 'pr_9_2',
        deliverableName: 'FMCG Packaged Food Recipe Integration Reel',
        platform: 'instagram',
        priceMin: 42000,
        priceMax: 55000,
        turnaroundDays: 5,
        typicalRevisions: 2,
        negotiable: false,
        description: 'Original quick 15-minute regional recipe using your sauce/spice mix with grocery link.',
        benchmarkMin: 38000,
        benchmarkMax: 60000,
        benchmarkStatus: 'within_market'
      }
    ],
    portfolio: [
      {
        id: 'port_9_1',
        brandName: 'Swiggy Gourmet',
        campaignName: 'Hyderabad Biryani Festival 2026',
        category: 'Food',
        platforms: ['instagram'],
        contentFormat: 'Reel Series + Exclusive Coupon',
        campaignObjective: 'Food Delivery Orders',
        creatorRole: 'Hosts & Tasters',
        contentUrl: 'https://swiggy.com',
        publishedDate: '2026-03-20',
        reach: 820000,
        views: 520000,
        engagementRate: 9.1,
        leads: 11400,
        conversions: 4200,
        roi: '5.8x ROAS',
        creatorCommentary: 'Showcased hidden 70-year-old pot biryani kitchens orderable on Swiggy. Reached #1 trending food reel in Telangana.',
        verifiedByBrand: true
      }
    ],
    reviews: [
      {
        id: 'rev_9_1',
        brandName: 'Swiggy',
        brandContact: 'Regional Brand Marketing Lead',
        rating: 5,
        date: '2026-04-05',
        campaignName: 'Biryani Festival',
        comment: 'The Foodie Nomads generated an immediate 40% surge in biryani order volume on our platform. True regional tastemakers.',
        verifiedClient: true
      }
    ],
    stats: {
      totalFollowers: 650000,
      avgEngagementRate: 7.9,
      avgMonthlyReach: 1100000,
      completedCampaigns: 42,
      brandsWorkedWith: 29,
      repeatClientRate: 82,
      onTimeDeliveryRate: 98
    },
    contactSettings: {
      visibility: 'marketplace_only',
      publicEmail: 'hello@foodienomads.in'
    }
  },
  {
    id: 'c10',
    name: 'Siddharth Nair',
    handle: '@siddharthgaming',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    creatorType: 'Influencer',
    location: { city: 'Kochi', state: 'Kerala', country: 'India' },
    languages: ['English', 'Malayalam', 'Hindi'],
    categories: ['Gaming', 'Technology', 'Entertainment'],
    niches: ['BGMI Esports', 'PC Custom Builds', 'Stream Highlights', 'Gaming Peripherals'],
    bio: 'Professional esports caster & twitch partner. Hosting nightly tournaments for 400k+ competitive gaming enthusiasts.',
    availabilityStatus: 'Available Now',
    responseTime: '< 2 hours',
    profileCompletion: 93,
    identityVerified: true,
    professionalVerified: true,
    platforms: [
      {
        id: 'p10_yt',
        platform: 'youtube',
        username: 'SiddharthLive',
        profileUrl: 'https://youtube.com',
        accountType: 'Partner',
        followers: 430000,
        subscribers: 430000,
        engagementRate: 8.8,
        avgViews: 140000,
        avgReach: 240000,
        contentCount: 890,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-05T16:45:00Z',
        syncFreshness: 'updated_hours_ago',
        topContentFormat: 'Live Streams & Tournament Recaps'
      },
      {
        id: 'p10_tw',
        platform: 'twitch',
        username: 'siddharth_plays',
        profileUrl: 'https://twitch.tv',
        accountType: 'Partner',
        followers: 85000,
        engagementRate: 9.4,
        avgViews: 22000,
        avgReach: 35000,
        contentCount: 450,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-05T14:00:00Z',
        syncFreshness: 'updated_hours_ago',
        topContentFormat: 'Live Interactive Gameplay'
      }
    ],
    aiScore: {
      overall: 91,
      audienceQuality: 92,
      engagementQuality: 96,
      contentQuality: 90,
      reliability: 92,
      brandFit: 88,
      commercialValue: 90,
      summary: 'High-intensity Gen Z gaming audience with record live stream chat engagement and energy drink/hardware conversions.',
      reasons: [
        'Average concurrent stream viewers above 8,500 on weekend live matches',
        'Young, tech-forward demographic investing heavily in monitors, mice, and processors',
        'Active community Discord server with 45k verified members'
      ]
    },
    audience: {
      primaryGender: 'Male (86%)',
      genderDistribution: [
        { label: 'Male', percentage: 86 },
        { label: 'Female', percentage: 14 }
      ],
      ageDistribution: [
        { label: '18-24', percentage: 65 },
        { label: '25-34', percentage: 28 },
        { label: '35+', percentage: 7 }
      ],
      topCountries: [
        { country: 'India', percentage: 88 },
        { country: 'Nepal', percentage: 5 },
        { country: 'Bangladesh', percentage: 4 }
      ],
      topCities: [
        { city: 'Kochi', percentage: 28 },
        { city: 'Bengaluru', percentage: 24 },
        { city: 'Chennai', percentage: 18 },
        { city: 'Mumbai', percentage: 14 }
      ],
      languages: ['English', 'Malayalam', 'Hindi'],
      topInterests: ['Esports', 'PC Gaming', 'Energy Drinks', 'Anime', 'Sneakers'],
      audienceQualityScore: 92,
      suspiciousFollowerPercent: 1.5,
      growth30d: 6.2
    },
    pricing: [
      {
        id: 'pr_10_1',
        deliverableName: 'Live Stream 2-Hour Sponsor Overlay + Shoutouts',
        platform: 'youtube',
        priceMin: 25000,
        priceMax: 35000,
        turnaroundDays: 2,
        typicalRevisions: 1,
        negotiable: false,
        description: 'Persistent logo banner on screen, 4 dedicated spoken recommendations, pinned chat discount code.',
        benchmarkMin: 22000,
        benchmarkMax: 38000,
        benchmarkStatus: 'within_market'
      },
      {
        id: 'pr_10_2',
        deliverableName: 'Gaming Hardware Unboxing & Benchmark Video (10 mins)',
        platform: 'youtube',
        priceMin: 55000,
        priceMax: 70000,
        turnaroundDays: 6,
        typicalRevisions: 2,
        negotiable: true,
        description: 'Real-world FPS testing, thermals, latency analysis, and setup integration.',
        benchmarkMin: 50000,
        benchmarkMax: 80000,
        benchmarkStatus: 'within_market'
      }
    ],
    portfolio: [
      {
        id: 'port_10_1',
        brandName: 'ASUS ROG India',
        campaignName: 'Zephyrus G16 Esports Challenge',
        category: 'Technology',
        platforms: ['youtube', 'twitch'],
        contentFormat: 'Custom Tournament Stream + Review',
        campaignObjective: 'High-End Gaming Laptop Sales',
        creatorRole: 'Host & Tournament Caster',
        contentUrl: 'https://rog.asus.com',
        publishedDate: '2026-03-05',
        reach: 580000,
        views: 310000,
        engagementRate: 9.6,
        leads: 4800,
        conversions: 320,
        roi: '5.6x ROAS',
        creatorCommentary: 'Ran a 16-team community invitational live on the laptop. Proved zero thermal throttling during 6-hour broadcast.',
        verifiedByBrand: true
      }
    ],
    reviews: [
      {
        id: 'rev_10_1',
        brandName: 'ASUS ROG',
        brandContact: 'Esports Marketing Lead',
        rating: 5,
        date: '2026-03-25',
        campaignName: 'Zephyrus G16',
        comment: 'Siddharth has an electric connection with Indian gamers. Every unit assigned to his code sold out.',
        verifiedClient: true
      }
    ],
    stats: {
      totalFollowers: 515000,
      avgEngagementRate: 8.9,
      avgMonthlyReach: 920000,
      completedCampaigns: 34,
      brandsWorkedWith: 20,
      repeatClientRate: 72,
      onTimeDeliveryRate: 97
    },
    contactSettings: {
      visibility: 'email_verified_brands',
      publicEmail: 'sidgaming@nexusmanagement.in'
    }
  },
  {
    id: 'c11',
    name: 'Pooja Bhattacharya',
    handle: '@poojacopy',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=300&q=80',
    creatorType: 'Freelancer',
    location: { city: 'Kolkata', state: 'West Bengal', country: 'India' },
    languages: ['English', 'Bengali', 'Hindi'],
    categories: ['Copywriting', 'Script Writing', 'Content Strategy'],
    niches: ['B2B Sales Funnels', 'Email Sequences', 'High-Converting Ad Scripts', 'Brand Positioning'],
    bio: 'Direct-response copywriter & messaging strategist. Crafted viral scripts for ₹40M+ DTC launches and B2B SaaS demo flows.',
    freelanceServices: ['Copywriting', 'Script Writing', 'Content Strategy', 'Social Media Management'],
    availabilityStatus: 'Available Now',
    responseTime: '< 1 hour',
    profileCompletion: 98,
    identityVerified: true,
    professionalVerified: true,
    platforms: [
      {
        id: 'p11_li',
        platform: 'linkedin',
        username: 'pooja-copy-strategist',
        profileUrl: 'https://linkedin.com',
        accountType: 'Creator',
        followers: 48000,
        engagementRate: 5.8,
        avgViews: 21000,
        avgReach: 32000,
        contentCount: 390,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-05T11:20:00Z',
        syncFreshness: 'updated_hours_ago',
        topContentFormat: 'Hook Teardowns & Before/Afters'
      },
      {
        id: 'p11_x',
        platform: 'twitter',
        username: 'poojawritesads',
        profileUrl: 'https://x.com',
        accountType: 'Creator',
        followers: 29000,
        engagementRate: 6.4,
        avgViews: 16000,
        avgReach: 24000,
        contentCount: 650,
        verifiedOnPlatform: false,
        syncStatus: 'connected',
        lastSynced: '2026-09-04T19:00:00Z',
        syncFreshness: 'updated_today',
        topContentFormat: 'Copywriting Framework Threads'
      }
    ],
    aiScore: {
      overall: 92,
      audienceQuality: 93,
      engagementQuality: 91,
      contentQuality: 96,
      reliability: 98,
      brandFit: 94,
      commercialValue: 95,
      summary: 'Specialist in conversion copywriting with quantified uplift across client landing pages and ad scripts.',
      reasons: [
        'Average 42% lift in CTR on client paid social ads',
        'Rapid 24-48h turnaround on performance marketing scripts',
        'Deep mastery of psychological purchase triggers and hook architectures'
      ]
    },
    audience: {
      primaryGender: 'Balanced (50% Female / 50% Male)',
      genderDistribution: [
        { label: 'Female', percentage: 50 },
        { label: 'Male', percentage: 50 }
      ],
      ageDistribution: [
        { label: '25-34', percentage: 64 },
        { label: '18-24', percentage: 18 },
        { label: '35-44', percentage: 15 },
        { label: '45+', percentage: 3 }
      ],
      topCountries: [
        { country: 'India', percentage: 58 },
        { country: 'United States', percentage: 24 },
        { country: 'United Kingdom', percentage: 12 }
      ],
      topCities: [
        { city: 'Kolkata', percentage: 24 },
        { city: 'Bengaluru', percentage: 22 },
        { city: 'Mumbai', percentage: 18 }
      ],
      languages: ['English'],
      topInterests: ['Marketing Psychology', 'E-commerce Conversion', 'SaaS Onboarding', 'Direct Response Copy'],
      audienceQualityScore: 94,
      suspiciousFollowerPercent: 0.7,
      growth30d: 4.1
    },
    pricing: [
      {
        id: 'pr_11_1',
        deliverableName: 'Pack of 5 Direct-Response Video Ad Scripts (Meta/TikTok)',
        platform: 'linkedin',
        priceMin: 25000,
        priceMax: 35000,
        turnaroundDays: 3,
        typicalRevisions: 2,
        negotiable: false,
        description: 'Complete with visual cues, on-screen text, audio hooks, and psychological angles.',
        benchmarkMin: 22000,
        benchmarkMax: 40000,
        benchmarkStatus: 'within_market'
      },
      {
        id: 'pr_11_2',
        deliverableName: 'High-Converting SaaS Landing Page Copy Teardown & Rewrite',
        platform: 'linkedin',
        priceMin: 40000,
        priceMax: 55000,
        turnaroundDays: 5,
        typicalRevisions: 3,
        negotiable: true,
        description: 'Hero messaging, feature benefit translations, social proof placement, and CTA optimization.',
        benchmarkMin: 35000,
        benchmarkMax: 65000,
        benchmarkStatus: 'within_market'
      }
    ],
    portfolio: [
      {
        id: 'port_11_1',
        brandName: 'Mamaearth',
        campaignName: 'Onion Hair Oil Digital Script Campaign',
        category: 'Beauty',
        platforms: ['linkedin'],
        contentFormat: 'Ad Script Suite',
        campaignObjective: 'Meta Ad ROAS Uplift',
        creatorRole: 'Lead Copywriter',
        contentUrl: 'https://mamaearth.in',
        publishedDate: '2026-02-10',
        reach: 2200000,
        views: 1400000,
        engagementRate: 5.4,
        leads: 28000,
        conversions: 8400,
        roi: '6.2x ROAS',
        creatorCommentary: 'Authored relatable kitchen problem-solving hook. Replaced generic claims with vivid relatable metaphors.',
        verifiedByBrand: true
      }
    ],
    reviews: [
      {
        id: 'rev_11_1',
        brandName: 'Mamaearth',
        brandContact: 'Performance Creative Lead',
        rating: 5,
        date: '2026-03-01',
        campaignName: 'Onion Hair Oil',
        comment: 'Pooja’s scripts cut our customer acquisition cost by 28% in 3 weeks. Phenomenal talent.',
        verifiedClient: true
      }
    ],
    stats: {
      totalFollowers: 77000,
      avgEngagementRate: 6.0,
      avgMonthlyReach: 160000,
      completedCampaigns: 54,
      brandsWorkedWith: 38,
      repeatClientRate: 88,
      onTimeDeliveryRate: 100
    },
    contactSettings: {
      visibility: 'marketplace_only',
      publicEmail: 'pooja@conversionwords.co'
    }
  },
  {
    id: 'c12',
    name: 'Ishaan Kulkarni',
    handle: '@ishaanaudio',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    creatorType: 'Freelancer',
    location: { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
    languages: ['English', 'Hindi'],
    categories: ['Voiceover', 'Music', 'Entertainment'],
    niches: ['Commercial Voiceover', 'Podcast Production', 'Sonic Branding', 'Audio Mastering'],
    bio: 'Award-winning commercial voice artist & sound designer. Voice for Netflix India promos, Spotify audio ads, and Tata Motors documentaries.',
    freelanceServices: ['Voiceover', 'Creative Direction'],
    availabilityStatus: 'Available Now',
    responseTime: '< 1 hour',
    profileCompletion: 95,
    identityVerified: true,
    professionalVerified: true,
    platforms: [
      {
        id: 'p12_ig',
        platform: 'instagram',
        username: 'ishaan_voice_magic',
        profileUrl: 'https://instagram.com',
        accountType: 'Creator',
        followers: 68000,
        engagementRate: 7.2,
        avgViews: 42000,
        avgReach: 75000,
        contentCount: 310,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-05T13:30:00Z',
        syncFreshness: 'updated_hours_ago',
        topContentFormat: 'Voice Reel Impersonations'
      }
    ],
    aiScore: {
      overall: 90,
      audienceQuality: 89,
      engagementQuality: 92,
      contentQuality: 96,
      reliability: 98,
      brandFit: 92,
      commercialValue: 90,
      summary: 'Commercial voice powerhouse with top-tier broadcast equipment (Neumann U87, acoustically treated studio).',
      reasons: [
        'Broadcast-quality audio mastered to streaming standards (-14 LUFS)',
        '24-hour delivery guarantee for urgent brand campaigns',
        'Versatile vocal range: Corporate Authority, Warm Narrative, Youthful High-Energy'
      ]
    },
    audience: {
      primaryGender: 'Male (58%)',
      genderDistribution: [
        { label: 'Male', percentage: 58 },
        { label: 'Female', percentage: 42 }
      ],
      ageDistribution: [
        { label: '18-24', percentage: 24 },
        { label: '25-34', percentage: 58 },
        { label: '35+', percentage: 18 }
      ],
      topCountries: [
        { country: 'India', percentage: 76 },
        { country: 'United States', percentage: 14 },
        { country: 'UAE', percentage: 6 }
      ],
      topCities: [
        { city: 'Mumbai', percentage: 42 },
        { city: 'Delhi NCR', percentage: 24 },
        { city: 'Bengaluru', percentage: 14 }
      ],
      languages: ['English', 'Hindi'],
      topInterests: ['Audiobooks', 'Podcasting', 'Cinema', 'Advertising Production'],
      audienceQualityScore: 91,
      suspiciousFollowerPercent: 0.9,
      growth30d: 3.4
    },
    pricing: [
      {
        id: 'pr_12_1',
        deliverableName: '30-Sec Commercial Radio / Digital Audio Voiceover',
        platform: 'instagram',
        priceMin: 15000,
        priceMax: 22000,
        turnaroundDays: 1,
        typicalRevisions: 2,
        negotiable: false,
        description: 'Includes 3 tonal takes, broadcast mastering, and commercial web buyout license.',
        benchmarkMin: 14000,
        benchmarkMax: 25000,
        benchmarkStatus: 'within_market'
      },
      {
        id: 'pr_12_2',
        deliverableName: 'Long-Form Corporate Documentary Narration (up to 5 mins)',
        platform: 'instagram',
        priceMin: 32000,
        priceMax: 45000,
        turnaroundDays: 2,
        typicalRevisions: 2,
        negotiable: true,
        description: 'Rich warm narrative storytelling with timed sync to draft video cut.',
        benchmarkMin: 28000,
        benchmarkMax: 50000,
        benchmarkStatus: 'within_market'
      }
    ],
    portfolio: [
      {
        id: 'port_12_1',
        brandName: 'Tata Motors',
        campaignName: 'Nexon EV Green Horizon 2026',
        category: 'Automotive',
        platforms: ['instagram'],
        contentFormat: 'Commercial Voice Track',
        campaignObjective: 'Brand Awareness & Pride',
        creatorRole: 'Lead Narrator',
        contentUrl: 'https://tatamotors.com',
        publishedDate: '2026-01-22',
        reach: 4200000,
        views: 2800000,
        engagementRate: 6.8,
        creatorCommentary: 'Voiced the flagship 90s TV and OTT spot across India.',
        verifiedByBrand: true
      }
    ],
    reviews: [
      {
        id: 'rev_12_1',
        brandName: 'Ogilvy India',
        brandContact: 'Executive Creative Director',
        rating: 5,
        date: '2026-02-10',
        campaignName: 'Tata Motors Nexon',
        comment: 'Ishaan delivered final broadcast wavs in 6 hours. Flawless tone and diction.',
        verifiedClient: true
      }
    ],
    stats: {
      totalFollowers: 68000,
      avgEngagementRate: 7.2,
      avgMonthlyReach: 120000,
      completedCampaigns: 62,
      brandsWorkedWith: 44,
      repeatClientRate: 89,
      onTimeDeliveryRate: 100
    },
    contactSettings: {
      visibility: 'marketplace_only',
      publicEmail: 'voice@ishaankulkarni.in'
    }
  },
  {
    id: 'c13',
    name: 'Zoya Khan',
    handle: '@zoyacooks',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    creatorType: 'Content Creator',
    location: { city: 'Lucknow', state: 'Uttar Pradesh', country: 'India' },
    languages: ['English', 'Hindi', 'Urdu'],
    categories: ['Food', 'Lifestyle', 'Parenting'],
    niches: ['Awadhi Royal Recipes', 'One-Pot Dinners', 'Baking for Beginners', 'Festive Feasts'],
    bio: 'Culinary author & Lucknow culinary historian. Reviving forgotten royal court recipes for modern kitchens with 60-second video steps.',
    availabilityStatus: 'Available Now',
    responseTime: '< 4 hours',
    profileCompletion: 95,
    identityVerified: true,
    professionalVerified: true,
    platforms: [
      {
        id: 'p13_yt',
        platform: 'youtube',
        username: 'ZoyasRoyalKitchen',
        profileUrl: 'https://youtube.com',
        accountType: 'Partner',
        followers: 620000,
        subscribers: 620000,
        engagementRate: 7.8,
        avgViews: 190000,
        avgReach: 340000,
        contentCount: 480,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-05T15:30:00Z',
        syncFreshness: 'updated_hours_ago',
        topContentFormat: 'Step-by-Step Royal Recipe Guides'
      },
      {
        id: 'p13_ig',
        platform: 'instagram',
        username: 'zoya_khan_cooks',
        profileUrl: 'https://instagram.com',
        accountType: 'Creator',
        followers: 380000,
        engagementRate: 6.4,
        avgViews: 110000,
        avgReach: 220000,
        contentCount: 620,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-05T10:15:00Z',
        syncFreshness: 'updated_hours_ago',
        topContentFormat: 'Quick Savory Reels'
      }
    ],
    aiScore: {
      overall: 94,
      audienceQuality: 96,
      engagementQuality: 95,
      contentQuality: 94,
      reliability: 95,
      brandFit: 93,
      commercialValue: 94,
      summary: 'Beloved household cooking personality with unmatched engagement among family decision-makers and kitchen shoppers.',
      reasons: [
        'Huge reach across Tier 1, 2, and 3 northern Indian cities',
        'Proven recipe remake participation from 12,000+ home cooks weekly',
        'High conversion rates for cooktops, air fryers, spices, and ghee'
      ]
    },
    audience: {
      primaryGender: 'Female (78%)',
      genderDistribution: [
        { label: 'Female', percentage: 78 },
        { label: 'Male', percentage: 22 }
      ],
      ageDistribution: [
        { label: '25-34', percentage: 48 },
        { label: '35-44', percentage: 32 },
        { label: '18-24', percentage: 14 },
        { label: '45+', percentage: 6 }
      ],
      topCountries: [
        { country: 'India', percentage: 84 },
        { country: 'Pakistan', percentage: 6 },
        { country: 'UAE', percentage: 5 }
      ],
      topCities: [
        { city: 'Lucknow', percentage: 28 },
        { city: 'Delhi NCR', percentage: 24 },
        { city: 'Kanpur', percentage: 14 },
        { city: 'Mumbai', percentage: 12 }
      ],
      languages: ['Hindi', 'Urdu', 'English'],
      topInterests: ['Home Cooking', 'Cookware', 'Spices & Condiments', 'Festive Hosting', 'Kitchen Renovation'],
      audienceQualityScore: 96,
      suspiciousFollowerPercent: 1.1,
      growth30d: 5.4
    },
    pricing: [
      {
        id: 'pr_13_1',
        deliverableName: 'YouTube 12-Min Dedicated Royal Recipe Episode',
        platform: 'youtube',
        priceMin: 70000,
        priceMax: 90000,
        turnaroundDays: 7,
        typicalRevisions: 2,
        negotiable: true,
        description: 'Complete recipe featuring your ingredient/appliance as the hero tool with affiliate tracking.',
        benchmarkMin: 65000,
        benchmarkMax: 105000,
        benchmarkStatus: 'within_market'
      },
      {
        id: 'pr_13_2',
        deliverableName: 'Instagram 60s Reel Recipe + Carousel Card',
        platform: 'instagram',
        priceMin: 38000,
        priceMax: 50000,
        turnaroundDays: 4,
        typicalRevisions: 1,
        negotiable: false,
        description: 'Sizzling preparation video with recipe card in carousel slide 2 and link sticker in story.',
        benchmarkMin: 35000,
        benchmarkMax: 55000,
        benchmarkStatus: 'within_market'
      }
    ],
    portfolio: [
      {
        id: 'port_13_1',
        brandName: 'Prestige Cookware',
        campaignName: 'Svachh Air Fryer Festival 2026',
        category: 'Home',
        platforms: ['youtube', 'instagram'],
        contentFormat: '3-Part Awadhi Kebab Series',
        campaignObjective: 'Product E-Commerce Conversions',
        creatorRole: 'Culinary Director & Host',
        contentUrl: 'https://prestige.in',
        publishedDate: '2026-02-14',
        reach: 1250000,
        views: 740000,
        engagementRate: 8.6,
        leads: 9400,
        conversions: 2400,
        roi: '5.9x ROAS',
        creatorCommentary: 'Cooked Galouti Kebabs with 80% less ghee using the air fryer. The authentic texture convinced traditional cooks.',
        verifiedByBrand: true
      }
    ],
    reviews: [
      {
        id: 'rev_13_1',
        brandName: 'TTK Prestige',
        brandContact: 'CMO',
        rating: 5,
        date: '2026-03-05',
        campaignName: 'Svachh Air Fryer',
        comment: 'Zoya’s credibility with traditional Indian homemakers is unmatched. Our Amazon inventory was depleted in a week.',
        verifiedClient: true
      }
    ],
    stats: {
      totalFollowers: 1000000,
      avgEngagementRate: 7.1,
      avgMonthlyReach: 1800000,
      completedCampaigns: 46,
      brandsWorkedWith: 28,
      repeatClientRate: 85,
      onTimeDeliveryRate: 100
    },
    contactSettings: {
      visibility: 'email_verified_brands',
      publicEmail: 'management@zoyacooks.com'
    }
  },
  {
    id: 'c14',
    name: 'Karan Malhotra',
    handle: '@karanauto',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    creatorType: 'Content Creator',
    location: { city: 'New Delhi', state: 'Delhi NCR', country: 'India' },
    languages: ['English', 'Hindi', 'Punjabi'],
    categories: ['Automotive', 'Technology', 'Lifestyle'],
    niches: ['Electric Vehicles', 'High-Speed Track Testing', 'SUV Comparisons', 'Automotive Engineering'],
    bio: 'Automotive journalist & former formula racer. Giving unfiltered, data-grounded vehicle tests for Indian road conditions.',
    availabilityStatus: 'Available Now',
    responseTime: '< 3 hours',
    profileCompletion: 96,
    identityVerified: true,
    professionalVerified: true,
    platforms: [
      {
        id: 'p14_yt',
        platform: 'youtube',
        username: 'KaranMalhotraWheels',
        profileUrl: 'https://youtube.com',
        accountType: 'Partner',
        followers: 780000,
        subscribers: 780000,
        engagementRate: 7.4,
        avgViews: 280000,
        avgReach: 490000,
        contentCount: 520,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-05T14:40:00Z',
        syncFreshness: 'updated_hours_ago',
        topContentFormat: 'In-Depth Highway & Dyno Tests'
      }
    ],
    aiScore: {
      overall: 95,
      audienceQuality: 97,
      engagementQuality: 95,
      contentQuality: 96,
      reliability: 94,
      brandFit: 93,
      commercialValue: 97,
      summary: 'The premier vehicle tester in Northern India with verified high-ticket purchasing intent among car buyers.',
      reasons: [
        'Over 70% of viewers are active car owners or planning a purchase in next 6 months',
        'Unmatched testing rigor: GPS telemetrics, real range tests, safety breakdown',
        'High brand safety compliance and clear editorial independence'
      ]
    },
    audience: {
      primaryGender: 'Male (89%)',
      genderDistribution: [
        { label: 'Male', percentage: 89 },
        { label: 'Female', percentage: 11 }
      ],
      ageDistribution: [
        { label: '25-34', percentage: 56 },
        { label: '35-44', percentage: 26 },
        { label: '18-24', percentage: 14 },
        { label: '45+', percentage: 4 }
      ],
      topCountries: [
        { country: 'India', percentage: 91 },
        { country: 'UAE', percentage: 4 }
      ],
      topCities: [
        { city: 'Delhi NCR', percentage: 38 },
        { city: 'Chandigarh', percentage: 18 },
        { city: 'Mumbai', percentage: 16 },
        { city: 'Bengaluru', percentage: 12 }
      ],
      languages: ['Hindi', 'English'],
      topInterests: ['Automobiles', 'EV Charging', 'Dashcams & Accessories', 'Tyre Tech', 'Auto Insurance'],
      audienceQualityScore: 97,
      suspiciousFollowerPercent: 1.0,
      growth30d: 4.9
    },
    pricing: [
      {
        id: 'pr_14_1',
        deliverableName: 'YouTube Comprehensive Track & Real-World Highway Test (15 mins)',
        platform: 'youtube',
        priceMin: 120000,
        priceMax: 160000,
        turnaroundDays: 10,
        typicalRevisions: 2,
        negotiable: true,
        description: '0-100 acceleration, thermal endurance, suspension test over potholes, and interior tech audit.',
        benchmarkMin: 110000,
        benchmarkMax: 180000,
        benchmarkStatus: 'within_market'
      }
    ],
    portfolio: [
      {
        id: 'port_14_1',
        brandName: 'Ather Energy',
        campaignName: 'Ather Apex 450 Track Record 2026',
        category: 'Automotive',
        platforms: ['youtube'],
        contentFormat: 'Track Test & Dyno Video',
        campaignObjective: 'EV Scooter Test Ride Bookings',
        creatorRole: 'Chief Driver & Reviewer',
        contentUrl: 'https://atherenergy.com',
        publishedDate: '2026-01-30',
        reach: 1600000,
        views: 890000,
        engagementRate: 8.2,
        leads: 14200,
        conversions: 1850,
        roi: '7.1x ROAS',
        creatorCommentary: 'Tested true warp mode acceleration against IC engines in rainy conditions. Generated 14k verified test ride leads.',
        verifiedByBrand: true
      }
    ],
    reviews: [
      {
        id: 'rev_14_1',
        brandName: 'Ather Energy',
        brandContact: 'Head of Brand Marketing',
        rating: 5,
        date: '2026-02-28',
        campaignName: 'Ather Apex Launch',
        comment: 'Karan’s technical authority is unrivaled in India. His review single-handedly drove our biggest test ride booking day.',
        verifiedClient: true
      }
    ],
    stats: {
      totalFollowers: 780000,
      avgEngagementRate: 7.4,
      avgMonthlyReach: 1400000,
      completedCampaigns: 32,
      brandsWorkedWith: 19,
      repeatClientRate: 82,
      onTimeDeliveryRate: 100
    },
    contactSettings: {
      visibility: 'email_verified_brands',
      publicEmail: 'karan@wheelsofindia.com'
    }
  },
  {
    id: 'c15',
    name: 'Ananya & Sahil (The Travel Duo)',
    handle: '@thetravelduo',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
    creatorType: 'Creator + Freelancer',
    location: { city: 'Bengaluru', state: 'Karnataka', country: 'India' },
    languages: ['English', 'Hindi', 'Kannada'],
    categories: ['Travel', 'Lifestyle', 'Photography'],
    niches: ['Himalayan Treks', 'Weekend Roadtrips', 'Budget Backpacking', 'Camera Gear'],
    bio: 'Software engineers who quit corporate to map India’s wildest routes. Creating actionable guides for working millennials.',
    availabilityStatus: 'Available Now',
    responseTime: '< 3 hours',
    profileCompletion: 93,
    identityVerified: true,
    professionalVerified: true,
    platforms: [
      {
        id: 'p15_ig',
        platform: 'instagram',
        username: 'travelduo_india',
        profileUrl: 'https://instagram.com',
        accountType: 'Creator',
        followers: 340000,
        engagementRate: 7.1,
        avgViews: 95000,
        avgReach: 190000,
        contentCount: 540,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-05T12:30:00Z',
        syncFreshness: 'updated_hours_ago',
        topContentFormat: '3-Day Weekend Itinerary Reels'
      }
    ],
    aiScore: {
      overall: 89,
      audienceQuality: 91,
      engagementQuality: 93,
      contentQuality: 90,
      reliability: 88,
      brandFit: 89,
      commercialValue: 87,
      summary: 'High trust millennial travel creators with massive weekend booking conversion for resorts and camping gear.',
      reasons: [
        'Huge resonance with tech workers in Bengaluru, Hyderabad, and Pune looking for quick escapes',
        'Proven conversion for Decathlon, Wildcraft, and boutique Airbnb properties'
      ]
    },
    audience: {
      primaryGender: 'Balanced (53% Male / 47% Female)',
      genderDistribution: [
        { label: 'Male', percentage: 53 },
        { label: 'Female', percentage: 47 }
      ],
      ageDistribution: [
        { label: '25-34', percentage: 65 },
        { label: '18-24', percentage: 22 },
        { label: '35+', percentage: 13 }
      ],
      topCountries: [
        { country: 'India', percentage: 86 },
        { country: 'United States', percentage: 6 }
      ],
      topCities: [
        { city: 'Bengaluru', percentage: 44 },
        { city: 'Hyderabad', percentage: 20 },
        { city: 'Pune', percentage: 15 }
      ],
      languages: ['English', 'Hindi'],
      topInterests: ['Hiking & Trekking', 'Weekend Getaways', 'Backpacks', 'Camping Equipment'],
      audienceQualityScore: 91,
      suspiciousFollowerPercent: 1.3,
      growth30d: 4.7
    },
    pricing: [
      {
        id: 'pr_15_1',
        deliverableName: 'Instagram Weekend Travel Reel + Map Pin Guide',
        platform: 'instagram',
        priceMin: 30000,
        priceMax: 42000,
        turnaroundDays: 5,
        typicalRevisions: 2,
        negotiable: true,
        description: 'Complete cost breakdown, GPS coordinates, driving route recommendations.',
        benchmarkMin: 28000,
        benchmarkMax: 45000,
        benchmarkStatus: 'within_market'
      }
    ],
    portfolio: [
      {
        id: 'port_15_1',
        brandName: 'Decathlon India',
        campaignName: 'Monsoon Trekking Gear 2026',
        category: 'Travel',
        platforms: ['instagram'],
        contentFormat: 'Western Ghats Water-Resistant Test Reel',
        campaignObjective: 'Rainwear & Shoe Sales',
        creatorRole: 'Trekkers & Reviewers',
        contentUrl: 'https://decathlon.in',
        publishedDate: '2026-06-15',
        reach: 720000,
        views: 480000,
        engagementRate: 8.4,
        leads: 6200,
        conversions: 1750,
        roi: '5.1x ROAS',
        creatorCommentary: 'Tested boots under real waterfalls in Coorg. Driven by honesty rather than staged studio shots.',
        verifiedByBrand: true
      }
    ],
    reviews: [
      {
        id: 'rev_15_1',
        brandName: 'Decathlon',
        brandContact: 'Digital Marketing Lead',
        rating: 5,
        date: '2026-07-02',
        campaignName: 'Monsoon Trekking',
        comment: 'The authenticity of their field testing translated directly into sold-out trekking boot inventory across our Bengaluru stores.',
        verifiedClient: true
      }
    ],
    stats: {
      totalFollowers: 340000,
      avgEngagementRate: 7.1,
      avgMonthlyReach: 610000,
      completedCampaigns: 28,
      brandsWorkedWith: 18,
      repeatClientRate: 76,
      onTimeDeliveryRate: 96
    },
    contactSettings: {
      visibility: 'marketplace_only',
      publicEmail: 'duo@thetravelduo.in'
    }
  },
  {
    id: 'c16',
    name: 'Miraal Ahsan',
    handle: '@miraalbeauty',
    avatar: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=300&q=80',
    creatorType: 'Influencer',
    location: { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
    languages: ['English', 'Hindi'],
    categories: ['Beauty', 'Fashion', 'UGC'],
    niches: ['Brown Skin Swatches', 'Budget Makeup Dupes', 'Glass Skin Routine', 'Bridal Glam'],
    bio: 'Finding the exact shades that flatter warm South Asian undertones. 100% real skin texture on camera, no smoothing filters.',
    availabilityStatus: 'Available Now',
    responseTime: '< 2 hours',
    profileCompletion: 98,
    identityVerified: true,
    professionalVerified: true,
    platforms: [
      {
        id: 'p16_ig',
        platform: 'instagram',
        username: 'miraal.beauty.co',
        profileUrl: 'https://instagram.com',
        accountType: 'Creator',
        followers: 490000,
        engagementRate: 6.8,
        avgViews: 170000,
        avgReach: 310000,
        contentCount: 780,
        verifiedOnPlatform: true,
        syncStatus: 'connected',
        lastSynced: '2026-09-05T16:00:00Z',
        syncFreshness: 'updated_hours_ago',
        topContentFormat: 'Split Face High-End vs Dupe'
      }
    ],
    aiScore: {
      overall: 93,
      audienceQuality: 95,
      engagementQuality: 94,
      contentQuality: 95,
      reliability: 92,
      brandFit: 94,
      commercialValue: 95,
      summary: 'High-converting beauty creator focused on unfiltered pigment swatches and inclusive shade ranges for Indian skin.',
      reasons: [
        'Audience specifically buys based on shade code recommendations',
        'Strongest lipstick and foundation conversion metrics on Nykaa and Tira'
      ]
    },
    audience: {
      primaryGender: 'Female (92%)',
      genderDistribution: [
        { label: 'Female', percentage: 92 },
        { label: 'Male', percentage: 8 }
      ],
      ageDistribution: [
        { label: '18-24', percentage: 38 },
        { label: '25-34', percentage: 52 },
        { label: '35+', percentage: 10 }
      ],
      topCountries: [
        { country: 'India', percentage: 88 },
        { country: 'UAE', percentage: 6 }
      ],
      topCities: [
        { city: 'Mumbai', percentage: 36 },
        { city: 'Delhi NCR', percentage: 25 },
        { city: 'Bengaluru', percentage: 15 }
      ],
      languages: ['Hindi', 'English'],
      topInterests: ['Color Cosmetics', 'Skin Tint', 'Nykaa Beauty Sales', 'Makeup Brushes'],
      audienceQualityScore: 95,
      suspiciousFollowerPercent: 1.0,
      growth30d: 6.0
    },
    pricing: [
      {
        id: 'pr_16_1',
        deliverableName: 'Instagram Unfiltered Shade Swatch & Wear-Test Reel',
        platform: 'instagram',
        priceMin: 45000,
        priceMax: 60000,
        turnaroundDays: 4,
        typicalRevisions: 2,
        negotiable: false,
        description: '12-hour wear test under natural sunlight, sweat resistance test, and macro 4K pigment shot.',
        benchmarkMin: 40000,
        benchmarkMax: 65000,
        benchmarkStatus: 'within_market'
      }
    ],
    portfolio: [
      {
        id: 'port_16_1',
        brandName: 'Nykaa Cosmetics',
        campaignName: 'All Day Matte Foundation Launch',
        category: 'Beauty',
        platforms: ['instagram'],
        contentFormat: '10-Shade Swatch Reel + Live Demo',
        campaignObjective: 'D2C App Sales',
        creatorRole: 'Lead Brand Ambassador',
        contentUrl: 'https://nykaa.com',
        publishedDate: '2026-03-18',
        reach: 1100000,
        views: 690000,
        engagementRate: 8.5,
        leads: 12000,
        conversions: 4100,
        roi: '6.4x ROAS',
        creatorCommentary: 'Matched 5 models with medium to deep Indian undertones on camera. Smashed conversion records for the launch week.',
        verifiedByBrand: true
      }
    ],
    reviews: [
      {
        id: 'rev_16_1',
        brandName: 'Nykaa',
        brandContact: 'Head of Influencer Marketing',
        rating: 5,
        date: '2026-04-05',
        campaignName: 'All Day Matte',
        comment: 'Miraal’s dedication to showing genuine pores and natural daylight swatches made this our top converting campaign of 2026.',
        verifiedClient: true
      }
    ],
    stats: {
      totalFollowers: 490000,
      avgEngagementRate: 6.8,
      avgMonthlyReach: 980000,
      completedCampaigns: 44,
      brandsWorkedWith: 27,
      repeatClientRate: 86,
      onTimeDeliveryRate: 100
    },
    contactSettings: {
      visibility: 'email_verified_brands',
      publicEmail: 'miraal@glowagency.in'
    }
  }
];
