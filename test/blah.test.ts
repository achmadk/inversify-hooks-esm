import 'reflect-metadata';

import { useInject, container, inject, cid, resetContainer } from '../src';

describe('blah', () => {
  it('works', () => {
    interface IDummy {
      example(): string;
    }

    class Dummy implements IDummy {
      public example(): string {
        return 'example';
      }
    }

    container.addSingleton<IDummy>(Dummy);

    interface IOtherDummy {
      test(): string;
    }

    class OtherDummy implements IOtherDummy {
      @inject() private _dummy!: IDummy;

      public test(): string {
        return this._dummy.example();
      }
    }

    container.addSingleton<IOtherDummy>(OtherDummy);
    function SampleComponent() {
      const [otherDummy] = useInject<IOtherDummy>(cid.OtherDummy);
      return otherDummy;
    }

    expect(SampleComponent().test()).toBe('example');
    resetContainer();
  });
});
