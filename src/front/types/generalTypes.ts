import { ExtendButtonBaseTypeMap } from '@mui/material';
import {
    DefaultComponentProps,
    OverridableTypeMap,
    OverrideProps
} from '@mui/material/OverridableComponent';

export type OverridableComponentProps<
    M extends OverridableTypeMap,
    C extends React.ElementType
> =
    | ({
          /**
           * The component used for the root node.
           * Either a string to use a HTML element or a component.
           */
          component: C;
      } & OverrideProps<M, C>)
    | DefaultComponentProps<M>;

export type ExtendButtonBaseProps<
    M extends OverridableTypeMap,
    C extends React.ElementType
> =
    | ({
          href: string;
      } & OverrideProps<ExtendButtonBaseTypeMap<M>, 'a'>)
    | OverridableComponentProps<ExtendButtonBaseTypeMap<M>, C>;
