import { useParams } from 'react-router-dom';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const Test = () => {
  const params = useParams();
  const stepId = Number(params.stepId);

  switch (stepId) {
    case 1:
      return <Step1 />;
    case 2:
      return <Step2 />;
    case 3:
      return <Step3 />;
    default:
      return null;
  }
};

export default Test;
