export default interface ResponseMenu {
  id: number;
  group: string;
  title: string;
  url: string;
  parent_id: number | null;
  sort: number;
  description: string;
  icon_class: string;
  _child?: ResponseMenu;
}
