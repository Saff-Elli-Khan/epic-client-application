import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Storage } from "@capacitor/storage";

export interface ValidationMessage {
  param?: string;
  location?: string;
  message: string;
  value?: string | number;
}

export interface DefaultResponse<B extends boolean, T> {
  status: B;
  messages: Array<ValidationMessage>;
  data: T;
  code: number;
  statusCode?: number;
}

export class Requests {
  protected DefaultConfiguration: AxiosRequestConfig = {
    validateStatus: (status: number) => status >= 200 && status <= 500,
  };

  protected resolveResponse = async <R>(
    Request: Promise<AxiosResponse<any>>
  ): Promise<DefaultResponse<true, R> | DefaultResponse<false, any>> => {
    try {
      const Response = (await Request) as AxiosResponse<
        DefaultResponse<boolean, any>
      >;

      // Check Response
      if (typeof Response.data === "object")
        return { ...Response.data, statusCode: Response.status };
      else
        throw new Error(
          `Invalid or unexpected response pattern from your request!`
        );
    } catch (error) {
      // Request Error
      return {
        status: false,
        messages: [
          {
            message: (error as any).message,
          },
        ],
        data: error,
        code: 1,
      };
    }
  };

  constructor(
    config?:
      | ((config: AxiosRequestConfig) => AxiosRequestConfig)
      | AxiosRequestConfig,
    protected TargetURL = process.env.REACT_APP_API_URL
  ) {
    if (typeof config === "function")
      this.DefaultConfiguration = config(this.DefaultConfiguration);
    else if (typeof config === "object") this.DefaultConfiguration = config;
  }

  public get = async <R>(
    endpoint: string,
    config: AxiosRequestConfig & { cache?: boolean } = {}
  ) => {
    // Resolve URL
    const ResolvedUrl = new URL(endpoint, this.TargetURL).toString();

    // Send Request
    const Response = await this.resolveResponse<R>(
      axios.get(ResolvedUrl, {
        ...this.DefaultConfiguration,
        ...config,
      })
    );

    if (
      config.cache &&
      process.env.NODE_ENV === "production" &&
      !window.navigator.onLine &&
      !Response.status
    ) {
      // Get Cached Data
      const Cache = (
        await Storage.get({
          key: `GET:${ResolvedUrl};${JSON.stringify(config)}`,
        })
      ).value;

      return (Cache ? JSON.parse(Cache) : Response) as typeof Response;
    } else {
      // Cache Response
      if (config.cache && Response.status)
        await Storage.set({
          key: `GET:${ResolvedUrl};${JSON.stringify(config)}`,
          value: JSON.stringify(Response),
        });

      return Response;
    }
  };

  public delete = <R>(endpoint: string, config: AxiosRequestConfig = {}) =>
    this.resolveResponse<R>(
      axios.delete(new URL(endpoint, this.TargetURL).toString(), {
        ...this.DefaultConfiguration,
        ...config,
      })
    );

  public post = <R>(
    endpoint: string,
    data?: any,
    config: AxiosRequestConfig = {}
  ) =>
    this.resolveResponse<R>(
      axios.post(new URL(endpoint, this.TargetURL).toString(), data, {
        ...this.DefaultConfiguration,
        ...config,
      })
    );

  public patch = <R>(
    endpoint: string,
    data?: any,
    config: AxiosRequestConfig = {}
  ) =>
    this.resolveResponse<R>(
      axios.patch(new URL(endpoint, this.TargetURL).toString(), data, {
        ...this.DefaultConfiguration,
        ...config,
      })
    );

  public put = <R>(
    endpoint: string,
    data?: any,
    config: AxiosRequestConfig = {}
  ) =>
    this.resolveResponse<R>(
      axios.put(new URL(endpoint, this.TargetURL).toString(), data, {
        ...this.DefaultConfiguration,
        ...config,
      })
    );
}
