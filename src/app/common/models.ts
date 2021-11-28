export type applicationThemeType = 'light' | 'dark';
export type applicationLayoutType = 'layout1' | 'layout2'

export interface NavigationConfig {
    theme: applicationThemeType;
    layout: applicationLayoutType;
}