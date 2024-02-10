export type CommunityTheme = {
  ui: {
    light: string
    dark: string
  }
  light: {
    primary: string
    secondary: string
    tertiary: string
  }
  dark: {
    primary: string
  }
}

export type Community = {
  id: string
  name: string
  slug: string
  theme: CommunityTheme
}
