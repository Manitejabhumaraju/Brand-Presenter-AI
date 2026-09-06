import { Campaign, Shortlist, SavedSearch, Conversation } from '../types';

export const mockCampaigns: Campaign[] = [
  {
    id: 'camp_1',
    title: 'Festive Season D2C Tech & Audio Blitz 2026',
    brandName: 'Boat Lifestyle',
    brandLogo: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=120&q=80',
    objective: 'High-ROAS Direct Purchase & Amazon Traffic',
    status: 'in_progress',
    totalBudget: 450000,
    spentBudget: 280000,
    startDate: '2026-08-15',
    endDate: '2026-09-30',
    targetPlatforms: ['instagram', 'youtube'],
    targetCategories: ['Technology', 'Music', 'UGC'],
    creatorIds: ['c1', 'c3', 'c10'],
    usageRights: {
      organicUsage: true,
      paidWhitelisting: true,
      durationMonths: 6,
      territory: 'India & GCC',
      exclusivityDays: 45
    },
    deliverables: [
      {
        id: 'del_1_1',
        campaignId: 'camp_1',
        title: 'High-Impact Commute ANC Reel (Hook Variation 1)',
        platform: 'instagram',
        format: 'Reel (60s 4K)',
        dueDate: '2026-09-12',
        status: 'in_review',
        creatorNotes: 'Edited with real metro commute sounds and high-contrast typography.',
        brandFeedback: 'Checking color grading with product brand team.',
        mediaUrl: 'https://boat-lifestyle.com/preview-reel-1'
      },
      {
        id: 'del_1_2',
        campaignId: 'camp_1',
        title: 'Dedicated YouTube Noise Cancellation Teardown',
        platform: 'youtube',
        format: 'Dedicated Video (10m)',
        dueDate: '2026-09-18',
        status: 'approved',
        creatorNotes: 'Decibel meter testing included to show 32dB active reduction.',
        mediaUrl: 'https://youtube.com/watch?v=mock_video'
      },
      {
        id: 'del_1_3',
        campaignId: 'camp_1',
        title: 'Gaming Latency Test Stream Integration',
        platform: 'youtube',
        format: 'Live Stream Sponsor',
        dueDate: '2026-09-22',
        status: 'draft',
        creatorNotes: 'Tournament overlay designed with custom discount code.'
      }
    ],
    results: {
      totalReach: 1450000,
      totalViews: 920000,
      totalEngagements: 78000,
      totalClicks: 24500,
      conversions: 3900,
      calculatedRoi: '4.8x ROAS'
    }
  },
  {
    id: 'camp_2',
    title: 'Clean Nutrition & CultPass Autumn Drive',
    brandName: 'Cult.fit',
    brandLogo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=120&q=80',
    objective: 'Gym Membership Trials & Fitness App Downloads',
    status: 'in_progress',
    totalBudget: 350000,
    spentBudget: 195000,
    startDate: '2026-08-01',
    endDate: '2026-09-25',
    targetPlatforms: ['instagram', 'youtube'],
    targetCategories: ['Fitness', 'Health and Wellness'],
    creatorIds: ['c2'],
    usageRights: {
      organicUsage: true,
      paidWhitelisting: true,
      durationMonths: 12,
      territory: 'Pan-India',
      exclusivityDays: 60
    },
    deliverables: [
      {
        id: 'del_2_1',
        campaignId: 'camp_2',
        title: '30-Day Strength Blueprint Reel',
        platform: 'instagram',
        format: 'Reel + 3x Stories',
        dueDate: '2026-09-10',
        status: 'published',
        creatorNotes: 'Launched with custom CultPass code PRIYAFIT.',
        mediaUrl: 'https://instagram.com/reel/priya_cult'
      },
      {
        id: 'del_2_2',
        campaignId: 'camp_2',
        title: 'Full-Length 45-Min Home Dumbbell Workout',
        platform: 'youtube',
        format: 'Full Workout Video',
        dueDate: '2026-09-20',
        status: 'pending_submission',
        creatorNotes: 'Filming in Cult studio scheduled for tomorrow.'
      }
    ],
    results: {
      totalReach: 980000,
      totalViews: 650000,
      totalEngagements: 84000,
      totalClicks: 18200,
      conversions: 2150,
      calculatedRoi: '5.2x ROAS'
    }
  },
  {
    id: 'camp_3',
    title: 'Developer Productivity & API Automation 2026',
    brandName: 'Postman',
    brandLogo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=120&q=80',
    objective: 'Enterprise Developer Workspace Signups',
    status: 'completed',
    totalBudget: 220000,
    spentBudget: 220000,
    startDate: '2026-06-01',
    endDate: '2026-07-31',
    targetPlatforms: ['youtube', 'linkedin'],
    targetCategories: ['Technology', 'SaaS', 'B2B'],
    creatorIds: ['c1'],
    usageRights: {
      organicUsage: true,
      paidWhitelisting: false,
      durationMonths: 12,
      territory: 'Global',
      exclusivityDays: 30
    },
    deliverables: [
      {
        id: 'del_3_1',
        campaignId: 'camp_3',
        title: 'API Microservices Architecture Walkthrough',
        platform: 'youtube',
        format: 'Dedicated Video',
        dueDate: '2026-07-15',
        status: 'published'
      }
    ],
    results: {
      totalReach: 245000,
      totalViews: 112000,
      totalEngagements: 14200,
      totalClicks: 8400,
      conversions: 890,
      calculatedRoi: '4.2x ROAS'
    }
  }
];

