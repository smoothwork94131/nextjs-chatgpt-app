export interface RoleGroup {
    name: string;
    utilities_group: UtilitiesGroup[]
}
export interface UtilitiesGroup {
    name: string;
    utilities: Utility[];
}
export interface Utility {
    id?: number;
    name: string;
    inputs: Input[];
    summary: string;
    active: boolean;
    style: string | number;
    type?: 'form' | 'icon';
    input_align?: 'horizental' | 'vertical',
    prompt_message?: string[];
}
export interface Input {
    name: string;
    id?: number;
    type?: string;
    value?: string | number;
    style: string;
    size?: string | number;
    options?: string[];
    component: string;
    max_len?: number;
}
