type Props = {
    label: string
}

const ButtonV2: React.FC<Props> = ({label}) => {
    return (
        <button className="dark:darkModeButtonV2 lightModeButtonV2 ">
            {label}
        </button>
    );
}
 
export default ButtonV2;