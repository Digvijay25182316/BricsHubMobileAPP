import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Text} from 'react-native-svg';

const ProgressCurcular = () => {
  return (
    <AnimatedCircularProgress
      size={50}
      width={3}
      fill={30}
      tintColor="#00e0ff"
      backgroundColor="#3d5875">
      {fill => <Text>{30}</Text>}
    </AnimatedCircularProgress>
  );
};

export default ProgressCurcular;
