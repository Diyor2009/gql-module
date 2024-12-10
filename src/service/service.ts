export const service = <T>(
  service: Record<string, (...args: any) => any> & T
) => service;
