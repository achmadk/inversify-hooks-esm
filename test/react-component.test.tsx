/** @jest-environment jsdom */
import '@testing-library/jest-dom';

import React from 'react';
import { render, screen } from '@testing-library/react';

import { ContainerProvider, container, inject, useContainerGet } from '../src';

interface IDummy {
  example(): string;
}

class Dummy implements IDummy {
  public example(): string {
    return 'example_dummy';
  }
}

const DUMMY = 'Dummy';

interface IOtherDummy {
  test(): string;
}

const OTHER_DUMMY = 'OtherDummy';

class OtherDummy implements IOtherDummy {
  // @ts-ignore
  @inject() private _dummy!: IDummy;

  public test(): string {
    return this._dummy.example();
  }
}

const SampleComponent = () => {
  const otherDummy = useContainerGet<IOtherDummy>(OTHER_DUMMY);
  return <h2>{`Check: ${otherDummy.test()}`}</h2>;
};

function generateAppContainer() {
  container.bindTo<IDummy>(Dummy, DUMMY).inSingletonScope();
  container.bindTo<IOtherDummy>(OtherDummy, OTHER_DUMMY).inSingletonScope();
  return container;
}

describe('test in react component', () => {
  test('it works!!!', () => {
    render(
      <ContainerProvider value={generateAppContainer()}>
        <SampleComponent />
      </ContainerProvider>
    );
    expect(screen.getByText(/^Check:/)).toHaveTextContent(/^Check: example_dummy$/);
  });
});
