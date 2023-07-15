export type project = {
    tags:        projType[],
    langs:       language[]
    name:        string,
    description: string,
    links?:       string[],
    coolness:    number,
}

export type language = "Python" | 
                       "Go" | 
                       "TypeScript" |

                       "JavaScript" |
                       "React" |
                       "Svelte" |
                       "HTML/CSS" |

                       "PostgreSQL" |
                       "SQLite" |
                       "MongoDB"

export type projType = "Backend" | 
                       "Frontend" | 
                       "Discord Bot" |
                       "CLI/TUI" |
                       "Package"

export type tag = projType | language

export const tags:tag[][] = [
    [
        "Backend",
        "Frontend",
        "Discord Bot",
        "CLI/TUI",
        "Package",
    ],
    [
        "Python" ,
        "Go" ,
        "TypeScript",
        "JavaScript",
    ],
    [
        "React",
        "Svelte",
        "HTML/CSS",
    ],
    [
        "PostgreSQL",
        "SQLite",
        "MongoDB",
    ]
]

//  TODO: Add valentines
// TODO: Add dome bot
// TODO: Add Shady Bot
// TODO: Add links
export const projects: project[] = [
    {
        name: "UFC-4 Bot",
        description: "A Discord bot that allowed users to view upcoming events through discord. This bot was used on the official EA server until this feature was implemented into their game",
        tags: ["Discord Bot"],
        langs: ["Python"],
        coolness: 0.1,
    },
    {
        name: "Guess the Author Bot",
        description: "Discord bot that provides a game experience where users can guess the autho rof a message including features such as real time PVP duels and ranking",
        tags: ["Discord Bot"],
        langs: ["TypeScript"],
        coolness: 0.15,
        links: ["https://github.com/ShadiestGoat/guess-the-author-message"]
    },
    {
        name: "Noble Services Bot",
        description: "Discord bot that provides essential functions for a service team, such as tickets, moderation, auto roles, polls, and more",
        tags: ["Discord Bot"],
        langs: ["Python", "SQLite"],
        coolness: 0.15,
    },
    {
        name: "Instant Messaging App",
        description: "full-stack instant messaging application inspired by Discord, implemented using TypeScript, JavaScript (for the browser), React, and MongoDB. It supports a wider range of markdown and includes a custom CDN. It was primarily a learning project",
        tags: ["Backend", "Frontend"],
        langs: ["TypeScript", "JavaScript", "React", "MongoDB"],
        coolness: 0.5,
        links: ["https://github.com/ShadiestGoat/node-react-messager-app"]
    },
    {
        name: "Game REST API & Bot",
        description: "TypeScript-based project that allows new developers to integrate with an existing game system through a REST API. It serves as an example implementation of the API through a Discord bot",
        tags: ["Backend", "Discord Bot"],
        langs: ["TypeScript", "MongoDB"],
        coolness: 0.3,
        links: ["https://github.com/ShadiestGoat/Rougelike-REST-API-Closed"]
    },
    {
        name: "SET PWA",
        description: "A frontend project implemented using TypeScript and React. It digitalizes the card game SET and includes speedrun integrations like a timer with splits. It is designed for practicing the game",
        tags: ["Frontend"],
        langs: ["React", "TypeScript"],
        coolness: 0.35,
        links: ["https://github.com/ShadiestGoat/set-game-site"]
    },
    {
        name: "Space Node Bot",
        description: "A Discord bot developed for a hosting company. It allows staff to control their Pterodactyl Panel through their Discord server, offering around 65% API coverage",
        tags: ["Discord Bot"],
        langs: ["Python", "SQLite"],
        coolness: 0.25,
    },
    {
        name: "Twitter x Reddit Bot",
        description: "A Twitter and Reddit Bot combination that posts tweets made by specific creators onto a designated subreddit, with an emphasis on optimizing the process for speed",
        tags: ["Backend"],
        langs: ["JavaScript"],
        coolness: 0.2,
    },
    {
        name: "MongoSteel",
        description: "A module/package that serves as a NodeJS MongoDB ODM (Object-Document Mapper). It focuses on schema validation, lightness, and performance for developers' IDEs",
        tags: ["Package"],
        langs: ["TypeScript", "MongoDB"],
        coolness: 0.2,
        links: ["https://github.com/ShadiestGoat/mongosteel"]
    },
    {
        name: "Online Schedule",
        description: "A frontend project developed using TypeScript and React. It provides a Progressive Web App for students to easily check their next class and location using their phones",
        tags: ["Frontend"],
        langs: ["React", "TypeScript"],
        coolness: 0.35,
        links: ["https://github.com/ShadiestGoat/schedule"]
    },
    {
        name: "Azure Verification Bot",
        description: "A Discord bot that prevents spam and assigns roles by verifying users using Azure OAuth2",
        tags: ["Discord Bot", "Backend"],
        langs: ["TypeScript", "MongoDB"],
        coolness: 0.4,
    },
    {
        name: "Donation Site",
        description: "A full-stack application allowing users to donate to their favorite creators. It integrates with Discord OAuth, supports PayPal payments, and provides WS & REST API connections",
        tags: ["Backend", "Frontend"],
        langs: ["Go", "HTML/CSS", "PostgreSQL"],
        coolness: 0.6,
        links: ["https://github.com/ShadiestGoat/donations"]
    },
    {
        name: "Donation API Wrapper",
        description: "A Golang package that wraps the API of the Donation Site, enabling support for WS & REST endpoints",
        tags: ["Package"],
        langs: ["Go"],
        coolness: 0.4,
        links: ["https://github.com/ShadiestGoat/donation-api-wrapper"]
    },
    {
        name: "Donation Bot",
        description: "A Discord bot that manages roles (persistent and monthly) and relays donation messages to a creator's Discord server",
        tags: ["Discord Bot"],
        langs: ["Go"],
        coolness: 0.35,
        links: ["https://github.com/ShadiestGoat/donationBot"]
    },
    {
        name: "PronounDB Wrapper",
        description: "a Golang package that simplifies the usage of the PronounDB API and allows developers to easily use dynamic yet correct grammar",
        tags: ["Package"],
        langs: ["Go"],
        coolness: 0.3,
        links: ["https://github.com/ShadiestGoat/pronoundb"]
    },
    {
        name: "Twitch Chat Relay",
        description: "A combination of backend and frontend implementations. It relays Twitch chat, offers markdown support, includes a custom in-memory database, and integrates with PronounDB. It is implemented using Go, Svelte, and TypeScript",
        tags: ["Backend", "Frontend"],
        langs: ["Go", "Svelte", "TypeScript"],
        coolness: 0.6,
        links: ["https://github.com/ShadiestGoat/twitch-chat-frontend", "https://github.com/ShadiestGoat/twitch-chat-backend"]
    },
    {
        name: "Logger Package",
        description: "A Go package that provides a user-friendly global logging interface",
        tags: ["Package"],
        langs: ["Go"],
        coolness: 0.4,
        links: ["https://github.com/ShadiestGoat/log"]
    },
    {
        name: "Initialization & Dependency Manager",
        description: "A Go package that simplifies the initialization of sub packages in large projects, ensuring the correct order and enabling type-safe context sharing between them",
        tags: ["Package"],
        langs: ["Go"],
        coolness: 0.6,
        links: ["https://github.com/ShadiestGoat/initutils"]
    },
    {
        name: "Forum",
        description: "A fullstack forum application with real-time user suggestions for staff, moderation features, an appealing UI, and an emphasis on anonymity. Has a custom request cache management",
        tags: ["Backend", "Frontend"],
        langs: ["Go", "Svelte", "TypeScript", "PostgreSQL"],
        coolness: 0.8,
    },
    {
        name: "Discord Chat Exporter",
        description: "Allows users to fully (or partially) export their Discord chat while disguising itself as a normal user's activities. It emphasizes customization, theming and security. This project required reverse engineering the Discord API",
        coolness: 0.6,
        langs: ["Go", "HTML/CSS"],
        tags: ["CLI/TUI"],
        links: ["https://github.com/ShadiestGoat/DiscordChatExporter"]
    }
]

projects.sort(((a, b) => b.coolness - a.coolness))

/**
 * Map tag/lang: index array
 */
export const tagIndex:Record<string, number[]> = {}

projects.forEach((v, i) => {
    const tags = [...v.tags, ...v.langs]

    tags.forEach(tag => {
        if (tagIndex[tag] === undefined) {
            tagIndex[tag] = []
        }

        tagIndex[tag].push(i)
    })
})

export const icons:Record<tag, string> = {
    "Backend":     "fa-solid fa-server",
    "Frontend":    "fa-solid fa-desktop",
    "Discord Bot": "fa-brands fa-discord",
    "CLI/TUI":     "fa-solid fa-terminal",
    "Package":     "fa-solid fa-dice-d6",
    "Python":      "fa-brands fa-python",
    "Go":          "fa-brands fa-golang",
    "TypeScript":  "fa-brands fa-js",
    "JavaScript":  "fa-brands fa-js",
    "React":       "fa-brands fa-react",
    "Svelte":      "fa-solid fa-code",
    "HTML/CSS":    "fa-brands fa-html5",
    "PostgreSQL":  "fa-solid fa-database",
    "SQLite":      "fa-regular fa-file",
    "MongoDB":     "fa-solid fa-leaf",
}