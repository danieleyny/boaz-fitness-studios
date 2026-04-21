// Centralized Unsplash URLs. Swap photo IDs here to update imagery across the site.

const base = (id: string, w = 1920, q = 80) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&fm=webp&auto=format&fit=crop`;

export const images = {
  // Home — hero: dim, atmospheric gym interior
  homeHero: {
    src: base("1540497077202-7c8a3999166f", 2400, 80),
    alt: "Dim training floor with shafts of low light raking across stone",
  },
  // Home — Section 02 detail: a single editorial detail shot
  homeDetail: {
    src: base("1518611012118-696072aa579a", 1400, 80),
    alt: "A single dumbbell set against a dark, textured wall",
  },
  // Three pillars
  pillarTrain: {
    src: base("1534438327276-14e5300c3a48", 1600, 80),
    alt: "A trainer working one-to-one with an athlete in a dark studio",
  },
  pillarRecover: {
    src: base("1540555700478-4be289fbecef", 1600, 80),
    alt: "A quiet spa suite with timber, stone, and diffused low light",
  },
  pillarSocialize: {
    src: base("1519642918688-7e43b19245d8", 1600, 80),
    alt: "A quiet, leather-appointed members lounge with low lighting",
  },
  // Membership CTA band
  membershipBand: {
    src: base("1519643381401-22c77e60520e", 2400, 80),
    alt: "A moody marble and brass interior corridor",
  },
  // About hero — empty studio at dawn
  aboutHero: {
    src: base("1545205597-3d9d02c29597", 2400, 80),
    alt: "An empty yoga studio at dawn with soft, low light on wood floors",
  },
  // Specialists (3 portraits)
  specialists: [
    {
      src: base("1544005313-94ddf0286df2", 900, 80),
      alt: "Portrait of a specialist looking off-camera in soft shadow",
    },
    {
      src: base("1507003211169-0a1dd7228f2d", 900, 80),
      alt: "Portrait of a specialist in profile against a dark backdrop",
    },
    {
      src: base("1580489944761-15a19d654956", 900, 80),
      alt: "Portrait of a specialist seated, looking forward with quiet focus",
    },
  ],
  // Services pillar feature images
  servicesTrain: {
    src: base("1517838277536-f5f99be501cd", 2000, 80),
    alt: "A dark weight-training floor with precise, low-contrast lighting",
  },
  servicesRecover: {
    src: base("1540555700478-4be289fbecef", 2000, 80),
    alt: "A quiet spa suite with timber, stone, and diffused light",
  },
  servicesSocialize: {
    src: base("1529336953128-a85760f58cb5", 2000, 80),
    alt: "A library-style lounge with deep seating and a fireplace",
  },
  // Members portal background
  membersBackground: {
    src: base("1520250497591-112f2f40a3f4", 2400, 80),
    alt: "A luxury interior in deep night tones",
  },
};
