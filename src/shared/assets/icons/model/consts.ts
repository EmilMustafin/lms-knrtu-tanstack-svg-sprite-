import ChevronUp from '../main/chevron-up.svg';
import Close from '../main/close.svg';
import Menu from '../main/menu.svg';
import Search from '../main/search.svg';
import Trash from '../main/trash.svg';
import User from '../main/user.svg';

export enum Icons {
  USER = 'USER',
  Trash = 'TRASH',
  Menu = 'MENU',
  Close = 'CLOSE',
  Search = 'SEARCH',
  ChevronUp = 'CHEVRON_UP',
}

export const ICONS: Record<Icons, string> = {
  [Icons.USER]: User,
  [Icons.Trash]: Trash,
  [Icons.Menu]: Menu,
  [Icons.Close]: Close,
  [Icons.Search]: Search,
  [Icons.ChevronUp]: ChevronUp,
};
