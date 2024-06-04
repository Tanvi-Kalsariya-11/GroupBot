import { customAlphabet } from "nanoid";

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
); // 7-character random string

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export const runAsyncFnWithoutBlocking = (
  fn: (...args: any) => Promise<any>
) => {
  fn();
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getStringFromBuffer = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

export enum ResultCode {
  InvalidCredentials = "INVALID_CREDENTIALS",
  InvalidSubmission = "INVALID_SUBMISSION",
  UserAlreadyExists = "USER_ALREADY_EXISTS",
  UnknownError = "UNKNOWN_ERROR",
  UserCreated = "USER_CREATED",
  UserLoggedIn = "USER_LOGGED_IN",
}

export const getMessageFromCode = (resultCode: string) => {
  switch (resultCode) {
    case ResultCode.InvalidCredentials:
      return "Invalid credentials!";
    case ResultCode.InvalidSubmission:
      return "Invalid submission, please try again!";
    case ResultCode.UserAlreadyExists:
      return "User already exists, please log in!";
    case ResultCode.UserCreated:
      return "User created, welcome!";
    case ResultCode.UnknownError:
      return "Something went wrong, please try again!";
    case ResultCode.UserLoggedIn:
      return "Logged in!";
  }
};

export const messages = [
  {
    id: "55yYpzd-0",
    display: {
      type: {
        _payload: {
          status: "fulfilled",
          reason: null,
          _response: {
            _bundlerConfig: null,
            _moduleLoading: null,
            _chunks: {},
            _stringDecoder: {},
            _rowState: 0,
            _rowID: 0,
            _rowTag: 0,
            _rowLength: 0,
            _buffer: [],
          },
          _debugInfo: [],
        },
        _debugInfo: [],
      },
      key: null,
      ref: null,
      props: {
        children: "fddsf",
      },
      _owner: null,
      _store: {},
    },
  },
  {
    id: "55yYpzd-1",
    display: {
      type: {
        _payload: {
          status: "fulfilled",
          reason: null,
          _response: {
            _bundlerConfig: null,
            _moduleLoading: null,
            _chunks: {},
            _stringDecoder: {},
            _rowState: 0,
            _rowID: 0,
            _rowTag: 0,
            _rowLength: 0,
            _buffer: [],
          },
          _debugInfo: [],
        },
        _debugInfo: [],
      },
      key: null,
      ref: null,
      props: {
        content:
          "I'm here to help you with stock trading! You can ask me for stock prices, trending stocks, or events related to stocks. How can I assist you today?",
      },
      _owner: null,
      _store: {},
    },
  },
  {
    id: "55yYpzd-2",
    display: {
      type: {
        _payload: {
          status: "fulfilled",
          reason: null,
          _response: {
            _bundlerConfig: null,
            _moduleLoading: null,
            _chunks: {},
            _stringDecoder: {},
            _rowState: 0,
            _rowID: 0,
            _rowTag: 0,
            _rowLength: 0,
            _buffer: [],
          },
          _debugInfo: [],
        },
        _debugInfo: [],
      },
      key: null,
      ref: null,
      props: {
        children: "sadas",
      },
      _owner: null,
      _store: {},
    },
  },
  {
    id: "55yYpzd-3",
    display: {
      type: {
        _payload: {
          status: "fulfilled",
          reason: null,
          _response: {
            _bundlerConfig: null,
            _moduleLoading: null,
            _chunks: {},
            _stringDecoder: {},
            _rowState: 0,
            _rowID: 0,
            _rowTag: 0,
            _rowLength: 0,
            _buffer: [],
          },
          _debugInfo: [],
        },
        _debugInfo: [],
      },
      key: null,
      ref: null,
      props: {
        content:
          "I'm here to help you with stock trading! You can ask me for stock prices, trending stocks, or events related to stocks. How can I assist you today?",
      },
      _owner: null,
      _store: {},
    },
  },
  {
    id: "55yYpzd-4",
    display: {
      type: {
        _payload: {
          status: "fulfilled",
          reason: null,
          _response: {
            _bundlerConfig: null,
            _moduleLoading: null,
            _chunks: {},
            _stringDecoder: {},
            _rowState: 0,
            _rowID: 0,
            _rowTag: 0,
            _rowLength: 0,
            _buffer: [],
          },
          _debugInfo: [],
        },
        _debugInfo: [],
      },
      key: null,
      ref: null,
      props: {
        children: "today date?",
      },
      _owner: null,
      _store: {},
    },
  },
  {
    id: "55yYpzd-5",
    display: {
      type: {
        _payload: {
          status: "fulfilled",
          reason: null,
          _response: {
            _bundlerConfig: null,
            _moduleLoading: null,
            _chunks: {},
            _stringDecoder: {},
            _rowState: 0,
            _rowID: 0,
            _rowTag: 0,
            _rowLength: 0,
            _buffer: [],
          },
          _debugInfo: [],
        },
        _debugInfo: [],
      },
      key: null,
      ref: null,
      props: {
        content:
          "I'm a demo bot and don't have real-time capabilities to provide the current date. However, you can check the date on your device or by searching online. How can I assist you with stock trading today?",
      },
      _owner: null,
      _store: {},
    },
  },
];
