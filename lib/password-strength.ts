export enum PasswordStrengthTypes{
    Poor = 'Ненадежный',
    Weak = 'Слабый',
    Normal = 'Средний',
    Good = 'Хороший',
    Strong = 'Сильный'
}

export enum PasswordColors{
    Poor = '#f44336',
    Weak = '#ffc107',
    Normal = '#ffab91',
    Good = '#00e676',
    Strong = '#00c853'
}

export interface IStrengthInfo{
    label: string
    color: string
}

// has number
const hasNumber = (password: string) => new RegExp(/[0-9]/).test(password);

// has mix of small and capitals
const hasMixed = (password: string) => new RegExp(/[a-z]/).test(password) && new RegExp(/[A-Z]/).test(password);

// has special chars
const hasSpecial = (password: string) => new RegExp(/[!#@$%^&*)(+=._-]/).test(password);

// set color based on password strength
export const strengthInfo = (count: number):IStrengthInfo => {
    if (count < 2) return { label: PasswordStrengthTypes.Poor, color: PasswordColors.Poor };
    if (count < 3) return { label: PasswordStrengthTypes.Weak, color: PasswordColors.Weak };
    if (count < 4) return { label: PasswordStrengthTypes.Normal, color: PasswordColors.Normal };
    if (count < 5) return { label: PasswordStrengthTypes.Good, color: PasswordColors.Good };
    if (count < 6) return { label: PasswordStrengthTypes.Strong, color: PasswordColors.Strong};
    return { label: PasswordStrengthTypes.Poor, color: PasswordColors.Poor };
};

// password strength indicator
export const strengthIndicator = (password: string): number => {
    let strengths = 0;
    if (password.length > 5) strengths += 1;
    if (password.length > 7) strengths += 1;
    if (hasNumber(password)) strengths += 1;
    if (hasSpecial(password)) strengths += 1;
    if (hasMixed(password)) strengths += 1;
    return strengths;
};
