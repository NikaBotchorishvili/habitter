type Props = {
    label: string
}

const Button: React.FC<Props> = ({label}) => {
    return (
        <button className="bg-darkModeMain text-xl hover:bg-darkModeSecondary transition-colors duration-200 py-3 rounded-md">
            {label}
        </button>
    );
}
 
export default Button;