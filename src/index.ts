import { createContext, useContext, Context, Provider } from 'react';
import { Container, container, getContainer } from 'inversify-props-esm';

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

/**
 * @todo deprecate this method, and then use combination
 * of {@link ContainerProvider} and {@link useContainerGet} instead
 *
 * @export
 * @template T
 * @param {(string | symbol)} id
 * @return {*}  {T[]}
 *
 * @example
 * ```diff
 * function containerBuilder() {
 *   container.addSingleton<ISample>(Sample, SAMPLE)
 * + return container // MUST RETURN VALUE
 * }
 * - const [sample] = useInject<ISample>(SAMPLE)
 * + // add `ContainerProvider` component into root first
 * + <ContainerProvider value={containerBuilder()}>
 * + // then use `useContainerGet` into child component
 * + const sample = useContainerGet<ISample>(SAMPLE)
 * ```
 */
export function useInject<T>(id: string | symbol): T[] {
  return [getContainer().get<T>(id)];
}

export const ContainerContext = createContext(container);

export const ContainerProvider: Provider<Container> = ContainerContext.Provider;

export function useContainer<C extends Container = Container>() {
  return useContext<C>(ContainerContext as unknown as Context<C>);
}

export function useContainerGet<T = unknown, C extends Container = Container>(
  id: string | symbol
) {
  const container = useContainer<C>();
  return container.get<T>(id);
}
