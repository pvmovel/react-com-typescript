import { forwardRef } from "react";

interface IInputLoginProps {
  type?: string;
  label: string;
  value: string;
  onPressEnter?: () => void;
  onChange: (newValue: string) => void;
}

export const InputLogin = forwardRef<HTMLInputElement, IInputLoginProps>((props, ref) => {
  return (
    <label>
      <span>{props.label}</span>
      <input 
        ref={ref}
        value={props.value} 
        type={props.type} 
        onChange={e => props.onChange(e.target.value)} 
        onKeyDown={e => e.key === 'Enter' 
        ? props.onPressEnter && props.onPressEnter()
        : undefined}
        />
    </label>
  )
});
