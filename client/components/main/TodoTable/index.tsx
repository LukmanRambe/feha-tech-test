import { useEffect, useMemo, useState } from 'react';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';
import { SingleValue } from 'react-select';

import CreateButton from '@/components/artifacts/Buttons/CreateButton';
import DataLimit from '@/components/artifacts/DataLimit';
import Loading from '@/components/artifacts/Loading';
import { DataLimitOptions } from '@/ts/enum/DataLimitOptions';
import type { Option } from '@/ts/types/main/Option';
import type { Todos } from '@/ts/types/main/Todo';

import Todo from '../Todo';

type TodoTablePropsType = {
  tableName: string;
  data: Todos | undefined;
  setTodoId: React.Dispatch<React.SetStateAction<number | null>>;
  setModal: React.Dispatch<
    React.SetStateAction<{ type: string; isShown: boolean }>
  >;
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  setDataLimit: React.Dispatch<React.SetStateAction<number>>;
  isFetching: boolean;
  refetch: () => void;
};

const TodoTable: React.FC<TodoTablePropsType> = ({
  tableName,
  data,
  setTodoId,
  setModal,
  pageIndex,
  setPageIndex,
  setDataLimit,
  isFetching,
  refetch,
}) => {
  const itemsPerPage = useMemo(() => data?.meta.limit ?? 0, [data?.meta.limit]);
  const totalItems = useMemo(() => data?.meta.total ?? 0, [data?.meta.total]);
  const [startItem, setStartItem] = useState<number>(1);
  const [endItem, setEndItem] = useState<number>(itemsPerPage);

  const handleDataPerPage = (limit: number) => {
    setDataLimit(limit);
  };

  const handlePageClick = (page: number) => {
    setPageIndex(page + 1);
    refetch();
  };

  useEffect(() => {
    if (itemsPerPage) {
      setStartItem((pageIndex - 1) * itemsPerPage + 1);
      setEndItem(pageIndex * itemsPerPage);

      if (totalItems && itemsPerPage) {
        if (pageIndex > totalItems / itemsPerPage) {
          setPageIndex(Math.ceil(totalItems / itemsPerPage));
        }
      }
    }

    refetch();
  }, [pageIndex, itemsPerPage, totalItems]);

  return (
    <section className="border rounded-md my-5 w-full max-w-3xl overflow-hidden shadow-md h-full bg-white">
      <article className="flex justify-between items-center p-4 border-b">
        <h2 className="font-semibold text-lg leading-10">{tableName}</h2>

        {tableName !== 'Done' && <CreateButton setModal={setModal} />}
      </article>

      <article className="flex flex-col justify-center h-full min-h-[496px]">
        {isFetching ? (
          <span className="flex w-full justify-center">
            <Loading size={16} />
          </span>
        ) : totalItems === 0 ? (
          <p className="text-center font-medium text-lg tracking-wide break-words px-2">
            Congratulations! You&apos;ve done it all! 🥳
          </p>
        ) : (
          <>
            <article className="todo-table h-[424px] overflow-y-auto">
              {data?.data?.map((todo) => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  setTodoId={setTodoId}
                  setModal={setModal}
                  refetch={refetch}
                />
              ))}
            </article>

            <nav
              className="flex flex-col items-center justify-between gap-3 md:gap-8 p-4 sm:py-6 sm:gap-0 sm:flex-row h-fit border-t"
              aria-label="Table Navigation"
            >
              <article className="flex flex-col sm:flex-row w-full h-full items-center gap-3">
                <span className="text-sm font-normal text-gray-500 tracking-wide">
                  Showing{' '}
                  <span className="font-semibold text-blue-600">
                    {startItem}
                  </span>{' '}
                  to{' '}
                  <span className="font-semibold text-blue-600">
                    {endItem > totalItems ? totalItems : endItem}{' '}
                  </span>
                  of{' '}
                  <span className="font-semibold text-blue-600">
                    {totalItems} entries
                  </span>
                </span>

                <DataLimit
                  placeholder={itemsPerPage}
                  onChange={(
                    option: SingleValue<Option<DataLimitOptions>> | unknown
                  ) =>
                    option &&
                    handleDataPerPage(
                      (option as Option<DataLimitOptions>).value
                    )
                  }
                />
              </article>

              <ReactPaginate
                breakLabel="..."
                pageRangeDisplayed={1}
                marginPagesDisplayed={2}
                pageCount={Math.ceil(totalItems / itemsPerPage)}
                previousLabel={<FiChevronLeft />}
                nextLabel={<FiChevronRight />}
                onPageChange={(page) => handlePageClick(page.selected)}
                forcePage={pageIndex - 1}
                renderOnZeroPageCount={() => null}
                containerClassName="pg-container"
                previousLinkClassName="pg-prev"
                nextLinkClassName="pg-next"
                pageLinkClassName="pg-item"
                activeLinkClassName="pg-item-active"
                breakLinkClassName="pg-item"
                disabledLinkClassName="pg-item-disabled"
                breakClassName="pg-break"
              />
            </nav>
          </>
        )}
      </article>
    </section>
  );
};

export default TodoTable;
