
import EmailSent from './emailSent.svg';

type Props = {
  icon: string;
  color: string
  width: number;
  heigth: number;
}
export const Icon = ({ icon, color, width, heigth }: Props) => {
  return (
    <div>
      {icon === 'mailSent' && <EmailSent color={color} />}
    </div>
  );
}