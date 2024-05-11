import RoundedButton from '../../../Components/RoundedButton';

const ButtonList = ({
  buttArr,
}: {
  buttArr: { text: string; onClick: () => void; disabled?: boolean }[];
}) => {
  return (
    <div className='flex justify-start flex-row-reverse gap-2'>
      {buttArr.map((butt, i) => (
        <RoundedButton
          key={i}
          buttonBorderColor='border-blue-light font-semibold'
          buttonColor={i == 0 ? 'bg-blue-light' : 'bg-inherit'}
          buttonText={butt.text}
          buttonTextColor={i == 0 ? 'text-white' : 'text-blue-light'}
          onClick={butt.onClick}
          disabled={butt.disabled}
        />
      ))}
    </div>
  );
};

export default ButtonList;
