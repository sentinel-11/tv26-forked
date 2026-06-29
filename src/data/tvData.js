export const EVENT_START = new Date("July 31, 2025 10:00:00").getTime();
export const EVENT_END = new Date("August 2, 2025 5:00:00").getTime();

export const getEventState = () => {
  const now = new Date().getTime();

  if (now < EVENT_START) {
    return "pre-event";
  } else if (now >= EVENT_START && now <= EVENT_END) {
    return "live-event";
  } else {
    return "post-event";
  }
};

export const eventTimeLine = [
  {
    day: 1,
    date: "2025-07-31",
    events: [
      {
        id: 1,
        title: "Guest Lecture",
        date: "2025-07-31",
        time: "10:00 AM - 12:30 PM",
        formlink: "https://forms.gle/UL8CH24sVHd8f2k86",
        description:
          "An insightful session exploring how modern technologies are transforming industries and driving innovation. Learn about the latest trends, impactful developments, and opportunities shaping the future of various sectors.",
        highlights: [
          "Industry Trends",
          "Q&A Session",
          "Networking Opportunity",
        ],
        icon: "🎙️",
        image: "/events/Technovista2025/GuestLecture/Poster.png",
        cartoon: "/events/Technovista2025/GuestLecture/Cartoon.jpg",
        priority: 6,
      },
      {
        id: 2,
        title: "Data Detective",
        date: "2025-07-31",
        time: "10:00 AM - 1:00 PM",
        formlink: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfLxT-qF8STcoPTCK_IvJV-5nNJ_IwX8lKNuA92_tJCEN_32w/viewform",
        description:
          "An investigative data analytics challenge where participants dive into messy datasets, uncover patterns, and solve hidden mysteries using logic and data skills.",
        highlights: [
          "Data Cleaning",
          "Pattern Recognition",
          "Storytelling with Data",
        ],
        icon: "🕵️‍♂️",
        image: "/events/Technovista2025/DataDetective/Poster.png",
        cartoon: "/events/Technovista2025/DataDetective/Cartoon.jpg",
        priority: 4,
        url: "/technovista/events/data-detective",
      },
      {
        id: 3,
        title: "Blogathon",
        date: "2025-07-31",
        time: "1:30 PM - 3:30 PM",
        formlink: "https://docs.google.com/forms/d/e/1FAIpQLSfUohZh_CGQtHAmlzRYnpCZ5EgUnBNsfAaJbV75vZEdIvitvw/viewform",
        description:
          "Showcase your writing skills and tech knowledge by penning powerful blogs on emerging tech topics.Share your insights and perspectives on innovations shaping tomorrow.",
        highlights: ["Creativity", "Technical Accuracy", "Publication Chance"],
        icon: "✍️",
        image: "/events/Technovista2025/Blogathon/Poster.png",
        cartoon: "/events/Technovista2025/Blogathon/Cartoon.jpg",
        priority: 7,
      },
      {
        id: 4,
        title: "ML Challenge",
        date: "2025-07-31",
        time: "1:30 PM - 3:30 PM",
        formlink: "https://forms.gle/CfJyPCcUVtHuUMbT8",
        description:
          "Gear up for a thrilling machine learning sprint! Participants will receive limited and noisy datasets, and must build, train, and optimize predictive models to climb the live leaderboard. Adaptability, speed, and model accuracy are the keys to victory.",
        highlights: ["Surprise Dataset", "Model Building", "Live Leaderboard"],
        icon: "🤖",
        image: "/events/Technovista2025/MLChallenge/Poster.png",
        cartoon: "/events/Technovista2025/MLChallenge/Cartoon.jpg",
        priority: 2,
      },
    ],
  },
  {
    day: 2,
    date: "2025-08-01",
    events: [
      {
        id: 5,
        title: "DQ Code Fest",
        date: "2025-08-01",
        time: "10:00 AM - 12:30 PM",
        formlink: "https://docs.google.com/forms/d/e/1FAIpQLSeVOdEdWNs3OkSunokTulQt0ku3KmMkotq51izizBS22uXbAQ/viewform",
        description:
          "Compete in thrilling algorithmic and logic-based coding rounds. Tackle problems that demand fast thinking, sharp logic, and clean code to climb the leaderboard, every second counts!",
        highlights: ["Timed Rounds", "Live Leaderboard", "Solo"],
        icon: "💻",
        image: "/events/Technovista2025/CodingContest/Poster.png",
        cartoon: "/events/Technovista2025/CodingContest/Cartoon.jpg",
        priority: 3,
      },
      {
        id: 6,
        title: "Debug (or) Die",
        date: "2025-08-01",
        time: "10:00 AM - 4:30 PM",
        formlink: "https://docs.google.com/forms/d/e/1FAIpQLSeHLiqUCi0CIQaGfUdryvyWvJNIk-yVxtfqSgpGsTmCZ41lBg/viewform",
        description:
          "Escape-room-style challenge where code detectives race against time to debug, decode, and escape! A thrilling test of logic, technical skills, and critical thinking.",
        highlights: [
          "Escape-Room Challenge",
          "Code & Logic Puzzles",
          "Team-Based Competition"
        ],
        icon: "🔍",
        image: "/events/Technovista2025/DebugOrDie/Poster.png",
        cartoon: "/events/Technovista2025/DebugOrDie/Cartoon.jpg",
        priority: 5,
        url: "/technovista/events/debug-or-die",
      },
      {
        id: 7,
        title: "24 - Hour Hackathon",
        date: "2025-08-01",
        time: "1:00 PM (Aug 1ˢᵗ) - 1:00 PM (Aug 2ⁿᵈ)",
        formlink: "https://docs.google.com/forms/d/e/1FAIpQLSetieR4PdZLpUl0UqUd9lE0Quypwcym4BHGkFss2exhOzgLhg/viewform",
        description:
          "Join a 24-hour coding marathon where teams innovate, prototype, and present impactful tech solutions. From late-night brainstorming to sunrise demos, build something amazing and push your creative boundaries to the limit!",
        highlights: ["Ideation Blitz", "Rapid Prototyping", "Sunrise Demos"],
        icon: "👨‍💻",
        image: "/events/Technovista2025/Hackathon/Poster.png",
        cartoon: "/events/Technovista2025/Hackathon/Cartoon.jpg",
        priority: 1,
        url: "/technovista/events/hackathon",
      },
    ],
  },
  {
    day: 3,
    date: "2025-08-02",
    events: [
      {
        id: 8,
        title: "Technical Workshop",
        date: "2025-08-02",
        time: "9:30 AM - 12:30 PM",
        formlink: "https://docs.google.com/forms/d/e/1FAIpQLSf4aYghkZ3D2cas4jH9QrOvOHQuUt5urelwOC1LaWEphtWvFQ/viewform",
        description:
          "An engaging hands-on workshop designed to equip participants with practical skills in trending technologies. Whether you're a beginner or an enthusiast, dive deep into tools, frameworks, and real-world applications through live demos and guided sessions.",
        highlights: [
          "Expert-Led Sessions",
          "Hands-On Demos",
          "Certificate of Participation",
        ],
        icon: "⚙️",
        image: "/events/Technovista2025/Workshop/Poster.png",
        cartoon: "/events/Technovista2025/Workshop/Cartoon.jpg",
        priority: 8,
      },
    ],
  },
];
