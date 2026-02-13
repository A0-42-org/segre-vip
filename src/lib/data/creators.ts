export interface Creator {
id: string;
name: string;
handle: string;
avatar: string;
bio: string;
category: string;
plan: 'Free' | 'Basic' | 'Premium' | 'VIP';
followers: number;
subscribers: number;
views: number;
featured: boolean;
}

export const creators: Creator[] = [
{
id: '1',
name: 'Violet Rose',
handle: '@violet_rose',
avatar: 'https://ui-avatars.com/api/?name=Violet+Rose&background=8B5CF6&color=fff&size=200',
bio: '✨ Cosplay & alternative model | New content daily 🦋',
category: 'Cosplay',
plan: 'VIP',
followers: 245000,
subscribers: 8900,
views: 1200000,
featured: true
},
{
id: '2',
name: 'Megan Fit',
handle: '@megan_fit',
avatar: 'https://ui-avatars.com/api/?name=Megan+Fit&background=10B981&color=fff&size=200',
bio: '💪 Fitness coach & nutrition | Transform your life',
category: 'Fitness',
plan: 'Premium',
followers: 180000,
subscribers: 5600,
views: 980000,
featured: true
},
{
id: '3',
name: 'Emma Lux',
handle: '@emma_lux',
avatar: 'https://ui-avatars.com/api/?name=Emma+Lux&background=EC4899&color=fff&size=200',
bio: '👗 Lingerie & fashion | Exclusive content ✨',
category: 'Lingerie',
plan: 'VIP',
followers: 320000,
subscribers: 12400,
views: 2100000,
featured: true
},
{
id: '4',
name: 'Sky Gaming',
handle: '@sky_gaming',
avatar: 'https://ui-avatars.com/api/?name=Sky+Gaming&background=6366F1&color=fff&size=200',
bio: '🎮 Pro gamer & streamer | Join the squad 🚀',
category: 'Gamer',
plan: 'Premium',
followers: 156000,
subscribers: 4300,
views: 780000,
featured: true
},
{
id: '5',
name: 'Bella Fox',
handle: '@bella_fox',
avatar: 'https://ui-avatars.com/api/?name=Bella+Fox&background=F59E0B&color=fff&size=200',
bio: '🎤 Singer & songwriter | New music every week 🎵',
category: 'Music',
plan: 'Basic',
followers: 98000,
subscribers: 2100,
views: 450000,
featured: true
},
{
id: '6',
name: 'Nova Music',
handle: '@nova_music',
avatar: 'https://ui-avatars.com/api/?name=Nova+Music&background=8B5CF6&color=fff&size=200',
bio: '🎹 Electronic music producer | Beats for sale',
category: 'Music',
plan: 'Premium',
followers: 134000,
subscribers: 3900,
views: 620000,
featured: true
},
{
id: '7',
name: 'Ava Glam',
handle: '@ava_glam',
avatar: 'https://ui-avatars.com/api/?name=Ava+Glam&background=EC4899&color=fff&size=200',
bio: '💄 Beauty influencer | Tips & tutorials 💅',
category: 'Beauty',
plan: 'VIP',
followers: 287000,
subscribers: 10200,
views: 1750000,
featured: true
},
{
id: '8',
name: 'Chloe Dance',
handle: '@chloe_dance',
avatar: 'https://ui-avatars.com/api/?name=Chloe+Dance&background=10B981&color=fff&size=200',
bio: '💃 Professional dancer | Online classes 🩰',
category: 'Dance',
plan: 'Premium',
followers: 145000,
subscribers: 4800,
views: 890000,
featured: true
}
];

export const categories = [
{ name: 'Cosplay', icon: '🎭', count: 2450 },
{ name: 'Fitness', icon: '💪', count: 1890 },
{ name: 'Lingerie', icon: '👙', count: 1200 },
{ name: 'Gamer', icon: '🎮', count: 2100 },
{ name: 'Music', icon: '🎵', count: 1650 },
{ name: 'Beauty', icon: '💄', count: 1980 },
{ name: 'Dance', icon: '💃', count: 920 },
{ name: 'Fashion', icon: '👗', count: 1750 },
{ name: 'Art', icon: '🎨', count: 1100 },
{ name: 'Photography', icon: '📸', count: 860 },
{ name: 'Food', icon: '🍕', count: 740 },
{ name: 'Travel', icon: '✈️', count: 680 },
{ name: 'Tech', icon: '💻', count: 590 },
{ name: 'Sports', icon: '⚽', count: 420 },
{ name: 'Comedy', icon: '😂', count: 350 }
];

export const stats = {
creators: 15000,
followers: 2500000,
views: 50000000
};
