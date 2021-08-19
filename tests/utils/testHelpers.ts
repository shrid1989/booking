import { ReactWrapper, ShallowWrapper } from 'enzyme';

/**
 * @param {shallowWrapper} wrapper -- Enzyme Shallow wrapper
 * @param {string} val - value of data-test attribute for search
 * @returns {ShallowWrapper}
 */

export const findByTestAttr = (
  wrapper: ShallowWrapper | ReactWrapper,
  val: string
) => {
  const component = wrapper.find(`[data-test='${val}']`);
  return component;
};
