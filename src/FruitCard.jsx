import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';

import IconButton from '@material-ui/core/IconButton';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 250,
    maxWidth: 450,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },

}));

export default function FruitCard({fruit, onDelete, flippedProps}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root} {...flippedProps}>
      <CardHeader
        title={fruit.name}
        // subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image="/logo192.png"
        title="Paella dish"
      />
      <CardContent>

      </CardContent>
      
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </IconButton>
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        
        <IconButton 
            style={{textAlign: 'center'}}
            aria-label="settings"
            onClick={onDelete}
          >
            <DeleteForeverRoundedIcon color="secondary" />
          </IconButton>

      </Collapse>
    </Card>
  );
}
