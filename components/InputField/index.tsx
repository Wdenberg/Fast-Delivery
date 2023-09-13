import styles from './styles.module.css';

import EyOf from './EyeOf.svg';
import EyOn from './EyeOn.svg';
import { useState } from 'react';

type Props = {
  color: string;
  placeholder: string;
  value: string;
  onChange: (newValue: string) => void;
  password?: boolean;
}
export const IntpuFild = ({ color, placeholder, value, onChange, password }: Props) => {

  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  return (

    <div className={styles.container}
      style={{
        borderColor: focused ? color : '#F9F9FB',
        backgroundColor: focused ? '#FFF' : "#F9F9FB"
      }}
    >

      <input
        type={password ? (showPassword ? 'text' : 'password') : 'text'}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      {password &&
        <div
          onClick={() => setShowPassword(!showPassword)}

          className={styles.showPassword}>

          {showPassword && <EyOn color="#BBB" />}
          {!showPassword && <EyOf color="#BBB" />}
        </div>
      }

    </div>
  );
}