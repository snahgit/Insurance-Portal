import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  searchTerm: string;
  statusFilter: string;
  genderFilter: string;
  dateRange: {
    from: string | null;
    to: string | null;
  };
  claimType: string;
  isActive: boolean;
  accessedBy: string;
  email: string;
  selectedDate: string | null;
}

interface TopBarState {
  heading: string;
  showActions: boolean;
  showExport: boolean;
  showAdd: boolean;
}

interface PageTopBarAndFilterState {
  viewMode: "grid" | "list";
  showFilter: boolean;
  filter: FilterState;
  topBar: TopBarState;
  loading: boolean;
  error: string | null;
  selectedItems: string[];
  bulkActions: {
    isVisible: boolean;
    selectedCount: number;
  };
  sortBy: {
    field: string;
    direction: "asc" | "desc";
  };
  calendar: {
    isVisible: boolean;
    currentMonth: string;
    dateData: Record<string, number>;
    activeTab: string;
    title: string;
  };
}

interface SetFilterPayload {
  field: keyof FilterState;
  value: any;
}

interface SetTopBarPayload {
  field: keyof TopBarState;
  value: any;
}

interface SetSortPayload {
  field: string;
  direction: "asc" | "desc";
}

interface ToggleItemSelectionPayload {
  itemId: string;
}

const initialState: PageTopBarAndFilterState = {
  viewMode: "grid",
  showFilter: false,
  filter: {
    searchTerm: "",
    statusFilter: "",
    genderFilter: "",
    dateRange: {
      from: null,
      to: null,
    },
    claimType: "",
    accessedBy: "",
    email: "",
    isActive: false,
    selectedDate: null,
  },
  topBar: {
    heading: "Dashboard",
    showActions: true,
    showExport: true,
    showAdd: true,
  },
  loading: false,
  error: null,
  selectedItems: [],
  bulkActions: {
    isVisible: false,
    selectedCount: 0,
  },
  sortBy: {
    field: "name",
    direction: "asc",
  },
  calendar: {
    isVisible: false,
    currentMonth: new Date().toISOString(),
    dateData: {},
    activeTab: "",
    title: "",
  },
};

