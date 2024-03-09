import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
:root {
      --color-primary:  ${props => props.theme?.light?.primary};
      --color-secondary: ${props => props.theme?.light?.secondary};
      --color-tertiary: ${props => props.theme?.light?.tertiary};
    }
`
