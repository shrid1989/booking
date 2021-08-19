const { render } = require('../../helpers/sassHelper');

describe('scss/app.scss compiles to css', () => {
  it('app.scss compiles to css', () => {
    return render({
      file: './scss/app.scss',
    });
  });
});
