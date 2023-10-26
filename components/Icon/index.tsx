import Card from './card.svg';
import Checked from './checked.svg';
import Cupom from './cupom.svg';
import EmailSent from './emailSent.svg';
import Location from './location.svg';
import Money from './money.svg';
import RightArrow from './rightarrow.svg';

type Props = {
  icon: string;
  color: string
  width: number;
  heigth: number;
}
export const Icon = ({ icon, color, width, heigth }: Props) => {
  return (
    <div>
      {icon === 'card' && <Card color={color} />}
      {icon === 'checked' && <Checked color={color} />}
      {icon === 'cupom' && <Cupom color={color} />}
      {icon === 'mailSent' && <EmailSent color={color} />}
      {icon === 'location' && <Location color={color} />}
      {icon === 'money' && <Money color={color} />}
      {icon === 'rightarrow' && <RightArrow color={color} />}

    </div>
  );
}