const pageTopBarAndFilterSlice = createSlice({
  name: "pageTopBarAndFilter",
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload;
    },

    toggleViewMode: (state) => {
      state.viewMode = state.viewMode === "grid" ? "list" : "grid";
    },

    toggleFilter: (state) => {
      state.showFilter = !state.showFilter;
    },

    setShowFilter: (state, action: PayloadAction<boolean>) => {
      state.showFilter = action.payload;
    },

    setFilter: (state, action: PayloadAction<SetFilterPayload>) => {
      const { field, value } = action.payload;
      (state.filter as any)[field] = value;
      state.filter.isActive = Boolean(
        state.filter.searchTerm ||
        state.filter.statusFilter ||
        state.filter.genderFilter ||
        state.filter.claimType ||
        state.filter.dateRange.from ||
        state.filter.dateRange.to ||
        state.filter.selectedDate
      );
    },

    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filter.searchTerm = action.payload;
      state.filter.isActive = Boolean(
        state.filter.searchTerm ||
        state.filter.statusFilter ||
        state.filter.genderFilter ||
        state.filter.claimType ||
        state.filter.dateRange.from ||
        state.filter.dateRange.to ||
        state.filter.selectedDate
      );
    },

    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filter.statusFilter = action.payload;
      state.filter.isActive = Boolean(
        state.filter.searchTerm ||
        state.filter.statusFilter ||
        state.filter.genderFilter ||
        state.filter.claimType ||
        state.filter.dateRange.from ||
        state.filter.dateRange.to ||
        state.filter.selectedDate
      );
    },

    setGenderFilter: (state, action: PayloadAction<string>) => {
      state.filter.statusFilter = action.payload;
      state.filter.isActive = Boolean(
        state.filter.searchTerm ||
        state.filter.statusFilter ||
        state.filter.genderFilter ||
        state.filter.claimType ||
        state.filter.dateRange.from ||
        state.filter.dateRange.to ||
        state.filter.selectedDate
      );
    },

    setDateRange: (
      state,
      action: PayloadAction<{ from: string | null; to: string | null }>
    ) => {
      state.filter.dateRange = action.payload;
      state.filter.isActive = Boolean(
        state.filter.searchTerm ||
        state.filter.statusFilter ||
        state.filter.genderFilter ||
        state.filter.claimType ||
        state.filter.dateRange.from ||
        state.filter.dateRange.to ||
        state.filter.selectedDate
      );
    },

    clearAllFilters: (state) => {
      state.filter = {
        searchTerm: "",
        statusFilter: "",
        genderFilter: "",
        dateRange: {
          from: null,
          to: null,
        },
        claimType: "",
        isActive: false,
        accessedBy: "",
        email: "",
        selectedDate: null,
      };
    },

    setTopBar: (state, action: PayloadAction<SetTopBarPayload>) => {
      const { field, value } = action.payload;
      (state.topBar as any)[field] = value;
    },

    setHeading: (state, action: PayloadAction<string>) => {
      state.topBar.heading = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    toggleItemSelection: (
      state,
      action: PayloadAction<ToggleItemSelectionPayload>
    ) => {
      const { itemId } = action.payload;
      const index = state.selectedItems.indexOf(itemId);

      if (index > -1) {
        state.selectedItems.splice(index, 1);
      } else {
        state.selectedItems.push(itemId);
      }

      state.bulkActions.selectedCount = state.selectedItems.length;
      state.bulkActions.isVisible = state.selectedItems.length > 0;
    },

    selectAllItems: (state, action: PayloadAction<string[]>) => {
      state.selectedItems = action.payload;
      state.bulkActions.selectedCount = action.payload.length;
      state.bulkActions.isVisible = action.payload.length > 0;
    },

    clearSelection: (state) => {
      state.selectedItems = [];
      state.bulkActions.selectedCount = 0;
      state.bulkActions.isVisible = false;
    },

    setSort: (state, action: PayloadAction<SetSortPayload>) => {
      const { field, direction } = action.payload;
      state.sortBy.field = field;
      state.sortBy.direction = direction;
    },

    toggleSortDirection: (state, action: PayloadAction<string>) => {
      const field = action.payload;
      if (state.sortBy.field === field) {
        state.sortBy.direction =
          state.sortBy.direction === "asc" ? "desc" : "asc";
      } else {
        state.sortBy.field = field;
        state.sortBy.direction = "asc";
      }
    },

    setBulkActionsVisible: (state, action: PayloadAction<boolean>) => {
      state.bulkActions.isVisible = action.payload;
    },

    resetPageTopBarAndFilter: (state) => {
      Object.assign(state, initialState);
    },

    // Calendar actions
    toggleCalendar: (state) => {
      state.calendar.isVisible = !state.calendar.isVisible;
    },

    setCalendarVisible: (state, action: PayloadAction<boolean>) => {
      state.calendar.isVisible = action.payload;
    },

    setCalendarMonth: (state, action: PayloadAction<string>) => {
      state.calendar.currentMonth = action.payload;
    },

    setCalendarDateData: (state, action: PayloadAction<Record<string, number>>) => {
      state.calendar.dateData = action.payload;
    },

    updateCalendarDateData: (state, action: PayloadAction<{ tabType: string; dateData: Record<string, number> }>) => {
      const { tabType, dateData } = action.payload;
      if (state.calendar.activeTab === tabType) {
        state.calendar.dateData = dateData;
      }
    },

    setCalendarActiveTab: (state, action: PayloadAction<string>) => {
      state.calendar.activeTab = action.payload;
    },

    setCalendarTitle: (state, action: PayloadAction<string>) => {
      state.calendar.title = action.payload;
    },

    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.filter.selectedDate = action.payload;
      state.filter.isActive = Boolean(
        state.filter.searchTerm ||
        state.filter.statusFilter ||
        state.filter.genderFilter ||
        state.filter.claimType ||
        state.filter.dateRange.from ||
        state.filter.dateRange.to ||
        state.filter.selectedDate
      );
    },
  },
});

export const {
  setViewMode,
  toggleViewMode,
  toggleFilter,
  setShowFilter,
  setFilter,
  setSearchTerm,
  setStatusFilter,
  setGenderFilter,
  setDateRange,
  clearAllFilters,
  setTopBar,
  setHeading,
  setLoading,
  setError,
  toggleItemSelection,
  selectAllItems,
  clearSelection,
  setSort,
  toggleSortDirection,
  setBulkActionsVisible,
  resetPageTopBarAndFilter,
  toggleCalendar,
  setCalendarVisible,
  setCalendarMonth,
  setCalendarDateData,
  updateCalendarDateData,
  setCalendarActiveTab,
  setCalendarTitle,
  setSelectedDate,
} = pageTopBarAndFilterSlice.actions;

export default pageTopBarAndFilterSlice.reducer;
