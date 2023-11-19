interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  icon?: React.ReactNode
  size?: 'large' | 'medium'
  color?: 'success' | 'default'
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
    medium: 'text-base',
  }

  const colorProperties = {
    success: 'bg-green-600 hover:bg-green-500',
    default: 'bg-slate-800 hover:bg-slate-600',
  }

  return (
    <button
      className={`btn btn-neutral h-auto font-sans flex justify-center items-center text-white outline-none ${
        colorProperties[color ?? 'default']
      } ${sizeProperties[size ?? 'medium']} ${className}`}
      style={{
        outline: 'none',
      }}
      {...props}
    >
      <div className="mr-[5px]">{icon}</div>
      <div className="grow">{children}</div>
    </button>
  )
}

export default Button
