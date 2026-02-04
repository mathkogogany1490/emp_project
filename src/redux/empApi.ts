import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Employee} from "@/types/type";

const API_URL = "http://localhost:3001";
const GRAPH_URL = "http://localhost:3001/graphql";

type GraphQLResponse<T> = {
    data?: T;
    error?: {message: string}[];
}
// Get 전체 infos
export const fetchGetEmployeeInfos =
    createAsyncThunk<Employee[], void, {rejectValue:string}>(
    "fetchGetEmployeeInfos",
        async (_, thunkAPI) =>{
        const query = `
            query GetEmployees {
                      employees {
                        id
                        name
                        age
                        job
                        language
                        pay
                      }
                    }
        `
            try{
                const {data} = await axios.post<
                    GraphQLResponse<{ employees: Employee[] }>
                >(
                    GRAPH_URL,
                    {query},
                );
                return data.data?.employees ?? [];
            }catch(e){
                return thunkAPI.rejectWithValue("데이터 로드 실패");
        }
        }
)

// post 전체 infos
export const fetchPostEmployeeInfos =
    createAsyncThunk<Employee, Employee, {rejectValue:string}>(
        "fetchPostEmployeeInfos",
        async (obj, thunkAPI) =>{
            const mutation = `
            mutation CreateEmployee($input: EmployeeInput!) {
                      createEmployee(input: $input) {
                        id
                        name
                        age
                        job
                        language
                        pay
                      }
                    }
        `
            try{
                const {data} = await axios.post<
                    GraphQLResponse<{ createEmployee: Employee }>
                >(
                    GRAPH_URL,
                    {
                        query:mutation,
                        variables: {
                            input: {
                                name: obj.name,
                                age: Number(obj.age),
                                job: obj.job,
                                language: obj.language,
                                pay: Number(obj.pay)
                            }
                        }
                    },
                );
                if(!data.data){
                    return thunkAPI.rejectWithValue("등록 실패")
                }
                return data.data.createEmployee;
            }catch(e){
                return thunkAPI.rejectWithValue("데이터 로드 실패");
            }
        }
    )
// put 전체 infos
export const fetchPutEmployeeInfo =
    createAsyncThunk<Employee, Employee, {rejectValue:string}>(
        "fetchPutEmployeeInfos",
        async (obj, thunkAPI) =>{
            const mutation = `
            mutation UpdateEmployee($id: ID!, $input: EmployeeInput!) {
                  updateEmployee(id: $id, input: $input) {
                    id
                    name
                    age
                    job
                    language
                    pay
                  }
                }
        `
            try{
                const {data} = await axios.post<
                    GraphQLResponse<{ updateEmployee: Employee }>
                >(
                    GRAPH_URL,
                    {
                        query:mutation,
                        variables: {
                            id: String(obj.id),
                            input: {
                                name: obj.name,
                                age: Number(obj.age),
                                job: obj.job,
                                language: obj.language,
                                pay: Number(obj.pay)
                            }
                        }
                    },
                );
                if(!data.data){
                    return thunkAPI.rejectWithValue("등록 실패")
                }
                return data.data.updateEmployee;
            }catch(e){
                return thunkAPI.rejectWithValue("데이터 로드 실패");
            }
        }
    )


export const fetchDeleteEmployeeInfos =
    createAsyncThunk<string, string, {rejectValue:string}>(
        "fetchDeleteEmployeeInfos",
        async (id, thunkAPI) =>{
            const mutation = `
            mutation DeleteEmployee($id: ID!) {
                  deleteEmployee(id: $id)
                }
        `
            try{
                const {data} = await axios.post<
                    GraphQLResponse<{ deleteEmployee: string }>
                >(
                    GRAPH_URL,
                    {
                        query:mutation,
                        variables: {
                            id: String(id),
                        }
                    },
                );
                if(!data.data){
                    return thunkAPI.rejectWithValue("등록 실패")
                }
                return data.data.deleteEmployee;
            }catch(e){
                return thunkAPI.rejectWithValue("데이터 로드 실패");
            }
        }
    )