import { ArrowDown } from '@assets/icon/ArrowDown'
import { SmileIcon } from '@assets/icon/SmileIcon'
import { BottomSheet } from '@components/BottomSheet'
import { SingleCategoryMap } from '@components/SingleCategoryMap'
import { Text } from '@components/Text'
import { useBottomSheet } from '@hooks/useBottomSheet'
import { theme } from '@styles/theme'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useEffect } from 'react'
import { getAllNags, Nag } from '@constants/getAllNags'
import { PinkSmall } from '@assets/image/PinkSmall'
import { RedSmall } from '@assets/image/RedSmall'
import { BlueSmall } from '@assets/image/BlueSmall'
import { GreenSmall } from './../assets/image/GreenSmall'
import { YellowSmall } from '@assets/image/YellowSmall'
import { BlackSmall } from '@assets/image/BlackSmall'
import { WhiteSmall } from '@assets/image/WhiteSmall'
export const Home = () => {
  const { isOpen, open, close, sheetRef } = useBottomSheet()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const navigate = useNavigate()
  const [nagList, setNagList] = useState<Nag[]>([])
  const smallframeList = [
    { name: 'pink', Component: PinkSmall },
    { name: 'blue', Component: BlueSmall },
    { name: 'red', Component: RedSmall },
    { name: 'green', Component: GreenSmall },
    { name: 'yellow', Component: YellowSmall },
    { name: 'black', Component: BlackSmall },
    { name: 'white', Component: WhiteSmall },
  ]

  const getFrameComponent = (imageUrl: string) => {
    const index = Number(imageUrl)
    return smallframeList[index - 1]?.Component ?? smallframeList[0].Component
  }
  useEffect(() => {
    const fetchNags = async () => {
      try {
        const data = await getAllNags()
        setNagList(data)
      } catch (error) {
        console.error('잔소리 불러오기 실패:', error)
      }
    }
    fetchNags()
  }, [])
  return (
    <Container>
      <ImgWrap>
        <ImgContainer />
      </ImgWrap>
      <Select onClick={open}>
        당신을 위한 맞춤 한마디를 찾아보세요. <ArrowDown />
      </Select>
      <CardList>
        {nagList.map((nag) => {
          const FrameComponent = getFrameComponent(nag.imageUrl)

          return (
            <Card key={nag.id} onClick={() => navigate(`/showNag/${nag.id}`)}>
              {FrameComponent && (
                <FrameWrapper>
                  <FrameComponent />
                </FrameWrapper>
              )}
              <ContentWrapper>
                <SmileIcon />
                <Text typo="Body_1" color="gray_0">
                  {nag.text}
                </Text>
              </ContentWrapper>
            </Card>
          )
        })}
      </CardList>
      {isOpen && (
        <BottomSheet isOpen={isOpen} bottomSheetRef={sheetRef}>
          <SingleCategoryMap
            selected={selectedCategory}
            onSelect={(category) => {
              setSelectedCategory(category)
              close()
              navigate(`/categoryNag?category=${encodeURIComponent(category)}`) // ✅ 추가
            }}
            onClose={close}
          />
        </BottomSheet>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
`
const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
`
const ImgContainer = styled.div`
  width: 328px;
  height: 100px;
  background-image: url('/src/assets/image/HomeLogo.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`
const Select = styled.div`
  display: flex;
  width: 100%;
  height: 48px;
  padding: 12px 12px 12px 8px;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #000;
  background: ${theme.palette.gray_0};
  cursor: pointer;
  color: ${theme.palette.gray_200};
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`

const CardList = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr); // 2개씩
  gap: 16px;
`

const FrameWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;

  svg {
    width: 100%;
    height: 100%;
  }
`

const Card = styled.div`
  height: 160px;
  flex-direction: column;
  padding: 8px 16px;
  border-radius: 10px;
  background: white;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`
const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
`
