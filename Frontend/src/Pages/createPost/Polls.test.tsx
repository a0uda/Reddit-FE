import { fireEvent, render, screen } from '@testing-library/react';
import OptionsPoll from './OptionsPoll'; // Adjust the import path as necessary

describe('OptionsPoll Component', () => {
  const mockSetFieldValue = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render initial option fields', () => {
    render(<OptionsPoll setFieldValue={mockSetFieldValue} />);
    const inputs = screen.getAllByPlaceholderText('Option');
    expect(inputs.length).toBe(2);
  });

  it('should add an option field when button is clicked', () => {
    render(<OptionsPoll setFieldValue={mockSetFieldValue} />);
    const button = screen.getByText('Add Option');
    fireEvent.click(button);
    const inputs = screen.getAllByPlaceholderText('Option');
    expect(inputs.length).toBe(3);
  });

  describe('VotingLengthDropdown', () => {
    it('shows initial voting length', () => {
      render(<OptionsPoll setFieldValue={mockSetFieldValue} />);
    });

    it('should update voting length on change', () => {
      render(<OptionsPoll setFieldValue={mockSetFieldValue} />);
      const select = screen.getByLabelText('Voting Length:');
      fireEvent.change(select, { target: { value: '3' } });
      expect(mockSetFieldValue).toHaveBeenCalledWith('polls_voting_length', 3);
    });

    it('should render options for 1 to 7 days', () => {
      render(<OptionsPoll setFieldValue={mockSetFieldValue} />);
      const options = screen.getAllByRole('option');
      expect(options.length).toBe(7);
      expect(options[0].textContent).toBe('1 day');
      expect(options[6].textContent).toBe('7 days');
    });
  });
});
