import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

// const API_ADDRESS = `http://${process.env.API_ADDRESS || process.env.NEXT_PUBLIC_API_ADDRESS}`;
const API_ADDRESS = `http://${process.env.NEXT_PUBLIC_API_ADDRESS}`;

const serializeCookies = (
  cookies: Partial<{ [key: string]: string }>,
): string => {
  return Object.keys(cookies)
    .map((key) => `${key}=${cookies[key]}`)
    .join(";");
};

export abstract class Service {
  protected api: AxiosInstance;

  constructor(protected options?: CreateAxiosDefaults) {
    this.api = axios.create({
      ...options,
      baseURL: options?.baseURL ?? API_ADDRESS,
    });
  }

  private createRequestCookieInterceptor = (
    cookies: Partial<{ [key: string]: string }>,
    url: string,
  ): number => {
    const requestInterceptor = this.api.interceptors.request.use(
      function onBefore(config) {
        const cookiesSerialized = serializeCookies(cookies);

        config.transformRequest = [
          (data, headers) => {
            headers.set("Cookie", cookiesSerialized);
          },
        ];
        return config;
      },
      null,
      {
        runWhen: (config) => {
          return config.url === url;
        },
      },
    );

    return requestInterceptor;
  };

  public injectCookies =
    <T, R>(fn: (...args: T[]) => Promise<R>, ...args: T[]) =>
    async (
      ...secondArgs: Parameters<typeof this.createRequestCookieInterceptor>
    ): Promise<R> => {
      const interceptor = this.createRequestCookieInterceptor(...secondArgs);

      return fn(...args).finally(() => {
        this.api.interceptors.request.eject(interceptor);
      });
    };
}
