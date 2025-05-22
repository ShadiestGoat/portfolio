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

export type PieSlice = {
    bg: string,
    fg: string,
    name: string, 
    arc: string, 
    share: number,
    mid: number
}

export const strokeWidth = 50
export const scaleFactor = 1.18