interface GreetingCardProps {
    name: string;
    age: number;
    isBirthday: boolean;
}

const GreetingCard: React.FC<GreetingCardProps> = ({name, age, isBirthday}) => {
    return (
        <div className="greeting-card">
            <h1>Cześć, {name}!</h1>
            {age !== undefined && <p>Masz {age} lat.</p>}
            {isBirthday && <p>Wszystkiego najlepszego z okazji urodzin!</p>}
        </div>
    )
}

export default GreetingCard;