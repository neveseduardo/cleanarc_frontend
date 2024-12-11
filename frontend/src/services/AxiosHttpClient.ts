import axios, { AxiosRequestConfig, AxiosResponse, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { HttpClient } from './HttpClient';

export class AxiosHttpClient implements HttpClient {
	private instance: AxiosInstance;

	constructor(baseURL: string) {
		this.instance = axios.create({ baseURL });

		this.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
			if (config.headers['Content-Type'] !== 'multipart/form-data') {
				config.headers['Content-Type'] = 'application/json';
				config.headers['Accept'] = 'application/json';
			}

			return config;
		});
	}

	get(url: string, config: AxiosRequestConfig): Promise<AxiosResponse> {
		return this.instance.get(url, config);
	}

	post(url: string, config: AxiosRequestConfig): Promise<AxiosResponse> {
		return this.instance.post(url, config);
	}

	put(url: string, config: AxiosRequestConfig): Promise<AxiosResponse> {
		return this.instance.put(url, config);
	}

	delete(url: string, config: AxiosRequestConfig): Promise<AxiosResponse> {
		return this.instance.delete(url, config);
	}
}
