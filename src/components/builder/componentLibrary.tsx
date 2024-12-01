import {
  LayoutIcon,
  Type,
  Image as ImageIcon,
  Box as BoxIcon,
  Grid,
  Columns,
  ListOrdered,
  Button as ButtonIcon,
  Form,
  Table2,
  Map,
  Video,
  Share2,
} from 'lucide-react';

export const componentLibrary = {
  layout: [
    {
      type: 'container',
      label: 'Container',
      icon: <BoxIcon size={24} />,
      defaultProps: {
        maxW: 'container.xl',
        px: 4,
      },
    },
    {
      type: 'grid',
      label: 'Grid',
      icon: <Grid size={24} />,
      defaultProps: {
        templateColumns: 'repeat(3, 1fr)',
        gap: 4,
      },
    },
    {
      type: 'columns',
      label: 'Columns',
      icon: <Columns size={24} />,
      defaultProps: {
        columns: 2,
        spacing: 4,
      },
    },
  ],
  basic: [
    {
      type: 'heading',
      label: 'Heading',
      icon: <Type size={24} />,
      defaultProps: {
        size: 'xl',
        mb: 4,
      },
    },
    {
      type: 'text',
      label: 'Text',
      icon: <Type size={24} />,
      defaultProps: {
        fontSize: 'md',
      },
    },
    {
      type: 'image',
      label: 'Image',
      icon: <ImageIcon size={24} />,
      defaultProps: {
        boxSize: '200px',
        objectFit: 'cover',
      },
    },
    {
      type: 'button',
      label: 'Button',
      icon: <ButtonIcon size={24} />,
      defaultProps: {
        colorScheme: 'blue',
        size: 'md',
      },
    },
    {
      type: 'list',
      label: 'List',
      icon: <ListOrdered size={24} />,
      defaultProps: {
        spacing: 2,
      },
    },
  ],
  advanced: [
    {
      type: 'form',
      label: 'Form',
      icon: <Form size={24} />,
      defaultProps: {
        spacing: 4,
      },
    },
    {
      type: 'table',
      label: 'Table',
      icon: <Table2 size={24} />,
      defaultProps: {
        variant: 'simple',
      },
    },
    {
      type: 'map',
      label: 'Map',
      icon: <Map size={24} />,
      defaultProps: {
        height: '400px',
      },
    },
    {
      type: 'video',
      label: 'Video',
      icon: <Video size={24} />,
      defaultProps: {
        aspectRatio: 16 / 9,
      },
    },
    {
      type: 'social',
      label: 'Social Share',
      icon: <Share2 size={24} />,
      defaultProps: {
        platforms: ['twitter', 'facebook', 'linkedin'],
      },
    },
  ],
};
