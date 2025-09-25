interface BrandItem {
  id: string;
  image: string;
  imageAlt: string;
  bigText: string;
  smallText: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export const brandsData: BrandItem[] = [
  {
    id: "nfl",
    image: "/images/nfl-logo.png",
    imageAlt: "NFL",
    bigText: "NFL",
    smallText: "America's Game",
    description:
      "Get comprehensive NFL coverage with live games, expert analysis, fantasy insights, and exclusive behind-the-scenes content from your favorite teams and players.",
    buttonText: "Watch NFL",
    buttonLink: "https://www.nfl.com/",
  },
  {
    id: "nba",
    image: "/images/nba-logo.png",
    imageAlt: "NBA",
    bigText: "NBA",
    smallText: "Elite Basketball",
    description:
      "Experience the excitement of professional basketball with live games, player stats, trade rumors, and in-depth analysis of every play and championship run.",
    buttonText: "Watch NBA",
    buttonLink: "https://www.nba.com/",
  },
  {
    id: "mlb",
    image: "/images/mlb-logo.png",
    imageAlt: "MLB",
    bigText: "MLB",
    smallText: "America's Pastime",
    description:
      "Follow baseball with complete MLB coverage including live games, player statistics, trade deadline updates, and World Series championship analysis.",
    buttonText: "Watch MLB",
    buttonLink: "https://www.mlb.com/",
  },
  {
    id: "football",
    image: "/images/premier-league-logo.png",
    imageAlt: "Football",
    bigText: "FOOTBALL",
    smallText: "The Beautiful Game",
    description:
      "Stay connected to football with Premier League matches, Champions League action, World Cup coverage, and transfer news from Europe's top leagues.",
    buttonText: "Watch Football",
    buttonLink: "https://www.premierleague.com/",
  },
  {
    id: "mma",
    image: "/images/ufc-logo.png",
    imageAlt: "MMA",
    bigText: "MMA",
    smallText: "Ultimate Fighting",
    description:
      "Experience the intensity of mixed martial arts with UFC events, fighter profiles, training documentaries, and analysis of the biggest fights in combat sports.",
    buttonText: "Watch MMA",
    buttonLink: "https://www.ufc.com/",
  },
];
