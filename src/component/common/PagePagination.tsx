import { Card, Pagination, Text } from "@mantine/core";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/store";
import { setPagination, setCurrentPage } from "../../redux/slices/pagePaginationSlice";

export const PagePagination = (props: { dataPass: any }) => {
  const { total } = props.dataPass
  const dispatch = useDispatch()
  const pagination = useSelector((state: RootState) => state.pagePagination);
  useEffect(() => {
    dispatch(setPagination({
      totalItems: total,
      itemsPerPage: 12,
      currentPage: 1
    }));
  }, [total, dispatch])
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage({ page }));
  }
  return (
    <Card.Section className="border-t mt-5 rounded-b-xl">
      {total > 0 ? (
        <div className="flex flex-col md:flex-row justify-between items-center p-4 gap-4">
          <div className="text-center md:text-left">
            <Text size="sm" c="dimmed">
              Showing {pagination.startIndex} to {pagination.endIndex} of {pagination.totalItems} patients
            </Text>
          </div>
          <div className="flex justify-center">
            <Pagination
              value={pagination.currentPage}
              onChange={handlePageChange}
              total={pagination.totalPages}
              size="sm"
              className="flex items-center"
              styles={{
                control: {
                  '&[data-active]': {
                    backgroundColor: 'var(--mantine-color-blue-6)',
                    borderColor: 'var(--mantine-color-blue-6)',
                  },
                },
              }}
            />
          </div>
        </div>
      ) : (
        <div className="text-center p-4">
          <Text size="sm" c="dimmed">All information is up to date</Text>
        </div>
      )}
    </Card.Section>
  )
}