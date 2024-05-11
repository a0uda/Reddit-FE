import { render, fireEvent, RenderResult } from '@testing-library/react';
import NavBarCreatePost from './NavBarCreatePost';

describe('NavBarCreatePost component', () => {
  let setFieldValueMock: jest.Mock;
  let component: RenderResult;

  beforeEach(() => {
    setFieldValueMock = jest.fn();
    component = render(
      <NavBarCreatePost
        activeIndex={0}
        handleDivClick={() => {}}
        setFieldValue={setFieldValueMock}
      />
    );
  });

  test('should set type when clicking on different options', () => {
    fireEvent.click(component.getByText('Image & Video'));
    expect(setFieldValueMock).toHaveBeenCalledWith('type', 'image_and_videos');

    fireEvent.click(component.getByText('link'));
    expect(setFieldValueMock).toHaveBeenCalledWith('type', 'url');

    fireEvent.click(component.getByText('Poll'));
    expect(setFieldValueMock).toHaveBeenCalledWith('type', 'polls');
  });
});
