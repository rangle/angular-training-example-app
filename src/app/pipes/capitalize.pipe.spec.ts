import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe;
  beforeEach(() => {
    pipe = new CapitalizePipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should capitaze a word', () => {
    expect(pipe.transform('foo')).toEqual('Foo');
  });

});
