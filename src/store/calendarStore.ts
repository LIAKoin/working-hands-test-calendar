import { defineStore } from 'pinia';

interface DatePart {
    day: number;
    month: number;
    year: number;
}

interface LocaleData {
    weekNames: string[];
    monthNames: string[];
}

interface I18nData {
    [key: string]: LocaleData;
}

interface AppState {
    lang: string;
    currentDate: DatePart;
    pickedDate: DatePart;
    i18n: I18nData;
    currentPage: 'day' | 'month';
    isSettingsOpened: boolean;
}

export const useCalendarStore = defineStore('calendar', {
    state: (): AppState => ({
        lang: 'en',
        currentDate: {
            day: 7,
            month: 11,
            year: 2025,
        } as DatePart,
        pickedDate: {
            day: 7,
            month: 11,
            year: 2025,
        } as DatePart,
        i18n: {
            en: {
                weekNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            },
            ru: {
                weekNames: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                monthNames: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]
            }
        } as I18nData,
        currentPage: 'day' as 'day' | 'month',
        isSettingsOpened: false,
    }),

    getters: {
        daysData: (state) => {
            const firstDay = new Date(state.currentDate.year, state.currentDate.month - 1, 1).getDay();
            const daysInMonth = new Date(state.currentDate.year, state.currentDate.month, 0).getDate();

            return {
                firstWeekDay: firstDay,
                totalDays: daysInMonth
            }
        },

        currentMonthName: (state) => getMonthShort(state.i18n[state.lang]!.monthNames ,state.currentDate.month),
        weekNames: (state) => state.i18n[state.lang]!.weekNames,
        monthNames: (state) => state.i18n[state.lang]!.monthNames,
    },

    actions: {
        changeLang(lang: string): void {
            if(lang in this.i18n === false) throw new Error("Unsupported language");
            this.lang = lang;
            this.changeSettings();
        },

        changePage(): void {
            this.currentPage = this.currentPage === 'day' ? 'month' : 'day';
        },

        changeSettings(): void {
            this.isSettingsOpened = !this.isSettingsOpened;
        },

        setDateByString(dateString: string): void {
            const parts = dateString.split('-');

            const year = Number(parts[0]);
            const month = Number(parts[1]);
            const day = Number(parts[2]);
            
            if (isNaN(year) || isNaN(month) || isNaN(day)) {
                throw new Error('Invalid date string');
            }
            
            this.currentDate = {
                day,
                month,
                year,
            };
            
            this.pickedDate = {
                day,
                month,
                year,
            };
        },

        returnPickedDate(): string {
            return `${String(this.pickedDate.year).padStart(2, '0')}-${String(this.pickedDate.month).padStart(2, '0')}-${String(this.pickedDate.day).padStart(2, '0')}`
        },

        pickMonth(idx: number): void {
            this.currentDate.month = idx;
            this.changePage();
        },

        pickDate(idx: number): string {
            this.pickedDate.day = idx;
            this.pickedDate.month = this.currentDate.month;
            this.pickedDate.year = this.currentDate.year;
    
            return `${this.pickedDate.day}-${this.pickedDate.month}-${this.pickedDate.year}`
        },

        changeHeader(n: -1 | 1): void {
            if(this.currentPage === 'day') {
                this.currentDate.month += n;
    
                if(this.currentDate.month < 1) {
                    this.currentDate.year -= 1;
                    this.currentDate.month = 12;
                }
        
                if(this.currentDate.month > 12) {
                    this.currentDate.year += 1;
                    this.currentDate.month = 1;
                }

            }else if(this.currentPage === 'month') {
    
                if(this.currentDate.year > 0 && this.currentDate.year < 9999) {
                    this.currentDate.year += n;
                }

            }
        }
    },
})

function getMonthShort(monthsNames: string[],monthNumber: number): string {
    if (monthNumber < 1 || monthNumber > 12) {
        throw new Error('Неверный номер месяца');
    }
    return monthsNames[monthNumber - 1] ?? "";
}