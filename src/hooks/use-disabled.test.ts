// https://quares.ru/?id=146049
import { renderHook, act} from '@testing-library/react-hooks';
import { ToolType } from '../const';
import { MockCLIENT } from '../mocks/mocks';
import useDisabled from './use-disabled';

const CURRENT_STRINGS = ['4', '6', '12'];
const EXPECT_STRINGS = ['4', '6'];
const TYPES = [ ToolType.Ukulele, ToolType.Electric];
const filter = MockCLIENT.filter;

test('should return EXPECT_STRINGS', () => {
  const currFilter = {...filter, stringCounts: CURRENT_STRINGS};
  const { result } = renderHook(() => useDisabled(currFilter));
  let counts;
  act(() => {
    counts = result.current(TYPES);
  });
  expect(counts).toEqual(EXPECT_STRINGS);
});
