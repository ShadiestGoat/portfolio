export type Langs = {
    frontend: LangShares,
    backend: LangShares,
}

export type LangShares = Record<string, number>

export type Share = {
    title: string
    share: number
    bg: string,
    fg: string
}