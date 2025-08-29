import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ModalDrawerState {
    pageModal: {
        for: string;
        isOpen: boolean;
        data: any;
        type: 'add' | 'edit';
    };
    pageDrawer: {
        for: string;
        isOpen: boolean;
        data: any;
    };
}
const initialState: ModalDrawerState = {
    pageModal: {
        for: '',
        isOpen: false,
        data: null,
        type: 'add',
    },
    pageDrawer: {
        for: '',
        isOpen: false,
        data: null,
    },
};
interface OpenModalPayload {
    for?: string;
    data?: any;
    type?: 'add' | 'edit';
}
interface OpenDrawerPayload {
    for?: string;
    data?: any;
}
const modalDrawerSlice = createSlice({
    name: 'modalDrawer',
    initialState,
    reducers: {
        openPageModal: (state, action: PayloadAction<OpenModalPayload>) => {
            state.pageModal.for = action.payload.for || 'test';
            state.pageModal.type = action.payload.type || 'add';
            state.pageModal.isOpen = true;
            state.pageModal.data = action.payload.data || null;
        },
        closePageModal: (state) => {
            state.pageModal.isOpen = false;
            state.pageModal.data = null;
        },
        setModalData: (state, action: PayloadAction<any>) => {
            state.pageModal.data = action.payload;
        },
        openPageDrawer: (state, action: PayloadAction<OpenDrawerPayload>) => {
            state.pageDrawer.for = action.payload.for || 'test';
            state.pageDrawer.isOpen = true;
            state.pageDrawer.data = action.payload.data || null;
        },
        closePageDrawer: (state) => {
            state.pageDrawer.isOpen = false;
            state.pageDrawer.data = null;
        },
        setDrawerData: (state, action: PayloadAction<any>) => {
            state.pageDrawer.data = action.payload;
        },
    },
});

export const {
    openPageModal,
    closePageModal,
    openPageDrawer,
    closePageDrawer,
    setModalData,
    setDrawerData,
} = modalDrawerSlice.actions;

export default modalDrawerSlice.reducer;
