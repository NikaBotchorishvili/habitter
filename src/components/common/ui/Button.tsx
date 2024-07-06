type Props = {
    label: string
}

const Button: React.FC<Props> = ({label}) => {
    return (
        <button className="dark:darkModeButton lightModeButton">
            {label}
        </button>
    );
}
 
export default Button;