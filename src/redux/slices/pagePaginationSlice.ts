import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startIndex: number;
  endIndex: number;
}

interface PaginationUpdatePayload {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
}

interface SetPagePayload {
  page: number;
}

interface SetItemsPerPagePayload {
  itemsPerPage: number;
}

const calculatePaginationData = (
  currentPage: number,
  totalItems: number,
  itemsPerPage: number
) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return {
    totalPages,
    hasNextPage,
    hasPreviousPage,
    startIndex,
    endIndex,
  };
};

const initialState: PaginationState = {
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
  hasNextPage: false,
  hasPreviousPage: false,
  startIndex: 0,
  endIndex: 0,
};

const pagePaginationSlice = createSlice({
  name: "pagePagination",
  initialState,
  reducers: {
    setPagination: (state, action: PayloadAction<PaginationUpdatePayload>) => {
      const { currentPage, totalPages, totalItems, itemsPerPage } = action.payload;
      
      if (currentPage !== undefined) state.currentPage = currentPage;
      if (totalPages !== undefined) state.totalPages = totalPages;
      if (totalItems !== undefined) state.totalItems = totalItems;
      if (itemsPerPage !== undefined) state.itemsPerPage = itemsPerPage;

      const calculatedData = calculatePaginationData(
        state.currentPage,
        state.totalItems,
        state.itemsPerPage
      );

      state.totalPages = calculatedData.totalPages;
      state.hasNextPage = calculatedData.hasNextPage;
      state.hasPreviousPage = calculatedData.hasPreviousPage;
      state.startIndex = calculatedData.startIndex;
      state.endIndex = calculatedData.endIndex;
    },
    setCurrentPage: (state, action: PayloadAction<SetPagePayload>) => {
      const { page } = action.payload;
      
      if (page >= 1 && page <= state.totalPages) {
        state.currentPage = page;
        const calculatedData = calculatePaginationData(
          state.currentPage,
          state.totalItems,
          state.itemsPerPage
        );

        state.hasNextPage = calculatedData.hasNextPage;
        state.hasPreviousPage = calculatedData.hasPreviousPage;
        state.startIndex = calculatedData.startIndex;
        state.endIndex = calculatedData.endIndex;
      }
    },
    setItemsPerPage: (state, action: PayloadAction<SetItemsPerPagePayload>) => {
      const { itemsPerPage } = action.payload;
      
      if (itemsPerPage > 0) {
        state.itemsPerPage = itemsPerPage;
        state.currentPage = 1;
  
        const calculatedData = calculatePaginationData(
          state.currentPage,
          state.totalItems,
          state.itemsPerPage
        );

        state.totalPages = calculatedData.totalPages;
        state.hasNextPage = calculatedData.hasNextPage;
        state.hasPreviousPage = calculatedData.hasPreviousPage;
        state.startIndex = calculatedData.startIndex;
        state.endIndex = calculatedData.endIndex;
      }
    },
    goToNextPage: (state) => {
      if (state.hasNextPage) {
        state.currentPage += 1;
        
        const calculatedData = calculatePaginationData(
          state.currentPage,
          state.totalItems,
          state.itemsPerPage
        );

        state.hasNextPage = calculatedData.hasNextPage;
        state.hasPreviousPage = calculatedData.hasPreviousPage;
        state.startIndex = calculatedData.startIndex;
        state.endIndex = calculatedData.endIndex;
      }
    },
    goToPreviousPage: (state) => {
      if (state.hasPreviousPage) {
        state.currentPage -= 1;
        
        const calculatedData = calculatePaginationData(
          state.currentPage,
          state.totalItems,
          state.itemsPerPage
        );

        state.hasNextPage = calculatedData.hasNextPage;
        state.hasPreviousPage = calculatedData.hasPreviousPage;
        state.startIndex = calculatedData.startIndex;
        state.endIndex = calculatedData.endIndex;
      }
    },
    goToFirstPage: (state) => {
      state.currentPage = 1;
      
      const calculatedData = calculatePaginationData(
        state.currentPage,
        state.totalItems,
        state.itemsPerPage
      );

      state.hasNextPage = calculatedData.hasNextPage;
      state.hasPreviousPage = calculatedData.hasPreviousPage;
      state.startIndex = calculatedData.startIndex;
      state.endIndex = calculatedData.endIndex;
    },
    goToLastPage: (state) => {
      state.currentPage = state.totalPages;
      
      const calculatedData = calculatePaginationData(
        state.currentPage,
        state.totalItems,
        state.itemsPerPage
      );

      state.hasNextPage = calculatedData.hasNextPage;
      state.hasPreviousPage = calculatedData.hasPreviousPage;
      state.startIndex = calculatedData.startIndex;
      state.endIndex = calculatedData.endIndex;
    },
    resetPagination: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setPagination,
  setCurrentPage,
  setItemsPerPage,
  goToNextPage,
  goToPreviousPage,
  goToFirstPage,
  goToLastPage,
  resetPagination,
} = pagePaginationSlice.actions;

export default pagePaginationSlice.reducer;
