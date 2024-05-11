import { render, fireEvent } from '@testing-library/react';
import SchedulePostComponent from './schedulePost';

describe('SchedulePostComponent', () => {
  it('renders without crashing', () => {
    const handleOpen = jest.fn();
    const setScheduledDate = jest.fn();
    const setScheduledHour = jest.fn();
    const setScheduledMinutes = jest.fn();

    render(
      <SchedulePostComponent
        handleOpen={handleOpen}
        open={true}
        setScheduledDate={setScheduledDate}
        setScheduledHour={setScheduledHour}
        setScheduledMinutes={setScheduledMinutes}
      />
    );
  });

  it('calls props methods correctly when Apply button is clicked', () => {
    const handleOpen = jest.fn();
    const setScheduledDate = jest.fn();
    const setScheduledHour = jest.fn();
    const setScheduledMinutes = jest.fn();

    const { getByText } = render(
      <SchedulePostComponent
        handleOpen={handleOpen}
        open={true}
        setScheduledDate={setScheduledDate}
        setScheduledHour={setScheduledHour}
        setScheduledMinutes={setScheduledMinutes}
      />
    );

    fireEvent.click(getByText('Apply'));

    expect(handleOpen).toHaveBeenCalled();
    // You can add more assertions to check other props methods are called with correct parameters
  });

  // Add more test cases as needed for different scenarios and edge cases
});
