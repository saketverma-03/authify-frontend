import axios, { AxiosInstance, AxiosResponse } from "axios";
import { IBackendResponse } from "../type";

export interface ICreateServiceData {
  name: string;
  roleIds: string[];
  guildId: string;
}
export const createTmService = async (
  axios: AxiosInstance,
  data: ICreateServiceData,
): Promise<AxiosResponse<IBackendResponse<{}>>> =>
  await axios.post("/create-tm-service", data);

export interface IGetManogesResData {
  _id: string;
  title: string;
}

export const getMangoes = async (
  axios: AxiosInstance,
  id: string,
): Promise<AxiosResponse<IBackendResponse<IGetManogesResData[]>>> =>
  axios.get(`customSolutions/gangstaPhilosophy/mangoes?serviceId=${id}`);

export const addCustomSolution = async (
  axios: AxiosInstance,
): Promise<AxiosResponse<IBackendResponse<IGetManogesResData[]>>> =>
  axios.get("customSolutions/gangstaPhilosophy/mangoes");