export const mockShortlists: Shortlist[] = [
  {
    id: 'sl_1',
    name: 'Q4 High-ROAS Performance Creators',
    category: 'Fitness & Health',
    targetBudget: 500000,
    creatorIds: ['c2', 'c3', 'c16'],
    notes: 'Shortlisted for direct-response paid ad creatives and reel unboxings.',
    createdAt: '2026-08-20',
    status: 'negotiating'
  },
  {
    id: 'sl_2',
    name: 'Tier-1 SaaS & Tech Leaders',
    category: 'B2B & Technology',
    targetBudget: 350000,
    creatorIds: ['c1', 'c8', 'c5'],
    notes: 'For enterprise software release campaign in October.',
    createdAt: '2026-08-28',
    status: 'contacted'
  },
  {
    id: 'sl_3',
    name: 'Festive Gastronomy & Food Tastemakers',
    category: 'Food & Lifestyle',
    targetBudget: 250000,
    creatorIds: ['c9', 'c13'],
    notes: 'Exploring regional dining campaigns in Hyderabad and Lucknow.',
    createdAt: '2026-09-01',
    status: 'researching'
  }
];

export const mockSavedSearches: SavedSearch[] = [
  {
    id: 'ss_1',
    name: 'Indian Fitness Creators under ₹50K',
    query: 'fitness female high-engagement india under 50k',
    filters: {
      categories: ['Fitness', 'Health and Wellness'],
      platforms: ['instagram', 'youtube'],
      maxBudget: 50000,
      location: 'India'
    },
    matchCount: 14,
    lastUpdated: '2026-09-05T12:00:00Z',
    notifyOnNewMatches: true
  },
  {
    id: 'ss_2',
    name: 'B2B Tech & SaaS Reviewers (>50K Views)',
    query: 'saas developer b2b tech reviews high view count',
    filters: {
      categories: ['Technology', 'SaaS', 'B2B'],
      platforms: ['youtube', 'linkedin'],
      minFollowers: 50000
    },
    matchCount: 8,
    lastUpdated: '2026-09-04T18:00:00Z',
    notifyOnNewMatches: true
  },
  {
    id: 'ss_3',
    name: 'Performance Ad UGC Video Editors',
    query: 'ugc direct response video editing after effects roas',
    filters: {
      categories: ['UGC', 'Videography', 'Creative Direction'],
      platforms: ['instagram']
    },
    matchCount: 12,
    lastUpdated: '2026-09-03T15:30:00Z',
    notifyOnNewMatches: false
  }
];

