import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Employee} from "@/types/type";



const initialData: Employee[] = [
    {id: "1", name: 'John', age: 35, job: "frontend", language: "react", pay: 1},
    {id: "2", name: 'Peter', age: 35, job: "backend", language: "python", pay: 1},
    {id: "3", name: 'Sue', age: 35, job: "frontend", language: "javascript", pay: 1},
    {id: "4", name: 'Susan', age: 35, job: "backend", language: "java", pay: 1},
]

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
    infos: initialData,
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
        },
        registerEmp(state: EmpState, action: PayloadAction<Employee>){
            const nextId = state.infos.length ?
                Math.max(...state.infos.map(info=>Number(info.id))) + 1
                : 1
            state.infos = [
                ...state.infos,
                { ...action.payload, id: String(nextId)}
            ]
        },
        updateEmp(state: EmpState, action: PayloadAction<Employee>){
            state.infos = state.infos.map(info =>
                (
                    info.id === state.selectedId ?
                        {...action.payload, id: String(info.id)}
                        : info
                )
            )
        },
    }

})

export const {selectId, changeMode, registerEmp, updateEmp} = empSlice.actions;
export default empSlice.reducer;