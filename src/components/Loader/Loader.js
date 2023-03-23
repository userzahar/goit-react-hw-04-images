import { Triangle } from 'react-loader-spinner';
import { Div } from './Loader.styled';

export function Loader() {
  return (
    <Div>
      <Triangle
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </Div>
  );
}
