import { useHistory } from 'react-router-dom';

const redirectToDashboard = () => {
  let history = useHistory();
  history.push('/dashboard');
};

export default redirectToDashboard;
