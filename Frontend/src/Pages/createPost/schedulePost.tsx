import { useState } from 'react';
import DatePicker from 'react-datepicker';
import TimeSelector from './TimeSelector';

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import RoundedButton from '../../Components/RoundedButton';

const SchedulePostComponent = (props: {
  handleOpen: () => void;
  open: boolean;
  setScheduledDate: (time: string) => void;
  setScheduledHour: (time: string) => void;
  setScheduledMinutes: (time: string) => void;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('00:00');

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    const formattedDates = selectedDate ? selectedDate.toDateString() : '';
    console.log(formattedDates);
    const dateString = formattedDates;
    const date = new Date(dateString);

    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    console.log(formattedDate);
    console.log('sslkskskkml: aaaaaaaaaaaaaaaaaa', formattedDate, selectedTime);
    const [hours, minutes] = selectedTime.split(':');
    console.log('Hours:', hours);
    console.log('Minutes:', minutes);
    props.setScheduledDate(formattedDate);
    props.setScheduledHour(hours);
    props.setScheduledMinutes(minutes);
    props.handleOpen();
  };

  return (
    <Dialog size='sm' open={props.open} handler={props.handleOpen}>
      <DialogHeader className='!block relative border-b border-lines-color my-2 flex justify-between'>
        <h2>Schedule Post</h2>
      </DialogHeader>
      <DialogBody className='flex flex-col md:flex-row gap-2'>
        <div className='mb-2 md:mb-0'>
          <label>Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat='dd/MM/yyyy'
            className='border rounded p-1 ms-2'
            placeholderText='dd/MM/yyyy'
            minDate={new Date()}
          />
        </div>
        <div className='flex flex-row'>
          <label>Time:</label>
          <TimeSelector
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        </div>
      </DialogBody>
      <DialogFooter className='bg-gray-200 rounded space-x-2'>
        <RoundedButton
          buttonBorderColor='border-white'
          buttonText='Apply'
          buttonTextColor='text-blue-light'
          buttonColor='bg-gray-200 '
          onClick={handleSubmit}
        />
      </DialogFooter>
    </Dialog>
  );
};

export default SchedulePostComponent;
