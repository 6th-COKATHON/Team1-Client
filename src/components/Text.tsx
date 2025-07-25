import styled from '@emotion/styled'
import { TextPropsType } from '@models/Text'
import { TextType, theme } from '@styles/theme'

export const Text = ({ typo, color, children, ...props }: TextPropsType) => {
  return (
    <StyledText typoKey={typo} colorKey={color} {...props}>
      {children}
    </StyledText>
  )
}

const StyledText = styled.span<{
  typoKey: TextType['typo']
  colorKey?: TextType['color']
}>`
  white-space: pre-wrap;
  ${({ typoKey }) => theme.typo[typoKey]};
  color: ${({ colorKey }) => {
    return colorKey && theme.palette[colorKey]
  }};
`
