type Props = {
    label: string
}

const Button: React.FC<Props> = ({label}) => {
    return (
        <button className="dark:darkModeButton">
            {label}
        </button>
    );
}
 
export default Button;