export const mockConversations: Conversation[] = [
  {
    id: 'conv_1',
    creatorId: 'c1',
    brandId: 'b_postman',
    brandName: 'Postman Growth Team',
    creatorName: 'Aarav Sharma',
    creatorHandle: '@aaravtech',
    campaignTitle: 'API Microservices Architecture Walkthrough',
    lastMessage: 'The contract terms and deliverables have been verified. Sending the final draft video for review.',
    lastTimestamp: '10 mins ago',
    unreadCount: 1,
    status: 'contracted',
    messages: [
      {
        id: 'm1',
        senderId: 'b_postman',
        senderName: 'Postman Growth Team',
        senderRole: 'brand',
        text: 'Hi Aarav, we loved your recent Kubernetes explanation carousel on LinkedIn. We are rolling out our new Postman 2026 API Workspace and would love to partner with you for a dedicated YouTube test.',
        timestamp: 'Sep 4, 10:30 AM',
        attachment: {
          type: 'brief',
          title: 'Postman API Workspace 2026 Campaign Brief',
          budget: 85000,
          deliverables: ['1x Dedicated YouTube Review (8-12m)', '1x LinkedIn Companion Post']
        }
      },
      {
        id: 'm2',
        senderId: 'c1',
        senderName: 'Aarav Sharma',
        senderRole: 'creator',
        text: 'Thanks! I use Postman daily in my test harness. Happy to do a deep-dive workflow test showing real mock services.',
        timestamp: 'Sep 4, 11:15 AM'
      },
      {
        id: 'm3',
        senderId: 'b_postman',
        senderName: 'Postman Growth Team',
        senderRole: 'brand',
        text: 'Outstanding. We have submitted the formal proposal in Brand Presenter AI workspace at ₹85,000 with 12 months organic usage rights.',
        timestamp: 'Sep 4, 02:40 PM',
        attachment: {
          type: 'proposal',
          title: 'Commercial Proposal & Milestone Schedule',
          budget: 85000,
          deliverables: ['Dedicated Video (Sep 15)', 'LinkedIn Post (Sep 18)']
        }
      },
      {
        id: 'm4',
        senderId: 'c1',
        senderName: 'Aarav Sharma',
        senderRole: 'creator',
        text: 'The contract terms and deliverables have been verified. Sending the final draft video for review.',
        timestamp: '10 mins ago'
      }
    ]
  },
  {
    id: 'conv_2',
    creatorId: 'c2',
    brandId: 'b_cult',
    brandName: 'Cult.fit Marketing',
    creatorName: 'Priya Nambiar',
    creatorHandle: '@priyafitness',
    campaignTitle: 'Clean Nutrition & CultPass Autumn Drive',
    lastMessage: 'Reel script approved! Please ensure the discount sticker links directly to the CultPass checkout.',
    lastTimestamp: '2 hours ago',
    unreadCount: 0,
    status: 'inquiry',
    messages: [
      {
        id: 'm2_1',
        senderId: 'b_cult',
        senderName: 'Cult.fit Marketing',
        senderRole: 'brand',
        text: 'Hey Priya! We want to run a 3-week blitz around your high-protein daily meal prep routines with our CultPass launch.',
        timestamp: 'Sep 3, 03:00 PM'
      },
      {
        id: 'm2_2',
        senderId: 'c2',
        senderName: 'Priya Nambiar',
        senderRole: 'creator',
        text: 'Hello team! I have a strength training challenge scheduled for mid-September that aligns naturally with CultPass.',
        timestamp: 'Sep 3, 04:20 PM'
      },
      {
        id: 'm2_3',
        senderId: 'b_cult',
        senderName: 'Cult.fit Marketing',
        senderRole: 'brand',
        text: 'Reel script approved! Please ensure the discount sticker links directly to the CultPass checkout.',
        timestamp: '2 hours ago'
      }
    ]
  },
  {
    id: 'conv_3',
    creatorId: 'c3',
    brandId: 'b_boat',
    brandName: 'Boat Lifestyle',
    creatorName: 'Rohan Mehta',
    creatorHandle: '@rohancreates',
    campaignTitle: 'Festive Season D2C Tech & Audio Blitz',
    lastMessage: 'Hook variation 2 testing with subway background has rendered cleanly. Uploading 4K ProRes files now.',
    lastTimestamp: 'Yesterday',
    unreadCount: 0,
    status: 'negotiating',
    messages: [
      {
        id: 'm3_1',
        senderId: 'b_boat',
        senderName: 'Boat Lifestyle',
        senderRole: 'brand',
        text: 'Rohan, your last ANC video delivered a 6.1x ROAS. We want 5 new performance hook iterations for our festive sale.',
        timestamp: 'Sep 2, 09:15 AM'
      },
      {
        id: 'm3_2',
        senderId: 'c3',
        senderName: 'Rohan Mehta',
        senderRole: 'creator',
        text: 'Hook variation 2 testing with subway background has rendered cleanly. Uploading 4K ProRes files now.',
        timestamp: 'Yesterday'
      }
    ]
  }
];
