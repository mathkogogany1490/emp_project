import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Employee} from "@/types/type";

const API_URL = "http://localhost:3001";

// Get 전체 infos
export const fetchGetEmployeeInfos =
                    // return값, 파라미터값, error값
    createAsyncThunk<Employee[], void, {rejectValue:string}>(
    "fetchGetEmployeeInfos",
        async (_, thunkAPI) =>{
            try{
                const response = await axios.get(`${API_URL}/app/emp`);
                console.log("response", response.data);
                return response.data;
            }catch{
                return thunkAPI.rejectWithValue("데이터 로드 실패");
        }
        }
)

// post 전체 infos
export const fetchPostEmployeeInfo =
    createAsyncThunk<Employee, Employee, {rejectValue:string}>(
        "fetchPostEmployeeInfo",
        async (empInfo, thunkAPI) =>{
            try{
                const response = await axios.post(`${API_URL}/app/emp`, empInfo);
                return response.data;
            }catch{
                return thunkAPI.rejectWithValue("데이터 로드 실패");
            }
        }
    )

// put 전체 infos
export const fetchPutEmployeeInfo =
    createAsyncThunk<Employee, Employee, {rejectValue:string}>(
        "fetchPutEmployeeInfo",
        async (empInfo, thunkAPI) =>{
            try{
                const response = await axios.put(`${API_URL}/app/emp/${empInfo.id}`, empInfo);
                return response.data;
            }catch{
                return thunkAPI.rejectWithValue("데이터 로드 실패");
            }
        }
    )