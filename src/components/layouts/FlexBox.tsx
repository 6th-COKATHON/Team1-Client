/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { CSSProperties } from '@emotion/serialize'
import { HTMLAttributes, ReactNode } from 'react'

export interface FlexBoxProps extends HTMLAttributes<HTMLDivElement> {
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  direction?: CSSProperties['flexDirection']
  gap?: CSSProperties['gap']
  children: ReactNode
  onClick?: () => void
  fullWidth?: boolean
}

export type flexboxPropsKey = 'align' | 'justify' | 'direction' | 'gap'
export const FlexBox = ({
  align = 'center',
  justify = 'center',
  direction = 'row',
  gap = 0,
  children,
  fullWidth,
  onClick,
  ...props
}: FlexBoxProps) => {
  return (
    <div
      onClick={onClick}
      css={css`
        display: flex;
        align-items: ${align};
        justify-content: ${justify};
        flex-direction: ${direction};
        gap: ${gap}px;
        width: ${fullWidth ? `100%` : `auto`};
      `}
      {...props}
    >
      {children}
    </div>
  )
}
