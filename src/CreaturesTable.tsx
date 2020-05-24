import React from 'react'
import styled, { css } from 'styled-components'

import { ICreature, SortDirection, SortField } from './types'

interface IProps {
  creatures: ICreature[]
  idSortDirection: SortDirection
  nameSortDirection: SortDirection
  priceSortDirection: SortDirection
  sort: (sortField: SortField) => void
}

interface IRowsProps {
  readonly numRows: number
}

const emojiMap = {
  [SortDirection.Ascending]: '⬇️',
  [SortDirection.Descending]: '⬆️',
}

const header = css`
  cursor: pointer;
  font-weight: bold;

  &:hover {
    color: gray;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 48px 3fr 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'idHeader nameHeader priceHeader'
    'main main main';
  row-gap: 8px;
`

const IdHeader = styled.div`
  ${header}
  grid-area: idHeader;
  /* justify-self: end; */
`

const NameHeader = styled.div`
  ${header}
  grid-area: nameHeader;
  justify-self: center;
`

const PriceHeader = styled.div`
  ${header}
  grid-area: priceHeader;
  justify-self: end;
`

const Rows = styled.div<IRowsProps>`
  grid-area: main;
  display: grid;
  grid-template-columns: 48px 1fr 1fr;
  grid-template-rows: ${({ numRows }) => `repeat(${numRows}, min-content)`};
  row-gap: 8px;
  height: calc(100vh - 200px);
  overflow: auto;
`

const Row = styled.div`
  grid-column: span 3;
  display: grid;
  grid-template-columns: 48px 3fr 1fr;
`

const Id = styled.div`
  grid-column: 1 / 2;
  /* justify-self: center; */
`

const Name = styled.div`
  grid-column: 2 / 3;
  justify-self: center;
  /* text-align: center; */
`

const Price = styled.div`
  grid-column: 3 / 4;
  justify-self: end;
`

export default function CreaturesTable({
  creatures,
  idSortDirection,
  nameSortDirection,
  priceSortDirection,
  sort,
}: IProps) {
  return (
    <Grid>
      <IdHeader onClick={() => sort(SortField.Id)}>
        Id
        {idSortDirection !== SortDirection.NotApplicable && (
          <span role="img" aria-label="up">
            {emojiMap[idSortDirection]}
          </span>
        )}
      </IdHeader>
      <NameHeader onClick={() => sort(SortField.Name)}>
        Name
        {nameSortDirection !== SortDirection.NotApplicable && (
          <span role="img" aria-label="up">
            {emojiMap[nameSortDirection]}
          </span>
        )}
      </NameHeader>
      <PriceHeader onClick={() => sort(SortField.Price)}>
        Price
        {priceSortDirection !== SortDirection.NotApplicable && (
          <span role="img" aria-label="up">
            {emojiMap[priceSortDirection]}
          </span>
        )}
      </PriceHeader>
      {/* <td onClick={() => this.sort(SortField.Price)}>CJ Price</td> */}
      <Rows numRows={Object.entries(creatures).length}>
        {Object.values(creatures).map((creatureInfo) => (
          <Row key={creatureInfo.id}>
            <Id>{creatureInfo.id}</Id>
            <Name>{creatureInfo.name['name-en']}</Name>
            <Price>{creatureInfo.price}</Price>
            {/* <td>{creatureInfo['price-cj']}</td> */}
          </Row>
        ))}
      </Rows>
    </Grid>
  )
}
