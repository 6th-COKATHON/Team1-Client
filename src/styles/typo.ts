import { css } from '@emotion/react'

export const calcRem = (px: number) => `${px / 16}rem`

export const typo = {
  Body_1: css`
    font-family: 'Pretendard-Medium';
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
  `,

  Body_3: css`
    font-family: 'Pretendard-SemiBold';
    font-size: 14px;
    font-weight: 600;
    line-height: normal;
  `,

  Caption_1: css`
    font-family: 'Pretendard-Regular';
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
  `,

  H3: css`
    font-family: 'Pretendard-SemiBold';
    font-size: 20px;
    font-weight: 600;
    line-height: normal;
  `,
} as const
