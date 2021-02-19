import { getContainer } from 'inversify-props-esm';

export {
  Inject,
  inject,
  injectable,
  Container,
  cid,
  resetContainer,
  mockRequest,
  mockSingleton,
  mockTransient,
  container,
  setContainer,
  getContainer,
} from 'inversify-props-esm';

export function useInject<T>(id: string | symbol): T[] {
  return [getContainer().get<T>(id)];
}
