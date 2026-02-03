import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    fetchGetEmployeeInfos,
    fetchPutEmployeeInfo
} from "@/redux/empApi";
import {Employee} from "@/types/type";


export const tempEmp: Employee = {
    id:"", name:"", age: 0, job:"", language: "", pay:0
}

type Mode = "" | "register" | "update" | "delete" | "reset"

export interface ModeItems{
    id: Mode;
    label: string;
}

export const modes: ModeItems[] = [
    {id:"register", label:"Register"},
    {id:"update", label:"Update"},
    {id:"delete", label:"Delete"},
    {id:"reset", label:"Reset"},
]

interface EmpState{
    mode: Mode;
    selectedId: string;
    upInfo: Employee;
    infos: Employee[];
    error: string | null;
    loading: boolean;
}
// 스키마 설계
const initialState: EmpState = {
    mode: "",
    selectedId: "",
    upInfo: tempEmp,
    infos: [],
    error: null,
    loading: false,
}

const empSlice = createSlice({
    name: "empSlice",
    initialState,
    reducers:{
        selectId(state: EmpState, action: PayloadAction<string>){
            // console.log("selectId", state.selectedId);
            state.selectedId = action.payload
            state.upInfo = state.infos.filter(info=>info.id===action.payload)[0]
            // console.log("selectId", state.selectedId);
        },
        changeMode(state: EmpState, action: PayloadAction<Mode>){
            if(action.payload === "delete"){
                state.infos = state.infos.filter(info=>info.id!==state.selectedId);
                state.upInfo = tempEmp
            }
            else if(action.payload === "update"){
                if(!state.selectedId) return;
                state.upInfo = state.infos.filter(info=>info.id==state.selectedId)[0];
            }
            state.mode = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetEmployeeInfos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGetEmployeeInfos.fulfilled, (state, action) => {
                state.loading = false;
                console.log("infos", action.payload)
                state.infos = action.payload;
            })
            .addCase(fetchGetEmployeeInfos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "로드 실패"
            })
            .addCase(fetchPutEmployeeInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPutEmployeeInfo.fulfilled, (state, action) => {
                state.loading = false;
                console.log("?????", action.payload)
                state.infos = state.infos.map(info =>
                    (
                        info.id === state.selectedId ?
                            {...action.payload, id: String(info.id)}
                            : info
                    )
                )
                state.upInfo = action.payload;
            })
            .addCase(fetchPutEmployeeInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "로드 실패"
            })

    }

})

export const {selectId, changeMode} = empSlice.actions;
export default empSlice.reducer;