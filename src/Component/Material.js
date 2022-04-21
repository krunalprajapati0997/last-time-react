import React,{useEffect,useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const { id } = useParams()
  let history = useHistory();

  const [user, setuser] = useState([])

  useEffect(() => {
      data()
  }, [])

  function data() {
      let token = localStorage.getItem('token')
      axios.get(`http://localhost:6544/`,{ headers:{'x-access-token':token}})
          .then(res => {
              console.log('heyyyy________',res.data)
              const tableData = res.data.user;
              setuser(tableData)
          })
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         {user.name}
        </Typography>
        <Typography variant="h5" component="h2">
          {user.description}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
         {user.quantities}
        </Typography>
        <Typography variant="body2" component="p">
          {user.price}
          {user.profile_url}
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
