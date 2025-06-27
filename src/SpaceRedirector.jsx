import { Navigate, useParams } from 'react-router-dom';
import useSpacesStore from './redux/useSpacesStore';

const SpaceRedirector = () => {
  const { spaceId } = useParams();
  const { getTabForSpace } = useSpacesStore();

  const tab = getTabForSpace(spaceId);

  return <Navigate to={tab ? `${tab}` : 'overview'} replace />;
};

export default SpaceRedirector;
