export default {
  info: ({ message, data = {} }: { message: string; data?: any }) => {
    console.log({
      message,
      data,
      type: 'INFO',
      timestamp: new Date(),
    });
  },
  warn: ({ message, data = {} }: { message: string; data?: any }) => {
    console.log({
      message,
      data,
      type: 'WARN',
      timestamp: new Date(),
    });
  },
  error: ({ message, error, data = {} }: { message: string; error: string; data?: any }) => {
    console.log({
      message,
      error,
      data,
      type: 'ERROR',
      timestamp: new Date(),
    });
  },
  debug: ({ message, data = {} }: { message: string; data?: any }) => {
    console.log({
      message,
      data,
      type: 'DEBUG',
      timestamp: new Date(),
    });
  },
};
