import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SecurityModalState {
    isOpen: boolean;
    onSuccessAction: string | null;
    originalAction: (() => void) | null;
}

const initialState: SecurityModalState = {
    isOpen: false,
    onSuccessAction: null,
    originalAction: null,
};

interface OpenSecurityModalPayload {
    onSuccessAction?: string;
}

const securityModalSlice = createSlice({
    name: 'securityModal',
    initialState,
    reducers: {
        openSecurityModal: (state, action: PayloadAction<OpenSecurityModalPayload>) => {
            state.isOpen = true;
            state.onSuccessAction = action.payload.onSuccessAction || null;
        },
        closeSecurityModal: (state) => {
            state.isOpen = false;
            state.onSuccessAction = null;
            state.originalAction = null;
        },
        setOriginalAction: (state, action: PayloadAction<(() => void) | null>) => {
            state.originalAction = action.payload;
        },
    },
});

export const { openSecurityModal, closeSecurityModal, setOriginalAction } = securityModalSlice.actions;
export default securityModalSlice.reducer;
