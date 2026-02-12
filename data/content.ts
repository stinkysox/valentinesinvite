import { PhotoData } from '../types';

export const CONTENT = {
  recipientName: "James",
  introText: "A moment for us",
  musicUrl: "/Young-and-Beautiful-Lana-Del-Rey.mp3", 
  polaroids: [
    { id: 1, url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop", caption: "The beginning", rotation: -2 },
    { id: 2, url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=600&auto=format&fit=crop", caption: "Adventure time", rotation: 3 },
    { id: 3, url: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=600&auto=format&fit=crop", caption: "Us against the world", rotation: -4 },
    { id: 4, url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop", caption: "Pure Magic", rotation: 2 },
    { id: 5, url: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=600&auto=format&fit=crop", caption: "Golden Hours", rotation: -3 },
    { id: 6, url: "https://images.unsplash.com/photo-1464347601390-2ff68d836337?q=80&w=600&auto=format&fit=crop", caption: "Soulmates", rotation: 4 },
  ] as PhotoData[],
  timeline: [
    { date: "Oct 2021", title: "First Met", desc: "The day my life changed forever." },
    { date: "Dec 2021", title: "First Date", desc: "Coffee, nervous laughter, and magic." },
    { date: "Feb 2022", title: "She Said Yes", desc: "The happiest moment of my year." },
    { date: "Today", title: "Still Falling", desc: "Loving you more every single day." },
  ],
  reasons: [
    "Your laugh is my favorite sound",
    "How you make coffee in the morning",
    "Your unwavering support",
    "The way you look at me",
    "Your kindness to strangers",
    "Making me a better person",
    "Your endless patience",
    "The way you handle challenges",
    "Your contagious enthusiasm",
    "How you remember the little things"
  ],
  coupons: [
    { title: "Dinner Date", desc: "Anywhere you want to go" },
    { title: "Massage", desc: "30 minute back rub" },
    { title: "Movie Night", desc: "You pick the film & snacks" }
  ],
  loveLetter: {
    greeting: "My Dearest Love,",
    body: "There are no words to truly describe what you mean to me. You are the peace in my chaos, the sunlight in my mornings, and the home I’ve always been looking for.\n\nEvery moment with you is a treasure I hold close to my heart. Thank you for being my partner, my best friend, and my greatest love.",
    closing: "Forever yours,",
    sender: "J."
  },
  secretMessage: "I booked that restaurant you love for Saturday night. Wear that dress I love. 🌹",
  heroTitle: "Happy Valentine's Day",
  giftMessage: "You are my everything."
};