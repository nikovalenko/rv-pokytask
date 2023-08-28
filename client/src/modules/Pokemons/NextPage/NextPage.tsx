import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Button, Ellipsis } from 'components';
import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { fetchPokemons } from 'store/pokemonsSlice';

const NextPage: FC = () => {
  const dispatch = useAppDispatch();

  const { prevPage, currPage, nextPage } = useAppSelector(state => state.pageParams.pageParams);

  const handlePreviousPage = () => {
    if (prevPage) {
      dispatch(fetchPokemons(`${+currPage - 1}`));
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      dispatch(fetchPokemons(`${+currPage + 1}`));
    }
  };

  const handleFirstPage = () => {
    dispatch(fetchPokemons('1'));
  };

  const handleLastPage = () => {
    dispatch(fetchPokemons('8'));
  };

  return (
    <div className="flex justify-center">
      <div className="flex space-x-2 justify-between">
        {prevPage && (
          <>
            <Button onClick={handlePreviousPage}>
              <ChevronLeftIcon className="h-[20px] w-[20px]" />
            </Button>
            <Button onClick={handleFirstPage}>1</Button>
            <Ellipsis />
          </>
        )}
        <Button disabled>{currPage}</Button>
        {nextPage && (
          <>
            <Ellipsis />
            <Button onClick={handleLastPage}>8</Button>
            <Button onClick={handleNextPage}>
              <ChevronRightIcon className="h-[20px] w-[20px]" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default NextPage;
