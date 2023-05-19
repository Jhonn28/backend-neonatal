export default class Company {
    data: number | undefined;
    label: string | undefined;
    expandedIcon: string = 'pi pi-folder-open';
    collapsedIcon: string = 'pi pi-folder';
    icon?: string | undefined;
    children?: Company[];

}
