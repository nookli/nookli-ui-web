import { useOutletContext } from 'react-router-dom';

const OverviewTab = () => {
  const { space } = useOutletContext();
  return <div>Overview of {space?.name}</div>;
};

export default OverviewTab;
