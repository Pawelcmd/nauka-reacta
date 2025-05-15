import { render, screen } from '@testing-library/react';
import GreetingCard from './GreetingCard';

describe('GreetingCard', () => {
    it('renders name and age', () => {
        render(<GreetingCard name="Paweł" age={30} isBirthday={false} />);
        screen.debug();
        expect(screen.getByText('Cześć, Paweł!')).toBeInTheDocument();
        expect(screen.getByText('Masz 30 lat.')).toBeInTheDocument();
    });

    it('shows birthday message when isBirthday is true', () => {
        render(<GreetingCard name="Ania" age={25} isBirthday={true} />);
        screen.debug();
        expect(screen.getByText('Wszystkiego najlepszego z okazji urodzin!')).toBeInTheDocument();
    });

    it('does not show birthday message when isBirthday is false', () => {
        render(<GreetingCard name="Tomek" age={17} isBirthday={false} />);
        screen.debug();
        const birthdayMessage = screen.queryByText('Wszystkiego najlepszego z okazji urodzin!');
        expect(birthdayMessage).not.toBeInTheDocument();
    });

    it('does not render age when it is undefined', () => {
        render(<GreetingCard name="Kuba" age={undefined as any} isBirthday={true} />);
        screen.debug();
        expect(screen.queryByText(/Masz/)).not.toBeInTheDocument();
    });
});