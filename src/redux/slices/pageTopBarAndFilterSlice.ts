import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  dateRange: {
    from: string | null;
    to: string | null;
  };
  textFilter: string;
  propertyFilter: string;
  stateFilter: string;
  claimFilter: string;
  patientTypeFilter: string;
  dateFilter: string | null;
  statusFilter: string;
  transactionFilter: string;
  walletFilter: string;
  genderFilter: string;
  scheduleFilter: string;
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
    dateRange: {
      from: null,
      to: null,
    },
    textFilter: "",
    propertyFilter: "",
    stateFilter: "",
    claimFilter: "",
    patientTypeFilter: "",
    dateFilter: null,
    claimType: "",
    statusFilter: "",
    transactionFilter: "",
    walletFilter: "",
    genderFilter: "",
    scheduleFilter: "",
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
    },

    clearFilter: (state) => {
      state.filter = {
        dateRange: {
          from: null,
          to: null,
        },
        textFilter: "",
        propertyFilter: "",
        stateFilter: "",
        claimFilter: "",
        patientTypeFilter: "",
        dateFilter: null,
        statusFilter: "",
        transactionFilter: "",
        walletFilter: "",
        genderFilter: "",
        scheduleFilter: "",
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
    },
  },
});

export const {
  setViewMode,
  toggleViewMode,

  toggleFilter,
  setShowFilter,
  setFilter,
  clearFilter,

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
