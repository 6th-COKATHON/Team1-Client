import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { Text } from '@components/Text'
import { ArrowBack } from '@assets/icon/ArrowBack'
import { FilterIcon } from '@assets/icon/FilterIcon'
import { SmileIcon } from '@assets/icon/SmileIcon'
import { EmailIcon } from '@assets/icon/EmailIcon'
import { PencilIcon } from '@assets/icon/PencilIcon'
import { CloseIcon } from '@assets/icon/CloseIcon'
import { useBottomSheet } from '@hooks/useBottomSheet'
import { EmailSheet } from '@components/EmailSheet'
import { getNags } from '@apis/getNagDetailList'
import { Nag } from '@constants/getNagTypes'
import { axiosApi } from '@apis/axios'
import { PinkSmall } from '@assets/image/PinkSmall'
import { BlueSmall } from '@assets/image/BlueSmall'
import { RedSmall } from '@assets/image/RedSmall'
import { GreenSmall } from '@assets/image/GreenSmall'
import { YellowSmall } from '@assets/image/YellowSmall'
import { BlackSmall } from '@assets/image/BlackSmall'
import { WhiteSmall } from '@assets/image/WhiteSmall'

export const CategoryDetail = () => {
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState('')
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const category = searchParams.get('category') || ''
  const navigate = useNavigate()

  const [sort, setSort] = useState<'latest' | 'popular'>('popular')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const { isOpen, open, close, sheetRef } = useBottomSheet()
  const [step, setStep] = useState(1)
  const smallframeList = [
    { name: 'pink', Component: PinkSmall },
    { name: 'blue', Component: BlueSmall },
    { name: 'red', Component: RedSmall },
    { name: 'green', Component: GreenSmall },
    { name: 'yellow', Component: YellowSmall },
    { name: 'black', Component: BlackSmall },
    { name: 'white', Component: WhiteSmall },
  ]
  const toggleFilter = () => setIsFilterOpen((prev) => !prev)
  const handleFilterSelect = (filter: 'latest' | 'popular') => {
    setSort(filter)
    setIsFilterOpen(false)
  }
  const handleClose = () => {
    close()
    setStep(1)
  }

  const {
    data: nagData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['nags', category, sort],
    queryFn: () => getNags(category, sort),
    enabled: !!category,
  })

  const handleSubscribe = async () => {
    try {
      const payload = {
        email,
        sendTime: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
        category,
      }
      await axiosApi.post('/email/subscribe', payload)
      setStep(3)
      // 요청 후 BottomSheet 닫기
    } catch (error) {
      console.error('구독 요청 실패:', error)
    }
  }

  return (
    <Wrapper>
      <Container>
        <Header>
          <BackWrapper onClick={() => navigate(-1)}>
            <ArrowBack />
          </BackWrapper>
          <Writer>
            <Text
              typo="Caption_1"
              color="gray_800"
              children="누군가의 한마디"
            />
            <Text typo="Body_1" children={category} />
          </Writer>
          <FilterWrapper onClick={toggleFilter}>
            <FilterIcon />
            {isFilterOpen && (
              <FilterModal onClick={(e) => e.stopPropagation()}>
                <FilterItem onClick={() => handleFilterSelect('popular')}>
                  <Text typo="Body_1" children="인기순" />
                </FilterItem>
                <Line />
                <FilterItem onClick={() => handleFilterSelect('latest')}>
                  <Text typo="Body_1" children="최신순" />
                </FilterItem>
              </FilterModal>
            )}
          </FilterWrapper>
        </Header>
      </Container>
      {isLoading ? (
        <Text typo="Caption_1" children="불러오는 중..." />
      ) : isError ? (
        <Text typo="Caption_1" children="데이터를 불러오는 데 실패했어요." />
      ) : (
        <CardList>
          {nagData?.data.map((nag: Nag) => {
            const FrameComponent =
              smallframeList[Number(nag.imageUrl) - 1]?.Component
            return (
              <Card key={nag.id}>
                {FrameComponent && (
                  <FrameWrapper>
                    <FrameComponent />
                  </FrameWrapper>
                )}
                <IconWrap>
                  <SmileIcon />
                </IconWrap>
                <CardText>
                  <Text typo="Body_1" color="gray_0" children={nag.text} />
                </CardText>
              </Card>
            )
          })}
        </CardList>
      )}
      <FloatButton>
        <EmailButton onClick={open}>
          <EmailIcon />
        </EmailButton>
        <PencilButton onClick={() => navigate('/writeNag')}>
          <PencilIcon />
        </PencilButton>
      </FloatButton>
      <EmailSheet isOpen={isOpen} bottomSheetRef={sheetRef}>
        {step === 1 && (
          <>
            <Title>
              <Text typo="Body_1" children="매일 한마디, 받아보시겠어요?" />
              <div onClick={handleClose}>
                <CloseIcon />
              </div>
            </Title>
            <Content>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Text
                  typo="Caption_1"
                  color="gray_900"
                  children="당신의 시간에, 툭 건네는 한마디"
                />
                <Text
                  typo="Caption_1"
                  color="gray_900"
                  children="구독하면 매일 원하는 시간에 한마디가 도착해요."
                />
              </div>
              <Text
                typo="Caption_1"
                color="gray_900"
                children="툭, 당신에게 닿을 곳을 알려주세요."
              />
              <CategoryDiv>
                카테고리
                <CategoryDetailDiv>
                  <Text typo="Body_1" color="gray_0" children={category} />
                </CategoryDetailDiv>
              </CategoryDiv>
              <EmailInput
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Content>
            <NextButton onClick={() => setStep(2)}>
              <Text typo="Body_3" color="gray_0" children="다음" />
            </NextButton>
          </>
        )}

        {step === 2 && (
          <>
            <Title>
              <Text typo="Body_1" children="매일 한마디, 받아보시겠어요?" />
              <div onClick={handleClose}>
                <CloseIcon />
              </div>
            </Title>
            <Content>
              <Text
                typo="Caption_1"
                color="gray_900"
                children="툭, 한마디가 도착하길 바라는 시간을 알려주세요."
              />
              <Hour>
                <HourInput
                  placeholder="00"
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                />
                <Text typo="Body_1" color="gray_900" children=":" />
                <HourInput
                  placeholder="00"
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                />
              </Hour>
              <TextDiv>24시간 형식으로 입력해주세요.</TextDiv>
            </Content>
            <ButtonWrap>
              <BackButton onClick={() => setStep(1)}>
                <Text typo="Body_3" color="gray_0" children="이전" />
              </BackButton>
              <RegistButton onClick={handleSubscribe}>
                <Text typo="Body_3" color="gray_0" children="신청" />
              </RegistButton>
            </ButtonWrap>
          </>
        )}

        {step === 3 && (
          <>
            <Title>
              <Text typo="Body_1" children="" />
              <div onClick={handleClose}>
                <CloseIcon />
              </div>
            </Title>
            <CompleteDiv>
              <Text typo="H3" color="gray_900" children="신청 완료!" />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Text
                  typo="Body_1"
                  color="gray_900"
                  children="당신의 하루 한 구석에 툭, 말 한 마디가 자리잡았습니다."
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Text
                  typo="Body_1"
                  color="gray_900"
                  children="마음이 변해도 괜찮아요. 구독은 이메일 하단에서 언제든 끊을 수 있어요."
                />
              </div>
              <ButtonWrap>
                <RegistButton onClick={handleClose}>
                  <Text typo="Body_3" color="gray_0" children="확인" />
                </RegistButton>
              </ButtonWrap>
            </CompleteDiv>
          </>
        )}
      </EmailSheet>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 0px 16px;
`

const Container = styled.div`
  padding: 16px 0px;
`

const Header = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BackWrapper = styled.div`
  position: absolute;
  left: 16px;
`
const Writer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  width: 140px;
`
const FilterWrapper = styled.div`
  position: absolute;
  right: 16px;
`

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 2개씩
  gap: 16px;
`

const CardText = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  white-space: pre-wrap;
`

const Card = styled.div`
  position: relative;
  min-height: 160px;
  aspect-ratio: 1;
  flex-direction: column;
  padding: 8px 16px;
  border-radius: 10px;
  background: transparent;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`
const FilterModal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 88px;
  top: 36px;
  right: 0;
  border-radius: 10px;
  background: var(--Gray-0, #f5f5f5);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 8px 0;
  z-index: 10;
`

const FilterItem = styled.div`
  padding: 8px 16px;
  white-space: nowrap;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`

const Line = styled.div`
  width: 72px;
  height: 1px;
  stroke-width: 1px;
  stroke: var(--Gray-100, #d1d0ce);
`
const FloatButton = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 20;
`

const EmailButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: var(--Gray-0, #f5f5f5);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`

const PencilButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: var(--Gray-900, #130c06);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  margin-bottom: 16px;
`
const Content = styled.div`
  display: flex;
  padding: 16px 12px;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  border-radius: 10px;
  background: var(--Gray-50, #ededeb);
`
const CategoryDiv = styled.div`
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  border: 1px solid var(--Gray-800, #1e150e);
  background: var(--Gray-0, #f5f5f5);
  height: 48px;
`

const CategoryDetailDiv = styled.div`
  display: flex;
  padding: 4px 8px;
  align-items: center;
  border-radius: 16px;
  border: 1px solid var(--Gray-700, #322c24);
  background: var(--Gray-700, #322c24);
`

const EmailInput = styled.input`
  all: unset;
  display: flex;
  padding: 12px 0;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;

  &::placeholder {
    color: var(--Gray-200, #b5b3af);
  }

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;

  border-bottom: 1px solid var(--Gray-800, #1e150e);
`
const NextButton = styled.button`
  position: absolute;
  right: 16px;
  bottom: 16px;
  display: flex;
  width: 80px;
  height: 40px;
  padding: 10px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: white;
  border: none;
  border-radius: 12px;
  background: var(--Gray-800, #1e150e);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`

const HourInput = styled.input`
  all: unset;
  display: flex;
  width: 100px;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 0;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-bottom: 1px solid var(--Gray-800, #1e150e);

  &::placeholder {
    color: var(--Gray-200, #b5b3af);
  }
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`
const Hour = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`
const TextDiv = styled.div`
  color: var(--Gray-500, #464441);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 221px;
`

const ButtonWrap = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  position: absolute;
  bottom: 16px;
  right: 16px;
`
const BackButton = styled.button`
  display: flex;
  width: 80px;
  height: 40px;
  padding: 10px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background: var(--Gray-200, #b5b3af);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`

const RegistButton = styled.button`
  display: flex;
  width: 80px;
  height: 40px;
  padding: 10px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background: var(--Gray-800, #1e150e);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`

const CompleteDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`
const FrameWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`

const FrameOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  svg {
    width: 100%;
    height: 100%;
  }
`
const IconWrap = styled.div`
  z-index: 1;
`
