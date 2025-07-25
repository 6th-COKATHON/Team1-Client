import { getNagDetail } from '@apis/getNagDetailList'
import { postDislike, postLike } from '@apis/PostNagReaction'
import { ArrowBack } from '@assets/icon/ArrowBack'
import { GroupIcon } from '@assets/icon/GroupIcon'
import { ThumbDownBlack } from '@assets/icon/ThumbDownBlack'
import { ThumbDownWhite } from '@assets/icon/ThumbDownWhite'
import { ThumbUpBlack } from '@assets/icon/ThumbUpBlack'
import { ThumbUpWhite } from '@assets/icon/ThumbUpWhite'
import { FlexBox } from '@components/layouts/FlexBox'
import { NagCard } from '@components/NagCard'
import { Text } from '@components/Text'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

export const ShowNag = () => {
  const navigate = useNavigate() // ✅ 항상 무조건 호출되어야 함
  const [like, setLike] = useState(false)
  const [dislike, setDislike] = useState(false)
  const { id } = useParams<{ id: string }>()
  const nagId = Number(id)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['nagDetail', nagId],
    queryFn: () => getNagDetail(nagId),
    enabled: !!id,
  })

  if (isLoading) return <Text typo="Caption_1">불러오는 중...</Text>
  if (isError || !data?.data) return <Text typo="Caption_1">불러오기 실패</Text>
  const { text, name, imageUrl, faceImageUrl } = data.data
  console.log(id, text, name, typeof imageUrl)
  const handleLike = async () => {
    if (!like) {
      try {
        await postLike(nagId)
        setLike(true)
        setDislike(false)
      } catch (error) {
        console.error('좋아요 실패', error)
      }
    } else {
      setLike(false)
    }
  }

  const handleDislike = async () => {
    if (!dislike) {
      try {
        await postDislike(nagId)
        setDislike(true)
        setLike(false)
      } catch (error) {
        console.error('싫어요 실패', error)
      }
    } else {
      setDislike(false)
    }
  }

  return (
    <Wrapper>
      <FlexBox direction="column">
        <Container>
          <Header>
            <BackWrapper onClick={() => navigate(-1)}>
              <ArrowBack />
            </BackWrapper>
            <Writer>
              <Text children="From" typo="Caption_1" />
              <Text children={name} typo="Body_1" />
            </Writer>
          </Header>
        </Container>

        <NagCard text={text} imageUrl={imageUrl} faceImageUrl={faceImageUrl} />
      </FlexBox>
      <IconWrapper>
        <ThumbWrapper>
          <div onClick={handleLike}>
            {like ? <ThumbUpBlack /> : <ThumbUpWhite />}
          </div>
          <div onClick={handleDislike}>
            {dislike ? <ThumbDownBlack /> : <ThumbDownWhite />}
          </div>
        </ThumbWrapper>
        <GroupIcon />
      </IconWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 0px 32px;
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
const IconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px18px;
  align-items: center;
`
const ThumbWrapper = styled.div`
  display: flex;
  gap: 12px;
`
