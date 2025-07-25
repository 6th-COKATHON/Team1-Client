import styled from 'styled-components'
import { theme } from '@styles/theme'
import { Text } from '@components/Text'
import { useAtom } from 'jotai'
import { selectedCategoryAtom } from '@constants/categroyState'
import { CloseIcon } from '@assets/icon/CloseIcon'

const categoryMap = {
  '새로운 시작': ['자취', '직장', '육아', '커리어', '연애'],
  '인간 관계': ['부모', '친구', '연인', '자식'],
  성장: ['초/중/고', '대학교', '어른', '일상'],
  마음: ['번아웃', '불안', '무기력', '게으름', '외로움'],
  '돈/소비/재테크': ['소비', '저축', '투자'],
  습관: ['수면', '운동', '미루기', '루틴'],
  기타: ['어려운 선택', '과거의 나에게', '그 외'],
} as const

export const CategoryMap = () => {
  const [selectedCategories, setSelectedCategories] =
    useAtom(selectedCategoryAtom)

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    )
  }
  console.log(selectedCategories)
  return (
    <Wrapper>
      {Object.entries(categoryMap).map(([topCategory, subCategories]) => (
        <CategoryGroup key={topCategory}>
          <Text typo="Body_3">{topCategory}</Text>
          <SubCategoryWrapper>
            {subCategories.map((sub) => (
              <SubCategoryButton
                key={sub}
                selected={selectedCategories.includes(sub)}
                onClick={() => toggleCategory(sub)}
              >
                <Text typo="Body_1" children={sub} />
              </SubCategoryButton>
            ))}
          </SubCategoryWrapper>
        </CategoryGroup>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const CategoryGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const SubCategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const SubCategoryButton = styled.button<{ selected: boolean }>`
  padding: 4px 8px;
  border-radius: 16px;
  border: 1px solid ${theme.palette.gray_700};
  background: ${({ selected }) =>
    selected ? theme.palette.gray_700 : theme.palette.gray_0};
  color: ${({ selected }) =>
    selected ? theme.palette.gray_0 : theme.palette.gray_800};
  cursor: pointer;
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`
