export default class MenuBar {
    id: number | undefined;
    title: string | undefined;
    subtitle?: string | undefined;
    type:
        | 'aside'
        | 'basic'
        | 'collapsable'
        | 'divider'
        | 'group'
        | 'spacer';
    icon?: string | undefined;
    parent?: number | undefined;
    children?: MenuBar[];
    link?: string | undefined;
}
