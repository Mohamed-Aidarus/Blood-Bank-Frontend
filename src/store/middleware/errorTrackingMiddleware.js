export const errorTrackingMiddleware = (store) => (next) => (action) => {
    try {
      return next(action);
    } catch (error) {
      console.error('Redux Middleware Error:', error);
      // Here you can also send the error to a tracking service like Sentry
      throw error;
    }
  };
  