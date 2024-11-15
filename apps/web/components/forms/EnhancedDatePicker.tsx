import { useState, useEffect } from 'react';
import { Button } from '@kit/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@kit/ui/popover';
import { ScrollArea } from '@kit/ui/scroll-area';
import { cn } from '@kit/ui/utils';
import { CalendarIcon } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@kit/ui/select';

interface EnhancedDatePickerProps {
    value: Date | undefined;
    onChange: (date: Date) => void;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
}

const EnhancedDatePicker: React.FC<EnhancedDatePickerProps> = ({
                                                                   value,
                                                                   onChange,
                                                                   disabled = false,
                                                                   placeholder = 'Pick a date',
                                                                   className,
                                                               }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
    const [selectedYear, setSelectedYear] = useState<string>(
        value ? value.getFullYear().toString() : new Date().getFullYear().toString()
    );
    const [selectedMonth, setSelectedMonth] = useState<string>(
        value
            ? (value.getMonth() + 1).toString()
            : (new Date().getMonth() + 1).toString()
    );
    const [selectedDay, setSelectedDay] = useState<string>(
        value ? value.getDate().toString() : new Date().getDate().toString()
    );

    // Generate years (100 years in the past)
    const currentYear = new Date().getFullYear();
    const years: string[] = Array.from({ length: 120 }, (_, i) =>
        (currentYear - 119 + i).toString()
    );

    // Month names
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    // Generate days in a month
    const daysInMonth = (month: number, year: number): number =>
        new Date(year, month, 0).getDate();

    const days: string[] = Array.from(
        { length: daysInMonth(parseInt(selectedMonth), parseInt(selectedYear)) },
        (_, i) => (i + 1).toString()
    );

    useEffect(() => {
        if (value) {
            setSelectedDate(value);
            setSelectedYear(value.getFullYear().toString());
            setSelectedMonth((value.getMonth() + 1).toString());
            setSelectedDay(value.getDate().toString());
        }
    }, [value]);

    const updateDate = (newYear: string, newMonth: string, newDay: string) => {
        const newDate = new Date(
            parseInt(newYear),
            parseInt(newMonth) - 1,
            parseInt(newDay)
        );
        setSelectedDate(newDate);
        onChange(newDate);
    };

    const handleYearChange = (year: string) => {
        setSelectedYear(year);
        updateDate(year, selectedMonth, selectedDay);
    };

    const handleMonthChange = (month: string) => {
        const maxDays = daysInMonth(parseInt(month), parseInt(selectedYear));
        const newDay = Math.min(parseInt(selectedDay), maxDays).toString();
        setSelectedMonth(month);
        setSelectedDay(newDay);
        updateDate(selectedYear, month, newDay);
    };

    const handleDayChange = (day: string) => {
        setSelectedDay(day);
        updateDate(selectedYear, selectedMonth, day);
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        'w-full justify-start text-left font-normal py-5',
                        !value && 'text-muted-foreground',
                        className
                    )}
                    disabled={disabled}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? selectedDate.toLocaleDateString() : placeholder}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="start">
                <div className="flex gap-2 p-3">
                    <Select value={selectedMonth} onValueChange={handleMonthChange}>
                        <SelectTrigger className="w-[100px] bg-white">
                            <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                            <ScrollArea className="h-40 bg-white">
                                {months.map((month, index) => (
                                    <SelectItem
                                        key={index}
                                        value={(index + 1).toString()}
                                        className="hover:text-custom-ink"
                                    >
                                        {month}
                                    </SelectItem>
                                ))}
                            </ScrollArea>
                        </SelectContent>
                    </Select>
                    <Select value={selectedDay} onValueChange={handleDayChange}>
                        <SelectTrigger className="w-[60px]">
                            <SelectValue placeholder="Day" />
                        </SelectTrigger>
                        <SelectContent>
                            <ScrollArea className="h-40 bg-white">
                                {days.map((day) => (
                                    <SelectItem
                                        key={day}
                                        value={day}
                                        className="hover:bg-custom-arctic hover:text-white"
                                    >
                                        {day}
                                    </SelectItem>
                                ))}
                            </ScrollArea>
                        </SelectContent>
                    </Select>
                    <Select value={selectedYear} onValueChange={handleYearChange}>
                        <SelectTrigger className="w-[80px]">
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                            <ScrollArea className="h-40 bg-white">
                                {years.map((year) => (
                                    <SelectItem
                                        key={year}
                                        value={year}
                                        className="hover:bg-custom-arctic hover:text-white"
                                    >
                                        {year}
                                    </SelectItem>
                                ))}
                            </ScrollArea>
                        </SelectContent>
                    </Select>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default EnhancedDatePicker;