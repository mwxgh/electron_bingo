interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  icon?: React.ReactNode
  size?: 'large' | 'medium'
  color?: 'success' | 'danger' | 'default' | 'info' | 'warning'
  className?: string
}

const Button: React.FC<Props> = ({
  children,
  icon,
  size,
  color,
  className,
  ...props
}) => {
  const sizeProperties = {
    large: 'text-2xl px-[150px] py-[20px] w-[500px]',
    medium: 'text-lg px-[30px]',
  }

  const colorProperties = {
    success: 'bg-green-600 hover:bg-green-500',
    danger: 'bg-red-600 hover:bg-red-500',
    info: 'bg-sky-600 hover:bg-sky-500',
    default: 'bg-slate-600 hover:bg-slate-500',
    warning: 'bg-yellow-500 hover:bg-yellow-400',
  }

  return (
    <button
      className={`btn btn-neutral h-auto font-sans flex justify-center items-center text-white outline-none leading-none ${
        colorProperties[color ?? 'default']
      } ${sizeProperties[size ?? 'medium']} ${className}`}
      style={{
        outline: 'none',
      }}
      {...props}
    >
      {icon && <div className="mr-[5px]">{icon}</div>}
      <div className="grow">{children}</div>
    </button>
  )
}

export default Button
